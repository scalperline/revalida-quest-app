
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { UserProgress } from '@/types/gamification';
import { ACHIEVEMENTS } from '@/data/achievements';
import { useToast } from '@/hooks/use-toast';

export function useGamificationSupabase() {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [userProgress, setUserProgress] = useState<UserProgress>({
    level: 1,
    xp: 0,
    xpToNextLevel: 100,
    totalQuestions: 0,
    correctAnswers: 0,
    simuladosCompletos: 0,
    streakDias: 0,
    achievements: [...ACHIEVEMENTS],
    newlyUnlockedAchievements: [],
    quests: [],
    medicalCards: [],
    areaStats: {}
  });

  const [loading, setLoading] = useState(true);

  // Load user progress from Supabase
  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    loadUserProgress();
  }, [user]);

  const loadUserProgress = async () => {
    if (!user) return;

    try {
      const { data: profile, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error loading user progress:', error);
        return;
      }

      if (profile) {
        const achievements = profile.achievements ? 
          (profile.achievements as any[]).map(ach => ({
            ...ach,
            unlockedAt: ach.unlockedAt ? new Date(ach.unlockedAt) : undefined
          })) :
          [...ACHIEVEMENTS];

        // Type-safe area stats parsing
        const areaStats = profile.area_stats && typeof profile.area_stats === 'object' && !Array.isArray(profile.area_stats)
          ? profile.area_stats as Record<string, { correct: number; total: number }>
          : {};

        setUserProgress({
          level: profile.level,
          xp: profile.total_xp,
          xpToNextLevel: profile.level * 100,
          totalQuestions: profile.total_questions,
          correctAnswers: profile.correct_answers,
          simuladosCompletos: profile.simulados_completos,
          streakDias: profile.streak_dias,
          lastActivityDate: profile.last_activity_date ? new Date(profile.last_activity_date) : undefined,
          achievements,
          newlyUnlockedAchievements: [],
          quests: [],
          medicalCards: [],
          areaStats
        });
      }
    } catch (error) {
      console.error('Error loading user progress:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveUserProgress = async (progress: UserProgress) => {
    if (!user) return;

    try {
      // Convert achievements to JSON-compatible format
      const achievementsJson = progress.achievements.map(ach => ({
        id: ach.id,
        title: ach.title,
        description: ach.description,
        icon: ach.icon,
        unlocked: ach.unlocked,
        unlockedAt: ach.unlockedAt?.toISOString(),
        category: ach.category,
        area: ach.area
      }));

      const { error } = await supabase
        .from('user_profiles')
        .upsert({
          user_id: user.id,
          level: progress.level,
          total_xp: progress.xp,
          weekly_xp: progress.xp, // For now, we'll use total_xp as weekly_xp
          total_questions: progress.totalQuestions,
          correct_answers: progress.correctAnswers,
          simulados_completos: progress.simuladosCompletos,
          streak_dias: progress.streakDias,
          last_activity_date: progress.lastActivityDate?.toISOString(),
          achievements: achievementsJson as any,
          area_stats: progress.areaStats as any,
          updated_at: new Date().toISOString()
        });

      if (error) {
        console.error('Error saving user progress:', error);
        toast({
          title: "Erro ao salvar progresso",
          description: "Não foi possível salvar seu progresso. Tente novamente.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error saving user progress:', error);
    }
  };

  const addXP = (points: number) => {
    setUserProgress(prev => {
      let newXP = prev.xp + points;
      let newLevel = prev.level;
      let newXPToNext = newLevel * 100;

      while (newXP >= newXPToNext) {
        newXP -= newXPToNext;
        newLevel++;
        newXPToNext = newLevel * 100;
      }

      const updated = {
        ...prev,
        xp: newXP,
        level: newLevel,
        xpToNextLevel: newXPToNext
      };

      saveUserProgress(updated);
      return updated;
    });
  };

  const answerQuestion = async (correct: boolean, area?: string, questionId?: number) => {
    if (!user) return;

    // Save the answer to database
    if (questionId) {
      try {
        await supabase
          .from('user_question_answers')
          .upsert({
            user_id: user.id,
            question_id: questionId,
            user_answer: correct ? 'correct' : 'incorrect',
            is_correct: correct,
            answered_at: new Date().toISOString()
          });
      } catch (error) {
        console.error('Error saving answer:', error);
      }
    }

    setUserProgress(prev => {
      const today = new Date();
      const todayStr = today.toDateString();
      const lastActivity = prev.lastActivityDate;
      const lastActivityStr = lastActivity?.toDateString();
      
      let newStreak = 1;
      if (lastActivity && lastActivityStr !== todayStr) {
        const diffTime = today.getTime() - lastActivity.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) {
          newStreak = prev.streakDias + 1;
        }
      } else if (lastActivityStr === todayStr) {
        newStreak = prev.streakDias;
      }

      // Update area stats
      const areaStats = { ...prev.areaStats };
      if (area) {
        if (!areaStats[area]) {
          areaStats[area] = { correct: 0, total: 0 };
        }
        areaStats[area].total += 1;
        if (correct) {
          areaStats[area].correct += 1;
        }
      }

      const updated = {
        ...prev,
        totalQuestions: prev.totalQuestions + 1,
        correctAnswers: correct ? prev.correctAnswers + 1 : prev.correctAnswers,
        streakDias: newStreak,
        lastActivityDate: today,
        areaStats
      };

      saveUserProgress(updated);
      return updated;
    });

    // Add XP
    addXP(correct ? 10 : 5);
  };

  const completeSimulado = (score: number, total: number) => {
    setUserProgress(prev => {
      const updated = {
        ...prev,
        simuladosCompletos: prev.simuladosCompletos + 1
      };
      
      saveUserProgress(updated);
      return updated;
    });

    const percentage = score / total;
    const bonusXP = Math.floor(percentage * 50) + 25;
    addXP(bonusXP);
  };

  const resetStats = () => {
    setUserProgress(prev => {
      const updated = {
        ...prev,
        totalQuestions: 0,
        correctAnswers: 0,
        simuladosCompletos: 0,
        areaStats: {},
      };
      
      saveUserProgress(updated);
      return updated;
    });
  };

  const getAccuracy = () => {
    if (userProgress.totalQuestions === 0) return 0;
    return Math.round((userProgress.correctAnswers / userProgress.totalQuestions) * 100);
  };

  const getProgressPercentage = () => {
    return Math.round((userProgress.xp / userProgress.xpToNextLevel) * 100);
  };

  return {
    userProgress,
    loading,
    addXP,
    answerQuestion,
    completeSimulado,
    resetStats,
    getAccuracy,
    getProgressPercentage,
    refreshProgress: loadUserProgress
  };
}
