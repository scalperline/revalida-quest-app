
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { AuthFormHeader } from './AuthFormHeader';
import { AuthSuccessAlert } from './AuthSuccessAlert';
import { AuthErrorAlert } from './AuthErrorAlert';
import { AuthTabs } from './AuthTabs';
import { AuthHelpText } from './AuthHelpText';

export function AuthForm() {
  const { signIn, signUp, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    const { error: signInError } = await signIn(email, password);
    
    if (signInError) {
      if (signInError.message === "Invalid login credentials") {
        setError('Email ou senha incorretos. Verifique suas credenciais.');
      } else if (signInError.message.includes('Email not confirmed')) {
        setError('Por favor, confirme seu email antes de fazer login. Verifique sua caixa de entrada.');
      } else {
        setError('Erro no login. Tente novamente em alguns instantes.');
      }
    }
    
    setIsSubmitting(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    const { error: signUpError } = await signUp(email, password, displayName);
    
    if (signUpError) {
      if (signUpError.message.includes('already registered')) {
        setError('Este email já está cadastrado. Tente fazer login ou use outro email.');
      } else if (signUpError.message.includes('Password should be')) {
        setError('A senha deve ter pelo menos 6 caracteres.');
      } else {
        setError('Erro no cadastro. Tente novamente em alguns instantes.');
      }
    } else {
      setShowSuccess(true);
      setEmail('');
      setPassword('');
      setDisplayName('');
    }
    
    setIsSubmitting(false);
  };

  const resetForm = () => {
    setError('');
    setShowSuccess(false);
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Medical glassmorphism card with enhanced shadows */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 via-blue-600/25 to-blue-700/30 rounded-3xl blur-xl"></div>
      
      <Card className="relative bg-white/15 backdrop-blur-xl border-2 border-blue-200/40 rounded-3xl overflow-hidden hover:bg-white/20 transition-all duration-500 hover:border-blue-200/50 hover:shadow-blue-500/30" 
            style={{ 
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1), 0 8px 40px rgba(59, 130, 246, 0.15)' 
            }}>
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent"></div>
        
        <AuthFormHeader />
        
        <CardContent className="p-6 sm:p-8 relative z-10">
          <AuthSuccessAlert show={showSuccess} />
          <AuthErrorAlert error={error} />

          <AuthTabs
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            displayName={displayName}
            setDisplayName={setDisplayName}
            handleSignIn={handleSignIn}
            handleSignUp={handleSignUp}
            isSubmitting={isSubmitting}
            loading={loading}
            onValueChange={resetForm}
          />

          <AuthHelpText />
        </CardContent>
      </Card>
    </div>
  );
}
