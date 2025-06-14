
import { useEffect, useState } from "react";

interface Props {
  running: boolean;
  onFinish: () => void;
  initialMinutes?: number;
}

export function SimuladoTimer({ running, onFinish, initialMinutes = 20 }: Props) {
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

  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;

  return (
    <div className="text-center font-mono text-lg text-primary">
      ⏱️ Tempo restante: {min.toString().padStart(2, "0")}:{sec.toString().padStart(2, "0")}
    </div>
  );
}
