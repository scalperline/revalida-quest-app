
import { Navbar } from "@/components/Navbar";
import { NavigationButtons } from "@/components/NavigationButtons";
import { UserProfile } from '@/components/UserProfile';

export default function Profile() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {/* Navigation Buttons */}
        <div className="mb-8">
          <NavigationButtons />
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Meu Perfil</h1>
            <p className="text-xl text-muted-foreground">
              Gerencie suas informações e acompanhe seu progresso
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-blue-100 dark:border-gray-700">
            <UserProfile />
          </div>
        </div>
      </div>
    </div>
  );
}
