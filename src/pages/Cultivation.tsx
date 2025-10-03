import { Link } from 'react-router-dom';
import { Search, Filter, Calendar, TrendingUp } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import aloeImage from '@/assets/plant-aloe.jpg';
import turmericImage from '@/assets/plant-turmeric.jpg';
import gingerImage from '@/assets/plant-ginger.jpg';
import mintImage from '@/assets/plant-mint.jpg';
import basilImage from '@/assets/plant-basil.jpg';
import lavenderImage from '@/assets/plant-lavender.jpg';

const Cultivation = () => {
  const guides = [
    {
      id: 1,
      title: 'Panduan Lengkap Budidaya Lidah Buaya',
      image: aloeImage,
      difficulty: 'Mudah',
      harvestTime: '3-4 bulan',
      season: 'Sepanjang tahun',
      excerpt: 'Panduan step-by-step menanam lidah buaya dari bibit hingga panen dengan hasil maksimal.',
      views: 2340,
    },
    {
      id: 2,
      title: 'Cara Menanam Kunyit di Pot',
      image: turmericImage,
      difficulty: 'Sedang',
      harvestTime: '8-10 bulan',
      season: 'Musim hujan',
      excerpt: 'Teknik budidaya kunyit dalam pot yang cocok untuk lahan terbatas di perkotaan.',
      views: 1876,
    },
    {
      id: 3,
      title: 'Budidaya Jahe Merah untuk Pemula',
      image: gingerImage,
      difficulty: 'Sedang',
      harvestTime: '10-12 bulan',
      season: 'April-Mei',
      excerpt: 'Panduan praktis menanam jahe merah dengan hasil melimpah dan berkualitas tinggi.',
      views: 3201,
    },
    {
      id: 4,
      title: 'Menanam Mint di Rumah',
      image: mintImage,
      difficulty: 'Mudah',
      harvestTime: '6-8 minggu',
      season: 'Sepanjang tahun',
      excerpt: 'Cara mudah menanam mint di pot atau kebun untuk kebutuhan dapur sehari-hari.',
      views: 1543,
    },
    {
      id: 5,
      title: 'Budidaya Basil dalam Pot',
      image: basilImage,
      difficulty: 'Mudah',
      harvestTime: '4-6 minggu',
      season: 'Sepanjang tahun',
      excerpt: 'Panduan lengkap menanam basil segar di rumah untuk keperluan kuliner.',
      views: 1289,
    },
    {
      id: 6,
      title: 'Cara Menanam Lavender di Iklim Tropis',
      image: lavenderImage,
      difficulty: 'Sulit',
      harvestTime: '90-110 hari',
      season: 'Kemarau',
      excerpt: 'Tips khusus budidaya lavender yang berhasil di Indonesia dengan iklim tropis.',
      views: 2107,
    },
  ];

  const popularGuides = guides.slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-muted py-4">
        <div className="container mx-auto px-4">
          <div className="text-sm text-muted-foreground">
            <Link to="/" className="hover:text-secondary">Beranda</Link> / <span className="text-foreground">Budidaya</span>
          </div>
        </div>
      </div>

      <div className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">Panduan Budidaya</h1>
            <p className="text-xl text-muted-foreground">Pelajari teknik budidaya tanaman herbal dari para ahli</p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-lg p-6 shadow-green mb-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Filter
                </h3>

                {/* Filter Form - PHP ready */}
                <form action="/cultivation.php" method="GET">
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">Tingkat Kesulitan</label>
                    <select 
                      name="difficulty"
                      className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-secondary"
                    >
                      <option value="all">Semua Level</option>
                      <option value="easy">Mudah</option>
                      <option value="medium">Sedang</option>
                      <option value="hard">Sulit</option>
                    </select>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">Waktu Panen</label>
                    <select 
                      name="harvest"
                      className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-secondary"
                    >
                      <option value="all">Semua Durasi</option>
                      <option value="short">1-3 bulan</option>
                      <option value="medium">4-6 bulan</option>
                      <option value="long">6+ bulan</option>
                    </select>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">Musim</label>
                    <select 
                      name="season"
                      className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-secondary"
                    >
                      <option value="all">Semua Musim</option>
                      <option value="year-round">Sepanjang Tahun</option>
                      <option value="rainy">Musim Hujan</option>
                      <option value="dry">Musim Kemarau</option>
                    </select>
                  </div>

                  <button 
                    type="submit"
                    className="w-full px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-smooth font-medium"
                  >
                    Terapkan Filter
                  </button>
                </form>
                {/* PHP will handle filtering */}
              </div>

              {/* Popular Guides */}
              <div className="bg-card rounded-lg p-6 shadow-green mb-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-secondary" />
                  Panduan Populer
                </h3>
                <div className="space-y-3">
                  {popularGuides.map((guide) => (
                    <Link
                      key={guide.id}
                      to={`/cultivation/detail/${guide.id}`}
                      className="flex gap-3 hover:bg-muted p-2 rounded-lg transition-smooth"
                    >
                      <img src={guide.image} alt={guide.title} className="w-16 h-16 object-cover rounded-lg" />
                      <div className="flex-1">
                        <div className="font-medium text-sm line-clamp-2">{guide.title}</div>
                        <div className="text-xs text-muted-foreground">{guide.views} views</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Tip Box */}
              <div className="bg-secondary/10 rounded-lg p-6 border-2 border-secondary">
                <h3 className="text-lg font-semibold mb-2 text-secondary">Tips Budidaya</h3>
                <p className="text-sm text-card-foreground">
                  Selalu gunakan tanah yang gembur dan kaya nutrisi untuk hasil panen terbaik!
                </p>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Search Bar - PHP ready */}
              <form action="/search.php" method="GET" className="mb-8">
                <div className="flex gap-2">
                  <input
                    type="text"
                    name="q"
                    placeholder="Cari panduan budidaya..."
                    className="flex-1 px-6 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-secondary"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-smooth font-medium flex items-center gap-2"
                  >
                    <Search className="h-5 w-5" />
                    Cari
                  </button>
                </div>
              </form>

              {/* Guide Grid */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {guides.map((guide) => (
                  <Link
                    key={guide.id}
                    to={`/cultivation/detail/${guide.id}`}
                    className="bg-card rounded-lg overflow-hidden shadow-green hover:shadow-green-md transition-smooth group"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={guide.image} 
                        alt={guide.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-smooth"
                      />
                      <div className="absolute top-2 right-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          guide.difficulty === 'Mudah' 
                            ? 'bg-green-500 text-white' 
                            : guide.difficulty === 'Sedang'
                            ? 'bg-yellow-500 text-white'
                            : 'bg-red-500 text-white'
                        }`}>
                          {guide.difficulty}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-3 group-hover:text-secondary transition-smooth line-clamp-2">
                        {guide.title}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {guide.harvestTime}
                        </span>
                        <span>•</span>
                        <span>{guide.season}</span>
                      </div>
                      <p className="text-card-foreground/80 text-sm line-clamp-2 mb-3">{guide.excerpt}</p>
                      <div className="text-sm text-muted-foreground">{guide.views} views</div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center gap-2">
                <button className="px-4 py-2 rounded-lg border border-input hover:bg-muted transition-smooth">
                  Sebelumnya
                </button>
                <button className="px-4 py-2 rounded-lg bg-secondary text-secondary-foreground">1</button>
                <button className="px-4 py-2 rounded-lg border border-input hover:bg-muted transition-smooth">2</button>
                <button className="px-4 py-2 rounded-lg border border-input hover:bg-muted transition-smooth">
                  Selanjutnya
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Cultivation;
