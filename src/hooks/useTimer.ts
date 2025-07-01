
import { useState, useEffect, useCallback } from 'react';

export function useTimer(initialTime: number = 600) { // 10 minutos em segundos
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const start = useCallback(() => {
    setIsRunning(true);
    setIsFinished(false);
  }, []);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const reset = useCallback(() => {
    setTimeLeft(initialTime);
    setIsRunning(false);
    setIsFinished(false);
  }, [initialTime]);

  const stop = useCallback(() => {
    setIsRunning(false);
    setIsFinished(true);
  }, []);

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setIsRunning(false);
          setIsFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const percentage = ((initialTime - timeLeft) / initialTime) * 100;

  return {
    timeLeft,
    minutes,
    seconds,
    percentage,
    isRunning,
    isFinished,
    start,
    pause,
    reset,
    stop
  };
}
