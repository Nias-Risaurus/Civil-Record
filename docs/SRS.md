# Software Requirements Specification (SRS)
## CivilRecord — Public Facility Reporting & Management System

**Versi**: 1.0  
**Tanggal**: 16 November 2026  
**Status**: Approved Foundation  

---

### 1. Pendahuluan

#### 1.1 Tujuan
Dokumen ini mendefinisikan seluruh kebutuhan sistem perangkat lunak untuk **CivilRecord**. CivilRecord bukan sekadar portal formulir pengaduan, melainkan sistem manajemen pemeliharaan fasilitas publik terpadu yang mencakup siklus hidup pelaporan, verifikasi administratif, penugasan teknis lapangan, dokumentasi bukti perbaikan, validasi hasil kerja, dan registri aset fasilitas umum.

#### 1.2 Cakupan Sistem & Wilayah Operasional
* **Yurisdiksi**: Pemerintah Daerah (Kota/Kabupaten).
* **Organisasi Perangkat Daerah (OPD) Terkait**:
  * **Dinas Bina Marga & Sumber Daya Air**: Jalan berlubang, trotoar, jembatan, dan drainase tersumbat.
  * **Dinas Perhubungan**: Lampu penerangan jalan umum (PJU), marka jalan, dan rambu lalu lintas.
  * **Dinas Lingkungan Hidup & Pertamanan**: Fasilitas bermain taman kota, bangku publik, dan TPS liar.
* **Format Penomoran Tiket**: `CR-YYYY-NNNNN` (contoh: `CR-2026-00001`).

---

### 2. Deskripsi Umum Sistem

#### 2.1 Profil Pengguna
| Role | Deskripsi | Hak Akses Utama |
| :--- | :--- | :--- |
| **Citizen** | Masyarakat pelapor | Buat laporan, upload foto kerusakan, tandai koordinat peta, pantau timeline laporan miliknya, jelajahi peta publik. |
| **Officer** | Petugas teknis lapangan | Lihat daftar penugasan aktif, navigasi ke lokasi, ubah status ke *In Progress*, upload foto bukti perbaikan (*After*), selesaikan tugas (*Resolved*). |
| **Admin** | Administrator dinas pemda | Verifikasi antrean laporan (*Pending* -> *Verified* / *Rejected*), deteksi duplikasi laporan, penugasan petugas (*Dispatch*), validasi hasil perbaikan (*Resolved* -> *Completed* / *Rework*), kelola fasilitas, pantau analitik. |

#### 2.2 Siklus Hidup Status Laporan (Finite State Machine)
1. **PENDING**: Laporan baru diterima dari Citizen, menunggu verifikasi Admin.
2. **VERIFIED**: Laporan telah diverifikasi keabsahannya oleh Admin.
3. **REJECTED**: Laporan ditolak oleh Admin dengan alasan tercatat (misal: bukan wewenang pemda, foto tidak jelas, atau duplikat).
4. **ASSIGNED**: Admin telah menetapkan petugas (Officer) untuk menangani laporan tersebut.
5. **IN_PROGRESS**: Petugas lapangan telah menerima tugas dan memulai pengerjaan fisik di lokasi.
6. **RESOLVED**: Petugas telah menyelesaikan pengerjaan dan mengunggah foto bukti perbaikan; menunggu persetujuan Admin.
7. **COMPLETED**: Admin memvalidasi dan menyetujui hasil perbaikan; laporan resmi ditutup dan dicatat ke riwayat pemeliharaan aset.
8. **REWORK**: Jika admin menilai hasil perbaikan belum tuntas, laporan dikembalikan ke status *IN_PROGRESS* dengan instruksi perbaikan tambahan.

---

### 3. Kebutuhan Fungsional (Functional Requirements)

#### 3.1 Modul Autentikasi & Akun
* **FR-AUTH-01**: Registrasi akun publik untuk peran Citizen.
* **FR-AUTH-02**: Otentikasi berbasis token (Laravel Sanctum Bearer Token).
* **FR-AUTH-03**: Manajemen sesi, profil pengguna, dan perubahan kata sandi.
* **FR-AUTH-04**: Role-Based Access Control (RBAC) ketat via Middleware dan Policies.

#### 3.2 Modul Pelaporan (Citizen Reporting)
* **FR-REP-01**: Pengisian formulir pelaporan kerusakan: judul, kategori kerusakan, deskripsi, alamat detail, koordinat latitude/longitude (Leaflet), dan foto bukti kerusakan (*Before*).
* **FR-REP-02**: Pembuatan nomor registrasi tiket otomatis berurutan `CR-YYYY-NNNNN`.
* **FR-REP-03**: Pelapor dapat melihat daftar laporan miliknya berserta status progres terkini.
* **FR-REP-04**: Pelapor dapat melihat detail laporan, peta lokasi, foto awal, dan foto hasil perbaikan setelah laporan selesai.

#### 3.3 Modul Peta Interaktif & Geolocation
* **FR-MAP-01**: Integrasi peta Leaflet dengan tiles OpenStreetMap.
* **FR-MAP-02**: Penentuan titik koordinat menggunakan fitur GPS otomatis browser (*Current Location*) atau klik manual pada peta.
* **FR-MAP-03**: Peta publik interaktif dengan pin marker berkode warna sesuai kategori dan status laporan.
* **FR-MAP-04**: Deteksi radius kedekatan (proximity alert) untuk mendeteksi potensi duplikasi laporan dalam radius 25 meter.

#### 3.4 Modul Verifikasi & Disposisi (Admin Console)
* **FR-ADM-01**: Antrean verifikasi laporan berstatus `PENDING`.
* **FR-ADM-02**: Tindakan verifikasi (*Verify*) atau penolakan (*Reject*) dengan alasan wajib.
* **FR-ADM-03**: Penugasan (*Assignment*) petugas lapangan ke laporan `VERIFIED` lengkap dengan catatan instruksi dan batas waktu (*SLA*).
* **FR-ADM-04**: Pengelolaan data fasilitas umum (*Facility Registry*): penambahan data fasilitas, nama jalan/taman, kode inventaris, dan status kondisi fasilitas.
* **FR-ADM-05**: Pengelolaan data akun pengguna (aktivasi/deaktivasi petugas dan warga).

#### 3.5 Modul Lapangan & Pemeliharaan (Officer Workspace)
* **FR-OFC-01**: Tampilan daftar penugasan aktif dan riwayat penugasan yang pernah ditangani.
* **FR-OFC-02**: Perubahan status tugas menjadi `IN_PROGRESS` saat tiba di lokasi.
* **FR-OFC-03**: Pengunggahan foto bukti hasil perbaikan (*After*), rincian tindakan yang diambil, dan estimasi material/biaya.
* **FR-OFC-04**: Pengajuan penyelesaian tugas menuju status `RESOLVED`.

#### 3.6 Modul Validasi & Penutupan Laporan
* **FR-VAL-01**: Admin memeriksa halaman komparasi visual foto *Before* (dari Citizen) dan *After* (dari Officer).
* **FR-VAL-02**: Admin menyetujui hasil perbaikan (*Approve* -> status `COMPLETED`) atau mengembalikan ke petugas (*Rework*).
* **FR-VAL-03**: Penyimpanan otomatis ke dalam buku riwayat pemeliharaan aset fasilitas (*Maintenance Record Ledger*).

#### 3.7 Modul Analitik & Metrik Kinerja
* **FR-ANL-01**: Kartu metrik ringkasan: Total Laporan, Laporan Menunggu, Sedang Dikerjakan, dan Selesai.
* **FR-ANL-02**: Rata-rata waktu penyelesaian masalah (Mean Time to Repair - MTTR).
* **FR-ANL-03**: Grafik sebaran laporan berdasarkan kategori kerusakan dan sebaran per kecamatan/wilayah.

---

### 4. Kebutuhan Non-Fungsional (Non-Functional Requirements)

1. **Keamanan (Security)**:
   * Enkripsi kata sandi menggunakan Argon2id atau Bcrypt.
   * Perlindungan terhadap injeksi SQL, XSS, dan CSRF pada layer API.
   * Validasi tipe file dan ukuran file yang ketat untuk unggahan media (maks 5MB per file, format: JPG, PNG, WebP).
2. **Kinerja (Performance)**:
   * Respon API rata-rata di bawah 200 ms untuk query CRUD standar.
   * Peta dan gambar dioptimalkan dengan kompresi dan lazy loading.
3. **Auditability**:
   * Setiap pergantian status laporan tersimpan permanen di tabel `report_histories` sebagai rekam jejak yang tidak dapat diubah (*immutable history*).
4. **Desain & Responsivitas (UI/UX)**:
   * Desain antarmuka responsif (Mobile-first) untuk kemudahan operasional Citizen dan Officer di lapangan.
   * Tampilan Admin didesain optimal untuk produktivitas desktop.

