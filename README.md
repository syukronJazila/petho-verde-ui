# 🪴 PETHOFAR — Website Informasi Tanaman Obat

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
| Routing | React Router v6 |
| Form & Validasi | React Hook Form + Zod |
| State Management | TanStack Query |
| Backend (API) | PHP (REST API) |
| Database | MySQL |
| Hosting | InfinityFree |

---

## 🚀 Cara Menjalankan Proyek (Local)

```bash
# 1. Clone repository
git clone https://github.com/username/pethofar.git
cd pethofar

# 2. Install dependencies
npm install

# 3. Jalankan server development
npm run dev

# 4. Buka di browser
Melalui link yang muncul di terminal

## 🔒 Autentikasi Admin

- Login melalui halaman: **`/admin`**
- Setelah login berhasil, **token disimpan di `localStorage`**
- Hanya pengguna dengan **token valid** yang bisa mengakses **`/admin/*`**
- Jika belum login → otomatis **diarahkan ke halaman login**

---

## 🖼️ Dokumentasi & Aset

📂 Semua dokumentasi dan aset pendukung disimpan di **Google Drive**:  
👉 [**PETHOFAR Project Drive**](#) _(ganti dengan link Drive kamu)_

**Isi dokumentasi mencakup:**
- 🎨 Desain UI & palet warna  
- 🔄 Flowchart & ERD database  
- 🌿 Gambar tanaman dan ikon  
- 📘 Panduan pengguna dan admin  

---

## 👨‍💻 Kontributor

**Nama Developer:** Ajie  
**Peran:** Fullstack Developer  
**Deskripsi:** Bertanggung jawab atas pengembangan frontend, backend API, serta deployment ke server hosting.


