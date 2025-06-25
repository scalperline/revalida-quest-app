
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
      console.log('Carregando progresso do usuário:', user.id);
      
      const { data: profile, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Erro ao carregar progresso:', error);
        return;
      }

      if (profile) {
        console.log('Perfil carregado:', profile);
        
        // Merge achievements from database with default achievements
        const savedAchievements = profile.achievements ? 
          (profile.achievements as any[]).map(ach => ({
            ...ach,
            unlockedAt: ach.unlockedAt ? new Date(ach.unlockedAt) : undefined
          })) : [];

        // Merge with default achievements to ensure all achievements are present
        const allAchievements = ACHIEVEMENTS.map(defaultAch => {
          const savedAch = savedAchievements.find(saved => saved.id === defaultAch.id);
          return savedAch || defaultAch;
        });

        // Type-safe area stats parsing
        const areaStats = profile.area_stats && typeof profile.area_stats === 'object' && !Array.isArray(profile.area_stats)
          ? profile.area_stats as Record<string, { correct: number; total: number }>
          : {};

        const progressData = {
          level: profile.level || 1,
          xp: profile.total_xp || 0,
          xpToNextLevel: (profile.level || 1) * 100,
          totalQuestions: profile.total_questions || 0,
          correctAnswers: profile.correct_answers || 0,
          simuladosCompletos: profile.simulados_completos || 0,
          streakDias: profile.streak_dias || 0,
          lastActivityDate: profile.last_activity_date ? new Date(profile.last_activity_date) : undefined,
          achievements: allAchievements,
          newlyUnlockedAchievements: [],
          quests: [],
          medicalCards: [],
          areaStats
        };

        console.log('Definindo progresso:', progressData);
        setUserProgress(progressData);
      } else {
        console.log('Nenhum perfil encontrado, criando novo');
        // Create new profile if none exists
        await createUserProfile();
      }
    } catch (error) {
      console.error('Erro ao carregar progresso:', error);
      toast({
        title: "Erro ao carregar progresso",
        description: "Não foi possível carregar seus dados. Usando dados locais.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createUserProfile = async () => {
    if (!user) return;

    try {
      console.log('Criando novo perfil para usuário:', user.id);
      
      const { error } = await supabase
        .from('user_profiles')
        .insert({
          user_id: user.id,
          level: 1,
          total_xp: 0,
          weekly_xp: 0,
          total_questions: 0,
          correct_answers: 0,
          simulados_completos: 0,
          streak_dias: 0,
          last_activity_date: new Date().toISOString(),
          achievements: [],
          area_stats: {},
        });

      if (error) {
        console.error('Erro ao criar perfil:', error);
      } else {
        console.log('Perfil criado com sucesso');
      }
    } catch (error) {
      console.error('Erro ao criar perfil:', error);
    }
  };

  const saveUserProgress = async (progress: UserProgress) => {
    if (!user) {
      console.log('Nenhum usuário logado, não salvando progresso');
      return;
    }

    try {
      console.log('Salvando progresso do usuário:', progress);

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

      const dataToSave = {
        user_id: user.id,
        level: progress.level,
        total_xp: progress.xp,
        weekly_xp: progress.xp, // For now, we'll use total_xp as weekly_xp
        total_questions: progress.totalQuestions,
        correct_answers: progress.correctAnswers,
        simulados_completos: progress.simuladosCompletos,
        streak_dias: progress.streakDias,
        last_activity_date: progress.lastActivityDate?.toISOString() || new Date().toISOString(),
        achievements: achievementsJson as any,
        area_stats: progress.areaStats as any,
        updated_at: new Date().toISOString()
      };

      console.log('Dados a serem salvos:', dataToSave);

      const { error } = await supabase
        .from('user_profiles')
        .upsert(dataToSave);

      if (error) {
        console.error('Erro ao salvar progresso:', error);
        toast({
          title: "Erro ao salvar progresso",
          description: "Não foi possível salvar seu progresso. Tente novamente.",
          variant: "destructive",
        });
      } else {
        console.log('Progresso salvo com sucesso');
      }
    } catch (error) {
      console.error('Erro ao salvar progresso:', error);
      toast({
        title: "Erro ao salvar progresso",
        description: "Ocorreu um erro inesperado ao salvar.",
        variant: "destructive",
      });
    }
  };

  const addXP = (points: number) => {
    console.log('Adicionando XP:', points);
    
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

      console.log('Progresso atualizado com XP:', updated);
      
      // Save immediately after updating
      saveUserProgress(updated);
      return updated;
    });
  };

  const answerQuestion = async (correct: boolean, area?: string, questionId?: number) => {
    if (!user) {
      console.log('Nenhum usuário logado, não salvando resposta');
      return;
    }

    console.log('Respondendo questão:', { correct, area, questionId });

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
        console.error('Erro ao salvar resposta:', error);
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

      console.log('Progresso atualizado após resposta:', updated);
      
      // Save immediately after updating
      saveUserProgress(updated);
      return updated;
    });

    // Add XP
    addXP(correct ? 10 : 5);
  };

  const completeSimulado = (score: number, total: number) => {
    console.log('Completando simulado:', { score, total });
    
    setUserProgress(prev => {
      const updated = {
        ...prev,
        simuladosCompletos: prev.simuladosCompletos + 1
      };
      
      console.log('Progresso atualizado após simulado:', updated);
      
      // Save immediately after updating
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
