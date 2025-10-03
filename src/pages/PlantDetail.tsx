import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Share2, Heart, AlertCircle, Droplet, Sun, Wind, Calendar } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PlantCard from '@/components/PlantCard';
import aloeImage from '@/assets/plant-aloe.jpg';
import turmericImage from '@/assets/plant-turmeric.jpg';
import gingerImage from '@/assets/plant-ginger.jpg';
import mintImage from '@/assets/plant-mint.jpg';

const PlantDetail = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('description');
  const [selectedImage, setSelectedImage] = useState(0);

  // Dummy data - would come from PHP/database
  const plant = {
    id: 1,
    name: 'Lidah Buaya',
    latinName: 'Aloe vera',
    images: [aloeImage, aloeImage, aloeImage],
    rating: 4.8,
    totalReviews: 124,
    badges: ['Populer', 'Mudah Dirawat'],
    quickFacts: {
      water: 'Jarang (1-2 minggu sekali)',
      light: 'Cahaya sedang hingga terang',
      climate: 'Hangat dan kering',
      harvest: '3-4 bulan',
    },
    description: 'Lidah buaya adalah tanaman sukulen yang telah digunakan selama ribuan tahun untuk berbagai keperluan medis dan kosmetik. Tanaman ini mudah tumbuh dan memiliki banyak manfaat kesehatan, terutama untuk perawatan kulit dan rambut.',
    benefits: [
      'Mempercepat penyembuhan luka dan luka bakar',
      'Melembabkan kulit secara alami',
      'Mengurangi jerawat dan inflamasi kulit',
      'Memperkuat dan melembutkan rambut',
      'Membantu pencernaan ketika dikonsumsi',
      'Menurunkan kadar gula darah',
    ],
    cultivation: {
      planting: 'Gunakan tanah berpasir dengan drainase baik. Pastikan pot memiliki lubang drainase.',
      watering: 'Siram ketika tanah sudah benar-benar kering. Jangan terlalu sering menyiram.',
      light: 'Letakkan di tempat yang mendapat cahaya matahari tidak langsung atau cahaya terang.',
      temperature: 'Suhu ideal 15-27°C. Hindari suhu di bawah 10°C.',
      fertilizer: 'Beri pupuk cair sebulan sekali selama musim tanam.',
    },
    references: [
      'National Center for Complementary and Integrative Health - Aloe Vera',
      'Journal of Traditional and Complementary Medicine, 2019',
      'Badan POM RI - Pedoman Tanaman Obat',
    ],
  };

  const relatedPlants = [
    { id: 2, name: 'Kunyit', latinName: 'Curcuma longa', image: turmericImage, benefit: 'Anti-inflamasi, meningkatkan imunitas', rating: 4.7 },
    { id: 3, name: 'Jahe', latinName: 'Zingiber officinale', image: gingerImage, benefit: 'Meredakan mual, anti-inflamasi', rating: 4.6 },
    { id: 5, name: 'Mint', latinName: 'Mentha', image: mintImage, benefit: 'Menyegarkan, membantu pencernaan', rating: 4.7 },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-muted py-4">
        <div className="container mx-auto px-4">
          <div className="text-sm text-muted-foreground">
            <Link to="/" className="hover:text-secondary">Beranda</Link> / 
            <Link to="/plants" className="hover:text-secondary"> Tanaman</Link> / 
            <span className="text-foreground"> {plant.name}</span>
          </div>
        </div>
      </div>

      <div className="flex-1 py-12">
        <div className="container mx-auto px-4">
          {/* Two Column Layout */}
          <div className="grid lg:grid-cols-2 gap-12 mb-12">
            {/* Left: Image Gallery */}
            <div>
              <div className="bg-card rounded-lg overflow-hidden shadow-green-md mb-4">
                <img 
                  src={plant.images[selectedImage]} 
                  alt={plant.name}
                  className="w-full h-96 object-cover"
                />
              </div>
              <div className="flex gap-4">
                {plant.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`w-24 h-24 rounded-lg overflow-hidden border-2 transition-smooth ${
                      selectedImage === idx ? 'border-secondary' : 'border-transparent'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Plant Info */}
            <div>
              <div className="mb-4">
                {plant.badges.map((badge, idx) => (
                  <span 
                    key={idx}
                    className="inline-block bg-secondary/20 text-secondary px-3 py-1 rounded-full text-sm font-medium mr-2 mb-2"
                  >
                    {badge}
                  </span>
                ))}
              </div>

              <h1 className="text-4xl font-bold mb-2">{plant.name}</h1>
              <p className="text-xl text-muted-foreground italic mb-4">{plant.latinName}</p>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(plant.rating) 
                          ? 'fill-secondary text-secondary' 
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-semibold">{plant.rating}</span>
                <span className="text-muted-foreground">({plant.totalReviews} ulasan)</span>
              </div>

              {/* Quick Facts Card */}
              <div className="bg-muted rounded-lg p-6 mb-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-secondary" />
                  Fakta Cepat
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <Droplet className="h-5 w-5 text-secondary mt-1" />
                    <div>
                      <div className="text-sm font-medium">Penyiraman</div>
                      <div className="text-sm text-muted-foreground">{plant.quickFacts.water}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Sun className="h-5 w-5 text-secondary mt-1" />
                    <div>
                      <div className="text-sm font-medium">Cahaya</div>
                      <div className="text-sm text-muted-foreground">{plant.quickFacts.light}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Wind className="h-5 w-5 text-secondary mt-1" />
                    <div>
                      <div className="text-sm font-medium">Iklim</div>
                      <div className="text-sm text-muted-foreground">{plant.quickFacts.climate}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-secondary mt-1" />
                    <div>
                      <div className="text-sm font-medium">Panen</div>
                      <div className="text-sm text-muted-foreground">{plant.quickFacts.harvest}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Share Buttons */}
              <div className="flex gap-4">
                <button className="flex-1 px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-smooth font-semibold flex items-center justify-center gap-2">
                  <Heart className="h-5 w-5" />
                  Simpan
                </button>
                <button className="px-6 py-3 border-2 border-secondary text-secondary rounded-lg hover:bg-secondary/10 transition-smooth font-semibold flex items-center gap-2">
                  <Share2 className="h-5 w-5" />
                  Bagikan
                </button>
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="mb-12">
            <div className="border-b border-border mb-6">
              <div className="flex gap-8">
                {['description', 'benefits', 'cultivation', 'references'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-4 font-medium transition-smooth capitalize ${
                      activeTab === tab 
                        ? 'text-secondary border-b-2 border-secondary' 
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {tab === 'description' && 'Deskripsi'}
                    {tab === 'benefits' && 'Manfaat'}
                    {tab === 'cultivation' && 'Budidaya'}
                    {tab === 'references' && 'Referensi'}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-card rounded-lg p-8 shadow-green">
              {activeTab === 'description' && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">Tentang {plant.name}</h2>
                  <p className="text-lg text-card-foreground/80 leading-relaxed">{plant.description}</p>
                </div>
              )}

              {activeTab === 'benefits' && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">Manfaat Kesehatan</h2>
                  <ul className="space-y-3">
                    {plant.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-secondary text-sm font-semibold">{idx + 1}</span>
                        </div>
                        <span className="text-card-foreground/80">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === 'cultivation' && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Panduan Budidaya</h2>
                  <div className="space-y-6">
                    {Object.entries(plant.cultivation).map(([key, value]) => (
                      <div key={key} className="border-l-4 border-secondary pl-4">
                        <h3 className="font-semibold text-lg mb-2 capitalize">{key === 'planting' ? 'Penanaman' : key === 'watering' ? 'Penyiraman' : key === 'light' ? 'Cahaya' : key === 'temperature' ? 'Suhu' : 'Pemupukan'}</h3>
                        <p className="text-card-foreground/80">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'references' && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">Sumber Referensi</h2>
                  <ul className="space-y-2">
                    {plant.references.map((ref, idx) => (
                      <li key={idx} className="text-card-foreground/80">
                        {idx + 1}. {ref}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Reviews Section */}
          <div className="mb-12">
            <div className="bg-card rounded-lg p-8 shadow-green">
              <h2 className="text-2xl font-bold mb-6">Ulasan Pengguna</h2>
              <div className="mb-6 pb-6 border-b border-border">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center">
                    <span className="text-secondary font-semibold">JD</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold">John Doe</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-secondary text-secondary" />
                        ))}
                      </div>
                    </div>
                    <p className="text-card-foreground/80">
                      Tanaman lidah buaya saya tumbuh sangat subur! Mudah dirawat dan bermanfaat untuk kulit. Sangat direkomendasikan untuk pemula.
                    </p>
                    <span className="text-sm text-muted-foreground">2 minggu yang lalu</span>
                  </div>
                </div>
              </div>

              {/* Add Review Form - PHP ready */}
              <form action="/submit.php" method="POST" className="space-y-4">
                <input type="hidden" name="plant_id" value={id} />
                <h3 className="font-semibold text-lg">Tulis Ulasan Anda</h3>
                <textarea
                  name="review"
                  rows={4}
                  placeholder="Bagikan pengalaman Anda dengan tanaman ini..."
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-secondary"
                  required
                ></textarea>
                <button
                  type="submit"
                  className="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-smooth font-semibold"
                >
                  Kirim Ulasan
                </button>
              </form>
              {/* PHP will handle review submission */}
            </div>
          </div>

          {/* Related Plants */}
          <div>
            <h2 className="text-3xl font-bold mb-8">Tanaman Terkait</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPlants.map((plant) => (
                <PlantCard key={plant.id} {...plant} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PlantDetail;
