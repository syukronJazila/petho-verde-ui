import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPlantsDropdownOpen, setIsPlantsDropdownOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-primary shadow-green-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-primary-foreground hover:text-secondary transition-smooth font-nicomoji">
            PETHOFAR
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-primary-foreground hover:text-secondary transition-smooth ${
                isActive('/') ? 'text-secondary font-semibold' : ''
              }`}
            >
              Beranda
            </Link>

            {/* Plants Link */}
            <Link 
              to="/plants" 
               className={`text-primary-foreground hover:text-secondary transition-smooth ${
                isActive('/plants') ? 'text-secondary font-semibold' : ''
              }`}
            >
              Tanaman
            </Link>

            <Link
              to="/cultivation"
              className={`text-primary-foreground hover:text-secondary transition-smooth ${
                isActive('/cultivation') ? 'text-secondary font-semibold' : ''
              }`}
            >
              Budidaya
            </Link>

            <Link
              to="/articles"
              className={`text-primary-foreground hover:text-secondary transition-smooth ${
                isActive('/articles') ? 'text-secondary font-semibold' : ''
              }`}
            >
              Artikel
            </Link>

            <Link
              to="/contact"
              className={`text-primary-foreground hover:text-secondary transition-smooth ${
                isActive('/contact') ? 'text-secondary font-semibold' : ''
              }`}
            >
              Kontak
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-primary-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 bg-primary">
            <Link
              to="/"
              className="block py-2 text-primary-foreground hover:text-secondary transition-smooth"
              onClick={() => setIsMenuOpen(false)}
            >
              Beranda
            </Link>
            <Link
              to="/plants"
              className="block py-2 text-primary-foreground hover:text-secondary transition-smooth"
              onClick={() => setIsMenuOpen(false)}
            >
              Tanaman
            </Link>
            <Link
              to="/cultivation"
              className="block py-2 text-primary-foreground hover:text-secondary transition-smooth"
              onClick={() => setIsMenuOpen(false)}
            >
              Budidaya
            </Link>
            <Link
              to="/articles"
              className="block py-2 text-primary-foreground hover:text-secondary transition-smooth"
              onClick={() => setIsMenuOpen(false)}
            >
              Artikel
            </Link>
            <Link
              to="/discussions"
              className="block py-2 text-primary-foreground hover:text-secondary transition-smooth"
              onClick={() => setIsMenuOpen(false)}
            >
              Diskusi
            </Link>
            <Link
              to="/contact"
              className="block py-2 text-primary-foreground hover:text-secondary transition-smooth"
              onClick={() => setIsMenuOpen(false)}
            >
              Kontak
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
