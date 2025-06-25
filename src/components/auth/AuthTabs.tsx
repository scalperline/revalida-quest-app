
import { useState } from 'react';
import { LogIn, UserPlus } from 'lucide-react';
import { LoginForm } from './LoginForm';
import { SignupForm } from './SignupForm';

interface AuthTabsProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  displayName: string;
  setDisplayName: (name: string) => void;
  handleSignIn: (e: React.FormEvent) => void;
  handleSignUp: (e: React.FormEvent) => void;
  isSubmitting: boolean;
  loading: boolean;
  onValueChange: () => void;
}

export function AuthTabs({
  email,
  setEmail,
  password,
  setPassword,
  displayName,
  setDisplayName,
  handleSignIn,
  handleSignUp,
  isSubmitting,
  loading,
  onValueChange
}: AuthTabsProps) {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');

  const handleTabChange = (tab: 'login' | 'signup') => {
    setActiveTab(tab);
    onValueChange();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === 'login') {
      handleSignIn(e);
    } else {
      handleSignUp(e);
    }
  };

  return (
    <div className="w-full">
      {/* Custom Tab Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-3 mb-6">
        <button
          type="button"
          onClick={() => handleTabChange('login')}
          className={`
            flex items-center justify-center gap-2 rounded-xl font-space-grotesk font-semibold text-sm sm:text-base py-3 px-4 transition-all duration-300 transform hover:scale-105
            ${activeTab === 'login' 
              ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30 w-full sm:w-[55%]' 
              : 'bg-transparent border-2 border-white/40 text-blue-100 hover:bg-white/10 w-full sm:w-[55%]'
            }
          `}
        >
          <LogIn className="w-4 h-4" />
          Entrar
        </button>
        
        <button
          type="button"
          onClick={() => handleTabChange('signup')}
          className={`
            flex items-center justify-center gap-2 rounded-xl font-space-grotesk font-semibold text-sm sm:text-base py-3 px-4 transition-all duration-300 transform hover:scale-105
            ${activeTab === 'signup' 
              ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30 w-full sm:w-[45%]' 
              : 'bg-transparent border-2 border-white/40 text-blue-100 hover:bg-white/10 w-full sm:w-[45%]'
            }
          `}
        >
          <UserPlus className="w-4 h-4" />
          Cadastrar
        </button>
      </div>

      {/* Form Content */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {activeTab === 'login' ? (
          <LoginForm
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            loading={loading}
            showSubmitButton={false}
          />
        ) : (
          <SignupForm
            displayName={displayName}
            setDisplayName={setDisplayName}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            loading={loading}
            showSubmitButton={false}
          />
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting || loading}
          className="w-full h-14 sm:h-16 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 hover:from-blue-700 hover:via-blue-800 hover:to-blue-900 rounded-xl font-bold text-base sm:text-lg shadow-2xl hover:shadow-blue-500/50 transition-all duration-500 transform hover:scale-105 font-space-grotesk group relative overflow-hidden text-white"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
          {isSubmitting || loading ? (
            <div className="flex items-center gap-2 relative z-10">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span className="text-sm sm:text-base">
                {activeTab === 'login' ? 'Entrando...' : 'Cadastrando...'}
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2 relative z-10">
              {activeTab === 'login' ? (
                <>
                  <LogIn className="w-5 h-5" />
                  <span className="text-sm sm:text-base">Iniciar Jornada Médica 🏥</span>
                </>
              ) : (
                <>
                  <UserPlus className="w-5 h-5" />
                  <span className="text-sm sm:text-base">Criar Conta Médica 👨‍⚕️</span>
                </>
              )}
            </div>
          )}
        </button>
      </form>
    </div>
  );
}
