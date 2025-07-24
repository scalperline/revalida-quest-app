
export function ChallengeBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-2xl md:rounded-3xl">
      <div className="absolute -top-2 -right-2 md:-top-4 md:-right-4 w-20 h-20 md:w-32 md:h-32 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-15 animate-pulse blur-xl"></div>
      <div className="absolute -bottom-2 -left-2 md:-bottom-4 md:-left-4 w-16 h-16 md:w-24 md:h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-20 animate-bounce blur-lg"></div>
    </div>
  );
}
