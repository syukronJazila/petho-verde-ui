import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Droplet, Sun, Wind, Calendar, AlertCircle } from "lucide-react";
import { BASE_URL } from "@/utils/config";

const PlantDetail = () => {
  const { id } = useParams();
  const [plant, setPlant] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchPlant = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/tanamanDetail.php?id=${id}`);
        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.message || "Gagal mengambil data tanaman");
        }
        const data = await res.json();
        setPlant(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlant();
  }, [id]);

  if (isLoading) {
    // Skeleton loading
    return (
      <div className="min-h-screen flex flex-col p-8 space-y-4 animate-pulse">
        <div className="h-8 w-1/3 bg-gray-200 rounded"></div>
        <div className="h-6 w-1/4 bg-gray-200 rounded"></div>
        <div className="h-64 bg-gray-200 rounded"></div>
        <div className="h-4 bg-gray-200 rounded"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="h-6 bg-gray-200 rounded w-1/3 mt-6"></div>
        <div className="h-4 bg-gray-200 rounded"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      </div>
    );
  }

  if (error) return <p className="text-red-500 p-8">{error}</p>;
  if (!plant) return <p className="p-8">Tanaman tidak ditemukan.</p>;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-muted py-4">
        <div className="container mx-auto px-4">
          <div className="text-sm text-muted-foreground">
            <Link to="/" className="hover:text-secondary">Beranda</Link> /{" "}
            <Link to="/plants" className="hover:text-secondary">Tanaman</Link> /{" "}
            <span className="text-foreground">{plant.nama}</span>
          </div>
        </div>
      </div>

      <div className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Judul */}
          <h1 className="text-5xl font-extrabold text-[#18221B] mb-2">{plant.nama}</h1>
          <p className="text-lg text-muted-foreground italic mb-8">{plant.nama_latin}</p>

          {/* Gambar */}
          <div className="rounded-2xl overflow-hidden shadow-md mb-8 bg-gray-100 flex justify-center items-center">
            <img
              src={plant.image}
              alt={plant.nama}
              className="w-full h-auto max-h-80 object-contain transition-transform duration-300 ease-in-out hover:scale-110 hover:shadow-lg"
            />
          </div>

          {/* Fakta Cepat */}
          <div className="bg-muted rounded-lg p-6 mb-10">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-secondary" />
              Fakta Singkat
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {plant.fakta_singkat && (
                <>
                  <div className="flex items-start gap-3">
                    <Droplet className="h-5 w-5 text-secondary mt-1" />
                    <div>
                      <div className="text-sm font-medium">Penyiraman</div>
                      <div className="text-sm text-muted-foreground">{plant.fakta_singkat.air}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Sun className="h-5 w-5 text-secondary mt-1" />
                    <div>
                      <div className="text-sm font-medium">Cahaya</div>
                      <div className="text-sm text-muted-foreground">{plant.fakta_singkat.cahaya}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Wind className="h-5 w-5 text-secondary mt-1" />
                    <div>
                      <div className="text-sm font-medium">Iklim</div>
                      <div className="text-sm text-muted-foreground">{plant.fakta_singkat.iklim}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-secondary mt-1" />
                    <div>
                      <div className="text-sm font-medium">Panen</div>
                      <div className="text-sm text-muted-foreground">{plant.fakta_singkat.panen}</div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Deskripsi */}
          {plant.deskripsi && (
            <div className="bg-card rounded-lg p-8 shadow-sm mb-10">
              <h2 className="text-2xl font-bold mb-4">Tentang {plant.nama}</h2>
              <p className="text-card-foreground/80 leading-relaxed text-justify">{plant.deskripsi}</p>
            </div>
          )}

          {/* Manfaat */}
          {plant.manfaat && (
            <div className="bg-card rounded-lg p-8 shadow-sm mb-10">
              <h2 className="text-2xl font-bold mb-4">Manfaat Kesehatan</h2>
              <ul className="space-y-3">
                {plant.manfaat.map((m: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-secondary text-sm font-semibold">{idx + 1}</span>
                    </div>
                    <span className="text-card-foreground/80">{m}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Budidaya Link */}
          <div className="mb-12 ml-8">
            <p className="text-card-foreground/80 mb-3">
              Ingin tahu cara menanam dan merawat tanaman ini dengan benar?
            </p>
            <Link
              to={`/plants/cultivation/`}
              className="inline-block px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-semibold hover:bg-secondary/90 transition-smooth"
            >
              Lihat Panduan Budidaya →
            </Link>
          </div>

          {/* Referensi */}
          {plant.referensi && (
            <div className="bg-card rounded-lg p-8 shadow-sm mb-10">
              <h2 className="text-2xl font-bold mb-4">Sumber Referensi</h2>
              <ul className="space-y-2">
                {plant.referensi.map((r: string, idx: number) => (
                  <li key={idx} className="text-card-foreground/80">
                    {idx + 1}. {r}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PlantDetail;
