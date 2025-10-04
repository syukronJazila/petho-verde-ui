import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Contact = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: 'Apa tujuan utama dari website PETHOFAR?',
      answer: 'PETHOFAR dibuat untuk membantu masyarakat mengenal berbagai jenis tanaman herbal, manfaatnya untuk kesehatan, dan cara penggunaannya dalam kehidupan sehari-hari secara sederhana dan mudah dipahami.',
    },
    {
      question: 'Apakah semua informasi di PETHOFAR bersifat medis?',
      answer: 'Tidak. Informasi di PETHOFAR bersifat edukatif dan bertujuan memberikan wawasan umum tentang tanaman herbal. Untuk kebutuhan medis atau pengobatan tertentu, sebaiknya tetap berkonsultasi dengan tenaga kesehatan profesional.',
    },
    {
      question: 'Apakah saya bisa meminta rekomendasi tanaman untuk keluhan tertentu?',
      answer: 'Kami tidak memberikan saran medis secara langsung, tetapi Anda dapat membaca artikel atau mengajukan pertanyaan melalui formulir kontak. Tim kami akan membantu mengarahkan ke artikel atau sumber bacaan yang relevan.',
    },
    {
      question: 'Bagaimana cara ikut berkontribusi di PETHOFAR?',
      answer: 'Anda bisa mengirim ide tulisan, pengalaman pribadi, atau artikel seputar tanaman herbal melalui formulir kontak. Kami senang berbagi ruang dengan siapa pun yang peduli pada gaya hidup alami.',
    },
    {
      question: 'Apakah informasi di PETHOFAR dapat dibagikan ulang?',
      answer: 'Tentu saja boleh, selama mencantumkan sumber dari PETHOFAR dan tidak digunakan untuk tujuan komersial. Kami mendukung penyebaran informasi bermanfaat tentang tanaman herbal secara terbuka.',
    },
  ];

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    consent: false,
  });

  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // cegah reload halaman
    setLoading(true);
    setResponseMsg("");

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("subject", form.subject);
    formData.append("message", form.message);
    if (form.consent) formData.append("consent", "1");

    try {
      const res = await fetch("http://localhost/pethofar/submitKontak.php", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        setResponseMsg(data.message || "Terjadi kesalahan!");
      } else {
        setResponseMsg(data.message || "Pesan berhasil dikirim!");
        setForm({ name: "", email: "", subject: "", message: "", consent: false });
      }
    } catch (err) {
      setResponseMsg("Terjadi kesalahan koneksi!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Header Section */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Hubungi Kami</h1>
          <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
            Ada pertanyaan? Kami siap membantu Anda dengan informasi seputar tanaman herbal
          </p>
        </div>
      </section>

      <div className="flex-1 py-16">
        <div className="container mx-auto px-4">
          {/* Form Section */}
          <div className="flex justify-center mb-16">
            <div className="w-full max-w-3xl bg-card rounded-2xl p-10 shadow-lg border border-border/50 relative z-10">
              <h2 className="text-3xl font-bold mb-6 text-center text-foreground">Kirim Pesan</h2>
              <p className="text-muted-foreground text-center mb-8">
                Punya pertanyaan atau ingin berbagi pengalaman seputar tanaman herbal? Isi formulir di bawah dan kami akan segera merespons.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Nama Lengkap <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={(e) => setForm({...form, name: e.target.value})}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-secondary"
                    placeholder="Masukkan nama lengkap"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={(e) => setForm({...form, email: e.target.value})}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-secondary"
                    placeholder="nama@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    Subjek <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={form.subject}
                    onChange={(e) => setForm({...form, subject: e.target.value})}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-secondary"
                    placeholder="Topik pesan Anda"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Pesan <span className="text-destructive">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({...form, message: e.target.value})}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-secondary"
                    placeholder="Tulis pesan Anda di sini..."
                  ></textarea>
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="consent"
                    name="consent"
                    checked={form.consent}
                    onChange={(e) => setForm({...form, consent: e.target.checked})}
                    required
                    className="mt-1 w-4 h-4 rounded border-input text-secondary focus:ring-2 focus:ring-secondary"
                  />
                  <label htmlFor="consent" className="text-sm text-muted-foreground">
                    Saya menyetujui penggunaan data ini untuk keperluan komunikasi sesuai kebijakan privasi.
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-6 py-4 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-smooth font-semibold text-lg"
                >
                  {loading ? "Mengirim..." : "Kirim Pesan"}
                </button>

                {/* Response message */}
                {responseMsg && (
                  <p className={`mt-4 text-sm ${responseMsg.toLowerCase().includes("berhasil") ? "text-green-600" : "text-red-600"}`}>
                    {responseMsg}
                  </p>
                )}
              </form>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Pertanyaan yang Sering Diajukan (FAQ)</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-card rounded-lg shadow-green overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-muted transition-smooth"
                  >
                    <span className="font-semibold pr-4">{faq.question}</span>
                    {openFaq === index ? (
                      <ChevronUp className="h-5 w-5 text-secondary flex-shrink-0" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-secondary flex-shrink-0" />
                    )}
                  </button>
                  {openFaq === index && (
                    <div className="px-6 pb-4 text-muted-foreground">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
