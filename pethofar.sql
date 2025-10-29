-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 27, 2025 at 08:12 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pethofar`
--

-- --------------------------------------------------------

--
-- Table structure for table `artikel`
--

CREATE TABLE `artikel` (
  `id` int(11) NOT NULL,
  `judul` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `author` varchar(100) NOT NULL,
  `tanggal` date NOT NULL,
  `waktu_baca` varchar(20) DEFAULT NULL,
  `kategori` varchar(50) DEFAULT NULL,
  `tags` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`tags`)),
  `konten` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `artikel`
--

INSERT INTO `artikel` (`id`, `judul`, `image`, `author`, `tanggal`, `waktu_baca`, `kategori`, `tags`, `konten`) VALUES
(1, '10 Tanaman Herbal untuk Meningkatkan Imunitas', 'http://localhost/pethofar/gambar/ginger.jpg', '2', '2025-10-01', '5 menit', 'Kesehatan', '[\"Imunitas\",\"Kesehatan\",\"Herbal\",\"Pencegahan\"]', '<p>Di tengah pandemi global dan meningkatnya risiko penyakit musiman, meningkatkan sistem kekebalan tubuh menjadi prioritas. Tanaman herbal telah digunakan berabad-abad untuk mendukung kesehatan secara alami.</p>\r\n<h2>Mengapa Tanaman Herbal Penting?</h2>\r\n<p>Tanaman herbal mengandung senyawa bioaktif, vitamin, mineral, dan antioksidan yang membantu tubuh melawan infeksi. Mereka bekerja secara holistik dibanding obat sintetis.</p>\r\n<h2>10 Tanaman Herbal Terbaik</h2>\r\n<h3>1. Jahe (Zingiber officinale)</h3>\r\n<p>Jahe mengandung gingerol yang bersifat anti-inflamasi dan antioksidan. Mengonsumsi teh jahe secara rutin dapat membantu meningkatkan respon imun terhadap infeksi.</p>\r\n<h3>2. Kunyit (Curcuma longa)</h3>\r\n<p>Kurkumin dalam kunyit adalah antioksidan kuat yang dapat mengurangi peradangan dan mendukung sistem imun. Cocok dikonsumsi sebagai jamu atau bumbu masakan.</p>\r\n<h3>3. Echinacea</h3>\r\n<p>Meningkatkan produksi sel darah putih, membantu tubuh melawan infeksi. Cocok untuk dikonsumsi saat gejala awal flu atau pilek.</p>\r\n<h3>4. Bawang Putih (Allium sativum)</h3>\r\n<p>Bawang putih meningkatkan imunitas dengan sifat antimikroba dan antivirus alami.</p>\r\n<h3>5. Daun Mint</h3>\r\n<p>Memberi efek menenangkan dan mengandung antioksidan yang mendukung kesehatan pernapasan.</p>\r\n<h3>6. Lemon</h3>\r\n<p>Sumber vitamin C alami, membantu produksi sel imun dan melawan radikal bebas.</p>\r\n<h3>7. Madu</h3>\r\n<p>Bersifat antibakteri dan antioksidan, meningkatkan daya tahan tubuh dan membantu meredakan sakit tenggorokan.</p>\r\n<h3>8. Kayu Manis</h3>\r\n<p>Memiliki efek anti-inflamasi dan dapat membantu mengatur kadar gula darah.</p>\r\n<h3>9. Teh Hijau</h3>\r\n<p>Kaya katekin yang meningkatkan kemampuan sel imun dalam melawan virus.</p>\r\n<h3>10. Kencur (Kaempferia galanga)</h3>\r\n<p>Digunakan dalam jamu tradisional untuk meningkatkan stamina dan daya tahan tubuh.</p>\r\n<blockquote>\"Alam telah menyediakan segala yang kita butuhkan untuk menjaga kesehatan. Kita hanya perlu tahu bagaimana menggunakannya.\" - Hippocrates</blockquote>\r\n<h2>Cara Mengonsumsi</h2>\r\n<ul>\r\n<li>Buat teh herbal dengan mencampurkan beberapa tanaman</li>\r\n<li>Tambahkan sebagai bumbu dalam masakan sehari-hari</li>\r\n<li>Konsumsi dalam bentuk suplemen jika perlu</li>\r\n<li>Gunakan sebagai minuman jamu tradisional</li>\r\n</ul>\r\n<h2>Tips Penggunaan</h2>\r\n<p>Konsumsi secara konsisten dan sesuai dosis. Konsultasikan dengan ahli herbal atau dokter jika memiliki kondisi kesehatan khusus atau sedang mengonsumsi obat tertentu.</p>'),
(2, 'Cara Budidaya Jahe di Rumah untuk Pemula', 'http://localhost/pethofar/gambar/turmeric.jpg', '1', '2025-09-28', '7 menit', 'Budidaya', '[\"Budidaya\",\"Jahe\",\"Rumah\"]', '<p>Budidaya jahe di rumah dapat dilakukan dalam pot, cocok untuk pemula. Jahe dapat dipanen dalam 8-10 bulan.</p>\r\n<h2>Persiapan Media Tanam</h2>\r\n<p>Gunakan tanah gembur, kompos, dan pasir dengan perbandingan 2:1:1. Pilih rimpang sehat dengan 2–3 mata tunas.</p>\r\n<h2>Penanaman</h2>\r\n<p>Tanam rimpang sedalam 5 cm, beri jarak minimal 20 cm antar rimpang. Siram secukupnya untuk menjaga kelembaban.</p>\r\n<h2>Perawatan</h2>\r\n<p>Siram 2–3 kali seminggu, jangan berlebihan. Pastikan tanaman mendapat sinar matahari 4-6 jam per hari, bersihkan gulma, dan gemburkan tanah setiap 2 minggu.</p>\r\n<h2>Pemupukan</h2>\r\n<p>Pupuk organik cair setiap 2 minggu atau pupuk kandang matang setiap bulan untuk kesuburan tanah.</p>\r\n<h2>Hama</h2>\r\n<p>Waspadai ulat daun dan kutu putih. Gunakan pestisida nabati dari daun mimba atau bawang putih.</p>\r\n<h2>Panen</h2>\r\n<p>Rimpang jahe siap dipanen setelah 8-10 bulan. Gunakan pisau bersih untuk mengurangi kerusakan rimpang.</p>'),
(3, 'Manfaat Lavender untuk Kesehatan Mental', 'http://localhost/pethofar/gambar/lavender.jpg', '1', '2025-09-25', '6 menit', 'Kesehatan', '[\"Lavender\",\"Kesehatan Mental\",\"Relaksasi\"]', '<p>Lavender terkenal sebagai tanaman aromaterapi. Aromanya menenangkan sistem saraf, mengurangi stres, dan meningkatkan kualitas tidur.</p>\r\n<h2>Efek Lavender</h2>\r\n<p>Minyak esensial lavender dapat meredakan kecemasan ringan, sakit kepala, dan depresi ringan.</p>\r\n<h2>Cara Penggunaan</h2>\r\n<ul>\r\n<li>Tambahkan beberapa tetes minyak esensial ke diffuser</li>\r\n<li>Buat teh lavender untuk relaksasi</li>\r\n<li>Gunakan sebagai campuran dalam mandi air hangat</li>\r\n</ul>'),
(4, 'Resep Jamu Tradisional dengan Kunyit', 'http://localhost/pethofar/gambar/turmeric.jpg', '3', '2025-09-20', '4 menit', 'Resep', '[\"Jamu\",\"Kunyit\",\"Tradisional\"]', '<p>Jamu kunyit dikenal memiliki efek anti-inflamasi dan meningkatkan imunitas. Berikut beberapa resep praktis:</p>\r\n<h2>Resep 1: Jamu Kunyit Asam</h2>\r\n<p>Campurkan kunyit, asam jawa, gula merah, dan air hangat. Saring dan minum pagi hari.</p>\r\n<h2>Resep 2: Jamu Kunyit Jahe</h2>\r\n<p>Kunyit dan jahe dihaluskan, rebus dengan air, tambahkan madu secukupnya.</p>\r\n<h2>Tips</h2>\r\n<p>Konsumsi rutin 1 gelas per hari untuk kesehatan optimal.</p>'),
(5, 'Perawatan Lidah Buaya untuk Hasil Maksimal', 'http://localhost/pethofar/gambar/aloe.jpg', '2', '2025-09-15', '5 menit', 'Perawatan', '[\"Lidah Buaya\",\"Perawatan\",\"Tips\"]', '<p>Lidah buaya mudah ditanam di pot atau tanah langsung. Membutuhkan cahaya cukup dan penyiraman teratur.</p>\r\n<h2>Penyiraman</h2>\r\n<p>Siram tanah saat permukaan kering, hindari berlebihan.</p>\r\n<h2>Pemupukan</h2>\r\n<p>Pupuk kandang atau pupuk organik cair setiap 1 bulan sekali.</p>\r\n<h2>Manfaat</h2>\r\n<p>Lidah buaya digunakan untuk kulit, rambut, dan kesehatan pencernaan.</p>'),
(6, 'Mint: Dari Kebun ke Dapur', 'http://localhost/pethofar/gambar/mint.jpg', '1', '2025-09-10', '8 menit', 'Kuliner', '[\"Mint\",\"Kuliner\",\"Tanaman\"]', '<p>Mint bisa ditanam di pot maupun kebun. Cocok untuk campuran masakan, teh, dan minuman segar.</p>\r\n<h2>Penanaman</h2>\r\n<p>Pilih media gembur, cukup cahaya, dan siram teratur.</p>\r\n<h2>Panen</h2>\r\n<p>Daun mint bisa dipetik kapan saja setelah tanaman cukup besar.</p>'),
(7, 'Tips Tanaman Organik di Rumah', 'http://localhost/pethofar/gambar/ginger.jpg', '3', '2025-08-22', '6 menit', 'Organik', '[\"Tanaman Organik\",\"Kebun Rumah\",\"Tips\"]', '<p>Kebun organik menggunakan pupuk alami dan tanpa pestisida kimia. Cocok untuk pemula yang ingin menanam sayuran dan herbal.</p>\r\n<h2>Mulai dari Tanaman Mudah</h2>\r\n<p>Seperti selada, kangkung, dan herbal seperti basil dan mint.</p>\r\n<h2>Perawatan</h2>\r\n<p>Siram teratur, gunakan kompos, dan hindari pestisida kimia.</p>\r\n<h2>Manfaat</h2>\r\n<p>Hasil panen lebih sehat dan aman untuk keluarga.</p>');

-- --------------------------------------------------------

--
-- Table structure for table `budidaya`
--

CREATE TABLE `budidaya` (
  `id` int(11) NOT NULL,
  `judul` varchar(255) DEFAULT NULL,
  `image` varchar(255) NOT NULL,
  `kategori` varchar(50) DEFAULT NULL,
  `nama_tanaman` varchar(100) NOT NULL,
  `type` varchar(50) DEFAULT NULL,
  `waktu_tanam` varchar(50) DEFAULT NULL,
  `kutipan` text DEFAULT NULL,
  `cara_tanam` text DEFAULT NULL,
  `perawatan` text DEFAULT NULL,
  `pupuk` text DEFAULT NULL,
  `penyiraman` text DEFAULT NULL,
  `hama` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `budidaya`
--

INSERT INTO `budidaya` (`id`, `judul`, `image`, `kategori`, `nama_tanaman`, `type`, `waktu_tanam`, `kutipan`, `cara_tanam`, `perawatan`, `pupuk`, `penyiraman`, `hama`, `created_at`) VALUES
(1, 'Cara Menanam Jahe di Pot', 'http://localhost/pethofar/gambar/jahe.jpg', '1', 'Jahe', 'Rimpang / Herbal', '8-10 bulan', 'Teknik budidaya jahe dalam pot yang mudah dilakukan di rumah.', 'Gunakan pot berdiameter minimal 30 cm. Isi dengan tanah gembur dan kompos. Tanam rimpang jahe yang memiliki 2–3 mata tunas sedalam 5 cm. Jangan lupa disiram.', 'Letakkan pot di tempat yang mendapat cahaya matahari cukup, siram secara rutin 1–2 kali seminggu, jangan terlalu basah.', 'Berikan pupuk organik cair setiap 2 minggu sekali untuk menjaga kesuburan.', 'Siram sesuai kebutuhan, jangan sampai tergenang air.', 'Hama yang biasa menyerang jahe adalah ulat daun dan tungau. Gunakan pestisida nabati bila perlu.', '2025-10-04 10:17:22'),
(2, 'Cara Menanam Kunyit di Pot', 'http://localhost/pethofar/gambar/kunyit.png', '1', 'Kunyit', 'Rimpang / Herbal', '8-10 bulan', 'Teknik budidaya kunyit dalam pot yang cocok untuk lahan terbatas di perkotaan.', 'Gunakan pot berdiameter minimal 30 cm. Isi dengan campuran tanah gembur, kompos, dan pasir 2:1:1. Tanam rimpang kunyit 2–3 mata tunas sedalam 5 cm.', 'Letakkan pot di tempat yang mendapat sinar matahari 4–6 jam sehari. Tanah tetap lembab tapi tidak becek. Bersihkan gulma setiap 2 minggu.', 'Gunakan pupuk organik cair setiap 2 minggu atau pupuk kandang matang setiap 1 bulan.', 'Siram 2–3 kali seminggu tergantung cuaca, hindari berlebihan.', 'Hama: ulat daun dan kutu putih. Gunakan pestisida nabati dari daun mimba atau bawang putih.', '2025-10-04 10:17:22'),
(3, 'Cara Menanam Mengkudu di Pot', 'http://localhost/pethofar/gambar/mengkudu.png', '4', 'Mengkudu', 'Buah / Herbal', '10-12 bulan', 'Budidaya mengkudu dalam pot agar mudah di rumah.', 'Gunakan pot besar 40–50 cm. Tanam bibit mengkudu yang sehat sedalam 5–10 cm. Gunakan media campuran tanah, kompos, dan pasir.', 'Sinar matahari cukup, siram rutin agar tanah tetap lembab. Gemburkan tanah setiap 2 minggu.', 'Berikan pupuk organik cair 2 minggu sekali.', 'Siram 2–3 kali seminggu.', 'Hama: ulat dan kutu putih. Gunakan pestisida nabati bila perlu.', '2025-10-04 10:17:22'),
(4, 'Cara Menanam Bawang Putih di Pot', 'http://localhost/pethofar/gambar/bawang_putih.png', '1', 'Bawang Putih', 'Umbi / Herbal', '6-8 bulan', 'Teknik menanam bawang putih di pot yang efisien.', 'Gunakan pot 20–30 cm, media tanah gembur dan kompos. Tanam siung bawang putih sedalam 2–3 cm.', 'Letakkan di tempat terang. Tanah harus lembab tapi tidak tergenang. Bersihkan gulma setiap minggu.', 'Berikan pupuk organik cair setiap 2 minggu.', 'Siram 2–3 kali seminggu tergantung cuaca.', 'Hama: thrips dan ulat daun. Gunakan pestisida nabati bila perlu.', '2025-10-04 10:17:22'),
(5, 'Cara Menanam Asam Jawa di Pot', 'http://localhost/pethofar/gambar/asam_jawa.png', '2', 'Asam Jawa', 'Polong / Herbal', '12-18 bulan', 'Budidaya asam jawa dalam pot yang cocok untuk pekarangan rumah.', 'Gunakan pot besar 50 cm. Tanam biji atau bibit muda sedalam 2–3 cm.', 'Letakkan di tempat terbuka dengan sinar matahari cukup. Siram rutin agar tanah lembab.', 'Pupuk organik cair 2 minggu sekali.', 'Siram 2–3 kali seminggu.', 'Hama: kutu putih dan ulat. Gunakan pestisida nabati bila perlu.', '2025-10-04 10:17:22'),
(6, 'Cara Menanam Jeruk Nipis di Pot', 'http://localhost/pethofar/gambar/jeruk_nipis.png', '2', 'Jeruk Nipis', 'Buah / Herbal', '10–12 bulan', 'Budidaya jeruk nipis di pot untuk konsumsi di rumah.', 'Gunakan pot besar 40–50 cm. Tanam bibit sehat sedalam 5–10 cm.', 'Sinar matahari cukup, siram rutin agar tanah lembab.', 'Pupuk organik cair setiap 2 minggu.', 'Siram 2–3 kali seminggu.', 'Hama: kutu daun dan ulat. Gunakan pestisida nabati bila perlu.', '2025-10-04 10:17:22'),
(7, 'Cara Menanam Daun Saga di Pot', 'http://localhost/pethofar/gambar/daun_saga.png', '4', 'Daun Saga', 'Daun / Herbal', '6-8 bulan', 'Budidaya daun saga rambat dalam pot agar mudah di rumah.', 'Gunakan pot besar 30–40 cm. Tanam bibit sehat sedalam 5 cm.', 'Letakkan di tempat terang, siram rutin agar tanah lembab. Gemburkan tanah setiap 2 minggu.', 'Pupuk organik cair setiap 2 minggu.', 'Siram 2–3 kali seminggu.', 'Hama: ulat daun dan kutu. Gunakan pestisida nabati bila perlu.', '2025-10-04 10:17:22'),
(8, 'Cara menaman Lidah Buaya', 'http://localhost/pethofar/uploads/1759681867_lidah buaya.jpg', '2', 'Lidah Buaya', 'Tanam', 'Awal Bulan', 'Jelajahi teknik mutakhir untuk menaman lidah mertua', 'tes', 'Di rawat', 'NPK', '2x sehari', 'Belalang', '2025-10-05 16:26:28');

-- --------------------------------------------------------

--
-- Table structure for table `fakta_singkat`
--

CREATE TABLE `fakta_singkat` (
  `id` int(11) NOT NULL,
  `tanaman_id` int(11) NOT NULL,
  `air` varchar(100) DEFAULT NULL,
  `cahaya` varchar(150) DEFAULT NULL,
  `iklim` varchar(100) DEFAULT NULL,
  `panen` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `fakta_singkat`
--

INSERT INTO `fakta_singkat` (`id`, `tanaman_id`, `air`, `cahaya`, `iklim`, `panen`) VALUES
(9, 1, 'Sedang (2-3 hari sekali)', 'Cahaya sedang hingga terang', 'Hangat dan lembab', '3-4 bulan'),
(10, 2, 'Sedang (2-3 hari sekali)', 'Cahaya penuh', 'Hangat dan lembab', '3-4 bulan'),
(11, 3, 'Sedang', 'Cahaya penuh', 'Tropis, hangat', '6-8 bulan'),
(12, 4, 'Jarang (3-5 hari sekali)', 'Cahaya penuh', 'Hangat dan kering', '4-6 bulan'),
(13, 5, 'Sedang', 'Cahaya penuh', 'Tropis', '8-10 bulan'),
(14, 6, 'Sedang', 'Cahaya penuh', 'Tropis, hangat', '6 bulan'),
(15, 7, 'Sedang', 'Cahaya penuh', 'Tropis', '4-6 bulan'),
(16, 8, 'Sedang', 'Cahaya sedang', 'Tropis', '3 bulan');

-- --------------------------------------------------------

--
-- Table structure for table `kategori_tanaman`
--

CREATE TABLE `kategori_tanaman` (
  `id` int(11) NOT NULL,
  `nama_kategori` varchar(30) NOT NULL,
  `deskripsi` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `kategori_tanaman`
--

INSERT INTO `kategori_tanaman` (`id`, `nama_kategori`, `deskripsi`) VALUES
(1, 'Rempah', 'Tanaman yang digunakan sebagai bumbu atau obat tradisional'),
(2, 'Buah', 'Tanaman yang menghasilkan buah dengan khasiat herbal'),
(3, 'Daun', 'Tanaman yang digunakan bagian daunnya untuk pengobatan'),
(4, 'Obat', 'Kategori tanaman yang digunakan secara tradisional maupun modern untuk tujuan pengobatan dan perawatan kesehatan alami.');

-- --------------------------------------------------------

--
-- Table structure for table `kontak`
--

CREATE TABLE `kontak` (
  `id` int(11) UNSIGNED NOT NULL,
  `nama_lengkap` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `subjek` varchar(255) NOT NULL,
  `pesan` text NOT NULL,
  `consent` tinyint(1) NOT NULL DEFAULT 0,
  `tanggal` timestamp NOT NULL DEFAULT current_timestamp(),
  `is_read` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `kontak`
--

INSERT INTO `kontak` (`id`, `nama_lengkap`, `email`, `subjek`, `pesan`, `consent`, `tanggal`, `is_read`) VALUES
(1, 'tes', 'tes@gmail.com', 'pesan pertama', 'Halo dunia!!!', 1, '2025-10-04 11:29:18', 1),
(2, 'tes', 'tes@gmail.com', 'pesan pertama', 'Halo dunia!!!', 1, '2025-10-04 11:29:34', 1),
(3, 'tes', 'tes@gmail.com', 'pesan pertama', 'Halo dunia!!!', 1, '2025-10-04 11:33:33', 1),
(4, 'user', 'user@gmail.com', 'tes 3', 'tes ketiga', 1, '2025-10-04 11:38:15', 1);

-- --------------------------------------------------------

--
-- Table structure for table `manfaat`
--

CREATE TABLE `manfaat` (
  `id` int(11) NOT NULL,
  `tanaman_id` int(11) NOT NULL,
  `manfaat` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `manfaat`
--

INSERT INTO `manfaat` (`id`, `tanaman_id`, `manfaat`) VALUES
(1, 1, 'Menghangatkan tubuh'),
(2, 1, 'Meredakan mual'),
(3, 1, 'Meningkatkan metabolisme'),
(4, 1, 'Membantu sistem pencernaan'),
(5, 1, 'Mengurangi peradangan'),
(6, 2, 'Anti-inflamasi'),
(7, 2, 'Meningkatkan daya tahan tubuh'),
(8, 2, 'Mengurangi rasa sakit'),
(9, 2, 'Antiseptik alami'),
(10, 3, 'Meningkatkan imun tubuh'),
(11, 3, 'Mengobati radang dan infeksi'),
(12, 3, 'Meredakan sakit perut dan gangguan pencernaan'),
(13, 4, 'Meningkatkan sistem imun'),
(14, 4, 'Menurunkan tekanan darah'),
(15, 4, 'Antivirus alami'),
(16, 4, 'Mengurangi kolesterol'),
(17, 5, 'Menurunkan panas'),
(18, 5, 'Meredakan batuk dan sakit tenggorokan'),
(19, 5, 'Melancarkan pencernaan'),
(20, 6, 'Meningkatkan daya tahan tubuh'),
(21, 6, 'Meredakan batuk'),
(22, 6, 'Antioksidan alami'),
(23, 7, 'Mengatasi infeksi ringan'),
(24, 7, 'Meredakan batuk dan radang'),
(25, 7, 'Antioksidan'),
(73, 8, 'Menumbuhkan rambut'),
(74, 8, 'Menenangkan kulit'),
(75, 8, 'Anti-inflamasi');

-- --------------------------------------------------------

--
-- Table structure for table `tanaman`
--

CREATE TABLE `tanaman` (
  `id` int(11) NOT NULL,
  `nama_tanaman` varchar(30) NOT NULL,
  `nama_lain` varchar(58) DEFAULT NULL,
  `kategori_id` int(11) DEFAULT NULL,
  `deskripsi` text DEFAULT NULL,
  `link_gambar` varchar(250) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `referensi` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`referensi`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tanaman`
--

INSERT INTO `tanaman` (`id`, `nama_tanaman`, `nama_lain`, `kategori_id`, `deskripsi`, `link_gambar`, `created_at`, `referensi`) VALUES
(1, 'Jahe', 'Zingiber officinale Rosc.', 1, 'Jahe (Zingiber officinale Rosc.) merupakan tanaman rempah-rempah yang berasal dari Asia Selatan dan telah tersebar luas ke seluruh penjuru dunia, termasuk Indonesia. Jahe mengandung berbagai kelompok senyawa metabolit sekunder, diantaranya alkaloid, flavonoid, fenolik, triterpenoid, dan saponin. Kandungan alkaloid pada rimpang jahe bermanfaat sebagai obat batuk (Sari & Nasuha, 2021).', 'http://localhost/pethofar/gambar/jahe.jpg', '2025-10-04 02:33:43', '[\"Sari & Nasuha, 2021\", \"Buku Herbal Indonesia, 2020\"]'),
(2, 'Kunyit', 'Curcuma longa', 1, 'Kunyit (curcuma longa) termasuk tanaman fitofarmaka. Bagian yang digunakan untuk herbal adalah rimpang atau umbinya. Kandungan kunyit adalah minyak atsiri, kurkumin, dimetoksin kurkumin, arbinosa, fluktosa, glukosa, pati, tannin, magnesium besi, kalsium, natrium, dan kalium. Kunyit bisa mengobati sakit tenggorokan dan batuk pilek. Selain itu, kunyit juga memiliki kandungan antiseptic yang membantu mengobati infeksi virus. (Azizah & Kurniati, 2020).', 'http://localhost/pethofar/gambar/kunyit.png', '2025-10-04 02:33:43', '[\"Azizah & Kurniati, 2020\", \"Journal of Herbal Medicine, 2019\"]'),
(3, 'Mengkudu', 'Morinda citrifolia L.', 2, 'Mengkudu (Morinda citrifolia L.) telah digunakan untuk obat tradisional di Indonesia karena kemampuan menyembuhkan berbagai macam penyakit. Salah satu kandungan dari mengkudu adalah skopoletin yang berfungsi sebagai anti-bakteri, anti-virus, anti-jamur, anti-tumor, dan penambah kekebalan tubuh. Dalam pengobatan tradisional, mengkudu digunakan untuk obat batuk, radang amandel, seriawan, tekanan darah tinggi, beri-beri, melancarkan kencing, radang ginjal, radang empedu, radang usus, sembelit, limpa, lever, kencing manis, cacingan, cacar air, sakit pinggang, sakit perut, masuk angin, dan kegemukan (Pahlani et al., 2022).', 'http://localhost/pethofar/gambar/mengkudu.png', '2025-10-04 02:33:43', '[\"Pahlani et al., 2022\", \"Buku Tanaman Obat Nusantara, 2021\"]'),
(4, 'Bawang Putih', 'Allium sativum L.', 1, 'Bawang putih (Allium sativum L.) merupakan tanaman dari keluarga Alliaceae. Tanaman ini memiliki kisaran tinggi 20-40 cm dengan umbi yang memiliki bau yang kuat dan rasa yang tajam. Hasil penelitian (Andi Fajrul Islam et al., 2024) menunjukan bahwa dari semua literature yang digunakan majoritas menunjukan adanya pengaruh pada saat pemberian bawang putih terhadap influenza dan batuk. Pemberian bawang putih mampu memberikan efek penyembuhan terhadap influenza dan batuk dikarenakan kandungan Allicin pada bawang putih. Bawang putih (Allium sativum L.) kaya akan alliin, allicin, ajoenes, vinyldithiins, dan flavonoid.', 'http://localhost/pethofar/gambar/bawang_putih.png', '2025-10-04 02:33:43', '[\"Andi Fajrul Islam et al., 2024\", \"Buku Herbal Modern, 2022\"]'),
(5, 'Asam Jawa', 'Tamarindus indica L.', 2, 'Asam jawa (Tamarindus indica L.) merupakan suatu tumbuhan tropis dan termasuk tumbuhan berbuah polong. Asam jawa memiliki efek herbal antipiretik juga (penurun panas). Khasiat buah asam adalah mengobati demam, sariawan, kencing manis, asma, dan haid tidak lancar, batuk kering disertai dengan rasa gatal dan perih di tenggorokan (Azizah & Kurniati, 2020).', 'http://localhost/pethofar/gambar/asam_jawa.png', '2025-10-04 02:33:43', '[\"Azizah & Kurniati, 2020\", \"Buku Herbal Tropis, 2021\"]'),
(6, 'Jeruk Nipis', 'Citrus aurantifolia Swingle', 2, 'Jeruk nipis (Citrus aurantifolia Swingle) adalah tanaman herbal yang memiliki kandungan flavonoid yang memberikan berbagai macam aktivitas farmakologi. Kandungan utama flavonoid glikosida jeruk nipis adalah eriocitrin, hesperidin dan neoponcirin yang dapat menjadi anti bakteri, anti fungal, antioksidan, anti kanker, dan juga anti kolesterol sehingga dapat digunakan untuk meredakan batuk (Khotimah et al., 2023).', 'http://localhost/pethofar/gambar/jeruk_nipis.png', '2025-10-04 02:33:43', '[\"Khotimah et al., 2023\", \"Journal of Citrus Research, 2022\"]'),
(7, 'Daun Saga', 'Abrus precatorius L.', 3, 'Tanaman saga rambat (Abrus precatorius L). Tanaman ini tumbuh merambat yang banyak ditemukan tumbuh liar di hutan, ladang, sampai pekarangan rumah. Daun saga rambat memiliki bentuk bulat oval dengan ukuran daun yang kecil. Tanaman saga rambat memiliki senyawa aktivitas antioksidan, antivirus, antiinflamasi dan antibakteri, sehingga dapat digunakan sebagai obat herbal dalam mengatasi penyakit akibat bakteri, radikal bebas, virus, dan inflamasi.', 'http://localhost/pethofar/gambar/daun_saga.png', '2025-10-04 02:33:43', '[\"Shari, 2024\", \"Buku Herbal Nusantara, 2022\"]'),
(8, 'Lidah Buaya', 'Aloe vera', 2, 'Lidah buaya, tanaman multifungsi. Update deskripsi untuk testing.', 'http://localhost/pethofar/gambar/aloe.jpg', '2025-10-05 08:33:11', '[\"Buku Herbal Nusantara, 2021\",\"Journal of Aloe Research, 2022\"]');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` enum('admin','editor') NOT NULL DEFAULT 'editor'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `nama`, `email`, `password`, `role`) VALUES
(1, 'Admin', 'admin@pethofar.com', '$2y$10$9azZK1ny0.GW9iW0S.TPhOIfW8/LPfWG08Nl0alV/EOGruplaHKNy', 'admin'),
(2, 'Dr. Siti Rahayu', 'siti.rahayu@gmail.com', '$2y$10$9azZK1ny0.GW9iW0S.TPhOIfW8/LPfWG08Nl0alV/EOGruplaHKNy', 'editor'),
(3, 'Ahmad', 'ahmad@gmail.com', '$2y$10$eQfavdg.EgSufzsXEmhgGuze03EZOt6Req5BBwoWTCu4GlyueRDoC', 'editor');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `artikel`
--
ALTER TABLE `artikel`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `budidaya`
--
ALTER TABLE `budidaya`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `fakta_singkat`
--
ALTER TABLE `fakta_singkat`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tanaman_id` (`tanaman_id`);

--
-- Indexes for table `kategori_tanaman`
--
ALTER TABLE `kategori_tanaman`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `kontak`
--
ALTER TABLE `kontak`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `manfaat`
--
ALTER TABLE `manfaat`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tanaman_id` (`tanaman_id`);

--
-- Indexes for table `tanaman`
--
ALTER TABLE `tanaman`
  ADD PRIMARY KEY (`id`),
  ADD KEY `kategori_id` (`kategori_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `artikel`
--
ALTER TABLE `artikel`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `budidaya`
--
ALTER TABLE `budidaya`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `fakta_singkat`
--
ALTER TABLE `fakta_singkat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `kategori_tanaman`
--
ALTER TABLE `kategori_tanaman`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `kontak`
--
ALTER TABLE `kontak`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `manfaat`
--
ALTER TABLE `manfaat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=110;

--
-- AUTO_INCREMENT for table `tanaman`
--
ALTER TABLE `tanaman`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `fakta_singkat`
--
ALTER TABLE `fakta_singkat`
  ADD CONSTRAINT `fakta_singkat_ibfk_1` FOREIGN KEY (`tanaman_id`) REFERENCES `tanaman` (`id`);

--
-- Constraints for table `manfaat`
--
ALTER TABLE `manfaat`
  ADD CONSTRAINT `manfaat_ibfk_1` FOREIGN KEY (`tanaman_id`) REFERENCES `tanaman` (`id`);

--
-- Constraints for table `tanaman`
--
ALTER TABLE `tanaman`
  ADD CONSTRAINT `tanaman_ibfk_1` FOREIGN KEY (`kategori_id`) REFERENCES `kategori_tanaman` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
