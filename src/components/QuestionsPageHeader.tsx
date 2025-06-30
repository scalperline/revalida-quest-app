
import { FileText } from 'lucide-react';

export function QuestionsPageHeader() {
  return (
    <div className="text-center mb-8 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-4 right-1/4 w-6 h-6 bg-blue-400 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute bottom-4 left-1/4 w-4 h-4 bg-purple-400 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 right-8 w-5 h-5 bg-yellow-400 rounded-full opacity-20 animate-ping"></div>
      </div>

      <div className="relative z-10">
        {/* Main Title */}
        <div className="mb-6">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-lg">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Banco de Questões
            </h1>
          </div>
          
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Pratique com questões oficiais do Revalida organizadas por ano e tipo de prova. 
            Desenvolva suas habilidades e monitore seu progresso! 📚
          </p>
        </div>
      </div>
    </div>
  );
}
