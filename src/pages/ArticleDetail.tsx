/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Calendar, User, Clock, Tag } from 'lucide-react';
import Header from '@/components/Header';   
import Footer from '@/components/Footer';
import { BASE_URL } from "@/utils/config";

const ArticleDetail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [article, setArticle] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArtikel = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${BASE_URL}/artikelDetail.php?id=${id}`);
        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.message || "Gagal mengambil data artikel");
        }
        const data = await res.json();

        // Pastikan tags selalu array
        if (typeof data.tags === 'string') {
          try {
            data.tags = JSON.parse(data.tags);
          } catch {
            data.tags = [];
          }
        }

        setArticle(data);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Terjadi kesalahan");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchArtikel();
  }, [id]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-muted py-4">
        <div className="container mx-auto px-4">
          <div className="text-sm text-muted-foreground">
            <Link to="/" className="hover:text-secondary">Beranda</Link> / 
            <Link to="/articles" className="hover:text-secondary"> Artikel</Link> / 
            <span className="text-foreground">
              {loading ? ' Loading...' : article ? ` ${article.judul}` : ' Tidak ditemukan'}
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1 py-12">
        <div className="container mx-auto px-4">
          {error && <div className="text-red-500 mb-6">{error}</div>}
          <article className="max-w-4xl mx-auto">
            {loading ? (
              // Skeleton Loading
              <div className="animate-pulse space-y-6">
                <div className="h-6 w-24 bg-gray-200 rounded"></div>
                <div className="h-10 bg-gray-300 rounded w-3/4"></div>
                <div className="flex gap-3 mt-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-4 bg-gray-200 rounded w-24"></div>
                  ))}
                </div>
                <div className="w-full h-96 bg-gray-300 rounded-lg"></div>
                <div className="space-y-3">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-4 bg-gray-200 rounded w-full"></div>
                  ))}
                </div>
                <div className="flex gap-2 mt-8">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-6 w-20 bg-gray-200 rounded-full"></div>
                  ))}
                </div>
              </div>
            ) : article ? (
              <>
                {/* Article Header */}
                <div className="mb-8">
                  <span className="inline-block bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm font-medium mb-4">
                    {article.kategori}
                  </span>
                  <h1 className="text-4xl md:text-5xl font-bold mb-6">{article.judul}</h1>

                  <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-6">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>{article.author}</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{article.tanggal}</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{article.waktu_baca}</span>
                    </div>
                  </div>

                  {/* Featured Image */}
                  <div className="rounded-lg overflow-hidden shadow-green-md mb-8">
                    <img
                      src={article.image}
                      alt={article.judul}
                      className="w-full h-96 object-cover"
                    />
                  </div>
                </div>

                {/* Article Body */}
                <div
                  className="prose prose-lg max-w-none mb-12"
                  style={{ color: 'hsl(var(--card-foreground))' }}
                  dangerouslySetInnerHTML={{ __html: article.konten }}
                />

                {/* Tags */}
                {Array.isArray(article.tags) && article.tags.length > 0 && (
                  <div className="mb-12 pb-8 border-b border-border">
                    <div className="flex items-center gap-2 mb-3">
                      <Tag className="h-5 w-5 text-secondary" />
                      <span className="font-semibold">Tags:</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {article.tags.map((tag: string) => (
                        <a
                          key={tag}
                          className="px-3 py-1 bg-muted hover:bg-secondary hover:text-secondary-foreground rounded-full text-sm transition-smooth"
                        >
                          {tag}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div>Artikel tidak ditemukan</div>
            )}
          </article>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ArticleDetail;
