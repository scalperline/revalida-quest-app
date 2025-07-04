import { MedicalLevel } from '@/utils/levelUtils';
import { useEffect } from 'react';

interface LevelUpAlertProps {
  show: boolean;
  newLevel: MedicalLevel | null;
  onClose: () => void;
}

export function LevelUpAlert({ show, newLevel, onClose }: LevelUpAlertProps) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show || !newLevel) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div 
        className={`
          bg-card border border-border rounded-lg p-6 max-w-sm w-full text-center
          transform transition-all duration-500 ease-out
          ${show ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}
        `}
        style={{
          boxShadow: '0 25px 50px -12px hsl(var(--primary) / 0.3)',
        }}
      >
        <div className="text-4xl mb-3">🎉</div>
        <h3 className="text-lg font-bold text-foreground mb-2">
          Parabéns!
        </h3>
        <p className="text-muted-foreground mb-4">
          Você agora é <span className="font-semibold text-foreground">{newLevel.name}</span>
        </p>
        <div className="flex items-center justify-center gap-2 text-primary">
          <span className="text-2xl">{newLevel.icon}</span>
          <span className="font-bold">Nível {newLevel.id}</span>
        </div>
      </div>
    </div>
  );
}