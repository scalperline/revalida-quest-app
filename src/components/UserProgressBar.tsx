
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Crown, Zap, LogOut, Sparkles, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useAuth } from '@/hooks/useAuth';
import { useSubscription } from '@/hooks/useSubscription';
import { useGamification } from '@/hooks/useGamification';

export function UserProgressBar() {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const { subscribed, subscription_tier, openCustomerPortal } = useSubscription();
  const { userProgress } = useGamification();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/auth');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleUpgrade = () => {
    if (subscribed) {
      openCustomerPortal();
    } else {
      navigate('/pricing');
    }
  };

  const getPlanLevel = () => {
    if (!subscribed) return { level: 1, name: 'Gratuito', icon: Zap };
    switch (subscription_tier) {
      case 'Basic':
        return { level: 2, name: 'Basic', icon: Crown };
      case 'Premium':
        return { level: 3, name: 'Premium', icon: Sparkles };
      case 'Pro':
        return { level: 4, name: 'Pro', icon: Trophy };
      default:
        return { level: 2, name: 'Premium', icon: Crown };
    }
  };

  const planInfo = getPlanLevel();
  const PlanIcon = planInfo.icon;
  const xpPercentage = Math.round((userProgress.xp / userProgress.xpToNextLevel) * 100);
  const xpRemaining = userProgress.xpToNextLevel - userProgress.xp;

  return (
    <div className="flex items-center gap-3">
      {/* Desktop Version */}
      <div className="hidden md:flex items-center bg-gradient-to-r from-slate-900 via-purple-900 to-blue-900 rounded-full px-6 py-3 border-2 border-purple-500/50 shadow-lg hover:shadow-purple-500/30 transition-all duration-300 min-w-[280px]">
        {/* Level Info */}
        <div className="flex items-center gap-2 mr-4">
          <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
            {planInfo.level}
          </div>
          <div className="text-white">
            <div className="text-xs font-semibold text-purple-200">Nível {planInfo.level}</div>
            <div className="text-sm font-bold flex items-center gap-1">
              <PlanIcon className="w-4 h-4 text-yellow-400" />
              {planInfo.name}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="flex-1 min-w-[120px]">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-purple-200">
              {userProgress.xp} / {userProgress.xpToNextLevel} XP
            </span>
            <span className="text-xs text-purple-300">
              {xpPercentage}%
            </span>
          </div>
          <Progress 
            value={xpPercentage} 
            className="h-2 bg-slate-800 border border-purple-500/30" 
          />
          {xpRemaining > 0 && (
            <div className="text-xs text-purple-300 mt-1 text-center">
              Faltam {xpRemaining} XP para o próximo nível! 🚀
            </div>
          )}
        </div>
      </div>

      {/* Mobile Version */}
      <div className="md:hidden flex items-center bg-gradient-to-r from-slate-900 via-purple-900 to-blue-900 rounded-full px-4 py-2 border-2 border-purple-500/50 shadow-lg">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
            {planInfo.level}
          </div>
          <div className="text-white">
            <div className="text-xs font-bold flex items-center gap-1">
              <PlanIcon className="w-3 h-3 text-yellow-400" />
              {planInfo.name}
            </div>
          </div>
        </div>
      </div>

      {/* Upgrade Button */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={handleUpgrade}
              size="sm"
              className="bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 hover:from-orange-600 hover:via-orange-700 hover:to-orange-800 text-white rounded-full px-4 py-2 h-10 text-sm font-bold transition-all duration-300 shadow-lg hover:shadow-orange-500/40 transform hover:scale-105 animate-pulse hover:animate-none border-2 border-orange-400"
            >
              <Crown className="w-4 h-4 mr-2 text-yellow-300" />
              <span className="hidden sm:inline">
                {subscribed ? 'Gerenciar' : 'Upgrade'}
              </span>
              <span className="sm:hidden">
                {subscribed ? 'Plano' : 'Up'}
              </span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{subscribed ? 'Gerenciar assinatura' : 'Fazer upgrade do plano'}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* Logout Button */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={handleSignOut}
              size="sm"
              className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 hover:from-red-700 hover:via-red-800 hover:to-red-900 text-white rounded-full px-3 py-2 h-10 text-sm font-medium transition-all duration-300 shadow-lg hover:shadow-red-500/40 transform hover:scale-105 border-2 border-red-500 hover:opacity-90"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Sair da conta</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
