/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Droplet, Leaf, Sun, Bug, Shovel, FlaskConical, Calendar } from "lucide-react";
import { BASE_URL } from "@/utils/config";

const CultivationDetail = () => {
  const { id } = useParams();
  const [cultivation, setCultivation] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`${BASE_URL}/budidayaDetail.php?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) setCultivation(data);
      })
      .catch((err) => console.error("Fetch error:", err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    // Skeleton loading sederhana
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="container mx-auto p-4">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-3 animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-6 animate-pulse"></div>
          <div className="h-64 bg-gray-200 rounded mb-8 animate-pulse"></div>
          <div className="space-y-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 rounded animate-pulse"></div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!cultivation) return <p className="text-center mt-12">Budidaya tidak ditemukan</p>;

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
            /{" "}
            <Link to="/plants" className="hover:text-secondary">
              Tanaman
            </Link>{" "}
            /{" "}
            <span className="hover:text-secondary">
              {cultivation.nama_tanaman}
            </span>{" "}
            /<span className="text-foreground"> Panduan Budidaya</span>
          </div>
        </div>
      </div>

      <div className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Judul */}
          <h1 className="text-4xl font-extrabold text-[#18221B] mb-3">
            {cultivation.title}
          </h1>
          <p className="text-muted-foreground italic mb-6">
            Kategori: {cultivation.kategori}
          </p>

          {/* Gambar */}
          <div className="rounded-2xl overflow-hidden shadow-md mb-8 bg-gray-100 flex justify-center items-center">
            <img
              src={cultivation.image}
              alt={cultivation.nama_tanaman}
              className="h-[320px] object-contain transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* Ringkasan */}
          <div className="bg-card rounded-lg p-6 shadow-sm mb-8">
            <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Leaf className="w-5 h-5 text-secondary" />
              Ringkasan Budidaya
            </h2>
            <p className="text-card-foreground/80 text-justify">{cultivation.kutipan}</p>
          </div>

          {/* Detail Budidaya */}
          <div className="space-y-8">
            <Section
              icon={<Shovel className="w-5 h-5 text-secondary text-justify" />}
              title="Cara Menanam"
              content={cultivation.cara_tanam}
            />
            <Section
              icon={<Leaf className="w-5 h-5 text-secondary text-justify" />}
              title="Perawatan"
              content={cultivation.perawatan}
            />
            <Section
              icon={<FlaskConical className="w-5 h-5 text-secondary text-justify" />}
              title="Pemupukan"
              content={cultivation.pupuk}
            />
            <Section
              icon={<Droplet className="w-5 h-5 text-secondary text-justify" />}
              title="Penyiraman"
              content={cultivation.penyiraman}
            />
            <Section
              icon={<Bug className="w-5 h-5 text-secondary text-justify" />}
              title="Hama dan Pencegahan"
              content={cultivation.hama}
            />
            <Section
              icon={<Calendar className="w-5 h-5 text-secondary text-justify" />}
              title="Waktu Panen"
              content={cultivation.waktu_tanam}
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

const Section = ({
  icon,
  title,
  content,
}: {
  icon: React.ReactNode;
  title: string;
  content: string;
}) => (
  <div className="bg-muted rounded-lg p-6 shadow-sm">
    <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
      {icon}
      {title}
    </h3>
    <p className="text-card-foreground/80 leading-relaxed">{content}</p>
  </div>
);

export default CultivationDetail;
