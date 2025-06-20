
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, BookOpen, PlayCircle, BarChart3, User } from 'lucide-react';

export function NavigationButtons() {
  const navigate = useNavigate();
  const location = useLocation();

  const buttons = [
    { path: '/', label: 'Início', icon: Home },
    { path: '/questions', label: 'Questões', icon: BookOpen },
    { path: '/simulado', label: 'Simulados', icon: PlayCircle },
    { path: '/stats', label: 'Desempenho', icon: BarChart3 },
    { path: '/profile', label: 'Perfil', icon: User },
  ];

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 border border-blue-100 dark:border-gray-700 shadow-lg">
      <div className="flex flex-wrap justify-center gap-2">
        {buttons.map(({ path, label, icon: Icon }) => (
          <button
            key={path}
            onClick={() => navigate(path)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              location.pathname === path
                ? 'bg-blue-500 text-white shadow-md transform scale-105'
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-600 hover:scale-105 border border-gray-200 dark:border-gray-600'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span className="hidden sm:inline">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
