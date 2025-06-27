
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Crown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface LimitReachedModalProps {
  open: boolean;
  onClose: () => void;
  limitType: 'questions' | 'simulados';
}

export function LimitReachedModal({ open, onClose, limitType }: LimitReachedModalProps) {
  const navigate = useNavigate();

  const handleUpgrade = () => {
    navigate('/pricing');
    onClose();
  };

  const isQuestions = limitType === 'questions';
  
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-orange-500" />
            Limite Atingido
          </DialogTitle>
          <DialogDescription>
            {isQuestions 
              ? "Você atingiu seu limite diário de 10 questões no plano gratuito."
              : "Você atingiu seu limite mensal de 1 simulado no plano gratuito."
            }
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border">
            <h3 className="font-semibold text-blue-800 mb-2">
              Faça upgrade e tenha acesso ilimitado!
            </h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>✅ Questões ilimitadas por dia</li>
              <li>✅ Simulados ilimitados por mês</li>
              <li>✅ Relatórios avançados</li>
              <li>✅ Suporte prioritário</li>
            </ul>
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={onClose}
              className="flex-1"
            >
              Continuar Gratuito
            </Button>
            <Button 
              onClick={handleUpgrade}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Crown className="w-4 h-4 mr-2" />
              Fazer Upgrade
            </Button>
          </div>
          
          <p className="text-xs text-gray-500 text-center">
            {isQuestions 
              ? "Seus limites diários resetam a cada 24 horas"
              : "Seus limites mensais resetam todo dia 1º"
            }
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
