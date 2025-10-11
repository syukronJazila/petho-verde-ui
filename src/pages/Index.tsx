import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Leaf, Users, BookOpen, Calendar, TrendingUp } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PlantCard from '@/components/PlantCard';
import heroImage from '@/assets/hero-bg.png';
import { BASE_URL } from "@/utils/config";

const Index = () => {
  const [popularPlants, setPopularPlants] = useState<any[]>([]);
  const [recentArticles, setRecentArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Simulasi fetch data dari PHP endpoint
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${BASE_URL}/beranda.php`);
        const data = await res.json();

        if (data.error) {
          console.error("Error:", data.message);
          setPopularPlants([]);
          setRecentArticles([]);
        } else {
          setPopularPlants(data.popularPlants);
          setRecentArticles(data.recentArticles);
        }
        console.log(data);
      } catch (err) {
        console.error("Failed to fetch data", err);
        setPopularPlants([]);
        setRecentArticles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


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

          <Link 
            to="/plants"
            className="mt-2 inline-block px-12 py-4 bg-secondary text-white rounded-full hover:bg-secondary/90 transition-all duration-300 ease-in-out font-semibold text-lg md:text-xl"
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


      {/* Recent Articles */}
      <section className="py-16 border-t border-gray-200">
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
                    alt={article.judul}
                    className="w-full h-full object-cover group-hover:scale-110 transition-smooth"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Calendar className="h-4 w-4" />
                    {article.tanggal}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-secondary transition-smooth">
                    {article.judul}
                  </h3>
                  {/* <p className="text-card-foreground/80 line-clamp-2">{article.excerpt}</p> */}
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

      {/* Herbal Fun Facts */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Fakta Menarik Tentang Tanaman Herbal</h2>
            <p className="text-xl text-muted-foreground">
              Ketahui hal-hal unik seputar tanaman herbal yang mungkin belum kamu tahu!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                judul: "Lidah Buaya Bisa Hidup Tanpa Tanah!",
                fact: "Tanaman lidah buaya dapat tumbuh hanya dengan air dan cahaya matahari yang cukup — sangat cocok untuk kamu yang baru mulai berkebun!",
                icon: <Leaf className="h-6 w-6 text-secondary" />,
              },
              {
                judul: "Jahe Termasuk Keluarga Kunyit",
                fact: "Jahe dan kunyit berasal dari famili yang sama, yaitu Zingiberaceae — keduanya terkenal dengan manfaat anti-inflamasinya.",
                icon: <BookOpen className="h-6 w-6 text-secondary" />,
              },
              {
                judul: "Lavender Awalnya Digunakan untuk Mencuci Pakaian",
                fact: "Nama 'lavender' berasal dari kata Latin *lavare*, yang berarti 'mencuci'. Dulu, bunga ini sering digunakan untuk mengharumkan pakaian.",
                icon: <Calendar className="h-6 w-6 text-secondary" />,
              },
              {
                judul: "Mint Bisa Menangkal Serangga Alami",
                fact: "Aroma mentol dari daun mint ternyata bisa membantu mengusir nyamuk dan semut secara alami — tanpa bahan kimia!",
                icon: <TrendingUp className="h-6 w-6 text-secondary" />,
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-card rounded-xl p-8 shadow-green hover:shadow-green-md transition-smooth text-left"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold">{item.judul}</h3>
                </div>
                <p className="text-card-foreground/80 leading-relaxed">{item.fact}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      <Footer />
    </div>
  );
};

export default Index;
