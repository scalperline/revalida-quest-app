
import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, displayName?: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    console.log('AuthProvider - getting initial session');
    
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        console.log('AuthProvider - initial session:', session);
        console.log('AuthProvider - initial error:', error);
        
        if (error) {
          console.error('Error getting session:', error);
          setUser(null);
          setSession(null);
        } else {
          setUser(session?.user ?? null);
          setSession(session);
        }
      } catch (error) {
        console.error('Error in getInitialSession:', error);
        setUser(null);
        setSession(null);
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('AuthProvider - auth state change:', event, session);
        setUser(session?.user ?? null);
        setSession(session);
        setLoading(false);
      }
    );

    return () => {
      console.log('AuthProvider - cleaning up subscription');
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        console.error('Sign in error:', error);
        toast({
          title: "Erro no Login",
          description: error.message === "Invalid login credentials" 
            ? "Email ou senha incorretos" 
            : error.message.includes('Email not confirmed')
            ? "Por favor, confirme seu email antes de fazer login"
            : "Erro no login. Tente novamente.",
          variant: "destructive",
        });
      }

      return { error };
    } catch (error: any) {
      console.error('Unexpected sign in error:', error);
      toast({
        title: "Erro no Login",
        description: "Ocorreu um erro inesperado. Tente novamente.",
        variant: "destructive",
      });
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, displayName?: string) => {
    try {
      setLoading(true);
      const redirectUrl = `${window.location.origin}/`;
      
      const { error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            display_name: displayName?.trim() || 'Aventureiro',
          }
        }
      });

      if (error) {
        console.error('Sign up error:', error);
        toast({
          title: "Erro no Cadastro",
          description: error.message.includes('already registered')
            ? "Este email já está cadastrado. Tente fazer login."
            : error.message.includes('Password should be')
            ? "A senha deve ter pelo menos 6 caracteres."
            : "Erro no cadastro. Tente novamente.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Cadastro realizado! 🎉",
          description: "Verifique seu email para confirmar a conta e fazer login.",
        });
      }

      return { error };
    } catch (error: any) {
      console.error('Unexpected sign up error:', error);
      toast({
        title: "Erro no Cadastro",
        description: "Ocorreu um erro inesperado. Tente novamente.",
        variant: "destructive",
      });
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('Sign out error:', error);
        toast({
          title: "Erro no Logout",
          description: "Ocorreu um erro. Tente novamente.",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      console.error('Unexpected sign out error:', error);
      toast({
        title: "Erro no Logout",
        description: "Ocorreu um erro. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut,
  };

  console.log('AuthProvider - rendering with user:', user, 'loading:', loading);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
