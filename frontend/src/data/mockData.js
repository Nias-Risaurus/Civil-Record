// Mock dataset for CivilRecord
export const INITIAL_USERS = [
  {
    id: 'usr-admin-01',
    name: 'Ir. Hendra Wijaya',
    email: 'admin@civilrecord.go.id',
    role: 'admin',
    department: 'Dinas Komunikasi & Informatika / Tata Kota',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    phone: '0812-9876-5432'
  },
  {
    id: 'usr-officer-01',
    name: 'Bambang Sudarsono',
    email: 'bambang@bina-marga.go.id',
    role: 'officer',
    department: 'Dinas Bina Marga & SDA (Tim Jalan & Saluran)',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    phone: '0813-1122-3344'
  },
  {
    id: 'usr-officer-02',
    name: 'Rian Pratama',
    email: 'rian@dishub.go.id',
    role: 'officer',
    department: 'Dinas Perhubungan (Teknisi PJU & Rambu)',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    phone: '0813-5566-7788'
  },
  {
    id: 'usr-citizen-01',
    name: 'Anisa Rahmawati',
    email: 'anisa.warga@gmail.com',
    role: 'citizen',
    department: 'Masyarakat Umum',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    phone: '0857-1234-5678'
  }
];

export const CATEGORIES = [
  {
    id: 'cat-01',
    slug: 'jalan_rusak',
    name: 'Jalan Rusak & Berlubang',
    icon: 'Road',
    department: 'Dinas Bina Marga & Sumber Daya Air',
    defaultSla: 48,
    color: '#ef4444',
    description: 'Kerusakan jalan aspal, jalan amblas, retak struktural, atau paving trotoar copot.'
  },
  {
    id: 'cat-02',
    slug: 'lampu_pju',
    name: 'Lampu Jalan (PJU) Mati',
    icon: 'Lightbulb',
    department: 'Dinas Perhubungan',
    defaultSla: 24,
    color: '#f59e0b',
    description: 'Penerangan Jalan Umum tidak menyala, tiang miring, atau kabel PJU terkelupas.'
  },
  {
    id: 'cat-03',
    slug: 'drainase',
    name: 'Drainase & Saluran Tersumbat',
    icon: 'Droplets',
    department: 'Dinas Bina Marga & Sumber Daya Air',
    defaultSla: 36,
    color: '#06b6d4',
    description: 'Saluran air penuh sedimen sampah, gorong-gorong jebol, genangan air saat hujan.'
  },
  {
    id: 'cat-04',
    slug: 'fasilitas_taman',
    name: 'Fasilitas Taman & Publik Rusak',
    icon: 'Trees',
    department: 'Dinas Perumahan & Pertamanan',
    defaultSla: 72,
    color: '#10b981',
    description: 'Wahana bermain anak rusak, bangku taman patah, atau fasilitas olahraga terbuka.'
  }
];

export const INITIAL_FACILITIES = [
  {
    id: 'fac-001',
    code: 'FAC-001',
    name: 'Ruas Jalan Mawar Raya',
    categoryId: 'cat-01',
    address: 'Jl. Mawar Raya KM 2.5, Kel. Sukamaju',
    lat: -6.917464,
    lng: 107.619123,
    condition: 'Perlu Perbaikan',
    conditionBadge: 'damaged',
    lengthOrCapacity: '1.2 KM (Hotmix Asphalt)',
    lastInspected: '2026-11-01',
    totalReports: 3
  },
  {
    id: 'fac-002',
    code: 'FAC-002',
    name: 'Taman Kota Lansia & RTH',
    categoryId: 'cat-04',
    address: 'Jl. Cisangkuy No. 10, Kel. Cihapit',
    lat: -6.903444,
    lng: 107.621944,
    condition: 'Baik',
    conditionBadge: 'good',
    lengthOrCapacity: 'Luas 2.4 Hektar',
    lastInspected: '2026-11-10',
    totalReports: 1
  },
  {
    id: 'fac-003',
    code: 'FAC-003',
    name: 'PJU Koridor Sudirman Barat A12',
    categoryId: 'cat-02',
    address: 'Jl. Jend. Sudirman No. 120-150',
    lat: -6.920556,
    lng: 107.595833,
    condition: 'Rusak',
    conditionBadge: 'damaged',
    lengthOrCapacity: '18 Titik Lampu LED 90W',
    lastInspected: '2026-11-12',
    totalReports: 2
  },
  {
    id: 'fac-004',
    code: 'FAC-004',
    name: 'Saluran Drainase Bungur Besar',
    categoryId: 'cat-03',
    address: 'Jl. Bungur Besar Raya RW 04',
    lat: -6.911200,
    lng: 107.612500,
    condition: 'Perlu Perbaikan',
    conditionBadge: 'fair',
    lengthOrCapacity: 'Saluran Terbuka 800 Meter',
    lastInspected: '2026-11-05',
    totalReports: 1
  }
];

export const INITIAL_REPORTS = [
  {
    id: 'rep-001',
    ticketNumber: 'CR-2026-00001',
    title: 'Jalan berlubang besar di Jalan Mawar',
    categoryId: 'cat-01',
    facilityId: 'fac-001',
    userId: 'usr-citizen-01',
    reporterName: 'Anisa Rahmawati',
    reporterPhone: '0857-1234-5678',
    description: 'Terdapat lubang berdiameter sekitar 80 cm dengan kedalaman 15 cm di jalur kiri. Sangat membahayakan pengendara motor terutama saat malam dan hujan karena tergenang air.',
    address: 'Jl. Mawar Raya No. 45, dekat Minimarket Sumber Berkah',
    lat: -6.917464,
    lng: 107.619123,
    status: 'assigned', // pending, verified, rejected, assigned, in_progress, resolved, completed
    priority: 'high',
    assignedOfficerId: 'usr-officer-01',
    assignedOfficerName: 'Bambang Sudarsono',
    assignedAt: '2026-11-15T09:30:00Z',
    dueDate: '2026-11-17T17:00:00Z',
    workNotes: 'Gunakan campuran aspal hotmix dan ratakan dengan baby roller. Waspadai lalu lintas jam sibuk sore.',
    createdAt: '2026-11-14T14:20:00Z',
    beforeImage: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=800&auto=format&fit=crop&q=80',
    afterImage: null,
    maintenanceNotes: null,
    histories: [
      {
        id: 'h-1',
        status: 'pending',
        actor: 'Anisa Rahmawati (Citizen)',
        note: 'Laporan kerusakan jalan dibuat oleh warga.',
        timestamp: '2026-11-14T14:20:00Z'
      },
      {
        id: 'h-2',
        status: 'verified',
        actor: 'Ir. Hendra Wijaya (Admin)',
        note: 'Laporan diverifikasi valid, koordinat telah dipastikan berada di ruas Jalan Kota.',
        timestamp: '2026-11-15T08:15:00Z'
      },
      {
        id: 'h-3',
        status: 'assigned',
        actor: 'Ir. Hendra Wijaya (Admin)',
        note: 'Ditugaskan kepada Bambang Sudarsono (Bina Marga). SLA penyelesaian 48 jam.',
        timestamp: '2026-11-15T09:30:00Z'
      }
    ]
  },
  {
    id: 'rep-002',
    ticketNumber: 'CR-2026-00002',
    title: 'Lampu PJU mati sepanjang 200 meter di Sudirman',
    categoryId: 'cat-02',
    facilityId: 'fac-003',
    userId: 'usr-citizen-01',
    reporterName: 'Anisa Rahmawati',
    reporterPhone: '0857-1234-5678',
    description: 'Sebanyak 4 tiang lampu penerangan jalan umum mati total sejak 3 hari lalu. Ruas jalan menjadi gelap gulita dan rawan kriminalitas.',
    address: 'Jl. Jend. Sudirman Blok A No. 128',
    lat: -6.920556,
    lng: 107.595833,
    status: 'in_progress',
    priority: 'medium',
    assignedOfficerId: 'usr-officer-02',
    assignedOfficerName: 'Rian Pratama',
    assignedAt: '2026-11-15T11:00:00Z',
    dueDate: '2026-11-16T18:00:00Z',
    workNotes: 'Cek panel MCB dan sambungan trafo PJU di titik tiang A12.',
    createdAt: '2026-11-15T07:10:00Z',
    beforeImage: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?w=800&auto=format&fit=crop&q=80',
    afterImage: null,
    maintenanceNotes: 'Pengecekan panel menunjukkan kontaktor terbakar. Sedang dilakukan penggantian komponen modul otomatis.',
    histories: [
      {
        id: 'h-4',
        status: 'pending',
        actor: 'Anisa Rahmawati (Citizen)',
        note: 'Laporan PJU padam dikirimkan.',
        timestamp: '2026-11-15T07:10:00Z'
      },
      {
        id: 'h-5',
        status: 'verified',
        actor: 'Ir. Hendra Wijaya (Admin)',
        note: 'Laporan diverifikasi.',
        timestamp: '2026-11-15T10:00:00Z'
      },
      {
        id: 'h-6',
        status: 'assigned',
        actor: 'Ir. Hendra Wijaya (Admin)',
        note: 'Ditugaskan ke teknisi Dishub Rian Pratama.',
        timestamp: '2026-11-15T11:00:00Z'
      },
      {
        id: 'h-7',
        status: 'in_progress',
        actor: 'Rian Pratama (Officer)',
        note: 'Petugas tiba di lokasi dengan mobil tangga hidrolik. Memulai inspeksi perkabelan.',
        timestamp: '2026-11-16T08:00:00Z'
      }
    ]
  },
  {
    id: 'rep-003',
    ticketNumber: 'CR-2026-00003',
    title: 'Drainase penuh sampah padat dan meluap',
    categoryId: 'cat-03',
    facilityId: 'fac-004',
    userId: 'usr-citizen-01',
    reporterName: 'Anisa Rahmawati',
    reporterPhone: '0857-1234-5678',
    description: 'Saluran air tersumbat material kayu dan kantong sampah. Air meluap ke badan jalan saat hujan deras kemarin siang.',
    address: 'Jl. Bungur Besar Raya RW 04 depan Kantor Pos',
    lat: -6.911200,
    lng: 107.612500,
    status: 'resolved',
    priority: 'high',
    assignedOfficerId: 'usr-officer-01',
    assignedOfficerName: 'Bambang Sudarsono',
    assignedAt: '2026-11-14T10:00:00Z',
    dueDate: '2026-11-15T16:00:00Z',
    workNotes: 'Pengurasan sedimen dan pembersihan saringan gorong-gorong.',
    createdAt: '2026-11-13T16:45:00Z',
    beforeImage: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=800&auto=format&fit=crop&q=80',
    afterImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb18615f3?w=800&auto=format&fit=crop&q=80',
    maintenanceNotes: 'Telah dilakukan pengerukan sampah seberat 1.5 ton dengan tim pasukan katak Bina Marga. Aliran air kembali lancar 100%. Menunggu validasi admin.',
    histories: [
      {
        id: 'h-8',
        status: 'pending',
        actor: 'Warga',
        note: 'Laporan diajukan.',
        timestamp: '2026-11-13T16:45:00Z'
      },
      {
        id: 'h-9',
        status: 'verified',
        actor: 'Admin',
        note: 'Laporan diverifikasi.',
        timestamp: '2026-11-14T09:00:00Z'
      },
      {
        id: 'h-10',
        status: 'assigned',
        actor: 'Admin',
        note: 'Ditugaskan ke Bambang Sudarsono.',
        timestamp: '2026-11-14T10:00:00Z'
      },
      {
        id: 'h-11',
        status: 'in_progress',
        actor: 'Bambang Sudarsono (Officer)',
        note: 'Tim pembersih saluran mulai bekerja.',
        timestamp: '2026-11-14T13:30:00Z'
      },
      {
        id: 'h-12',
        status: 'resolved',
        actor: 'Bambang Sudarsono (Officer)',
        note: 'Pembersihan tuntas. Foto Before & After telah diunggah. Menunggu peninjauan admin.',
        timestamp: '2026-11-15T15:45:00Z'
      }
    ]
  },
  {
    id: 'rep-004',
    ticketNumber: 'CR-2026-00004',
    title: 'Ayunan dan wahana perosotan anak patah',
    categoryId: 'cat-04',
    facilityId: 'fac-002',
    userId: 'usr-citizen-01',
    reporterName: 'Anisa Rahmawati',
    reporterPhone: '0857-1234-5678',
    description: 'Rantai ayunan putus dan papan perosotan fiber retak tajam. Sangat berisiko melukai anak-anak yang bermain di taman.',
    address: 'Area Bermain Anak, Taman Lansia Cisangkuy',
    lat: -6.903444,
    lng: 107.621944,
    status: 'completed',
    priority: 'medium',
    assignedOfficerId: 'usr-officer-01',
    assignedOfficerName: 'Bambang Sudarsono',
    assignedAt: '2026-11-10T10:00:00Z',
    dueDate: '2026-11-12T17:00:00Z',
    workNotes: 'Ganti rantai stainless galvanis dan dempul cat pelindung perosotan.',
    createdAt: '2026-11-09T08:00:00Z',
    beforeImage: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&auto=format&fit=crop&q=80',
    afterImage: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=800&auto=format&fit=crop&q=80',
    maintenanceNotes: 'Rantai diganti baru 2 set. Perosotan diperkuat dengan fiberglass baru dan dicat ulang aman anak-anak.',
    histories: [
      {
        id: 'h-13',
        status: 'pending',
        actor: 'Citizen',
        note: 'Laporan kerusakan fasilitas taman dibuat.',
        timestamp: '2026-11-09T08:00:00Z'
      },
      {
        id: 'h-14',
        status: 'verified',
        actor: 'Admin',
        note: 'Diverifikasi.',
        timestamp: '2026-11-09T11:00:00Z'
      },
      {
        id: 'h-15',
        status: 'assigned',
        actor: 'Admin',
        note: 'Ditugaskan ke teknisi taman.',
        timestamp: '2026-11-10T10:00:00Z'
      },
      {
        id: 'h-16',
        status: 'in_progress',
        actor: 'Officer',
        note: 'Penggantian material berlangsung.',
        timestamp: '2026-11-11T09:00:00Z'
      },
      {
        id: 'h-17',
        status: 'resolved',
        actor: 'Officer',
        note: 'Perbaikan selesai dan diuji coba beban.',
        timestamp: '2026-11-12T14:00:00Z'
      },
      {
        id: 'h-18',
        status: 'completed',
        actor: 'Ir. Hendra Wijaya (Admin)',
        note: 'Admin memvalidasi foto bukti: hasil pengerjaan rapi dan aman. Laporan resmi ditutup.',
        timestamp: '2026-11-12T16:30:00Z'
      }
    ]
  },
  {
    id: 'rep-005',
    ticketNumber: 'CR-2026-00005',
    title: 'Trotoar amblas dekat Halte Busway',
    categoryId: 'cat-01',
    facilityId: 'fac-001',
    userId: 'usr-citizen-01',
    reporterName: 'Anisa Rahmawati',
    reporterPhone: '0857-1234-5678',
    description: 'Paving block trotoar copot dan amblas sedalam 20 cm tepat di depan akses halte, menyulitkan pejalan kaki dan disabilitas.',
    address: 'Jl. Mawar Raya KM 2.8 Halte Taman Melati',
    lat: -6.918900,
    lng: 107.620500,
    status: 'pending',
    priority: 'medium',
    assignedOfficerId: null,
    assignedOfficerName: null,
    assignedAt: null,
    dueDate: null,
    workNotes: null,
    createdAt: '2026-11-16T06:15:00Z',
    beforeImage: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop&q=80',
    afterImage: null,
    maintenanceNotes: null,
    histories: [
      {
        id: 'h-19',
        status: 'pending',
        actor: 'Anisa Rahmawati (Citizen)',
        note: 'Laporan baru diajukan, menunggu verifikasi dinas.',
        timestamp: '2026-11-16T06:15:00Z'
      }
    ]
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: 'notif-1',
    userId: 'usr-citizen-01',
    title: 'Laporan Diverifikasi',
    message: 'Laporan Anda CR-2026-00001 (Jalan berlubang di Jalan Mawar) telah diverifikasi dan masuk tahap penugasan.',
    ticketNumber: 'CR-2026-00001',
    isRead: false,
    timestamp: '2026-11-15T09:30:00Z'
  },
  {
    id: 'notif-2',
    userId: 'usr-officer-01',
    title: 'Penugasan Baru',
    message: 'Anda mendapatkan tugas perbaikan baru untuk tiket CR-2026-00001 di Jl. Mawar Raya.',
    ticketNumber: 'CR-2026-00001',
    isRead: false,
    timestamp: '2026-11-15T09:30:00Z'
  },
  {
    id: 'notif-3',
    userId: 'usr-admin-01',
    title: 'Pengajuan Selesai Perbaikan',
    message: 'Petugas Bambang telah menyelesaikan pekerjaan CR-2026-00003 dan menunggu validasi Anda.',
    ticketNumber: 'CR-2026-00003',
    isRead: false,
    timestamp: '2026-11-15T15:45:00Z'
  }
];

