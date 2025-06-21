
import { useEffect, useState } from "react";

interface Props {
  running: boolean;
  onFinish: () => void;
  initialMinutes?: number;
}

export function SimuladoTimer({ running, onFinish, initialMinutes = 120 }: Props) {
  const [seconds, setSeconds] = useState(initialMinutes * 60);

  useEffect(() => {
    if (!running) return;
    if (seconds === 0) {
      onFinish();
      return;
    }
    const t = setTimeout(() => setSeconds(s => s - 1), 1000);
    return () => clearTimeout(t);
  }, [running, seconds, onFinish]);

  const hours = Math.floor(seconds / 3600);
  const min = Math.floor((seconds % 3600) / 60);
  const sec = seconds % 60;

  const formatTime = () => {
    if (hours > 0) {
      return `${hours}:${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
    }
    return `${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <div className="text-center font-mono text-lg text-primary">
      ⏱️ Tempo restante: {formatTime()}
    </div>
  );
}
