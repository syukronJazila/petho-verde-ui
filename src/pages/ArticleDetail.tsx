import { Link, useParams } from 'react-router-dom';
import { Calendar, User, Clock, Tag, MessageCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import gingerImage from '@/assets/plant-ginger.jpg';
import turmericImage from '@/assets/plant-turmeric.jpg';
import lavenderImage from '@/assets/plant-lavender.jpg';

const ArticleDetail = () => {
  const { id } = useParams();

  const article = {
    id: 1,
    title: '10 Tanaman Herbal untuk Meningkatkan Imunitas',
    featuredImage: gingerImage,
    author: 'Dr. Siti Rahayu',
    date: '2025-10-01',
    readTime: '5 menit',
    category: 'Kesehatan',
    tags: ['Imunitas', 'Kesehatan', 'Herbal', 'Pencegahan'],
    content: `
      <p>Di tengah pandemi global dan ancaman berbagai penyakit, meningkatkan sistem kekebalan tubuh menjadi prioritas utama. Tanaman herbal telah digunakan selama berabad-abad untuk mendukung kesehatan dan meningkatkan imunitas tubuh secara alami.</p>

      <h2>Mengapa Tanaman Herbal Penting untuk Imunitas?</h2>
      <p>Tanaman herbal mengandung berbagai senyawa bioaktif seperti antioksidan, vitamin, mineral, dan fitokimia yang dapat membantu tubuh melawan infeksi dan penyakit. Berbeda dengan obat sintetis, tanaman herbal bekerja secara holistik untuk mendukung fungsi sistem kekebalan tubuh.</p>

      <h2>10 Tanaman Herbal Terbaik</h2>
      
      <h3>1. Jahe (Zingiber officinale)</h3>
      <p>Jahe mengandung gingerol yang memiliki sifat anti-inflamasi dan antioksidan kuat. Konsumsi jahe secara teratur dapat membantu meningkatkan respons imun tubuh terhadap infeksi.</p>

      <h3>2. Kunyit (Curcuma longa)</h3>
      <p>Kurkumin dalam kunyit adalah antioksidan yang sangat kuat dengan efek anti-inflamasi yang telah terbukti secara ilmiah dapat memodulasi sistem kekebalan tubuh.</p>

      <h3>3. Echinacea</h3>
      <p>Tanaman ini terkenal sebagai "pembangkit imunitas" karena kemampuannya meningkatkan produksi sel darah putih yang melawan infeksi.</p>

      <blockquote>"Alam telah menyediakan segala yang kita butuhkan untuk menjaga kesehatan. Kita hanya perlu tahu bagaimana menggunakannya." - Hippocrates</blockquote>

      <h2>Cara Mengonsumsi</h2>
      <ul>
        <li>Buat teh herbal dengan mencampurkan beberapa tanaman</li>
        <li>Tambahkan sebagai bumbu dalam masakan sehari-hari</li>
        <li>Konsumsi dalam bentuk suplemen jika perlu</li>
        <li>Gunakan sebagai minuman jamu tradisional</li>
      </ul>

      <h2>Tips Penggunaan</h2>
      <p>Untuk hasil maksimal, konsumsi tanaman herbal secara konsisten dan dalam jumlah yang tepat. Konsultasikan dengan ahli herbal atau dokter jika Anda memiliki kondisi kesehatan khusus atau sedang mengonsumsi obat tertentu.</p>
    `,
  };

  const relatedArticles = [
    { id: 2, title: 'Cara Budidaya Jahe di Rumah', image: turmericImage, date: '2025-09-28' },
    { id: 3, title: 'Manfaat Lavender untuk Kesehatan Mental', image: lavenderImage, date: '2025-09-25' },
  ];

  const comments = [
    { id: 1, author: 'Budi Santoso', date: '2025-10-02', comment: 'Artikel yang sangat informatif! Saya sudah mencoba beberapa tanaman yang disebutkan dan hasilnya luar biasa.' },
    { id: 2, author: 'Rina Wijaya', date: '2025-10-03', comment: 'Terima kasih atas informasinya. Saya jadi lebih tahu tentang manfaat tanaman herbal untuk kesehatan.' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-muted py-4">
        <div className="container mx-auto px-4">
          <div className="text-sm text-muted-foreground">
            <Link to="/" className="hover:text-secondary">Beranda</Link> / 
            <Link to="/articles" className="hover:text-secondary"> Artikel</Link> / 
            <span className="text-foreground"> {article.title}</span>
          </div>
        </div>
      </div>

      <div className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <article className="max-w-4xl mx-auto">
            {/* Article Header */}
            <div className="mb-8">
              <span className="inline-block bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm font-medium mb-4">
                {article.category}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{article.title}</h1>
              
              <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-6">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{article.author}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{article.date}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{article.readTime}</span>
                </div>
              </div>

              {/* Featured Image */}
              <div className="rounded-lg overflow-hidden shadow-green-md mb-8">
                <img 
                  src={article.featuredImage} 
                  alt={article.title}
                  className="w-full h-96 object-cover"
                />
              </div>
            </div>

            {/* Article Body */}
            <div 
              className="prose prose-lg max-w-none mb-12"
              style={{
                color: 'hsl(var(--card-foreground))',
              }}
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Tags */}
            <div className="mb-12 pb-8 border-b border-border">
              <div className="flex items-center gap-2 mb-3">
                <Tag className="h-5 w-5 text-secondary" />
                <span className="font-semibold">Tags:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <a
                    key={tag}
                    href={`/articles?tag=${tag.toLowerCase()}`}
                    className="px-3 py-1 bg-muted hover:bg-secondary hover:text-secondary-foreground rounded-full text-sm transition-smooth"
                  >
                    {tag}
                  </a>
                ))}
              </div>
            </div>

            {/* Comments Section */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <MessageCircle className="h-6 w-6 text-secondary" />
                Komentar ({comments.length})
              </h2>

              {/* Comment Form - PHP ready */}
              <form action="/submit.php" method="POST" className="bg-muted rounded-lg p-6 mb-8">
                <input type="hidden" name="article_id" value={id} />
                <h3 className="font-semibold mb-4">Tinggalkan Komentar</h3>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Nama"
                    required
                    className="px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-secondary"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    className="px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-secondary"
                  />
                </div>
                <textarea
                  name="comment"
                  rows={4}
                  placeholder="Komentar Anda..."
                  required
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-secondary mb-4"
                ></textarea>
                <button
                  type="submit"
                  className="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-smooth font-semibold"
                >
                  Kirim Komentar
                </button>
              </form>
              {/* PHP will handle comment submission */}

              {/* Comments List */}
              <div className="space-y-6">
                {comments.map((comment) => (
                  <div key={comment.id} className="bg-card rounded-lg p-6 shadow-green">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-secondary font-semibold">
                          {comment.author.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-semibold">{comment.author}</span>
                          <span className="text-sm text-muted-foreground">•</span>
                          <span className="text-sm text-muted-foreground">{comment.date}</span>
                        </div>
                        <p className="text-card-foreground/80">{comment.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Related Articles */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Artikel Terkait</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {relatedArticles.map((related) => (
                  <Link
                    key={related.id}
                    to={`/articles/detail/${related.id}`}
                    className="bg-card rounded-lg overflow-hidden shadow-green hover:shadow-green-md transition-smooth group"
                  >
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={related.image} 
                        alt={related.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-smooth"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-semibold mb-2 group-hover:text-secondary transition-smooth">
                        {related.title}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {related.date}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </article>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ArticleDetail;
