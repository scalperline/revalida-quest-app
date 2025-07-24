import React, { useState, useEffect } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Wifi, WifiOff } from 'lucide-react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: any;
}

interface ErrorDisplayProps {
  error: Error;
  onRetry?: () => void;
  onReset?: () => void;
  showDetails?: boolean;
}

export function ErrorDisplay({ error, onRetry, onReset, showDetails = false }: ErrorDisplayProps) {
  const [showFullDetails, setShowFullDetails] = useState(showDetails);

  const getErrorMessage = (error: Error) => {
    if (error.message.includes('network') || error.message.includes('fetch')) {
      return 'Problema de conexão. Verifique sua internet e tente novamente.';
    }
    if (error.message.includes('auth') || error.message.includes('login')) {
      return 'Sessão expirada. Faça login novamente.';
    }
    if (error.message.includes('permission') || error.message.includes('access')) {
      return 'Você não tem permissão para acessar este recurso.';
    }
    return 'Ocorreu um erro inesperado. Tente novamente.';
  };

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 border-2 border-red-200 max-w-md mx-auto">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
          <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Ops! Algo deu errado
          </h3>
          <p className="text-gray-600 mb-4">
            {getErrorMessage(error)}
          </p>
        </div>

        <div className="flex gap-3 justify-center">
          {onRetry && (
            <button
              onClick={onRetry}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Tentar Novamente
            </button>
          )}
          {onReset && (
            <button
              onClick={onReset}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Resetar
            </button>
          )}
        </div>

        {showFullDetails && (
          <details className="mt-4 text-left">
            <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
              Detalhes técnicos
            </summary>
            <pre className="mt-2 text-xs bg-gray-100 p-2 rounded overflow-auto">
              {error.stack}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}

// Hook para detectar conectividade
export function useConnectivity() {
  const [isOnline, setIsOnline] = useState(() => {
    // Verificação inicial mais robusta
    if (typeof navigator === 'undefined') return true;
    
    // Em desenvolvimento, assume que está online por padrão
    if (import.meta.env.DEV) {
      console.log('🔧 Ambiente de desenvolvimento detectado - assumindo online');
      return true;
    }
    
    return navigator.onLine;
  });

  useEffect(() => {
    const handleOnline = () => {
      console.log('🟢 Evento online detectado');
      setIsOnline(true);
    };
    
    const handleOffline = () => {
      console.log('🔴 Evento offline detectado');
      setIsOnline(false);
    };

    // Verificação adicional de conectividade real
    const checkRealConnectivity = async () => {
      try {
        // Em desenvolvimento, não faz verificação adicional
        if (import.meta.env.DEV) {
          console.log('🔧 Skip verificação de conectividade em desenvolvimento');
          return;
        }
        
        // Usa favicon.ico como teste de conectividade (mais confiável)
        const response = await fetch('/favicon.ico', { 
          method: 'HEAD',
          cache: 'no-cache',
          signal: AbortSignal.timeout(5000) // Timeout de 5 segundos
        });
        
        if (response.ok && navigator.onLine) {
          console.log('✅ Conectividade real confirmada');
          setIsOnline(true);
        } else {
          console.log('❌ Conectividade real falhou');
          setIsOnline(false);
        }
      } catch (error) {
        console.log('❌ Erro na verificação de conectividade:', error);
        // Só marca como offline se navigator.onLine também for false
        if (!navigator.onLine) {
          setIsOnline(false);
        }
      }
    };

    // Verificação inicial com delay para evitar falsos positivos
    const initialCheck = setTimeout(checkRealConnectivity, 2000);

    // Event listeners para mudanças de conectividade
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Verificação periódica a cada 30 segundos (apenas em produção)
    const interval = setInterval(checkRealConnectivity, 30000);

    return () => {
      clearTimeout(initialCheck);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearInterval(interval);
    };
  }, []);

  return isOnline;
}

// Componente de status de conectividade
export function ConnectivityStatus() {
  const isOnline = useConnectivity();
  const [show, setShow] = useState(false);
  const [offlineCount, setOfflineCount] = useState(0);

  useEffect(() => {
    console.log('📡 Status de conectividade mudou:', isOnline);
    
    if (!isOnline) {
      // Incrementa contador de tentativas offline
      setOfflineCount(prev => prev + 1);
      
      // Só mostra a mensagem após 2 tentativas para evitar falsos positivos
      if (offlineCount >= 1) {
        setShow(true);
      }
    } else {
      // Reset contador quando volta online
      setOfflineCount(0);
      const timer = setTimeout(() => {
        setShow(false);
        console.log('🔇 Ocultando mensagem de conectividade');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOnline, offlineCount]);

  // Não mostra nada se estiver em desenvolvimento e não houver problemas reais
  if (import.meta.env.DEV && offlineCount === 0) {
    return null;
  }

  if (!show) return null;

  return (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50">
      <Alert className={`border-2 ${isOnline ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
        <div className="flex items-center gap-2">
          {isOnline ? <Wifi className="w-4 h-4 text-green-600" /> : <WifiOff className="w-4 h-4 text-red-600" />}
          <AlertDescription className={isOnline ? 'text-green-800' : 'text-red-800'}>
            {isOnline ? 'Conexão restaurada' : 'Sem conexão com a internet'}
          </AlertDescription>
        </div>
      </Alert>
    </div>
  );
}

// Hook para retry automático
export function useRetry(fn: () => Promise<any>, maxRetries = 3) {
  const [retryCount, setRetryCount] = useState(0);
  const [isRetrying, setIsRetrying] = useState(false);

  const executeWithRetry = async () => {
    setIsRetrying(true);
    let lastError: Error;

    for (let i = 0; i <= maxRetries; i++) {
      try {
        const result = await fn();
        setRetryCount(0);
        setIsRetrying(false);
        return result;
      } catch (error) {
        lastError = error as Error;
        setRetryCount(i + 1);
        
        if (i < maxRetries) {
          // Exponential backoff
          await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
        }
      }
    }

    setIsRetrying(false);
    throw lastError!;
  };

  return {
    executeWithRetry,
    retryCount,
    isRetrying,
    hasRetriesLeft: retryCount < maxRetries
  };
} 