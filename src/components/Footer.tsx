import { Link } from 'react-router-dom';
import { Facebook, Instagram, MessageCircle } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 pt-9 pb-7">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Column 1: Logo & Mission */}
          <div>
            <h3 className="text-2xl font-bold mb-4">PETHOFAR</h3>
            <p className="text-sm text-primary-foreground/80">
              Platform informasi tanaman herbal Indonesia. Menyediakan panduan lengkap tentang tanaman obat, 
              cara budidaya, dan manfaat kesehatan dari alam.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Tautan Cepat</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm hover:text-secondary transition-smooth">
                  Beranda
                </Link>
              </li>
              <li>
                <Link to="/plants" className="text-sm hover:text-secondary transition-smooth">
                  Tanaman
                </Link>
              </li>
              <li>
                <Link to="/cultivation" className="text-sm hover:text-secondary transition-smooth">
                  Budidaya
                </Link>
              </li>
              <li>
                <Link to="/articles" className="text-sm hover:text-secondary transition-smooth">
                  Artikel
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm hover:text-secondary transition-smooth">
                  Kontak
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Social */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Hubungi Kami</h4>
            <div className="space-y-2 text-sm text-primary-foreground/80 mb-4">
              <p>Email: info@pethofar.com</p>
              <p>Phone: +62 812-3456-7890</p>
              <p>Alamat: Medan, Indonesia</p>
            </div>
            <div className="flex space-x-4">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-secondary transition-smooth"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-secondary transition-smooth"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="https://wa.me/6281234567890" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-secondary transition-smooth"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-primary-foreground/20 pt-6 text-center text-sm text-primary-foreground/60">
          <p>© {currentYear} PETHOFAR. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
