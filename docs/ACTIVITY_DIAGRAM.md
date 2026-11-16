# Activity Diagram & Alur Siklus Laporan
## CivilRecord — Public Facility Reporting & Management System

Dokumen ini mendokumentasikan alur aktivitas bisnis terpadu dari awal masyarakat menemukan fasilitas rusak hingga laporan selesai divalidasi dan dicatat dalam riwayat pemeliharaan aset pemda.

---

### 1. Diagram Alur Aktivitas (Activity Workflow)

```mermaid
flowchart TD
    Start([Mulai: Warga menemukan fasilitas rusak]) --> A1[Buka CivilRecord & Login Citizen]
    A1 --> A2[Isi Form: Judul, Deskripsi, Kategori]
    A2 --> A3[Pilih Titik Lokasi Peta / GPS Aktif]
    A3 --> A4[Unggah Foto Bukti Kerusakan 'Before']
    A4 --> A5[Submit Laporan]

    A5 --> B1[(Simpan Database: Status PENDING\nGenerate No Tiket CR-YYYY-XXXXX)]
    B1 --> B2[Notifikasi ke Admin: Laporan Baru Masuk]

    B2 --> C1[Admin Memeriksa Antrean Verifikasi]
    C1 --> C2{Apakah Laporan Valid & Jelas?}

    C2 -- Tidak Valid / Duplikat --> C3[Admin Tolak Laporan 'REJECTED'\nInput Alasan Penolakan]
    C3 --> C4[Notifikasi Alasan ke Pelapor]
    C4 --> EndRejected([Selesai: Laporan Ditolak])

    C2 -- Valid --> D1[Admin Verifikasi Laporan 'VERIFIED']
    D1 --> D2[Admin Tautkan Fasilitas & Tugaskan Petugas 'ASSIGNED']
    D2 --> D3[Notifikasi Tugas Baru ke Petugas Terpilih]

    D3 --> E1[Petugas Buka Dashboard Tugas Lapangan]
    E1 --> E2[Petugas Tiba di Lokasi & Ubah Status 'IN_PROGRESS']
    E2 --> E3[Petugas Melakukan Perbaikan Fisik]
    E3 --> E4[Petugas Unggah Foto Hasil 'AFTER' & Catatan Pekerjaan]
    E4 --> E5[Kirim Pengajuan Selesai: Status 'RESOLVED']

    E5 --> F1[Admin Meninjau Bukti Perbaikan]
    F1 --> F2{Apakah Hasil Perbaikan Sesuai Kriteria?}

    F2 -- Belum Sesuai --> F3[Admin Kembalikan Tugas 'REWORK'\nStatus kembali ke IN_PROGRESS]
    F3 --> E3

    F2 -- Sesuai & Tuntas --> G1[Admin Setujui & Tutup Tiket: Status 'COMPLETED']
    G1 --> G2[(Catat ke Riwayat Pemeliharaan Fasilitas)]
    G2 --> G3[Kirim Notifikasi Selesai ke Pelapor]
    G3 --> EndSuccess([Selesai: Fasilitas Berhasil Diperbaiki])
```

---

### 2. Matriks Tanggung Jawab Status (State Responsibility Matrix)

| Status | Pengubah Status | Syarat Transisi | Dampak Sistem |
| :--- | :--- | :--- | :--- |
| **`PENDING`** | Citizen (Sistem) | Form valid & foto terunggah | Muncul di antrean verifikasi admin; pelapor menerima nomor tiket. |
| **`VERIFIED`** | Admin | Foto jelas, lokasi akurat, bukan duplikat | Siap didelegasikan ke petugas dinas terkait. |
| **`REJECTED`** | Admin | Alasan penolakan diisi lengkap | Siklus berakhir; pelapor dapat membaca alasan penolakan. |
| **`ASSIGNED`** | Admin | Petugas dipilih dan SLA ditentukan | Petugas menerima tugas baru di daftar tugasnya. |
| **`IN_PROGRESS`** | Officer | Petugas mengonfirmasi kehadiran di lokasi | Pelapor melihat bahwa perbaikan sedang berlangsung. |
| **`RESOLVED`** | Officer | Minimal 1 foto *After* & catatan perbaikan | Muncul di antrean validasi penyelesaian admin. |
| **`COMPLETED`** | Admin | Foto *Before* & *After* terverifikasi tuntas | Status fasilitas diperbarui (*Baik*); tercatat di buku pemeliharaan aset. |
| **`REWORK`** | Admin | Admin memberikan catatan revisi perbaikan | Status dikembalikan ke `IN_PROGRESS` untuk perbaikan ulang petugas. |
