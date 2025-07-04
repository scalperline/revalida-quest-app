import { useState, useCallback } from 'react';
import { getCurrentLevel, checkLevelUp, MedicalLevel } from '@/utils/levelUtils';

interface XPNotification {
  id: string;
  amount: number;
  show: boolean;
}

interface LevelUpNotification {
  show: boolean;
  newLevel: MedicalLevel | null;
}

export function useXPAnimation() {
  const [xpNotification, setXpNotification] = useState<XPNotification>({
    id: '',
    amount: 0,
    show: false
  });
  
  const [levelUpNotification, setLevelUpNotification] = useState<LevelUpNotification>({
    show: false,
    newLevel: null
  });

  const showXPGain = useCallback((amount: number, oldXP: number, newXP: number) => {
    // Show floating XP notification
    const id = Date.now().toString();
    setXpNotification({ id, amount, show: true });
    
    // Auto-hide after 1 second
    setTimeout(() => {
      setXpNotification(prev => ({ ...prev, show: false }));
    }, 1000);
    
    // Check for level up
    const newLevel = checkLevelUp(oldXP, newXP);
    if (newLevel) {
      setTimeout(() => {
        setLevelUpNotification({ show: true, newLevel });
      }, 500); // Show level up after XP animation
    }
  }, []);

  const hideLevelUpNotification = useCallback(() => {
    setLevelUpNotification({ show: false, newLevel: null });
  }, []);

  const addXPWithAnimation = useCallback((amount: number, currentXP: number) => {
    const oldXP = currentXP;
    const newXP = currentXP + amount;
    showXPGain(amount, oldXP, newXP);
    return newXP;
  }, [showXPGain]);

  return {
    xpNotification,
    levelUpNotification,
    showXPGain,
    hideLevelUpNotification,
    addXPWithAnimation
  };
}