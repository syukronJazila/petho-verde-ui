import { Link } from 'react-router-dom';
import { Facebook, Instagram, MessageCircle } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
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
              <p>Alamat: Jakarta, Indonesia</p>
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

        {/* Newsletter Form */}
        <div className="border-t border-primary-foreground/20 pt-8 mb-8">
          <div className="max-w-md mx-auto text-center">
            <h4 className="text-lg font-semibold mb-2">Newsletter</h4>
            <p className="text-sm text-primary-foreground/80 mb-4">
              Dapatkan update artikel dan tips terbaru langsung ke email Anda
            </p>
            {/* PHP-ready form */}
            <form action="/submit.php" method="POST" className="flex gap-2">
              <input
                type="email"
                name="email"
                placeholder="Email Anda"
                required
                className="flex-1 px-4 py-2 rounded-lg bg-card text-card-foreground focus:outline-none focus:ring-2 focus:ring-secondary"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-smooth font-medium"
              >
                Subscribe
              </button>
            </form>
            {/* PHP will handle this later */}
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
