
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { StatsCards } from '@/components/StatsCards';
import { GamifiedMissionsDashboard } from '@/components/GamifiedMissionsDashboard';
import { QuickChallenge } from '@/components/QuickChallenge';
import { RecentAchievements } from '@/components/RecentAchievements';
import { AdaptiveSuggestions } from '@/components/AdaptiveSuggestions';

export default function Index() {
  const navigate = useNavigate();

  const handleQuickChallengeStart = () => {
    navigate('/questions');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-20 pb-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
              Dashboard do Revalida
            </span>
          </h1>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            Acompanhe seu progresso, complete missões e conquiste sua aprovação no Revalida
          </p>
        </div>
        
        {/* Stats Cards */}
        <StatsCards />
        
        {/* Gamified Missions Dashboard */}
        <GamifiedMissionsDashboard />
        
        {/* Quick Challenge and Recent Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <QuickChallenge onStart={handleQuickChallengeStart} />
          <div className="lg:col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RecentAchievements />
            <AdaptiveSuggestions />
          </div>
        </div>
      </div>
    </div>
  );
}
