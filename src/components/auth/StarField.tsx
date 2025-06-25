
import React from 'react';

export function StarField() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Large stars */}
      {Array.from({ length: 50 }).map((_, i) => (
        <div
          key={`star-${i}`}
          className="absolute animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 2}s`,
          }}
        >
          <div className="w-1 h-1 bg-white rounded-full shadow-lg shadow-white/50"></div>
        </div>
      ))}
      
      {/* Medium stars */}
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={`star-med-${i}`}
          className="absolute animate-ping"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 4}s`,
            animationDuration: `${3 + Math.random() * 3}s`,
          }}
        >
          <div className="w-0.5 h-0.5 bg-blue-300 rounded-full shadow-md shadow-blue-300/50"></div>
        </div>
      ))}
      
      {/* Small twinkling stars */}
      {Array.from({ length: 100 }).map((_, i) => (
        <div
          key={`star-small-${i}`}
          className="absolute opacity-70"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `twinkle ${2 + Math.random() * 3}s infinite`,
            animationDelay: `${Math.random() * 4}s`,
          }}
        >
          <div className="w-px h-px bg-purple-200 rounded-full"></div>
        </div>
      ))}
    </div>
  );
}
