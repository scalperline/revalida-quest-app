
import React from 'react';

export function StarField() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Medical cross symbols */}
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={`cross-${i}`}
          className="absolute animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 2}s`,
          }}
        >
          <div className="w-1 h-1 bg-blue-300 rounded-full shadow-lg shadow-blue-300/50"></div>
        </div>
      ))}
      
      {/* Heartbeat dots */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={`heart-${i}`}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `heartbeat ${1 + Math.random() * 2}s infinite`,
            animationDelay: `${Math.random() * 4}s`,
          }}
        >
          <div className="w-0.5 h-0.5 bg-blue-400 rounded-full shadow-md shadow-blue-400/50"></div>
        </div>
      ))}
      
      {/* Small medical elements */}
      {Array.from({ length: 60 }).map((_, i) => (
        <div
          key={`medical-${i}`}
          className="absolute opacity-70"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `medicalPulse ${2 + Math.random() * 3}s infinite`,
            animationDelay: `${Math.random() * 4}s`,
          }}
        >
          <div className="w-px h-px bg-blue-200 rounded-full"></div>
        </div>
      ))}
    </div>
  );
}
