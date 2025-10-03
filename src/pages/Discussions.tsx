import { Link } from 'react-router-dom';
import { Search, MessageSquare, TrendingUp, Users, BookOpen } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Discussions = () => {
  const categories = [
    { id: 1, name: 'Budidaya', count: 45, icon: BookOpen },
    { id: 2, name: 'Kesehatan', count: 67, icon: TrendingUp },
    { id: 3, name: 'Perawatan', count: 38, icon: Users },
    { id: 4, name: 'Resep', count: 29, icon: MessageSquare },
  ];

  const discussions = [
    {
      id: 1,
      title: 'Tips Merawat Lidah Buaya agar Subur dan Cepat Tumbuh',
      author: 'Budi Santoso',
      category: 'Perawatan',
      replies: 15,
      views: 234,
      lastActivity: '2 jam yang lalu',
      lastAuthor: 'Rina Wijaya',
    },
    {
      id: 2,
      title: 'Bagaimana Cara Mengatasi Hama pada Tanaman Mint?',
      author: 'Siti Rahayu',
      category: 'Budidaya',
      replies: 8,
      views: 156,
      lastActivity: '5 jam yang lalu',
      lastAuthor: 'Ahmad Fauzi',
    },
    {
      id: 3,
      title: 'Rekomendasi Tanaman Herbal untuk Pemula yang Mudah Dirawat',
      author: 'Dewi Lestari',
      category: 'Budidaya',
      replies: 23,
      views: 445,
      lastActivity: '1 hari yang lalu',
      lastAuthor: 'Eko Prasetyo',
    },
    {
      id: 4,
      title: 'Manfaat Kunyit untuk Kesehatan Sendi dan Cara Mengonsumsinya',
      author: 'Dr. Fitri',
      category: 'Kesehatan',
      replies: 12,
      views: 289,
      lastActivity: '2 hari yang lalu',
      lastAuthor: 'Maria',
    },
    {
      id: 5,
      title: 'Cara Membuat Teh Chamomile yang Enak dan Menenangkan',
      author: 'Lina Marlina',
      category: 'Resep',
      replies: 6,
      views: 178,
      lastActivity: '3 hari yang lalu',
      lastAuthor: 'Hendra',
    },
  ];

  const topMembers = [
    { name: 'Dr. Fitri', posts: 156, reputation: 'Expert' },
    { name: 'Budi Santoso', posts: 89, reputation: 'Advanced' },
    { name: 'Siti Rahayu', posts: 67, reputation: 'Advanced' },
    { name: 'Ahmad Fauzi', posts: 45, reputation: 'Intermediate' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Header Section */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4 text-center">Forum Diskusi</h1>
          <p className="text-xl text-primary-foreground/90 text-center max-w-2xl mx-auto mb-8">
            Bergabunglah dengan komunitas pecinta tanaman herbal dan berbagi pengalaman
          </p>
          <div className="text-center">
            <Link
              to="/discussions/new"
              className="inline-block px-8 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-smooth font-semibold"
            >
              Mulai Diskusi Baru
            </Link>
          </div>
        </div>
      </section>

      <div className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Search & Filter - PHP ready */}
              <form action="/search.php" method="GET" className="mb-8">
                <div className="flex gap-2">
                  <input
                    type="text"
                    name="q"
                    placeholder="Cari diskusi..."
                    className="flex-1 px-6 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-secondary"
                  />
                  <select 
                    name="category"
                    className="px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-secondary"
                  >
                    <option value="">Semua Kategori</option>
                    <option value="budidaya">Budidaya</option>
                    <option value="kesehatan">Kesehatan</option>
                    <option value="perawatan">Perawatan</option>
                    <option value="resep">Resep</option>
                  </select>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-smooth font-medium flex items-center gap-2"
                  >
                    <Search className="h-5 w-5" />
                    Cari
                  </button>
                </div>
              </form>

              {/* Discussions List */}
              <div className="space-y-4">
                {discussions.map((discussion) => (
                  <Link
                    key={discussion.id}
                    to={`/discussions/detail/${discussion.id}`}
                    className="block bg-card rounded-lg p-6 shadow-green hover:shadow-green-md transition-smooth group"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="inline-block bg-secondary/20 text-secondary px-2 py-1 rounded text-xs font-medium">
                            {discussion.category}
                          </span>
                        </div>
                        <h3 className="text-xl font-semibold mb-2 group-hover:text-secondary transition-smooth">
                          {discussion.title}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>Oleh {discussion.author}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <MessageSquare className="h-4 w-4" />
                            {discussion.replies} balasan
                          </span>
                          <span>•</span>
                          <span>{discussion.views} views</span>
                        </div>
                      </div>
                      <div className="text-right text-sm">
                        <div className="text-muted-foreground mb-1">{discussion.lastActivity}</div>
                        <div className="text-card-foreground">oleh {discussion.lastAuthor}</div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center gap-2 mt-8">
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

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Categories */}
              <div className="bg-card rounded-lg p-6 shadow-green mb-6">
                <h3 className="text-lg font-semibold mb-4">Kategori</h3>
                <div className="space-y-2">
                  {categories.map((category) => {
                    const Icon = category.icon;
                    return (
                      <a
                        key={category.id}
                        href={`/discussions?category=${category.name.toLowerCase()}`}
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-smooth"
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="h-5 w-5 text-secondary" />
                          <span className="font-medium">{category.name}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">{category.count}</span>
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Top Members */}
              <div className="bg-card rounded-lg p-6 shadow-green mb-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-secondary" />
                  Anggota Aktif
                </h3>
                <div className="space-y-3">
                  {topMembers.map((member, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-secondary font-semibold">{idx + 1}</span>
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{member.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {member.posts} posts • {member.reputation}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Forum Rules */}
              <div className="bg-secondary/10 rounded-lg p-6 border-2 border-secondary">
                <h3 className="text-lg font-semibold mb-3 text-secondary">Aturan Forum</h3>
                <ul className="text-sm space-y-2 text-card-foreground">
                  <li>• Hormati sesama anggota</li>
                  <li>• Hindari spam dan promosi</li>
                  <li>• Berikan informasi akurat</li>
                  <li>• Gunakan bahasa yang sopan</li>
                  <li>• Stay on topic</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Discussions;
