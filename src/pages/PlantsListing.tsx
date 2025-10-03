import { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PlantCard from '@/components/PlantCard';
import aloeImage from '@/assets/plant-aloe.jpg';
import turmericImage from '@/assets/plant-turmeric.jpg';
import gingerImage from '@/assets/plant-ginger.jpg';
import lavenderImage from '@/assets/plant-lavender.jpg';
import mintImage from '@/assets/plant-mint.jpg';
import chamomileImage from '@/assets/plant-chamomile.jpg';
import basilImage from '@/assets/plant-basil.jpg';
import rosemaryImage from '@/assets/plant-rosemary.jpg';

const PlantsListing = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  const plants = [
    { id: 1, name: 'Lidah Buaya', latinName: 'Aloe vera', image: aloeImage, badge: 'Populer', benefit: 'Baik untuk kulit, penyembuhan luka, dan kesehatan rambut', rating: 4.8, category: 'medicinal', difficulty: 'easy' },
    { id: 2, name: 'Kunyit', latinName: 'Curcuma longa', image: turmericImage, badge: 'Trending', benefit: 'Anti-inflamasi, meningkatkan imunitas, baik untuk pencernaan', rating: 4.7, category: 'medicinal', difficulty: 'medium' },
    { id: 3, name: 'Jahe', latinName: 'Zingiber officinale', image: gingerImage, benefit: 'Meredakan mual, anti-inflamasi, meningkatkan metabolisme', rating: 4.6, category: 'medicinal', difficulty: 'medium' },
    { id: 4, name: 'Lavender', latinName: 'Lavandula angustifolia', image: lavenderImage, benefit: 'Mengurangi stres, membantu tidur, aromaterapi', rating: 4.5, category: 'aromatic', difficulty: 'easy' },
    { id: 5, name: 'Mint', latinName: 'Mentha', image: mintImage, badge: 'Mudah', benefit: 'Menyegarkan, membantu pencernaan, meredakan sakit kepala', rating: 4.7, category: 'culinary', difficulty: 'easy' },
    { id: 6, name: 'Chamomile', latinName: 'Matricaria chamomilla', image: chamomileImage, benefit: 'Menenangkan, membantu tidur, anti-inflamasi', rating: 4.4, category: 'medicinal', difficulty: 'easy' },
    { id: 7, name: 'Basil', latinName: 'Ocimum basilicum', image: basilImage, benefit: 'Antioksidan, anti-bakteri, mendukung kesehatan jantung', rating: 4.3, category: 'culinary', difficulty: 'easy' },
    { id: 8, name: 'Rosemary', latinName: 'Rosmarinus officinalis', image: rosemaryImage, benefit: 'Meningkatkan konsentrasi, antioksidan, mendukung kesehatan otak', rating: 4.5, category: 'aromatic', difficulty: 'medium' },
  ];

  const popularPlants = plants.slice(0, 3);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Replace with PHP endpoint - fetch('/api/search.php?q=' + searchQuery)
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-muted py-4">
        <div className="container mx-auto px-4">
          <div className="text-sm text-muted-foreground">
            <a href="/" className="hover:text-secondary">Beranda</a> / <span className="text-foreground">Tanaman</span>
          </div>
        </div>
      </div>

      <div className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">Jelajahi Tanaman Herbal</h1>
            <p className="text-xl text-muted-foreground">Temukan tanaman herbal yang sesuai dengan kebutuhan Anda</p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-lg p-6 shadow-green mb-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Filter
                </h3>

                {/* Category Filter - PHP ready */}
                <form action="/plants.php" method="GET">
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">Kategori</label>
                    <select 
                      name="category"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-secondary"
                    >
                      <option value="all">Semua Kategori</option>
                      <option value="medicinal">Obat</option>
                      <option value="culinary">Kuliner</option>
                      <option value="aromatic">Aromaterapi</option>
                    </select>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">Tingkat Kesulitan</label>
                    <select 
                      name="difficulty"
                      value={selectedDifficulty}
                      onChange={(e) => setSelectedDifficulty(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-secondary"
                    >
                      <option value="all">Semua Level</option>
                      <option value="easy">Mudah</option>
                      <option value="medium">Sedang</option>
                      <option value="hard">Sulit</option>
                    </select>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">Urutkan</label>
                    <select 
                      name="sort"
                      className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-secondary"
                    >
                      <option value="popular">Terpopuler</option>
                      <option value="name">Nama (A-Z)</option>
                      <option value="rating">Rating Tertinggi</option>
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

              {/* Popular Plants Sidebar */}
              <div className="bg-card rounded-lg p-6 shadow-green mb-6">
                <h3 className="text-lg font-semibold mb-4">Tanaman Populer</h3>
                <div className="space-y-3">
                  {popularPlants.map((plant) => (
                    <a 
                      key={plant.id}
                      href={`/plants/detail/${plant.id}`}
                      className="flex gap-3 hover:bg-muted p-2 rounded-lg transition-smooth"
                    >
                      <img src={plant.image} alt={plant.name} className="w-16 h-16 object-cover rounded-lg" />
                      <div>
                        <div className="font-medium text-sm">{plant.name}</div>
                        <div className="text-xs text-muted-foreground italic">{plant.latinName}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Fun Fact Card */}
              <div className="bg-secondary/10 rounded-lg p-6 border-2 border-secondary">
                <h3 className="text-lg font-semibold mb-2 text-secondary">Tahukah Anda?</h3>
                <p className="text-sm text-card-foreground">
                  Indonesia memiliki lebih dari 30.000 spesies tanaman, dan sekitar 9.600 di antaranya adalah tanaman obat!
                </p>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Search Bar - PHP ready */}
              <form onSubmit={handleSearch} action="/search.php" method="GET" className="mb-8">
                <div className="flex gap-2">
                  <input
                    type="text"
                    name="q"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari tanaman..."
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

              {/* Plant Grid */}
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                {plants.map((plant) => (
                  <PlantCard key={plant.id} {...plant} />
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center gap-2">
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
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PlantsListing;
