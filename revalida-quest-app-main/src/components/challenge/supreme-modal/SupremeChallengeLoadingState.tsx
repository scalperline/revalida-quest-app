
export function SupremeChallengeLoadingState() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4"></div>
      <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Preparando Desafio Supremo</h3>
      <p className="text-gray-300 text-sm sm:text-base">Carregando questões épicas...</p>
    </div>
  );
}
