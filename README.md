# CivilRecord

> **Public Facility Reporting & Management System**  
> *Tagline: Report. Record. Repair.*

CivilRecord adalah platform web modern untuk membantu pemerintah daerah mengelola pelaporan kerusakan fasilitas umum dari masyarakat, memverifikasi laporan, menugaskan petugas perbaikan lapangan, mendokumentasikan bukti perbaikan (*Before & After*), hingga memvalidasi hasil pekerjaan dan mencatat riwayat pemeliharaan aset publik secara transparan.

---

## 🎯 Peran Pengguna (Multi-Role System)
1. **Citizen (Masyarakat)**: Melaporkan kerusakan fasilitas (jalan berlubang, lampu jalan padam, saluran tersumbat, dll.), menyematkan titik koordinat di peta interaktif, mengunggah foto bukti, dan memantau progres perbaikan secara realtime.
2. **Officer (Petugas Lapangan)**: Menerima tiket penugasan, menuju lokasi, memperbarui progres pengerjaan (*In Progress*), mengunggah dokumentasi bukti perbaikan (*After*), dan menyelesaikan tugas.
3. **Administrator (Pemda / Dinas Terkait)**: Memverifikasi keabsahan laporan baru, mendeteksi potensi duplikasi laporan, menugaskan petugas teknis, memvalidasi hasil perbaikan lapangan, mengelola registri fasilitas umum (*Facility Registry*), serta memantau analitik kinerja pelayanan publik.

---

## 🛠️ Tech Stack
* **Frontend**: React (Vite), Tailwind CSS, React Router v6, Lucide React, Leaflet & OpenStreetMap.
* **Backend**: Laravel 11 REST API, Laravel Sanctum, Form Requests, API Resources, Policy-based RBAC.
* **Database**: PostgreSQL / MySQL (dukungan penuh Eloquent ORM dengan migration & seeder lengkap).

---

## 📚 Dokumentasi Arsitektur & Perencanaan
Dokumentasi lengkap tahap perencanaan tersedia di direktori `docs/`:
* [Software Requirements Specification (SRS)](docs/SRS.md)
* [Use Case Diagram & Spesifikasi Aktor](docs/USE_CASE.md)
* [Activity Diagram & Alur Siklus Laporan](docs/ACTIVITY_DIAGRAM.md)
* [Entity-Relationship Diagram (ERD) & Skema Database](docs/DATABASE_ERD.md)
* [Struktur Proyek Frontend & Backend](docs/PROJECT_STRUCTURE.md)

