import { Link } from 'react-router-dom';
import { Search, Calendar, Tag, TrendingUp } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import gingerImage from '@/assets/plant-ginger.jpg';
import turmericImage from '@/assets/plant-turmeric.jpg';
import lavenderImage from '@/assets/plant-lavender.jpg';
import aloeImage from '@/assets/plant-aloe.jpg';
import mintImage from '@/assets/plant-mint.jpg';

const Articles = () => {
  const featuredArticle = {
    id: 1,
    title: '10 Tanaman Herbal untuk Meningkatkan Imunitas',
    excerpt: 'Di tengah pandemi global, meningkatkan sistem kekebalan tubuh menjadi prioritas. Tanaman herbal berikut telah terbukti secara ilmiah dapat membantu meningkatkan imunitas tubuh Anda secara alami.',
    image: gingerImage,
    date: '2025-10-01',
    author: 'Dr. Siti Rahayu',
    category: 'Kesehatan',
    readTime: '5 menit',
  };

  const articles = [
    { id: 2, title: 'Cara Budidaya Jahe di Rumah untuk Pemula', excerpt: 'Panduan lengkap menanam jahe dalam pot dengan hasil melimpah...', image: turmericImage, date: '2025-09-28', category: 'Budidaya', readTime: '7 menit' },
    { id: 3, title: 'Manfaat Lavender untuk Kesehatan Mental', excerpt: 'Temukan bagaimana lavender dapat membantu mengurangi stres dan kecemasan...', image: lavenderImage, date: '2025-09-25', category: 'Kesehatan', readTime: '6 menit' },
    { id: 4, title: 'Resep Jamu Tradisional dengan Kunyit', excerpt: 'Kumpulan resep jamu tradisional yang mudah dibuat di rumah...', image: turmericImage, date: '2025-09-20', category: 'Resep', readTime: '4 menit' },
    { id: 5, title: 'Perawatan Lidah Buaya untuk Hasil Maksimal', excerpt: 'Tips merawat tanaman lidah buaya agar tumbuh subur dan sehat...', image: aloeImage, date: '2025-09-15', category: 'Perawatan', readTime: '5 menit' },
    { id: 6, title: 'Mint: Dari Kebun ke Dapur', excerpt: 'Cara menanam, merawat, dan menggunakan mint dalam kuliner sehari-hari...', image: mintImage, date: '2025-09-10', category: 'Kuliner', readTime: '8 menit' },
  ];

  const popularArticles = articles.slice(0, 5);

  const tags = ['Kesehatan', 'Budidaya', 'Resep', 'Perawatan', 'Aromaterapi', 'Kuliner', 'Organik'];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-muted py-4">
        <div className="container mx-auto px-4">
          <div className="text-sm text-muted-foreground">
            <Link to="/" className="hover:text-secondary">Beranda</Link> / <span className="text-foreground">Artikel</span>
          </div>
        </div>
      </div>

      <div className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">Artikel & Tips</h1>
            <p className="text-xl text-muted-foreground">Baca panduan lengkap tentang tanaman herbal dan kesehatan alami</p>
          </div>

          {/* Featured Article */}
          <Link 
            to={`/articles/detail/${featuredArticle.id}`}
            className="block bg-card rounded-lg overflow-hidden shadow-green-md hover:shadow-green-lg transition-smooth mb-12 group"
          >
            <div className="grid md:grid-cols-2 gap-0">
              <div className="h-80 overflow-hidden">
                <img 
                  src={featuredArticle.image} 
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-smooth"
                />
              </div>
              <div className="p-8 flex flex-col justify-center">
                <span className="inline-block bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm font-medium w-fit mb-4">
                  Featured
                </span>
                <h2 className="text-3xl font-bold mb-4 group-hover:text-secondary transition-smooth">
                  {featuredArticle.title}
                </h2>
                <p className="text-card-foreground/80 mb-4 line-clamp-3">{featuredArticle.excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {featuredArticle.date}
                  </span>
                  <span>•</span>
                  <span>{featuredArticle.readTime}</span>
                  <span>•</span>
                  <span>{featuredArticle.author}</span>
                </div>
              </div>
            </div>
          </Link>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="grid md:grid-cols-2 gap-6">
                {articles.map((article) => (
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
                      <span className="inline-block bg-secondary/20 text-secondary px-2 py-1 rounded text-xs font-medium mb-2">
                        {article.category}
                      </span>
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-secondary transition-smooth line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-card-foreground/80 text-sm mb-4 line-clamp-2">{article.excerpt}</p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {article.date}
                        </span>
                        <span>•</span>
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center gap-2 mt-8">
                <button className="px-4 py-2 rounded-lg border border-input hover:bg-muted transition-smooth">
                  Sebelumnya
                </button>
                <button className="px-4 py-2 rounded-lg bg-secondary text-secondary-foreground">1</button>
                <button className="px-4 py-2 rounded-lg border border-input hover:bg-muted transition-smooth">2</button>
                <button className="px-4 py-2 rounded-lg border border-input hover:bg-muted transition-smooth">3</button>
                <button className="px-4 py-2 rounded-lg border border-input hover:bg-muted transition-smooth">
                  Selanjutnya
                </button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Search - PHP ready */}
              <form action="/search.php" method="GET" className="mb-6">
                <div className="relative">
                  <input
                    type="text"
                    name="q"
                    placeholder="Cari artikel..."
                    className="w-full px-4 py-3 pr-12 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-secondary"
                  />
                  <button 
                    type="submit"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-secondary"
                  >
                    <Search className="h-5 w-5" />
                  </button>
                </div>
              </form>

              {/* Tags */}
              <div className="bg-card rounded-lg p-6 shadow-green mb-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Tag className="h-5 w-5 text-secondary" />
                  Kategori
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <a
                      key={tag}
                      href={`/articles?category=${tag.toLowerCase()}`}
                      className="px-3 py-1 bg-muted hover:bg-secondary hover:text-secondary-foreground rounded-full text-sm transition-smooth"
                    >
                      {tag}
                    </a>
                  ))}
                </div>
              </div>

              {/* Popular Articles */}
              <div className="bg-card rounded-lg p-6 shadow-green">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-secondary" />
                  Artikel Populer
                </h3>
                <div className="space-y-4">
                  {popularArticles.map((article, idx) => (
                    <Link
                      key={article.id}
                      to={`/articles/detail/${article.id}`}
                      className="flex gap-3 hover:bg-muted p-2 rounded-lg transition-smooth"
                    >
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center font-semibold text-sm">
                        {idx + 1}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm line-clamp-2 hover:text-secondary transition-smooth">
                          {article.title}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-1">{article.date}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Articles;
