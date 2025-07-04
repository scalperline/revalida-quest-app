import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface NavItem {
  to: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface NavbarLinksProps {
  items: NavItem[];
  className?: string;
}

export function NavbarLinks({ items, className = '' }: NavbarLinksProps) {
  const location = useLocation();

  const isActivePath = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className={`hidden md:flex items-center space-x-1 ${className}`}>
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = isActivePath(item.to);
        
        return (
          <Button
            key={item.to}
            asChild
            variant={isActive ? "default" : "ghost"}
            size="sm"
            className={isActive ? "bg-blue-100 text-blue-700 hover:bg-blue-200" : ""}
          >
            <Link to={item.to} className="flex items-center gap-2">
              {Icon && <Icon className="w-4 h-4" />}
              {item.label}
            </Link>
          </Button>
        );
      })}
    </nav>
  );
}