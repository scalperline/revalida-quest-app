
import { UserProfile } from '@/components/UserProfile';

export default function Profile() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Meu Perfil</h1>
        <UserProfile />
      </div>
    </div>
  );
}
