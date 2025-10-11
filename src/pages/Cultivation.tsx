import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Filter } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CultivationCard from "@/components/CultivationCard";
import { BASE_URL } from "@/utils/config";

const ITEMS_PER_PAGE = 4;

const Cultivation = () => {
  const [guides, setGuides] = useState<any[]>([]);
  const [filteredGuides, setFilteredGuides] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("az");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch dari PHP API
  useEffect(() => {
      const fetchBudidaya = async () => {
      try {
        const res = await fetch(`${BASE_URL}/budidayaList.php`); 
        const data = await res.json();
        setGuides(data);
        setFilteredGuides(data);

        console.log(data);
      } catch (error) {
        console.error("Gagal fetch data tanaman:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBudidaya();
  }, []);

  // Filter & sort lokal
  useEffect(() => {
    let results = [...guides];

    if (searchQuery.trim() !== "") {
      results = results.filter((g) =>
        g.judul.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    results.sort((a, b) =>
      sortOrder === "az"
        ? a.judul.localeCompare(b.judul)
        : b.judul.localeCompare(a.judul)
    );

    setFilteredGuides(results);
    setCurrentPage(1); // reset ke halaman pertama
  }, [guides, searchQuery, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(filteredGuides.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentData = filteredGuides.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
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
            / <span className="text-foreground">Budidaya</span>
          </div>
        </div>
      </div>

      <div className="flex-1 py-12">
        <div className="container mx-auto px-4">
          {/* Judul */}
          <div className="mb-10">
            <h1 className="text-5xl font-bold mb-3 text-left text-[#18221B]">
              Panduan Budidaya
            </h1>
            <p className="text-lg text-muted-foreground text-left">
              Pelajari teknik budidaya tanaman herbal dari para ahli dan praktisi
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar Filter */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-100 mb-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Filter
                </h3>

                <form onSubmit={(e) => e.preventDefault()}>
                  {/* Urutkan */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">
                      Urutkan
                    </label>
                    <select
                      value={sortOrder}
                      onChange={(e) => setSortOrder(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-secondary"
                    >
                      <option value="az">Nama (A-Z)</option>
                      <option value="za">Nama (Z-A)</option>
                    </select>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery("");
                      setSortOrder("az");
                      setCurrentPage(1);
                      setFilteredGuides(guides);
                    }}
                    className="w-full px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition font-medium"
                  >
                    Reset Filter
                  </button>
                </form>
              </div>

              {/* Tips */}
              <div className="bg-secondary/10 rounded-lg p-6 border-2 border-secondary">
                <h3 className="text-lg font-semibold mb-2 text-secondary">
                  Tips Budidaya
                </h3>
                <p className="text-sm text-card-foreground">
                  Gunakan tanah gembur dan siram secara rutin agar tanaman tumbuh
                  subur dan sehat!
                </p>
              </div>
            </div>

            {/* Konten Utama */}
            <div className="lg:col-span-3">
              {/* Search */}
              <form
                onSubmit={(e) => e.preventDefault()}
                className="mb-8 flex gap-2"
              >
                <input
                  type="text"
                  placeholder="Cari panduan budidaya..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-6 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-secondary"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition font-medium flex items-center gap-2"
                >
                  <Search className="h-5 w-5" />
                  Cari
                </button>
              </form>

              {/* Skeleton Loading */}
              {loading ? (
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="bg-gray-100 rounded-lg p-4 animate-pulse"
                    >
                      <div className="w-full h-48 bg-gray-300 rounded mb-4"></div>
                      <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    {currentData.length > 0 ? (
                      currentData.map((guide) => (
                        <CultivationCard key={guide.id} guide={guide} />
                      ))
                    ) : (
                      <p className="text-center text-gray-500">
                        Tidak ada hasil ditemukan.
                      </p>
                    )}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex justify-center gap-2 mt-4">
                      <button
                        onClick={() => setCurrentPage(Math.max(currentPage - 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 rounded-lg border border-input hover:bg-muted disabled:opacity-50"
                      >
                        Sebelumnya
                      </button>

                      {Array.from({ length: totalPages }, (_, i) => (
                        <button
                          key={i}
                          onClick={() => setCurrentPage(i + 1)}
                          className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                            currentPage === i + 1
                              ? "bg-secondary text-secondary-foreground shadow"
                              : "bg-gray-100 hover:bg-gray-200"
                          }`}
                        >
                          {i + 1}
                        </button>
                      ))}

                      <button
                        onClick={() => setCurrentPage(Math.max(currentPage + 1))}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 rounded-lg border border-input hover:bg-muted disabled:opacity-50"
                      >
                        Selanjutnya
                      </button>

                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Cultivation;
