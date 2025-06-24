
import { useState } from 'react';
import { useMotivationalMessages } from '@/hooks/useMotivationalMessages';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, RefreshCw } from 'lucide-react';

export function MotivationalBanner() {
  const { messages, topMessage } = useMotivationalMessages();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  if (!topMessage || !isVisible || messages.length === 0) {
    return null;
  }

  const currentMessage = messages[currentIndex] || topMessage;

  const handleNext = () => {
    if (messages.length > 1) {
      setCurrentIndex((prev) => (prev + 1) % messages.length);
    }
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  const getCardStyle = (type: string) => {
    switch (type) {
      case 'level':
        return 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200 dark:from-yellow-900/20 dark:to-orange-900/20 dark:border-yellow-800';
      case 'area':
        return 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 dark:from-blue-900/20 dark:to-indigo-900/20 dark:border-blue-800';
      case 'streak':
        return 'bg-gradient-to-r from-red-50 to-pink-50 border-red-200 dark:from-red-900/20 dark:to-pink-900/20 dark:border-red-800';
      default:
        return 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 dark:from-green-900/20 dark:to-emerald-900/20 dark:border-green-800';
    }
  };

  const getTextStyle = (type: string) => {
    switch (type) {
      case 'level':
        return 'text-yellow-800 dark:text-yellow-200';
      case 'area':
        return 'text-blue-800 dark:text-blue-200';
      case 'streak':
        return 'text-red-800 dark:text-red-200';
      default:
        return 'text-green-800 dark:text-green-200';
    }
  };

  return (
    <Card className={`mb-6 ${getCardStyle(currentMessage.type)} shadow-lg animate-fade-in`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1">
            <div className="text-2xl">{currentMessage.icon}</div>
            <div className="flex-1">
              <p className={`font-medium text-sm md:text-base ${getTextStyle(currentMessage.type)}`}>
                {currentMessage.message}
              </p>
              {messages.length > 1 && (
                <p className="text-xs text-muted-foreground mt-1">
                  {currentIndex + 1} de {messages.length} mensagens
                </p>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {messages.length > 1 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleNext}
                className="h-8 w-8 p-0 hover:bg-white/50"
                title="Próxima mensagem"
              >
                <RefreshCw className="w-4 h-4" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="h-8 w-8 p-0 hover:bg-white/50"
              title="Fechar mensagem"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
