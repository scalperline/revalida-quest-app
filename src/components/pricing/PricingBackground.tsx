
import { Sparkles } from 'lucide-react';

export function PricingBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-4 -right-4 w-32 h-32 bg-yellow-400/30 rounded-full animate-bounce"></div>
      <div className="absolute top-1/4 -left-4 w-24 h-24 bg-yellow-600/20 rounded-full animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-20 h-20 bg-yellow-500/25 rounded-full animate-ping"></div>
      <div className="absolute top-1/3 right-1/3 w-16 h-16 bg-yellow-400/20 rounded-full animate-bounce delay-1000"></div>
      <Sparkles className="absolute top-20 left-20 w-8 h-8 text-yellow-300/60 animate-pulse delay-500" />
    </div>
  );
}
