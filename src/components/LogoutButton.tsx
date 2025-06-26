
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export function LogoutButton() {
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/auth');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={handleSignOut}
            variant="ghost"
            size="sm"
            className="
              w-12 h-12 
              rounded-xl
              text-gray-500 hover:text-gray-700
              hover:bg-gray-100
              transition-all duration-200
              transform hover:scale-105
              shadow-sm hover:shadow-md
              border border-gray-200/50 hover:border-gray-300
            "
          >
            <LogOut className="w-5 h-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-sm">Sair da conta</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
