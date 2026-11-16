# CivilRecord

> **Public Facility Reporting & Management System**  
> *Tagline: Report. Record. Repair.*

CivilRecord adalah platform web modern untuk membantu pemerintah daerah mengelola pelaporan kerusakan fasilitas umum dari masyarakat, memverifikasi laporan, menugaskan petugas perbaikan lapangan, mendokumentasikan bukti perbaikan (*Before & After*), memvalidasi hasil kerja, hingga mencatat riwayat pemeliharaan aset publik (*Facility Registry*) secara transparan dan tertutup (*closed-loop system*).

---

## 🚀 Status Proyek: SELESAI (Production-Ready)
* **Frontend**: React 19, Vite, Tailwind CSS v4, Lucide Icons, Leaflet & OpenStreetMap.
* **Backend**: Laravel 13, Laravel Sanctum, SQLite / PostgreSQL / MySQL, Eloquent ORM.
* **Pengujian Otomatis**: PHPUnit Feature Tests **100% Passed (8 tests, 40 assertions)**.

---

## ⚡ Panduan Menjalankan Sistem (1-Klik di Windows)
Cukup jalankan berkas batch script di root repositori:
```cmd
start.bat
```
Atau jalankan secara manual:

### 1. Menjalankan Backend API
```cmd
cd backend
php artisan serve --port=8000
```
API akan aktif di: `http://127.0.0.1:8000/api`

### 2. Menjalankan Frontend React
```cmd
cd frontend
npm install
npm run dev
```
Aplikasi web akan aktif di: `http://localhost:5173/`

### 3. Menjalankan Automated Test Backend
```cmd
cd backend
php artisan test
```

---

## 🎯 Tiga Peran Pengguna (Multi-Role Portal)
Gunakan tombol **Mode Demo** (1-klik di pojok kanan atas navbar) atau login melalui halaman `/login`:

1. **Citizen (Warga Pelapor)**:
   * Akun Demo: `anisa.warga@gmail.com` (password: `password123`)
   * Fitur: Formulir pelaporan fasilitas rusak, pinpoint lokasi Leaflet & deteksi GPS browser, upload foto, pemantauan status tiket `CR-YYYY-NNNNN`, dan timeline riwayat pengerjaan.
2. **Officer (Petugas Lapangan OPD)**:
   * Akun Demo: `bambang@bina-marga.go.id` (Dinas Bina Marga) & `rian@dishub.go.id` (Dishub)
   * Fitur: Dashboard lembar kerja penugasan, navigasi lokasi, ubah status ke `In Progress`, formulir unggah bukti foto perbaikan (*After*) & catatan tindakan teknis, ajukan penyelesaian (`Resolved`).
3. **Administrator (Pemda / Dinas Terkait)**:
   * Akun Demo: `admin@civilrecord.go.id` (password: `password123`)
   * Fitur: Antrean verifikasi laporan baru (`Pending` -> `Verified`/`Rejected`), deteksi otomatis duplikasi geospasial dalam radius 100 meter, penugasan petugas teknis (SLA dispatch), validasi komparasi visual foto *Before vs After* (`Completed` / `Rework`), pengelolaan *Facility Registry*, serta manajemen akun pengguna.

---

## 📁 Struktur Dokumentasi Proyek
Seluruh dokumentasi teknis tersimpan di folder `docs/`:
* 📋 [docs/SRS.md](docs/SRS.md) — *Software Requirements Specification*
* 👥 [docs/USE_CASE.md](docs/USE_CASE.md) — Use Case Diagram & Spesifikasi Aktor
* 🔄 [docs/ACTIVITY_DIAGRAM.md](docs/ACTIVITY_DIAGRAM.md) — Alur Siklus Hidup Penanganan Kerusakan
* 🗄️ [docs/DATABASE_ERD.md](docs/DATABASE_ERD.md) — ERD Relasional 10 Tabel Database
* 🏗️ [docs/PROJECT_STRUCTURE.md](docs/PROJECT_STRUCTURE.md) — Blueprint Arsitektur Monorepo
* 📡 [docs/API_SPECIFICATION.md](docs/API_SPECIFICATION.md) — Spesifikasi REST API Endpoints v1
