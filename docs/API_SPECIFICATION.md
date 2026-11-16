# Dokumentasi REST API CivilRecord (v1)
## Public Facility Reporting & Management System

**Base URL**: `http://127.0.0.1:8000/api`  
**Autentikasi**: Bearer Token (Laravel Sanctum)  
**Format Data**: JSON (`Content-Type: application/json`, `Accept: application/json`)

---

### 1. Autentikasi Pengguna (`/api/auth`)

#### 1.1 Registrasi Warga Baru
* **Endpoint**: `POST /api/auth/register`
* **Akses**: Publik
* **Request Body**:
  ```json
  {
    "name": "Budi Santoso",
    "email": "budi.santoso@gmail.com",
    "phone": "081234567890",
    "password": "password123"
  }
  ```
* **Response (201 Created)**:
  ```json
  {
    "success": true,
    "message": "Registrasi warga berhasil.",
    "data": {
      "user": {
        "id": 5,
        "name": "Budi Santoso",
        "email": "budi.santoso@gmail.com",
        "role": "citizen",
        "department": "Masyarakat Umum"
      },
      "token": "1|sAnCtUmToKeNhAsH..."
    }
  }
  ```

#### 1.2 Login Pengguna
* **Endpoint**: `POST /api/auth/login`
* **Akses**: Publik
* **Request Body**:
  ```json
  {
    "email": "admin@civilrecord.go.id",
    "password": "password123"
  }
  ```
* **Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Login berhasil.",
    "data": {
      "user": {
        "id": 1,
        "name": "Ir. Hendra Wijaya",
        "email": "admin@civilrecord.go.id",
        "role": "admin",
        "department": "Dinas Komunikasi & Informatika / Tata Kota"
      },
      "token": "2|aUtHtOkEn123..."
    }
  }
  ```

---

### 2. Modul Pelaporan Kerusakan (`/api/reports`)

#### 2.1 Buat Laporan Baru
* **Endpoint**: `POST /api/reports`
* **Akses**: Publik / Terotentikasi (Citizen)
* **Request Body**:
  ```json
  {
    "title": "Jalan amblas membahayakan",
    "category_id": 1,
    "facility_id": 1,
    "description": "Aspal amblas sedalam 20 cm di jalur kanan depan toko.",
    "address": "Jl. Mawar Raya KM 2.7",
    "latitude": -6.917464,
    "longitude": 107.619123,
    "priority": "high",
    "before_image_url": "https://example.com/photos/damage.jpg"
  }
  ```
* **Response (201 Created)**:
  ```json
  {
    "success": true,
    "message": "Laporan berhasil dibuat.",
    "data": {
      "id": 6,
      "ticket_number": "CR-2026-00006",
      "status": "pending",
      "title": "Jalan amblas membahayakan",
      "created_at": "2026-11-16T09:00:00.000000Z"
    }
  }
  ```

#### 2.2 Lacak Laporan Berdasarkan Nomor Tiket
* **Endpoint**: `GET /api/track/{ticketNumber}`
* **Contoh**: `GET /api/track/CR-2026-00001`
* **Response (200 OK)**:
  ```json
  {
    "success": true,
    "data": {
      "ticket_number": "CR-2026-00001",
      "title": "Jalan berlubang besar di Jalan Mawar",
      "status": "assigned",
      "address": "Jl. Mawar Raya No. 45",
      "histories": [
        { "new_status": "pending", "actor_name": "Citizen", "remarks": "Laporan dibuat" },
        { "new_status": "verified", "actor_name": "Admin", "remarks": "Diverifikasi valid" },
        { "new_status": "assigned", "actor_name": "Admin", "remarks": "Ditugaskan ke teknisi" }
      ]
    }
  }
  ```

---

### 3. Modul Administrator (`/api/admin`)

#### 3.1 Verifikasi Laporan Masuk
* **Endpoint**: `PATCH /api/admin/reports/{id}/verify`
* **Response (200 OK)**: Status berubah menjadi `verified`.

#### 3.2 Tolak Laporan Masuk
* **Endpoint**: `PATCH /api/admin/reports/{id}/reject`
* **Request Body**:
  ```json
  {
    "reason": "Lokasi berada di jalan perumahan privat pengembang dan bukan jalan kota."
  }
  ```
* **Response (200 OK)**: Status berubah menjadi `rejected`.

#### 3.3 Penugasan Petugas Lapangan (Dispatch)
* **Endpoint**: `POST /api/admin/reports/{id}/assign`
* **Request Body**:
  ```json
  {
    "officer_id": 2,
    "instructions": "Perbaiki menggunakan aspal hotmix dan ratakan dengan roller.",
    "due_date": "2026-11-18 17:00:00"
  }
  ```
* **Response (200 OK)**: Status berubah menjadi `assigned`.

#### 3.4 Validasi Akhir Bukti Perbaikan
* **Endpoint**: `PATCH /api/admin/reports/{id}/validate`
* **Request Body**:
  ```json
  {
    "is_approved": true,
    "remarks": "Hasil pengaspalan rapi dan memenuhi standar bina marga."
  }
  ```
* **Response (200 OK)**:
  * Jika `is_approved: true` -> status berubah menjadi `completed`, kondisi aset di *Facility Registry* otomatis diperbarui menjadi *Baik*.
  * Jika `is_approved: false` -> status dikembalikan ke `in_progress` (*Rework*).

#### 3.5 Metrik Ringkasan & Analitik
* **Endpoint**: `GET /api/admin/analytics`
* **Response (200 OK)**: Total laporan, hitungan per status, sebaran kategori, dan MTTR (Mean Time to Repair).

---

### 4. Modul Petugas Lapangan (`/api/officer`)

#### 4.1 Daftar Tugas Saya
* **Endpoint**: `GET /api/officer/tasks`
* **Response (200 OK)**: Daftar seluruh tiket tugas yang didelegasikan ke petugas.

#### 4.2 Mulai Pengerjaan di Lapangan
* **Endpoint**: `PATCH /api/officer/tasks/{id}/start`
* **Response (200 OK)**: Status berubah menjadi `in_progress`, mencatat waktu kedatangan teknisi di lokasi.

#### 4.3 Selesaikan Pekerjaan & Unggah Foto After
* **Endpoint**: `POST /api/officer/tasks/{id}/resolve`
* **Request Body**:
  ```json
  {
    "maintenance_notes": "Tambal lubang selesai dilakukan. Menghabiskan 2 karung aspal dingin dan dipadatkan.",
    "after_image_url": "https://example.com/photos/repaired.jpg",
    "actions_taken": "Pembersihan rongga lubang dan penambalan aspal."
  }
  ```
* **Response (200 OK)**: Status berubah menjadi `resolved` (siap divalidasi oleh admin).

---

### 5. Modul Registri Fasilitas (`/api/facilities`)

* **List Fasilitas**: `GET /api/facilities` (daftar seluruh aset publik beserta jumlah insiden terkait).
* **Detail & Riwayat Perawatan**: `GET /api/facilities/{id}` (termasuk riwayat pemeliharaan aset).

