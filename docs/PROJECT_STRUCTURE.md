# Blueprint Struktur Proyek Frontend & Backend
## CivilRecord — Public Facility Reporting & Management System

Arsitektur sistem CivilRecord memisahkan **Backend REST API (Laravel)** dan **Frontend Single Page Application (React + Vite)** secara bersih untuk kemudahan pemeliharaan (*separation of concerns*), skalabilitas, dan integrasi multi-platform di masa mendatang.

---

### 1. Struktur Folder Monorepo / Multi-Folder

```text
c:\Civil/
├── docs/                                  # Dokumentasi arsitektur, SRS, ERD
│   ├── SRS.md
│   ├── USE_CASE.md
│   ├── ACTIVITY_DIAGRAM.md
│   ├── DATABASE_ERD.md
│   └── PROJECT_STRUCTURE.md
│
├── backend/                               # Laravel REST API Engine
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/
│   │   │   │   └── Api/
│   │   │   │       ├── AuthController.php             # Login, register, logout, profile
│   │   │   │       ├── CategoryController.php         # List & CRUD kategori fasilitas
│   │   │   │       ├── FacilityController.php         # Registri aset fasilitas umum
│   │   │   │       ├── NotificationController.php     # In-app user notifications
│   │   │   │       ├── Citizen/
│   │   │   │       │   └── ReportController.php       # Buat & pantau laporan warga
│   │   │   │       ├── Officer/
│   │   │   │       │   ├── TaskController.php         # Daftar tugas lapangan, update progres
│   │   │   │       │   └── MaintenanceController.php  # Upload bukti perbaikan (After photo)
│   │   │   │       └── Admin/
│   │   │   │           ├── VerificationController.php # Verifikasi / tolak laporan pending
│   │   │   │           ├── AssignmentController.php   # Disposisi petugas lapangan
│   │   │   │           ├── ValidationController.php   # Approval hasil perbaikan
│   │   │   │           ├── AnalyticsController.php    # Metrik ringkasan, MTTR, statistik
│   │   │   │           └── UserController.php         # Kelola akun (petugas & warga)
│   │   │   ├── Middleware/
│   │   │   │   ├── EnsureRole.php                     # Role guard: citizen, officer, admin
│   │   │   │   └── CheckReportOwnership.php           # Verifikasi kepemilikan laporan
│   │   │   ├── Requests/                              # Form Validation Requests
│   │   │   │   ├── StoreReportRequest.php
│   │   │   │   ├── VerifyReportRequest.php
│   │   │   │   ├── AssignTaskRequest.php
│   │   │   │   └── CompleteMaintenanceRequest.php
│   │   │   └── Resources/                             # API Resource Transformers (JSON)
│   │   │       ├── ReportResource.php
│   │   │       ├── FacilityResource.php
│   │   │       ├── AssignmentResource.php
│   │   │       └── UserResource.php
│   │   ├── Models/
│   │   │   ├── User.php
│   │   │   ├── Category.php
│   │   │   ├── Facility.php
│   │   │   ├── Report.php
│   │   │   ├── ReportMedia.php
│   │   │   ├── ReportHistory.php
│   │   │   ├── Assignment.php
│   │   │   ├── MaintenanceRecord.php
│   │   │   └── Notification.php
│   │   ├── Policies/                                  # Authorization Policies
│   │   │   ├── ReportPolicy.php
│   │   │   └── AssignmentPolicy.php
│   │   └── Services/                                  # Business Logic
│   │       ├── TicketService.php                      # Generator format CR-YYYY-NNNNN
│   │       ├── DuplicateReportDetector.php            # Radius geolocation duplicate check
│   │       └── MaintenanceLedgerService.php           # Facility maintenance history sync
│   ├── database/
│   │   ├── migrations/                                # 10 skema migrasi tabel
│   │   └── seeders/                                   # Kategori awal, fasilitas awal & akun demo 3 role
│   └── routes/
│       └── api.php                                    # REST API Endpoints v1
│
└── frontend/                              # React 18+ SPA (Vite + Tailwind CSS)
    ├── index.html
    ├── package.json
    ├── tailwind.config.js
    ├── vite.config.js
    ├── src/
    │   ├── api/                                       # Axios client & endpoint wrappers
    │   │   ├── client.js                              # Axios interceptor (Bearer token auth)
    │   │   ├── authApi.js
    │   │   ├── reportApi.js
    │   │   ├── facilityApi.js
    │   │   ├── taskApi.js
    │   │   └── adminApi.js
    │   ├── components/
    │   │   ├── common/                                # Reusable UI atom & molecules
    │   │   │   ├── Button.jsx
    │   │   │   ├── Modal.jsx
    │   │   │   ├── StatusBadge.jsx
    │   │   │   ├── PriorityBadge.jsx
    │   │   │   ├── LoadingSpinner.jsx
    │   │   │   └── AlertBanner.jsx
    │   │   ├── layout/                                # Navbar, Sidebar, PageHeader
    │   │   │   ├── Navbar.jsx
    │   │   │   ├── Sidebar.jsx
    │   │   │   └── Footer.jsx
    │   │   ├── maps/                                  # Leaflet Map Integrations
    │   │   │   ├── LocationPickerMap.jsx              # Pinpoint koordinat saat lapor
    │   │   │   ├── PublicExploreMap.jsx               # Peta publik semua laporan & filter
    │   │   │   ├── TaskRouteMap.jsx                   # Peta penugasan petugas lapangan
    │   │   │   └── ReportMarkerPopup.jsx              # Pop-up rincian marker
    │   │   └── reports/                               # Komponen laporan spesifik
    │   │       ├── ReportTimeline.jsx                 # Timeline histori status
    │   │       ├── BeforeAfterGallery.jsx             # Visual komparasi foto Before vs After
    │   │       └── ReportFilterBar.jsx
    │   ├── context/
    │   │   ├── AuthContext.jsx                        # State user login, role & token
    │   │   └── NotificationContext.jsx                # Toast & count notifikasi
    │   ├── hooks/
    │   │   ├── useAuth.js
    │   │   ├── useGeolocation.js
    │   │   └── useReports.js
    │   ├── layouts/
    │   │   ├── PublicLayout.jsx                       # Guest navbar & landing footer
    │   │   ├── CitizenLayout.jsx                      # Citizen navigation bar
    │   │   ├── OfficerLayout.jsx                      # Officer responsive sidebar
    │   │   └── AdminLayout.jsx                        # Full admin dashboard shell
    │   ├── pages/
    │   │   ├── public/                                # Halaman publik
    │   │   │   ├── LandingPage.jsx
    │   │   │   ├── AboutPage.jsx
    │   │   │   ├── PublicMapPage.jsx
    │   │   │   └── TrackReportPage.jsx
    │   │   ├── auth/                                  # Halaman otentikasi
    │   │   │   ├── LoginPage.jsx
    │   │   │   └── RegisterPage.jsx
    │   │   ├── citizen/                               # Halaman warga
    │   │   │   ├── CitizenDashboard.jsx
    │   │   │   ├── CreateReportPage.jsx
    │   │   │   ├── MyReportsPage.jsx
    │   │   │   └── CitizenReportDetailPage.jsx
    │   │   ├── officer/                               # Halaman petugas lapangan
    │   │   │   ├── OfficerDashboard.jsx
    │   │   │   ├── TaskListPage.jsx
    │   │   │   ├── OfficerTaskDetailPage.jsx
    │   │   │   └── CompleteTaskPage.jsx
    │   │   └── admin/                                 # Halaman administrator
    │   │       ├── AdminDashboard.jsx
    │   │       ├── VerificationQueuePage.jsx
    │   │       ├── AllReportsPage.jsx
    │   │       ├── AdminReportDetailPage.jsx
    │   │       ├── FacilityRegistryPage.jsx
    │   │       ├── UserManagementPage.jsx
    │   │       └── AnalyticsPage.jsx
    │   ├── routes/
    │   │   ├── AppRoutes.jsx                          # Rute utama & Protected Route guards
    │   │   └── ProtectedRoute.jsx                     # Role-based route authorization
    │   ├── App.jsx
    │   └── main.jsx
```

---

### 2. Standar Desain API (API Conventions)

* **Prefix**: `/api/v1`
* **Format Response**:
  ```json
  {
    "success": true,
    "message": "Operasi berhasil",
    "data": { ... },
    "meta": { ... }
  }
  ```
* **Format Error**:
  ```json
  {
    "success": false,
    "message": "Validasi gagal atau akses ditolak",
    "errors": {
      "field_name": ["Pesan kesalahan validasi"]
    }
  }
  ```
