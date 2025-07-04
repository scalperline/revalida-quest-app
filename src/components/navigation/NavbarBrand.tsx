import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

export function NavbarBrand() {
  return (
    <Link 
      to="/" 
      className="flex items-center space-x-2 text-xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
    >
      <BookOpen className="w-8 h-8" />
      <span className="hidden sm:block">MedPrep</span>
    </Link>
  );
}