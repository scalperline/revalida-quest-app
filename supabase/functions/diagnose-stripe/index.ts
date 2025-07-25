import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function logStep(step: string, data?: any) {
  console.log(`[diagnose-stripe] ${step}`, data ? JSON.stringify(data) : '');
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    const diagnosis = {
      environment: {
        stripeKeyExists: false,
        stripeKeyFormat: 'invalid',
        supabaseUrlExists: false,
        supabaseKeyExists: false
      },
      stripe: {
        accountStatus: 'unknown',
        billingPortalEnabled: false,
        customerExists: false,
        customerId: null
      },
      database: {
        subscriberExists: false,
        customerIdInDb: null
      },
      errors: []
    };

    // 1. Verificar variáveis de ambiente
    const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    diagnosis.environment.stripeKeyExists = !!stripeSecretKey;
    diagnosis.environment.stripeKeyFormat = stripeSecretKey?.startsWith('sk_') ? 'valid' : 'invalid';
    diagnosis.environment.supabaseUrlExists = !!supabaseUrl;
    diagnosis.environment.supabaseKeyExists = !!supabaseKey;

    if (!stripeSecretKey) {
      diagnosis.errors.push("STRIPE_SECRET_KEY não configurada");
      throw new Error("STRIPE_SECRET_KEY não configurada");
    }

    if (!stripeSecretKey.startsWith('sk_')) {
      diagnosis.errors.push("STRIPE_SECRET_KEY formato inválido");
      throw new Error("STRIPE_SECRET_KEY formato inválido");
    }

    // 2. Testar conexão com Stripe
    const stripe = new Stripe(stripeSecretKey, { apiVersion: "2023-10-16" });
    logStep("Stripe client created");

    try {
      const account = await stripe.accounts.retrieve();
      diagnosis.stripe.accountStatus = account.charges_enabled ? 'active' : 'inactive';
      logStep("Stripe account retrieved", { 
        id: account.id, 
        chargesEnabled: account.charges_enabled 
      });
    } catch (accountError) {
      diagnosis.errors.push(`Erro ao acessar conta Stripe: ${accountError instanceof Error ? accountError.message : 'Unknown'}`);
      throw accountError;
    }

    // 3. Verificar se o portal de cobrança está habilitado
    try {
      const portalConfigurations = await stripe.billingPortal.configurations.list({ limit: 1 });
      diagnosis.stripe.billingPortalEnabled = portalConfigurations.data.length > 0;
      logStep("Billing portal configurations", { 
        count: portalConfigurations.data.length,
        enabled: diagnosis.stripe.billingPortalEnabled
      });
    } catch (portalError) {
      diagnosis.errors.push(`Erro ao verificar portal de cobrança: ${portalError instanceof Error ? portalError.message : 'Unknown'}`);
      // Não throw aqui, apenas log
    }

    // 4. Verificar dados do banco
    const supabaseClient = createClient(supabaseUrl ?? "", supabaseKey ?? "", {
      auth: { persistSession: false }
    });

    try {
      const { data: subscriberData, error: subscriberError } = await supabaseClient
        .from("subscribers")
        .select("stripe_customer_id, subscribed, subscription_tier")
        .eq("email", "oabquestion@gmail.com")
        .single();

      if (subscriberError) {
        diagnosis.errors.push(`Erro ao buscar dados do banco: ${subscriberError.message}`);
      } else if (subscriberData) {
        diagnosis.database.subscriberExists = true;
        diagnosis.database.customerIdInDb = subscriberData.stripe_customer_id;
        diagnosis.stripe.customerId = subscriberData.stripe_customer_id;

        // 5. Verificar se o customer existe no Stripe
        if (subscriberData.stripe_customer_id) {
          try {
            const customer = await stripe.customers.retrieve(subscriberData.stripe_customer_id);
            diagnosis.stripe.customerExists = true;
            logStep("Customer verified in Stripe", { 
              customerId: customer.id, 
              email: customer.email 
            });
          } catch (customerError) {
            diagnosis.errors.push(`Customer não encontrado no Stripe: ${customerError instanceof Error ? customerError.message : 'Unknown'}`);
          }
        }
      }
    } catch (dbError) {
      diagnosis.errors.push(`Erro de conexão com banco: ${dbError instanceof Error ? dbError.message : 'Unknown'}`);
    }

    // 6. Tentar criar uma sessão de portal (teste final)
    if (diagnosis.stripe.customerExists && diagnosis.stripe.billingPortalEnabled) {
      try {
        const portalSession = await stripe.billingPortal.sessions.create({
          customer: diagnosis.stripe.customerId!,
          return_url: "https://revalidaquest.com/profile",
        });
        logStep("Portal session test successful", { sessionId: portalSession.id });
      } catch (portalError) {
        diagnosis.errors.push(`Erro ao criar sessão do portal: ${portalError instanceof Error ? portalError.message : 'Unknown'}`);
      }
    }

    logStep("Diagnosis completed", diagnosis);

    return new Response(JSON.stringify({
      success: diagnosis.errors.length === 0,
      diagnosis,
      recommendations: generateRecommendations(diagnosis)
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in diagnose-stripe", { message: errorMessage });
    
    return new Response(JSON.stringify({ 
      success: false,
      error: errorMessage,
      timestamp: new Date().toISOString()
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});

function generateRecommendations(diagnosis: any): string[] {
  const recommendations = [];

  if (!diagnosis.environment.stripeKeyExists) {
    recommendations.push("Configure STRIPE_SECRET_KEY no Supabase Dashboard");
  }

  if (diagnosis.environment.stripeKeyFormat === 'invalid') {
    recommendations.push("Verifique se STRIPE_SECRET_KEY começa com 'sk_'");
  }

  if (diagnosis.stripe.accountStatus === 'inactive') {
    recommendations.push("Ative a conta Stripe para processar pagamentos");
  }

  if (!diagnosis.stripe.billingPortalEnabled) {
    recommendations.push("Configure o portal de cobrança no Stripe Dashboard");
  }

  if (!diagnosis.stripe.customerExists) {
    recommendations.push("Customer ID não encontrado no Stripe - verifique sincronização");
  }

  if (recommendations.length === 0) {
    recommendations.push("Todas as configurações parecem corretas");
  }

  return recommendations;
} 