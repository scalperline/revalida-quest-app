interface FloatingXPNotificationProps {
  show: boolean;
  amount: number;
  className?: string;
}

export function FloatingXPNotification({ 
  show, 
  amount, 
  className = '' 
}: FloatingXPNotificationProps) {
  if (!show) return null;

  return (
    <>
      <div className={`fixed bottom-20 right-4 z-50 pointer-events-none ${className}`}>
        <div 
          className={`
            bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-bold
            transform transition-all duration-1000 ease-out
            ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          `}
          style={{
            animation: show ? 'slideUpFade 1s ease-out forwards' : undefined,
          }}
        >
          +{amount} XP!
        </div>
      </div>
      
      <style>
        {`
          @keyframes slideUpFade {
            0% {
              opacity: 0;
              transform: translateY(0px) scale(0.8);
            }
            20% {
              opacity: 1;
              transform: translateY(-10px) scale(1.1);
            }
            80% {
              opacity: 1;
              transform: translateY(-30px) scale(1);
            }
            100% {
              opacity: 0;
              transform: translateY(-40px) scale(0.9);
            }
          }
        `}
      </style>
    </>
  );
}