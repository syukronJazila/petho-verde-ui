import { MapPin, Phone, Mail, Clock, Facebook, Instagram, MessageCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Contact = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: 'Bagaimana cara memulai budidaya tanaman herbal?',
      answer: 'Untuk pemula, kami merekomendasikan memulai dengan tanaman yang mudah dirawat seperti mint, basil, atau lidah buaya. Lihat panduan budidaya kami untuk instruksi lengkap.',
    },
    {
      question: 'Apakah PETHOFAR menjual bibit tanaman?',
      answer: 'Saat ini kami fokus menyediakan informasi dan edukasi. Namun, kami dapat merekomendasikan penjual bibit terpercaya di area Anda.',
    },
    {
      question: 'Bagaimana cara bergabung dengan komunitas?',
      answer: 'Anda dapat bergabung dengan diskusi di forum kami atau mengikuti sosial media kami untuk update terbaru dan tips harian.',
    },
    {
      question: 'Apakah konsultasi gratis?',
      answer: 'Ya, Anda dapat bertanya melalui forum diskusi kami atau mengirim pertanyaan melalui formulir kontak. Tim kami akan merespons secepatnya.',
    },
    {
      question: 'Bagaimana cara berkontribusi artikel?',
      answer: 'Kami menerima kontribusi artikel dari ahli herbal dan praktisi. Silakan hubungi kami melalui email dengan proposal artikel Anda.',
    },
  ];

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
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Left Column: Contact Info */}
            <div>
              <h2 className="text-3xl font-bold mb-8">Informasi Kontak</h2>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Alamat</h3>
                    <p className="text-muted-foreground">
                      Jl. Raya Tanaman Herbal No. 123<br />
                      Jakarta Selatan, DKI Jakarta 12345<br />
                      Indonesia
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Telepon</h3>
                    <p className="text-muted-foreground">
                      +62 812-3456-7890<br />
                      +62 21-1234-5678
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className="text-muted-foreground">
                      info@pethofar.com<br />
                      support@pethofar.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
                    <Clock className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Jam Operasional</h3>
                    <p className="text-muted-foreground">
                      Senin - Jumat: 09:00 - 17:00<br />
                      Sabtu: 09:00 - 14:00<br />
                      Minggu: Tutup
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-muted rounded-lg p-6">
                <h3 className="font-semibold mb-4">Ikuti Kami</h3>
                <div className="flex gap-4">
                  <a 
                    href="https://instagram.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center hover:bg-secondary/90 transition-smooth"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a 
                    href="https://facebook.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center hover:bg-secondary/90 transition-smooth"
                  >
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a 
                    href="https://wa.me/6281234567890" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center hover:bg-secondary/90 transition-smooth"
                  >
                    <MessageCircle className="h-5 w-5" />
                  </a>
                </div>
              </div>

              {/* Map Embed */}
              <div className="mt-8 rounded-lg overflow-hidden shadow-green-md">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d106.8195613!3d-6.2087634!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5d2e764b12d%3A0x3d2ad6e1e0e9bcc8!2sJakarta!5e0!3m2!1sen!2sid!4v1234567890"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="PETHOFAR Location"
                ></iframe>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div>
              <div className="bg-card rounded-lg p-8 shadow-green-md">
                <h2 className="text-3xl font-bold mb-6">Kirim Pesan</h2>
                
                {/* PHP-ready contact form */}
                <form action="/submit.php" method="POST" encType="multipart/form-data" className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Nama Lengkap <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
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
                      rows={6}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-secondary"
                      placeholder="Tulis pesan Anda di sini..."
                    ></textarea>
                  </div>

                  <div>
                    <label htmlFor="attachment" className="block text-sm font-medium mb-2">
                      Lampiran (Opsional)
                    </label>
                    <input
                      type="file"
                      id="attachment"
                      name="attachment"
                      accept="image/*,.pdf,.doc,.docx"
                      className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-secondary file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-secondary file:text-secondary-foreground file:cursor-pointer"
                    />
                    <p className="text-xs text-muted-foreground mt-2">
                      Format: JPG, PNG, PDF, DOC (Max 5MB)
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="consent"
                      name="consent"
                      required
                      className="mt-1 w-4 h-4 rounded border-input text-secondary focus:ring-2 focus:ring-secondary"
                    />
                    <label htmlFor="consent" className="text-sm text-muted-foreground">
                      Saya setuju bahwa data yang saya berikan akan digunakan untuk merespons pertanyaan saya sesuai dengan kebijakan privasi.
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full px-6 py-4 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-smooth font-semibold text-lg"
                  >
                    Kirim Pesan
                  </button>
                </form>
                {/* PHP will access $_POST['nama'], $_POST['email'], etc. */}
              </div>
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
