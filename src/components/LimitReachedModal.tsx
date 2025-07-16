
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Crown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface LimitReachedModalProps {
  open: boolean;
  onClose: () => void;
  limitType: 'questions' | 'simulados' | 'missions';
}

export function LimitReachedModal({ open, onClose, limitType }: LimitReachedModalProps) {
  const navigate = useNavigate();

  const handleUpgrade = () => {
    navigate('/pricing');
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }, 50);
    onClose();
  };

  let title = 'Limite Atingido';
  let description = '';
  if (limitType === 'questions') {
    title = 'Limite Diário Atingido';
    description = 'Você completou o máximo de 10 questões diárias no modo gratuito. Volte amanhã para continuar evoluindo ou desbloqueie acesso ilimitado agora.';
  } else if (limitType === 'simulados') {
    title = 'Limite de Simulados Atingido';
    description = 'Você atingiu o limite de tentativas de simulados personalizados do seu plano. Faça upgrade para liberar tentativas ilimitadas e potencializar sua preparação!';
  } else if (limitType === 'missions') {
    title = 'Limite de Missões Atingido';
    description = 'Você atingiu o limite de tentativas para esta missão no seu plano. Faça upgrade para liberar tentativas ilimitadas e conquistar mais recompensas!';
  }
  
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-orange-500" />
            {title}
          </DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border">
            <h3 className="font-semibold text-blue-800 mb-2">
              Desbloqueie o modo Premium e evolua sem limites:
            </h3>
            <ul className="text-sm text-blue-700 space-y-1 font-medium">
              <li>🎯 Responda quantas questões quiser</li>
              <li>🏆 Ranking avançado e conquistas exclusivas</li>
              <li>📊 Estatísticas detalhadas e missões especiais</li>
              <li>👑 Suporte prioritário</li>
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
            Limite diário: renove sua energia amanhã ou evolua agora.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
