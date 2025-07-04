import { UserProfile } from '@/components/UserProfile';
import { UpgradeButton } from '@/components/UpgradeButton';
import { MobileUpgradeButton } from '@/components/MobileUpgradeButton';
import { MobileHamburgerButton } from '@/components/MobileHamburgerButton';
import { useAuth } from '@/hooks/useAuth';

interface NavbarActionsProps {
  isMobileMenuOpen: boolean;
  onMobileMenuToggle: () => void;
}

export function NavbarActions({ isMobileMenuOpen, onMobileMenuToggle }: NavbarActionsProps) {
  const { user } = useAuth();

  return (
    <div className="flex items-center space-x-2">
      {user && (
        <>
          <div className="hidden sm:block">
            <UpgradeButton />
          </div>
          <div className="sm:hidden">
            <MobileUpgradeButton />
          </div>
        </>
      )}
      
      <div className="hidden md:block">
        <UserProfile />
      </div>
      
      <div className="md:hidden">
        <MobileHamburgerButton 
          isOpen={isMobileMenuOpen}
          onClick={onMobileMenuToggle}
        />
      </div>
    </div>
  );
}