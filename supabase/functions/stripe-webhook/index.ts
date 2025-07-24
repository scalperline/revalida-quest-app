
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, stripe-signature",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[STRIPE-WEBHOOK] ${step}${detailsStr}`);
};

// Função para retry com backoff exponencial
async function retryWithBackoff<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> {
  let lastError: Error;
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error as Error;
      
      if (attempt === maxRetries) {
        throw lastError;
      }
      
      const delay = baseDelay * Math.pow(2, attempt);
      logStep(`Retry attempt ${attempt + 1}/${maxRetries + 1} after ${delay}ms`, { error: lastError.message });
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  throw lastError!;
}

// Função para buscar user_id por email usando a API de autenticação
async function getUserIdByEmail(email: string, supabaseClient: any): Promise<string | null> {
  return retryWithBackoff(async () => {
    try {
      // Usar a API de autenticação do Supabase para buscar usuários
      const { data, error } = await supabaseClient.auth.admin.listUsers();
      
      if (error) {
        logStep("Error listing users", { email, error: error.message });
        throw new Error(`Failed to list users: ${error.message}`);
      }
      
      // Encontrar o usuário pelo email
      const user = data.users.find((u: any) => u.email === email);
      
      if (!user) {
        logStep("User not found by email", { email });
        return null;
      }
      
      logStep("User found by email", { email, userId: user.id });
      return user.id;
    } catch (error) {
      logStep("Exception getting user_id by email", { email, error: String(error) });
      throw error;
    }
  });
}

// Função para salvar dados de fallback em caso de falha
async function saveFallbackData(supabaseClient: any, eventData: any) {
  try {
    await supabaseClient.from('webhook_fallback').insert({
      event_id: eventData.id,
      event_type: eventData.type,
      event_data: eventData,
      processed: false,
      created_at: new Date().toISOString(),
      retry_count: 0
    });
    logStep("Fallback data saved", { eventId: eventData.id, type: eventData.type });
  } catch (error) {
    logStep("Failed to save fallback data", { error: String(error) });
  }
}

// Função para processar assinatura (criada/atualizada)
async function processSubscription(supabaseClient: any, event: any, stripe: Stripe) {
  const subscription = event.data.object;
  
  return retryWithBackoff(async () => {
    const customer = await stripe.customers.retrieve(subscription.customer);
    if (customer.deleted) throw new Error("Customer was deleted");
    
    const email = customer.email;
    if (!email) throw new Error("Customer email not found");
    
    const priceId = subscription.items.data[0].price.id;
    let subscriptionTier = "Basic";
    if (priceId.includes("revalida-premium")) subscriptionTier = "Premium";
    else if (priceId.includes("revalida-pro")) subscriptionTier = "Pro";
    else if (priceId.includes("revalida-enterprise")) subscriptionTier = "Enterprise";
    
    const subscriptionEnd = new Date(subscription.current_period_end * 1000).toISOString();
    
    // Buscar user_id se não vier no metadata
    let user_id = subscription.metadata?.user_id || null;
    if (!user_id) {
      user_id = await getUserIdByEmail(email, supabaseClient);
    }
    
    // Atualizar subscriber com retry
    const { error: upsertError } = await supabaseClient.from("subscribers").upsert({
      email,
      stripe_customer_id: subscription.customer,
      subscribed: subscription.status === "active",
      subscription_tier: subscriptionTier,
      subscription_end: subscriptionEnd,
      updated_at: new Date().toISOString()
    }, {
      onConflict: 'email'
    });
    
    if (upsertError) {
      throw new Error(`Failed to upsert subscriber: ${upsertError.message}`);
    }
    
    // Registrar no histórico com retry
    const { error: historyError } = await supabaseClient.from("subscription_history").insert({
      user_id,
      email,
      event_type: event.type === "customer.subscription.created" ? "created" : "renewed",
      subscription_tier: subscriptionTier,
      stripe_subscription_id: subscription.id,
      details: {
        status: subscription.status,
        priceId,
        subscriptionEnd,
        webhook_processed_at: new Date().toISOString()
      }
    });
    
    if (historyError) {
      logStep("Warning: Failed to insert history", { error: historyError.message });
      // Não falhar por erro no histórico, apenas logar
    }
    
    logStep("Subscription processed successfully", {
      email,
      tier: subscriptionTier,
      status: subscription.status
    });
    
    return { email, tier: subscriptionTier, status: subscription.status };
  });
}

// Função para processar cancelamento de assinatura
async function processSubscriptionCancellation(supabaseClient: any, event: any, stripe: Stripe) {
  const subscription = event.data.object;
  
  return retryWithBackoff(async () => {
    const customer = await stripe.customers.retrieve(subscription.customer);
    if (customer.deleted) throw new Error("Customer was deleted");
    
    const email = customer.email;
    if (!email) throw new Error("Customer email not found");
    
    // Buscar user_id se não vier no metadata
    let user_id = subscription.metadata?.user_id || null;
    if (!user_id) {
      user_id = await getUserIdByEmail(email, supabaseClient);
    }
    
    // Atualizar subscriber
    const { error: upsertError } = await supabaseClient.from("subscribers").upsert({
      email,
      stripe_customer_id: subscription.customer,
      subscribed: false,
      subscription_tier: null,
      subscription_end: null,
      updated_at: new Date().toISOString()
    }, {
      onConflict: 'email'
    });
    
    if (upsertError) {
      throw new Error(`Failed to upsert subscriber: ${upsertError.message}`);
    }
    
    // Registrar no histórico
    const { error: historyError } = await supabaseClient.from("subscription_history").insert({
      user_id,
      email,
      event_type: "cancelled",
      subscription_tier: null,
      stripe_subscription_id: subscription.id,
      details: {
        status: subscription.status,
        webhook_processed_at: new Date().toISOString()
      }
    });
    
    if (historyError) {
      logStep("Warning: Failed to insert history", { error: historyError.message });
    }
    
    logStep("Subscription cancellation processed", { email });
    return { email, status: 'cancelled' };
  });
}

// Função para processar checkout completado
async function processCheckoutCompleted(supabaseClient: any, event: any) {
  const session = event.data.object;
  
  return retryWithBackoff(async () => {
    logStep("Processing checkout session", { sessionId: session.id });
    
    // O e-mail pode estar em customer_details.email ou customer_email
    const email = session.customer_details?.email || session.customer_email;
    if (!email) throw new Error("Email not found in checkout session");
    
    logStep("Email found in checkout session", { email });
    
    // Buscar user_id se necessário
    let user_id = session.metadata?.user_id || await getUserIdByEmail(email, supabaseClient);
    logStep("User ID resolved", { user_id, fromMetadata: !!session.metadata?.user_id });
    
    // Determinar o tier baseado no line_items ou price_id
    let subscriptionTier = "Premium"; // Default
    if (session.line_items?.data?.[0]?.price?.id) {
      const priceId = session.line_items.data[0].price.id;
      if (priceId.includes("revalida-premium")) subscriptionTier = "Premium";
      else if (priceId.includes("revalida-pro")) subscriptionTier = "Pro";
      else if (priceId.includes("revalida-enterprise")) subscriptionTier = "Enterprise";
    }
    
    logStep("Subscription tier determined", { tier: subscriptionTier });
    
    // Calcular data de expiração (1 mês a partir de agora)
    const subscriptionEnd = new Date();
    subscriptionEnd.setMonth(subscriptionEnd.getMonth() + 1);
    
    // Atualize o status do usuário
    const { error: upsertError } = await supabaseClient.from("subscribers").upsert({
      email,
      subscribed: true,
      subscription_tier: subscriptionTier,
      stripe_customer_id: session.customer,
      subscription_end: subscriptionEnd.toISOString(),
      updated_at: new Date().toISOString()
    }, {
      onConflict: 'email'
    });
    
    if (upsertError) {
      throw new Error(`Failed to update subscriber: ${upsertError.message}`);
    }
    
    // Registrar no histórico
    const { error: historyError } = await supabaseClient.from("subscription_history").insert({
      user_id,
      email,
      event_type: "checkout_completed",
      subscription_tier: subscriptionTier,
      stripe_subscription_id: session.subscription,
      details: {
        status: "checkout_completed",
        sessionId: session.id,
        customerId: session.customer,
        amount_total: session.amount_total,
        currency: session.currency,
        webhook_processed_at: new Date().toISOString()
      }
    });
    
    if (historyError) {
      logStep("Warning: Failed to insert history", { error: historyError.message });
    }
    
    logStep("Checkout session completed & user upgraded", { email, tier: subscriptionTier });
    return { email, tier: subscriptionTier, status: 'completed' };
  });
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    { auth: { persistSession: false } }
  );

  let eventData: any = null;

  try {
    logStep("Webhook received");
    
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", { 
      apiVersion: "2023-10-16" 
    });

    const body = await req.text();
    const signature = req.headers.get("stripe-signature");
    
    if (!signature) {
      throw new Error("No Stripe signature found");
    }

    const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
    if (!webhookSecret) {
      throw new Error("Webhook secret not configured");
    }

    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    eventData = event;
    logStep("Event verified", { type: event.type, id: event.id });

    let result: any = null;

    switch(event.type) {
      case "customer.subscription.created":
      case "customer.subscription.updated":
        result = await processSubscription(supabaseClient, event, stripe);
        break;
        
      case "customer.subscription.deleted":
        result = await processSubscriptionCancellation(supabaseClient, event, stripe);
        break;
        
      case "checkout.session.completed":
        result = await processCheckoutCompleted(supabaseClient, event);
        break;
        
      default:
        logStep("Unhandled event type", { type: event.type });
        result = { status: 'unhandled', type: event.type };
    }

    // Registrar sucesso no histórico de webhooks
    try {
      await supabaseClient.from('webhook_history').insert({
        event_id: event.id,
        event_type: event.type,
        status: 'success',
        processed_at: new Date().toISOString(),
        result: result
      });
    } catch (historyError) {
      logStep("Failed to log webhook history", { error: String(historyError) });
    }

    return new Response(JSON.stringify({ 
      received: true, 
      processed: true,
      event_id: event.id,
      event_type: event.type,
      result 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in webhook", { message: errorMessage, stack: error instanceof Error ? error.stack : undefined });
    
    // Salvar dados de fallback para processamento posterior
    if (eventData) {
      await saveFallbackData(supabaseClient, eventData);
    }
    
    // Registrar erro no histórico de webhooks
    try {
      await supabaseClient.from('webhook_history').insert({
        event_id: eventData?.id || 'unknown',
        event_type: eventData?.type || 'unknown',
        status: 'error',
        error_message: errorMessage,
        processed_at: new Date().toISOString()
      });
    } catch (historyError) {
      logStep("Failed to log webhook error history", { error: String(historyError) });
    }
    
    return new Response(JSON.stringify({ 
      error: errorMessage,
      event_id: eventData?.id || 'unknown',
      fallback_saved: !!eventData
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});

/*
Melhorias implementadas:

1. ✅ Retry automático com backoff exponencial
2. ✅ Sistema de fallback para eventos falhados
3. ✅ Logs detalhados para debugging
4. ✅ Histórico de webhooks para auditoria
5. ✅ Melhor tratamento de erros
6. ✅ Funções modulares para cada tipo de evento
7. ✅ Validação robusta de dados
8. ✅ Cálculo correto de datas de expiração

Para usar o sistema de fallback, crie as tabelas:

CREATE TABLE webhook_fallback (
  id SERIAL PRIMARY KEY,
  event_id TEXT UNIQUE,
  event_type TEXT,
  event_data JSONB,
  processed BOOLEAN DEFAULT FALSE,
  retry_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  processed_at TIMESTAMP
);

CREATE TABLE webhook_history (
  id SERIAL PRIMARY KEY,
  event_id TEXT,
  event_type TEXT,
  status TEXT, -- 'success', 'error', 'retry'
  error_message TEXT,
  result JSONB,
  processed_at TIMESTAMP DEFAULT NOW()
);
*/
