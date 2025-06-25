
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { UserProgress } from '@/types/gamification';
import { initializeUserProgress } from '@/utils/gamificationHelpers';

export function useGamificationSupabase() {
  const { user } = useAuth();
  const [userProgress, setUserProgress] = useState<UserProgress>(() => 
    initializeUserProgress()
  );
  const [loading, setLoading] = useState(true);

  // Carregar progresso do usuário do Supabase
  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const loadUserProgress = async () => {
      try {
        const { data: profile, error } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (error && error.code !== 'PGRST116') {
          console.error('Erro ao carregar perfil:', error);
          setLoading(false);
          return;
        }

        if (profile) {
          const progress: UserProgress = {
            level: profile.level,
            xp: profile.total_xp,
            xpToNextLevel: profile.level * 100,
            totalQuestions: profile.total_questions,
            correctAnswers: profile.correct_answers,
            simuladosCompletos: profile.simulados_completos,
            streakDias: profile.streak_dias,
            lastActivityDate: profile.last_activity_date ? new Date(profile.last_activity_date) : undefined,
            achievements: profile.achievements || [],
            newlyUnlockedAchievements: [],
            quests: [],
            medicalCards: [],
            areaStats: profile.area_stats || {}
          };

          setUserProgress(progress);
        }
      } catch (error) {
        console.error('Erro ao carregar progresso:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUserProgress();
  }, [user]);

  // Salvar progresso no Supabase quando alterado
  const updateProgress = async (newProgress: UserProgress) => {
    if (!user) return;

    setUserProgress(newProgress);

    try {
      const { error } = await supabase
        .from('user_profiles')
        .update({
          level: newProgress.level,
          total_xp: newProgress.xp,
          total_questions: newProgress.totalQuestions,
          correct_answers: newProgress.correctAnswers,
          simulados_completos: newProgress.simuladosCompletos,
          streak_dias: newProgress.streakDias,
          last_activity_date: newProgress.lastActivityDate?.toISOString(),
          achievements: newProgress.achievements,
          area_stats: newProgress.areaStats,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id);

      if (error) {
        console.error('Erro ao salvar progresso:', error);
      }
    } catch (error) {
      console.error('Erro ao atualizar progresso:', error);
    }
  };

  // Salvar resposta de questão
  const saveQuestionAnswer = async (questionId: number, userAnswer: string, isCorrect: boolean) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('user_question_answers')
        .upsert({
          user_id: user.id,
          question_id: questionId,
          user_answer: userAnswer,
          is_correct: isCorrect,
          answered_at: new Date().toISOString()
        });

      if (error) {
        console.error('Erro ao salvar resposta:', error);
      }
    } catch (error) {
      console.error('Erro ao salvar resposta da questão:', error);
    }
  };

  // Buscar resposta anterior do usuário para uma questão
  const getUserAnswer = async (questionId: number): Promise<string | null> => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('user_question_answers')
        .select('user_answer')
        .eq('user_id', user.id)
        .eq('question_id', questionId)
        .maybeSingle();

      if (error) {
        console.error('Erro ao buscar resposta:', error);
        return null;
      }

      return data?.user_answer || null;
    } catch (error) {
      console.error('Erro ao buscar resposta da questão:', error);
      return null;
    }
  };

  return {
    userProgress,
    updateProgress,
    saveQuestionAnswer,
    getUserAnswer,
    loading
  };
}
