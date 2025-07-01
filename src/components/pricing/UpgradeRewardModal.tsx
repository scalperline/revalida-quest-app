
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trophy, Star, Zap, Gift, Sparkles, Crown } from 'lucide-react';

interface UpgradeRewardModalProps {
  isOpen: boolean;
  onClose: () => void;
  planName: string;
  rewards: {
    xp: number;
    badges: string[];
    exclusiveAccess: string[];
  };
  onConfirm: () => void;
}

export function UpgradeRewardModal({ 
  isOpen, 
  onClose, 
  planName, 
  rewards, 
  onConfirm 
}: UpgradeRewardModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-200">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            🎉 Parabéns, Doutor!
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center animate-pulse">
              <Crown className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Você está prestes a desbloquear o plano {planName}!
            </h3>
          </div>

          <div className="space-y-4">
            <div className="bg-white/70 rounded-xl p-4 border-2 border-yellow-200">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-5 h-5 text-yellow-500 animate-bounce" />
                <span className="font-semibold text-gray-800">Bônus XP Instantâneo</span>
              </div>
              <p className="text-2xl font-bold text-yellow-600">+{rewards.xp} XP</p>
            </div>

            <div className="bg-white/70 rounded-xl p-4 border-2 border-purple-200">
              <div className="flex items-center gap-2 mb-2">
                <Trophy className="w-5 h-5 text-purple-500 animate-pulse" />
                <span className="font-semibold text-gray-800">Badges Exclusivas</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {rewards.badges.map((badge, index) => (
                  <Badge key={index} className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs">
                    {badge}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="bg-white/70 rounded-xl p-4 border-2 border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-5 h-5 text-blue-500 animate-spin" />
                <span className="font-semibold text-gray-800">Acesso Exclusivo</span>
              </div>
              <ul className="text-sm text-gray-700 space-y-1">
                {rewards.exclusiveAccess.map((access, index) => (
                  <li key={index} className="flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-blue-500" />
                    {access}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-3">
            <Button 
              onClick={onConfirm}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 text-lg font-semibold"
            >
              <Gift className="w-5 h-5 mr-2" />
              Resgatar Recompensas & Assinar
            </Button>
            <Button 
              onClick={onClose}
              variant="outline" 
              className="w-full"
            >
              Cancelar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
