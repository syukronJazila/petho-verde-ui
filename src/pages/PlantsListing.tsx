/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useMemo, useEffect } from "react";
import { Search, Filter } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PlantCard from "@/components/PlantCard";
import { BASE_URL } from "@/utils/config";

const PlantsListing = () => {
  const [allPlants, setAllPlants] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("az");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const itemsPerPage = 6;

  // ✅ Fetch data dari API PHP
  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const res = await fetch(`${BASE_URL}tanamanList.php`);
        const data = await res.json();
        setAllPlants(data.data); // diasumsikan API mengembalikan array tanaman

        console.log(data);
      } catch (error) {
        console.error("Gagal fetch data tanaman:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlants();
  }, []);

  // 🔍 Filter & Sort
  const filteredPlants = useMemo(() => {
    let plants = [...allPlants];

    if (selectedCategory !== "all") {
      plants = plants.filter((p) => p.kategori === selectedCategory);
    }

    if (sortOrder === "az") {
      plants.sort((a, b) => a.nama.localeCompare(b.nama));
    } else if (sortOrder === "za") {
      plants.sort((a, b) => b.nama.localeCompare(a.nama));
    }

    if (searchQuery) {
      plants = plants.filter((p) =>
        p.nama.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return plants;
  }, [allPlants, searchQuery, selectedCategory, sortOrder]);

  // 🔢 Pagination
  const totalPages = Math.ceil(filteredPlants.length / itemsPerPage);
  const currentPlants = filteredPlants.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleApplyFilter = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => setCurrentPage(page);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
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
            <p className="text-xl text-muted-foreground">
              Temukan tanaman herbal yang sesuai dengan kebutuhan Anda
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-xl p-6 shadow-lg border border-secondary/30 mb-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-secondary">
                  <Filter className="h-5 w-5" />
                  Filter
                </h3>

                {/* Filter Form */}
                <form onSubmit={handleApplyFilter}>
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">Kategori</label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-secondary"
                    >
                      <option value="all">Semua Kategori</option>
                      <option value="daun">Daun</option>
                      <option value="buah">Buah</option>
                      <option value="rempah">Rempah</option>
                    </select>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">Urutkan</label>
                    <select
                      value={sortOrder}
                      onChange={(e) => setSortOrder(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-secondary"
                    >
                      <option value="az">Nama (A–Z)</option>
                      <option value="za">Nama (Z–A)</option>
                    </select>
                  </div>

                {/* Tombol Reset Filter */}
                <button
                  type="button"
                  onClick={() => {
                    // Reset semua filter ke default
                    setSelectedCategory("all");
                    setSortOrder("az");
                    setCurrentPage(1);
                  }}
                  className="w-full px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition font-medium"
                >
                  Reset Filter
                </button>
                </form>
              </div>

              {/* Fun Fact */}
              <div className="bg-secondary/10 rounded-lg p-6 border border-secondary">
                <h3 className="text-lg font-semibold mb-2 text-secondary">Tahukah Anda?</h3>
                <p className="text-sm text-card-foreground">
                  Indonesia memiliki lebih dari 30.000 spesies tanaman, dan sekitar 9.600 di antaranya adalah tanaman obat!
                </p>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Search Bar */}
              <form onSubmit={handleSearch} className="mb-8">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Cari tanaman..."
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
                </div>
              </form>

              {/* Loading Skeleton */}
              {isLoading ? (
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="bg-white rounded-xl p-6 shadow-md animate-pulse"
                    >
                      <div className="h-40 bg-gray-200 rounded-lg mb-4" />
                      <div className="h-5 bg-gray-200 rounded w-3/4 mb-2" />
                      <div className="h-4 bg-gray-200 rounded w-1/2 mb-3" />
                      <div className="h-3 bg-gray-200 rounded w-full mb-4" />
                      <div className="h-8 bg-gray-200 rounded-lg w-28" />
                    </div>
                  ))}
                </div>
              ) : currentPlants.length > 0 ? (
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                  {currentPlants.map((plant) => (
                    <PlantCard key={plant.id} {...plant} />
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground">
                  Tidak ada tanaman ditemukan.
                </p>
              )}

              {/* Pagination (tengah layar penuh) */}
              {totalPages > 1 && (
                <div className="flex justify-center w-full mt-8">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 rounded-lg border border-input hover:bg-muted disabled:opacity-50"
                    >
                      Sebelumnya
                    </button>

                    {[...Array(totalPages)].map((_, index) => (
                      <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        className={`px-4 py-2 rounded-lg ${
                          currentPage === index + 1
                            ? "bg-secondary text-secondary-foreground"
                            : "border border-input hover:bg-muted"
                        } transition`}
                      >
                        {index + 1}
                      </button>
                    ))}

                    <button
                      onClick={() =>
                        handlePageChange(Math.min(currentPage + 1, totalPages))
                      }
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 rounded-lg border border-input hover:bg-muted disabled:opacity-50"
                    >
                      Selanjutnya
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PlantsListing;
