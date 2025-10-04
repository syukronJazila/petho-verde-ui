import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search, Calendar, Tag, TrendingUp } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 6;

  const tags = ["Kesehatan","Budidaya","Resep","Perawatan","Aromaterapi","Kuliner","Organik",];

  // Simulasi ambil data dari DB
  useEffect(() => {
     const fetchArtikel = async () => {
      try {
        const res = await fetch("http://localhost/pethofar/artikelList.php"); // ganti path sesuai API-mu
        const data = await res.json();
        setArticles(data);
        setFilteredArticles(data);
      } catch (error) {
        console.error("Gagal fetch data tanaman:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArtikel();
  }, []);

  // Filter pencarian dan tag
  useEffect(() => {
    let filtered = articles;

    if (selectedTag) {
      filtered = filtered.filter(
        (a) => a.kategori.toLowerCase() === selectedTag.toLowerCase()
      );
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (a) =>
          a.judul.toLowerCase().includes(q) ||
          a.kutipan.toLowerCase().includes(q) ||
          a.author.toLowerCase().includes(q)
      );
    }

    setFilteredArticles(filtered);
    setCurrentPage(1);
  }, [searchQuery, selectedTag, articles]);

  const totalPages = Math.ceil(filteredArticles.length / perPage);
  const displayedArticles = filteredArticles.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-muted py-4">
        <div className="container mx-auto px-4">
          <div className="text-sm text-muted-foreground">
            <Link to="/" className="hover:text-secondary">
              Beranda
            </Link>{" "}
            / <span className="text-foreground">Artikel</span>
          </div>
        </div>
      </div>

      <div className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">Artikel & Tips</h1>
            <p className="text-lg text-muted-foreground">
              Baca panduan lengkap tentang tanaman herbal dan kesehatan alami
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-3">
                {loading ? (
                  // 🔹 Skeleton hanya di konten utama
                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className="bg-card rounded-lg overflow-hidden shadow-green p-6 animate-pulse"
                      >
                        <div className="h-48 bg-gray-200 rounded mb-4"></div>
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    ))}
                  </div>
                ) : displayedArticles.length > 0 ? (
                  <div className="grid md:grid-cols-2 gap-6">
                    {displayedArticles.map((article) => (
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
                          <span className="inline-block bg-secondary/20 text-secondary px-2 py-1 rounded text-xs font-medium mb-2">
                            {article.kategori}
                          </span>
                          <h3 className="text-xl font-semibold mb-2 group-hover:text-secondary transition-smooth line-clamp-2">
                            {article.judul}
                          </h3>
                          <p className="text-card-foreground/80 text-sm  mb-4 line-clamp-2">
                            {/* {article.kutipan} */}
                          </p>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {article.tanggal}
                            </span>
                            <span>•</span>
                            <span>{article.waktu_baca}</span>
                            <span>•</span>
                            <p className="text-xs text-gray-500 italic">
                              Oleh {article.author ?? "Anonim"}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-20">
                    Tidak ada artikel ditemukan.
                  </p>
                )}

                {/* Pagination tetap tampil */}
                {!loading && totalPages > 1 && (
                  <div className="flex justify-center w-full mt-8">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 rounded-lg border border-input hover:bg-muted disabled:opacity-50"
                      >
                        Sebelumnya
                      </button>
                
                      {[...Array(totalPages)].map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setCurrentPage(i + 1)}
                          className={`px-4 py-2 rounded-lg ${
                            currentPage === i + 1
                              ? "bg-secondary text-secondary-foreground"
                              : "border border-input hover:bg-muted"
                          } transition`}
                        >
                          {i + 1}
                        </button>
                      ))}

                      <button
                        onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 rounded-lg border border-input hover:bg-muted disabled:opacity-50"
                      >
                        Selanjutnya
                      </button>
                    </div>
                  </div>
                )}
              </div>



              {/* Sidebar */}
              <div className="lg:col-span-1">
                {/* Search */}
                <div className="mb-6">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Cari artikel..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full px-4 py-3 pr-12 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-secondary"
                    />
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  </div>
                </div>

                {/* Tags */}
                <div className="bg-card rounded-lg p-6 shadow-green mb-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Tag className="h-5 w-5 text-secondary" />
                    Kategori
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() =>
                          setSelectedTag(selectedTag === tag ? "" : tag)
                        }
                        className={`px-3 py-1 rounded-full text-sm transition-smooth ${
                          selectedTag === tag
                            ? "bg-secondary text-secondary-foreground"
                            : "bg-muted hover:bg-secondary hover:text-secondary-foreground"
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Popular */}
                <div className="bg-card rounded-lg p-6 shadow-green">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-secondary" />
                    Artikel Populer
                  </h3>
                  <div className="space-y-4">
                    {articles.slice(0, 5).map((a, i) => (
                      <Link
                        key={a.id}
                        to={`/articles/detail/${a.id}`}
                        className="flex gap-3 hover:bg-muted p-2 rounded-lg transition-smooth"
                      >
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center font-semibold text-sm">
                          {i + 1}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-sm line-clamp-2 hover:text-secondary transition-smooth">
                            {a.judul}
                          </h4>
                          <p className="text-xs text-muted-foreground mt-1">
                            {a.tanggal}
                          </p>
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
