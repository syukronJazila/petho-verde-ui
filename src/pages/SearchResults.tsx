import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import aloeImage from '@/assets/plant-aloe.jpg';
import turmericImage from '@/assets/plant-turmeric.jpg';
import gingerImage from '@/assets/plant-ginger.jpg';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [activeTab, setActiveTab] = useState('all');
  const [searchInput, setSearchInput] = useState(query);

  // Dummy search results - would come from PHP/database
  const results = {
    plants: [
      { id: 1, type: 'plant', title: 'Lidah Buaya (Aloe vera)', excerpt: 'Tanaman sukulen dengan banyak manfaat kesehatan...', image: aloeImage, url: '/plants/detail/1' },
      { id: 2, type: 'plant', title: 'Kunyit (Curcuma longa)', excerpt: 'Rimpang dengan sifat anti-inflamasi...', image: turmericImage, url: '/plants/detail/2' },
    ],
    articles: [
      { id: 1, type: 'article', title: '10 Tanaman Herbal untuk Meningkatkan Imunitas', excerpt: 'Di tengah pandemi global, meningkatkan sistem kekebalan tubuh...', image: gingerImage, url: '/articles/detail/1' },
      { id: 2, type: 'article', title: 'Cara Budidaya Jahe di Rumah', excerpt: 'Panduan lengkap menanam jahe dalam pot...', image: turmericImage, url: '/articles/detail/2' },
    ],
    guides: [
      { id: 1, type: 'guide', title: 'Panduan Lengkap Budidaya Lidah Buaya', excerpt: 'Panduan step-by-step menanam lidah buaya...', image: aloeImage, url: '/cultivation/detail/1' },
    ],
    discussions: [
      { id: 1, type: 'discussion', title: 'Tips Merawat Lidah Buaya agar Subur', excerpt: 'Diskusi tentang perawatan optimal lidah buaya...', url: '/discussions/detail/1' },
    ],
  };

  const allResults = [
    ...results.plants,
    ...results.articles,
    ...results.guides,
    ...results.discussions,
  ];

  const getFilteredResults = () => {
    switch (activeTab) {
      case 'plants':
        return results.plants;
      case 'articles':
        return results.articles;
      case 'guides':
        return results.guides;
      case 'discussions':
        return results.discussions;
      default:
        return allResults;
    }
  };

  const filteredResults = getFilteredResults();
  const totalResults = allResults.length;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 py-12">
        <div className="container mx-auto px-4">
          {/* Search Header */}
          <div className="max-w-4xl mx-auto mb-8">
            <h1 className="text-3xl font-bold mb-4">
              Hasil Pencarian: "<span className="text-secondary">{query}</span>"
            </h1>
            <p className="text-muted-foreground mb-6">
              Ditemukan {totalResults} hasil
            </p>

            {/* Refine Search - PHP ready */}
            <form action="/search.php" method="GET" className="mb-6">
              <div className="flex gap-2">
                <input
                  type="text"
                  name="q"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Perbaiki pencarian..."
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

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'all', label: 'Semua', count: totalResults },
                { id: 'plants', label: 'Tanaman', count: results.plants.length },
                { id: 'articles', label: 'Artikel', count: results.articles.length },
                { id: 'guides', label: 'Panduan', count: results.guides.length },
                { id: 'discussions', label: 'Diskusi', count: results.discussions.length },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-smooth ${
                    activeTab === tab.id
                      ? 'bg-secondary text-secondary-foreground'
                      : 'bg-muted hover:bg-muted/80'
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </div>
          </div>

          {/* Results */}
          <div className="max-w-4xl mx-auto">
            {filteredResults.length > 0 ? (
              <div className="space-y-6">
                {filteredResults.map((result, index) => (
                  <Link
                    key={`${result.type}-${result.id}-${index}`}
                    to={result.url}
                    className="block bg-card rounded-lg overflow-hidden shadow-green hover:shadow-green-md transition-smooth group"
                  >
                    <div className="flex gap-4 p-6">
                      {'image' in result && result.image && (
                        <div className="flex-shrink-0 w-32 h-32 overflow-hidden rounded-lg">
                          <img 
                            src={result.image as string} 
                            alt={result.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-smooth"
                          />
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="mb-2">
                          <span className="inline-block bg-secondary/20 text-secondary px-2 py-1 rounded text-xs font-medium capitalize">
                            {result.type === 'plant' && 'Tanaman'}
                            {result.type === 'article' && 'Artikel'}
                            {result.type === 'guide' && 'Panduan'}
                            {result.type === 'discussion' && 'Diskusi'}
                          </span>
                        </div>
                        <h3 className="text-xl font-semibold mb-2 group-hover:text-secondary transition-smooth">
                          {result.title}
                        </h3>
                        <p className="text-card-foreground/80 line-clamp-2">
                          {result.excerpt}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Tidak ada hasil ditemukan</h3>
                <p className="text-muted-foreground mb-6">
                  Coba gunakan kata kunci yang berbeda atau lebih umum
                </p>
                <Link
                  to="/"
                  className="inline-block px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-smooth font-semibold"
                >
                  Kembali ke Beranda
                </Link>
              </div>
            )}

            {/* Pagination */}
            {filteredResults.length > 0 && (
              <div className="flex justify-center gap-2 mt-8">
                <button className="px-4 py-2 rounded-lg border border-input hover:bg-muted transition-smooth">
                  Sebelumnya
                </button>
                <button className="px-4 py-2 rounded-lg bg-secondary text-secondary-foreground">1</button>
                <button className="px-4 py-2 rounded-lg border border-input hover:bg-muted transition-smooth">2</button>
                <button className="px-4 py-2 rounded-lg border border-input hover:bg-muted transition-smooth">
                  Selanjutnya
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SearchResults;
