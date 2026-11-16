# Entity-Relationship Diagram (ERD) & Skema Database
## CivilRecord — Public Facility Reporting & Management System

Dokumen ini mendefinisikan skema basis data relasional untuk sistem CivilRecord, dirancang untuk mendukung integritas data, jejak audit (*audit trail*), performa geolokasi, dan relasi aset fasilitas.

---

### 1. Diagram ERD Relasional

```mermaid
erDiagram
    USERS ||--o{ REPORTS : "melaporkan (as citizen)"
    USERS ||--o{ ASSIGNMENTS : "menerima tugas (as officer)"
    USERS ||--o{ ASSIGNMENTS : "menugaskan (as admin)"
    USERS ||--o{ REPORT_HISTORIES : "melakukan aksi"
    USERS ||--o{ NOTIFICATIONS : "menerima pemberitahuan"
    
    CATEGORIES ||--o{ FACILITIES : "kategori fasilitas"
    CATEGORIES ||--o{ REPORTS : "kategori kerusakan"
    
    FACILITIES ||--o{ REPORTS : "memiliki riwayat laporan"
    FACILITIES ||--o{ MAINTENANCE_RECORDS : "memiliki riwayat perawatan"
    
    REPORTS ||--o{ REPORT_MEDIA : "memiliki lampiran foto"
    REPORTS ||--o{ REPORT_HISTORIES : "memiliki jejak audit status"
    REPORTS ||--o| ASSIGNMENTS : "memiliki penugasan pengerjaan"
    REPORTS ||--o{ MAINTENANCE_RECORDS : "menghasilkan log pemeliharaan"
    
    ASSIGNMENTS ||--o{ MAINTENANCE_RECORDS : "mencatat eksekusi lapangan"

    USERS {
        uuid id PK
        string name
        string email UK
        string password
        string phone
        string role "citizen | officer | admin"
        string department "Bina Marga | Dishub | DLHK | dll"
        string avatar_url
        boolean is_active
        timestamp email_verified_at
        timestamp created_at
        timestamp updated_at
    }

    CATEGORIES {
        int id PK
        string slug UK "jalan | lampu_pju | drainase | taman | dll"
        string name "Jalan Rusak | Lampu PJU | dsb"
        string icon_name "Road | Lightbulb | Droplets | Trees"
        text description
        int default_sla_hours "24, 48, 72 jam"
        boolean is_active
        timestamp created_at
        timestamp updated_at
    }

    FACILITIES {
        uuid id PK
        string code UK "FAC-001, FAC-002"
        int category_id FK
        string name "Jalan Mawar Raya | Taman Lansia"
        text address
        decimal latitude
        decimal longitude
        string condition "good | fair | damaged | under_repair"
        json metadata "Spesifikasi fisik: panjang, tipe aspal, dll"
        timestamp created_at
        timestamp updated_at
    }

    REPORTS {
        uuid id PK
        string ticket_number UK "CR-2026-00001"
        uuid user_id FK "Pelapor"
        uuid facility_id FK "Nullable jika belum ditautkan fasilitas"
        int category_id FK
        string title
        text description
        text location_address
        decimal latitude
        decimal longitude
        string status "pending | verified | rejected | assigned | in_progress | resolved | completed"
        string priority "low | medium | high | emergency"
        text rejection_reason "Alasan penolakan jika status rejected"
        timestamp verified_at
        timestamp completed_at
        timestamp created_at
        timestamp updated_at
    }

    REPORT_MEDIA {
        uuid id PK
        uuid report_id FK
        uuid uploaded_by FK
        string file_path
        string file_type "image/jpeg | image/png | image/webp"
        bigint file_size
        string stage "report_initial | progress_evidence | completion_after"
        string caption
        timestamp created_at
        timestamp updated_at
    }

    REPORT_HISTORIES {
        uuid id PK
        uuid report_id FK
        uuid user_id FK "Aktor pengubah status"
        string previous_status
        string new_status
        text remarks "Catatan log perubahan status"
        timestamp created_at
    }

    ASSIGNMENTS {
        uuid id PK
        uuid report_id FK
        uuid officer_id FK "Petugas teknis"
        uuid assigned_by FK "Admin pembuat disposisi"
        text instructions "Petunjuk kerja admin"
        timestamp assigned_at
        timestamp started_at
        timestamp due_date "Batas waktu SLA"
        timestamp resolved_at
        string status "assigned | accepted | in_progress | completed | cancelled"
        timestamp created_at
        timestamp updated_at
    }

    MAINTENANCE_RECORDS {
        uuid id PK
        uuid report_id FK
        uuid facility_id FK
        uuid assignment_id FK
        uuid officer_id FK
        text actions_taken "Tindakan perbaikan yang dilakukan"
        text materials_used "Material yang dihabiskan"
        decimal cost_estimate "Estimasi anggaran"
        timestamp performed_at
        string verification_status "pending_review | approved | rework_required"
        text admin_feedback "Catatan penilaian admin"
        timestamp created_at
        timestamp updated_at
    }

    NOTIFICATIONS {
        uuid id PK
        uuid user_id FK
        string type "report_status | new_assignment | task_update"
        string title
        text message
        json payload "Data navigasi: {report_id, ticket_number}"
        boolean is_read
        timestamp read_at
        timestamp created_at
        timestamp updated_at
    }
```

---

### 2. Spesifikasi Tabel & Index Database

1. **`users`**:
   * Index: `email` (Unique), `role`, `department`.
2. **`categories`**:
   * Index: `slug` (Unique), `is_active`.
3. **`facilities`**:
   * Index: `code` (Unique), `category_id`, `(latitude, longitude)`, `condition`.
4. **`reports`**:
   * Index: `ticket_number` (Unique), `user_id`, `category_id`, `facility_id`, `status`, `created_at`, `(latitude, longitude)`.
5. **`report_media`**:
   * Index: `report_id`, `stage`.
6. **`report_histories`**:
   * Index: `report_id`, `user_id`, `created_at`.
7. **`assignments`**:
   * Index: `report_id`, `officer_id`, `assigned_by`, `status`.
8. **`maintenance_records`**:
   * Index: `facility_id`, `report_id`, `officer_id`, `verification_status`.
9. **`notifications`**:
   * Index: `user_id`, `is_read`, `created_at`.
