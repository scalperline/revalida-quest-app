
import React from 'react';

export function ParticleField() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Medical floating particles - cells and molecules */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={`particle-${i}`}
          className="absolute rounded-full opacity-60"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${2 + Math.random() * 4}px`,
            height: `${2 + Math.random() * 4}px`,
            background: `linear-gradient(45deg, ${
              Math.random() > 0.5 ? '#3B82F6' : '#1976D2'
            }, transparent)`,
            animation: `float ${8 + Math.random() * 12}s infinite linear`,
            animationDelay: `${Math.random() * 10}s`,
          }}
        />
      ))}
      
      {/* Larger medical drops and cells */}
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={`orb-${i}`}
          className="absolute rounded-full blur-sm opacity-30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${6 + Math.random() * 8}px`,
            height: `${6 + Math.random() * 8}px`,
            background: `radial-gradient(circle, ${
              Math.random() > 0.5 ? '#1976D2' : '#0D47A1'
            } 0%, transparent 70%)`,
            animation: `drift ${15 + Math.random() * 10}s infinite ease-in-out`,
            animationDelay: `${Math.random() * 8}s`,
          }}
        />
      ))}
    </div>
  );
}
