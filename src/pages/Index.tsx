import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Leaf, Users, BookOpen, Calendar, TrendingUp } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PlantCard from '@/components/PlantCard';
import heroImage from '@/assets/hero-bg.jpg';
import aloeImage from '@/assets/plant-aloe.jpg';
import turmericImage from '@/assets/plant-turmeric.jpg';
import gingerImage from '@/assets/plant-ginger.jpg';
import lavenderImage from '@/assets/plant-lavender.jpg';
import mintImage from '@/assets/plant-mint.jpg';
import chamomileImage from '@/assets/plant-chamomile.jpg';
import basilImage from '@/assets/plant-basil.jpg';
import rosemaryImage from '@/assets/plant-rosemary.jpg';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Dummy data for popular plants
  const popularPlants = [
    { id: 1, name: 'Lidah Buaya', latinName: 'Aloe vera', image: aloeImage, badge: 'Populer', benefit: 'Baik untuk kulit, penyembuhan luka, dan kesehatan rambut', rating: 4.8 },
    { id: 2, name: 'Kunyit', latinName: 'Curcuma longa', image: turmericImage, badge: 'Trending', benefit: 'Anti-inflamasi, meningkatkan imunitas, baik untuk pencernaan', rating: 4.7 },
    { id: 3, name: 'Jahe', latinName: 'Zingiber officinale', image: gingerImage, benefit: 'Meredakan mual, anti-inflamasi, meningkatkan metabolisme', rating: 4.6 },
    { id: 4, name: 'Lavender', latinName: 'Lavandula angustifolia', image: lavenderImage, benefit: 'Mengurangi stres, membantu tidur, aromaterapi', rating: 4.5 },
    { id: 5, name: 'Mint', latinName: 'Mentha', image: mintImage, badge: 'Mudah', benefit: 'Menyegarkan, membantu pencernaan, meredakan sakit kepala', rating: 4.7 },
    { id: 6, name: 'Chamomile', latinName: 'Matricaria chamomilla', image: chamomileImage, benefit: 'Menenangkan, membantu tidur, anti-inflamasi', rating: 4.4 },
    { id: 7, name: 'Basil', latinName: 'Ocimum basilicum', image: basilImage, benefit: 'Antioksidan, anti-bakteri, mendukung kesehatan jantung', rating: 4.3 },
    { id: 8, name: 'Rosemary', latinName: 'Rosmarinus officinalis', image: rosemaryImage, benefit: 'Meningkatkan konsentrasi, antioksidan, mendukung kesehatan otak', rating: 4.5 },
  ];

  const recentArticles = [
    { id: 1, title: '10 Tanaman Herbal untuk Meningkatkan Imunitas', excerpt: 'Pelajari tanaman herbal yang dapat membantu meningkatkan sistem kekebalan tubuh Anda...', date: '2025-10-01', image: gingerImage },
    { id: 2, title: 'Cara Budidaya Jahe di Rumah', excerpt: 'Panduan lengkap menanam jahe dalam pot untuk pemula...', date: '2025-09-28', image: turmericImage },
    { id: 3, title: 'Manfaat Lavender untuk Kesehatan Mental', excerpt: 'Temukan bagaimana lavender dapat membantu mengurangi stres dan kecemasan...', date: '2025-09-25', image: lavenderImage },
  ];

  const featuredDiscussions = [
    { id: 1, title: 'Tips Merawat Lidah Buaya agar Subur', replies: 15, lastActivity: '2 jam yang lalu' },
    { id: 2, title: 'Bagaimana Cara Mengatasi Hama pada Mint?', replies: 8, lastActivity: '5 jam yang lalu' },
    { id: 3, title: 'Rekomendasi Tanaman Herbal untuk Pemula', replies: 23, lastActivity: '1 hari yang lalu' },
    { id: 4, title: 'Manfaat Kunyit untuk Kesehatan Sendi', replies: 12, lastActivity: '2 hari yang lalu' },
    { id: 5, title: 'Cara Membuat Teh Chamomile yang Enak', replies: 6, lastActivity: '3 hari yang lalu' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Replace with PHP endpoint
    window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section 
        className="relative h-[600px] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div 
          className="absolute inset-0"
          style={{ background: 'var(--gradient-hero)' }}
        ></div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            WELCOME TO PETHOFAR
          </h1>
          <p className="text-xl text-white/90 mb-8">
            Jelajahi Kekayaan Tanaman Herbal Indonesia
          </p>
          
          {/* Search Bar - PHP ready */}
          <form onSubmit={handleSearch} method="GET" action="/search.php" className="max-w-2xl mx-auto mb-6">
            <div className="flex gap-2">
              <input
                type="text"
                name="q"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari tanaman herbal..."
                className="flex-1 px-6 py-4 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-secondary"
              />
              <button
                type="submit"
                className="px-8 py-4 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-smooth font-semibold flex items-center gap-2"
              >
                <Search className="h-5 w-5" />
                Cari
              </button>
            </div>
          </form>

          <Link 
            to="/plants"
            className="inline-block px-8 py-3 bg-white text-primary rounded-lg hover:bg-white/90 transition-smooth font-semibold"
          >
            Mulai Jelajah
          </Link>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-card p-8 rounded-lg shadow-green hover:shadow-green-md transition-smooth">
              <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mb-4">
                <Leaf className="h-6 w-6 text-secondary-foreground" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Visi Kami</h3>
              <p className="text-card-foreground/80">
                Menjadi platform terpercaya untuk edukasi dan pelestarian tanaman herbal Indonesia, 
                menghubungkan tradisi dengan pengetahuan modern.
              </p>
            </div>

            <div className="bg-card p-8 rounded-lg shadow-green hover:shadow-green-md transition-smooth">
              <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-secondary-foreground" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Misi Kami</h3>
              <p className="text-card-foreground/80">
                Menyediakan informasi lengkap, panduan budidaya praktis, dan membangun komunitas 
                pecinta tanaman herbal di seluruh Indonesia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Plants */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Tanaman Populer</h2>
            <p className="text-xl text-muted-foreground">Tanaman herbal pilihan dengan manfaat luar biasa</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularPlants.map((plant) => (
              <PlantCard key={plant.id} {...plant} />
            ))}
          </div>

          <div className="text-center mt-8">
            <Link 
              to="/plants"
              className="inline-block px-8 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-smooth font-semibold"
            >
              Lihat Semua Tanaman
            </Link>
          </div>
        </div>
      </section>

      {/* Statistics Counter */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold mb-2">200+</div>
              <div className="text-primary-foreground/80">Tanaman</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">150+</div>
              <div className="text-primary-foreground/80">Artikel</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">5K+</div>
              <div className="text-primary-foreground/80">Anggota</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">3+</div>
              <div className="text-primary-foreground/80">Tahun</div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Articles */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Artikel Terbaru</h2>
            <p className="text-xl text-muted-foreground">Baca tips dan informasi terkini seputar tanaman herbal</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {recentArticles.map((article) => (
              <Link 
                key={article.id} 
                to={`/articles/detail/${article.id}`}
                className="bg-card rounded-lg overflow-hidden shadow-green hover:shadow-green-md transition-smooth group"
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-smooth"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Calendar className="h-4 w-4" />
                    {article.date}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-secondary transition-smooth">
                    {article.title}
                  </h3>
                  <p className="text-card-foreground/80 line-clamp-2">{article.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link 
              to="/articles"
              className="inline-block px-8 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-smooth font-semibold"
            >
              Baca Lebih Banyak
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Discussions */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Diskusi Terpopuler</h2>
              <p className="text-xl text-muted-foreground">Bergabunglah dengan komunitas kami</p>
            </div>

            <div className="bg-card rounded-lg shadow-green p-6">
              {featuredDiscussions.map((discussion, index) => (
                <Link
                  key={discussion.id}
                  to={`/discussions/detail/${discussion.id}`}
                  className={`block py-4 hover:bg-muted/50 transition-smooth rounded-lg px-4 ${
                    index !== featuredDiscussions.length - 1 ? 'border-b border-border' : ''
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg mb-1 hover:text-secondary transition-smooth">
                        {discussion.title}
                      </h4>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{discussion.replies} balasan</span>
                        <span>•</span>
                        <span>{discussion.lastActivity}</span>
                      </div>
                    </div>
                    <TrendingUp className="h-5 w-5 text-secondary" />
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link 
                to="/discussions"
                className="inline-block px-8 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-smooth font-semibold"
              >
                Lihat Semua Diskusi
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Recommendations Carousel */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Rekomendasi untuk Anda</h2>
          <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide">
            {popularPlants.slice(0, 6).map((plant) => (
              <div key={plant.id} className="flex-shrink-0 w-64">
                <PlantCard {...plant} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <BookOpen className="h-16 w-16 mx-auto mb-6 text-secondary" />
            <h2 className="text-4xl font-bold mb-4">Jangan Lewatkan Update Terbaru</h2>
            <p className="text-xl mb-8 text-primary-foreground/90">
              Dapatkan tips budidaya, artikel kesehatan, dan info tanaman herbal langsung ke email Anda
            </p>
            
            {/* PHP-ready form */}
            <form action="/submit.php" method="POST" className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                name="email"
                placeholder="Alamat Email"
                required
                className="flex-1 px-6 py-4 rounded-lg text-primary focus:outline-none focus:ring-2 focus:ring-secondary"
              />
              <button
                type="submit"
                className="px-8 py-4 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-smooth font-semibold"
              >
                Subscribe
              </button>
            </form>
            {/* PHP will handle this later */}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
