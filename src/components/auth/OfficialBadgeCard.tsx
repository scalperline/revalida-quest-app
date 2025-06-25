
import { ReactNode } from 'react';

interface OfficialBadgeCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  badge: {
    icon: ReactNode;
    text: string;
    color: string;
  };
  gradient: string;
}

export function OfficialBadgeCard({ icon, title, description, badge, gradient }: OfficialBadgeCardProps) {
  return (
    <div className="group flex items-center gap-4 p-5 bg-white/80 dark:bg-gray-800/80 rounded-2xl backdrop-blur-sm hover:bg-white/90 dark:hover:bg-gray-800/90 transition-all duration-300 hover:scale-102 border border-blue-200 dark:border-blue-800">
      <div className={`w-12 h-12 bg-gradient-to-r ${gradient} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <div className="flex-1">
        <h3 className="font-bold text-gray-800 dark:text-gray-200 text-lg">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm">{description}</p>
      </div>
      <div className="flex items-center gap-1">
        {badge.icon}
        {badge.text && <span className={`text-xs ${badge.color} font-semibold`}>{badge.text}</span>}
      </div>
    </div>
  );
}
