# 🪴 PETHOFAR — Website Informasi Tanaman Herbal

## 🌱 Deskripsi Proyek
**PETHOFAR** adalah website informasi tanaman obat yang terdiri dari dua bagian utama:
- **Halaman User** — berisi informasi seputar tanaman obat, artikel, dan panduan budidaya.  
- **Halaman Admin** — digunakan oleh admin untuk mengelola konten seperti daftar tanaman, artikel, budidaya, dan pesan kontak.

Website ini dikembangkan menggunakan **React + TypeScript + Vite**, dengan sistem routing yang memisahkan halaman pengguna (`/`) dan halaman admin (`/admin/...`).

---

## 🧩 Fitur Utama

### 👤 Halaman User
- Melihat daftar tanaman obat lengkap beserta detailnya  
- Membaca artikel dan panduan budidaya  
- Mencari tanaman atau artikel berdasarkan kata kunci  
- Mengirim pesan melalui halaman kontak  

### 🔐 Halaman Admin
- Login sistem aman menggunakan token  
- CRUD data tanaman, budidaya, dan artikel  
- Mengelola pesan kontak pengguna  
- Pengaturan user admin dan preferensi  

---

## ⚙️ Teknologi yang Digunakan

| Kategori | Teknologi |
|-----------|------------|
| Frontend Framework | React + Vite + TypeScript |
| Styling | Tailwind CSS + shadcn/ui |
| Backend (API) | PHP |
| Database | MySQL |
| Hosting | InfinityFree |

---

## 🚀 Cara Menjalankan Proyek (Lokal)

1️⃣ **Clone repository**  
```bash
git clone https://github.com/syukronJazila/petho-verde-ui.git
cd petho-verde-ui
```

2️⃣ **Install Node.js**  
Download dan install Node.js Versi 20 di:  
👉 [https://nodejs.org/en/download](https://nodejs.org/en/download)

Tutorial video:  
🎥 [https://youtu.be/8FjrJ51fyqo](https://youtu.be/8FjrJ51fyqo)

**INGAT VERSI 20!!!**

Cek apakah sudah terinstall:
```bash
node -v
npm -v
```

3️⃣ **Install dependencies frontend**  
```bash
npm install
```

4️⃣ **Jalankan server development**  
```bash
npm run dev
```

Lalu buka link yang muncul di terminal (biasanya `http://localhost:5173`).

5️⃣ **Install dan Setup MySQL**  
Download dan install XAMPP di:  
👉 [https://www.apachefriends.org/download.html](https://www.apachefriends.org/download.html)

Tutorial video:  
🎥 [https://youtu.be/J6tOC6Z7Vm4](https://youtu.be/J6tOC6Z7Vm4)

Setelah install:
- Jalankan Apache dan MySQL dari XAMPP Control Panel.
- Buka phpMyAdmin di browser:  
  👉 [http://localhost/phpmyadmin](http://localhost/phpmyadmin)

6️⃣ **Import Database**  
Di phpMyAdmin, klik **Import**.  
Pilih file `pethofar.sql` dari folder proyek (download dari repository).  
Klik **Go**.

7️⃣ **Setup Backend PHP**  
Download folder `pethofar` dari repository — folder ini berisi semua file backend berbasis PHP.  
Buka folder instalasi XAMPP di `C:\xampp\htdocs\`.  
Pindahkan folder `pethofar` ke dalam direktori tersebut, sehingga strukturnya menjadi:

```bash
C:\xampp\htdocs\pethofar\*.php
```

Coba akses di browser:  
[http://localhost/pethofar/beranda.php](http://localhost/pethofar/beranda.php)  
Jika muncul data atau tidak error, berarti backend sudah jalan ✅

---

## 🔒 Autentikasi Admin

- Login melalui halaman: **`/admin`**
- Setelah login berhasil, **token disimpan di `localStorage`**
- Hanya pengguna dengan **token valid** yang bisa mengakses **`/admin/*`**
- Jika belum login → otomatis **diarahkan ke halaman login**

---

## 🖼️ Dokumentasi & Aset

📂 Semua dokumentasi dan aset pendukung disimpan di **Google Drive**:  
👉 [**PETHOFAR Project Drive**](https://drive.google.com/drive/folders/1knX0ZUjsAyXFzFGF_1aAdLLS-NtCGaqN?usp=sharing)

---

## 👨‍💻 Developer

**Nama Developer:** Ajie  
**Peran:** Fullstack Developer  
**Deskripsi:** Bertanggung jawab atas pengembangan frontend, backend API, serta deployment ke server hosting.

---

## 💚 Penutup

Dibuat dengan semangat hijau untuk menjaga kearifan lokal dan kekayaan tanaman obat Indonesia.
