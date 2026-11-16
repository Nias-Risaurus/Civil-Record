<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Category;
use App\Models\Facility;
use App\Models\Report;
use App\Models\ReportHistory;
use App\Models\Notification;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Users
        $admin = User::create([
            'name' => 'Ir. Hendra Wijaya',
            'email' => 'admin@civilrecord.go.id',
            'password' => Hash::make('password123'),
            'role' => 'admin',
            'department' => 'Dinas Komunikasi & Informatika / Tata Kota',
            'phone' => '0812-9876-5432',
            'avatar_url' => 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
        ]);

        $officerBinaMarga = User::create([
            'name' => 'Bambang Sudarsono',
            'email' => 'bambang@bina-marga.go.id',
            'password' => Hash::make('password123'),
            'role' => 'officer',
            'department' => 'Dinas Bina Marga & SDA (Tim Jalan & Saluran)',
            'phone' => '0813-1122-3344',
            'avatar_url' => 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        ]);

        $officerDishub = User::create([
            'name' => 'Rian Pratama',
            'email' => 'rian@dishub.go.id',
            'password' => Hash::make('password123'),
            'role' => 'officer',
            'department' => 'Dinas Perhubungan (Teknisi PJU & Rambu)',
            'phone' => '0813-5566-7788',
            'avatar_url' => 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
        ]);

        $citizen = User::create([
            'name' => 'Anisa Rahmawati',
            'email' => 'anisa.warga@gmail.com',
            'password' => Hash::make('password123'),
            'role' => 'citizen',
            'department' => 'Masyarakat Umum',
            'phone' => '0857-1234-5678',
            'avatar_url' => 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
        ]);

        // 2. Categories
        $catJalan = Category::create([
            'slug' => 'jalan_rusak',
            'name' => 'Jalan Rusak & Berlubang',
            'icon_name' => 'Road',
            'department' => 'Dinas Bina Marga & Sumber Daya Air',
            'default_sla_hours' => 48,
            'color' => '#ef4444',
            'description' => 'Kerusakan jalan aspal, jalan amblas, retak struktural, atau paving trotoar copot.',
        ]);

        $catPju = Category::create([
            'slug' => 'lampu_pju',
            'name' => 'Lampu Jalan (PJU) Mati',
            'icon_name' => 'Lightbulb',
            'department' => 'Dinas Perhubungan',
            'default_sla_hours' => 24,
            'color' => '#f59e0b',
            'description' => 'Penerangan Jalan Umum tidak menyala, tiang miring, atau kabel PJU terkelupas.',
        ]);

        $catDrainase = Category::create([
            'slug' => 'drainase',
            'name' => 'Drainase & Saluran Tersumbat',
            'icon_name' => 'Droplets',
            'department' => 'Dinas Bina Marga & Sumber Daya Air',
            'default_sla_hours' => 36,
            'color' => '#06b6d4',
            'description' => 'Saluran air penuh sedimen sampah, gorong-gorong jebol, genangan air saat hujan.',
        ]);

        $catTaman = Category::create([
            'slug' => 'fasilitas_taman',
            'name' => 'Fasilitas Taman & Publik Rusak',
            'icon_name' => 'Trees',
            'department' => 'Dinas Perumahan & Pertamanan',
            'default_sla_hours' => 72,
            'color' => '#10b981',
            'description' => 'Wahana bermain anak rusak, bangku taman patah, atau fasilitas olahraga terbuka.',
        ]);

        // 3. Facilities
        $facJalan = Facility::create([
            'code' => 'FAC-001',
            'category_id' => $catJalan->id,
            'name' => 'Ruas Jalan Mawar Raya',
            'address' => 'Jl. Mawar Raya KM 2.5, Kel. Sukamaju',
            'latitude' => -6.917464,
            'longitude' => 107.619123,
            'condition' => 'Perlu Perbaikan',
            'length_or_capacity' => '1.2 KM (Hotmix Asphalt)',
            'last_inspected_at' => '2026-11-01',
        ]);

        $facTaman = Facility::create([
            'code' => 'FAC-002',
            'category_id' => $catTaman->id,
            'name' => 'Taman Kota Lansia & RTH',
            'address' => 'Jl. Cisangkuy No. 10, Kel. Cihapit',
            'latitude' => -6.903444,
            'longitude' => 107.621944,
            'condition' => 'Baik',
            'length_or_capacity' => 'Luas 2.4 Hektar',
            'last_inspected_at' => '2026-11-10',
        ]);

        $facPju = Facility::create([
            'code' => 'FAC-003',
            'category_id' => $catPju->id,
            'name' => 'PJU Koridor Sudirman Barat A12',
            'address' => 'Jl. Jend. Sudirman No. 120-150',
            'latitude' => -6.920556,
            'longitude' => 107.595833,
            'condition' => 'Rusak',
            'length_or_capacity' => '18 Titik Lampu LED 90W',
            'last_inspected_at' => '2026-11-12',
        ]);

        $facDrainase = Facility::create([
            'code' => 'FAC-004',
            'category_id' => $catDrainase->id,
            'name' => 'Saluran Drainase Bungur Besar',
            'address' => 'Jl. Bungur Besar Raya RW 04',
            'latitude' => -6.911200,
            'longitude' => 107.612500,
            'condition' => 'Perlu Perbaikan',
            'length_or_capacity' => 'Saluran Terbuka 800 Meter',
            'last_inspected_at' => '2026-11-05',
        ]);

        // 4. Sample Reports
        $rep1 = Report::create([
            'ticket_number' => 'CR-2026-00001',
            'user_id' => $citizen->id,
            'category_id' => $catJalan->id,
            'facility_id' => $facJalan->id,
            'title' => 'Jalan berlubang besar di Jalan Mawar',
            'description' => 'Terdapat lubang berdiameter sekitar 80 cm dengan kedalaman 15 cm di jalur kiri. Sangat membahayakan pengendara motor.',
            'address' => 'Jl. Mawar Raya No. 45, dekat Minimarket Sumber Berkah',
            'latitude' => -6.917464,
            'longitude' => 107.619123,
            'status' => 'assigned',
            'priority' => 'high',
            'assigned_officer_id' => $officerBinaMarga->id,
            'assigned_at' => now()->subDay(),
            'due_date' => now()->addDay(),
            'work_notes' => 'Gunakan campuran aspal hotmix dan ratakan dengan baby roller.',
            'before_image_url' => 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=800&auto=format&fit=crop&q=80',
        ]);

        ReportHistory::create([
            'report_id' => $rep1->id,
            'user_id' => $citizen->id,
            'actor_name' => 'Anisa Rahmawati (Citizen)',
            'previous_status' => null,
            'new_status' => 'pending',
            'remarks' => 'Laporan kerusakan jalan dibuat oleh warga.',
            'created_at' => now()->subDays(2),
        ]);

        ReportHistory::create([
            'report_id' => $rep1->id,
            'user_id' => $admin->id,
            'actor_name' => 'Ir. Hendra Wijaya (Admin)',
            'previous_status' => 'pending',
            'new_status' => 'verified',
            'remarks' => 'Laporan diverifikasi valid, berada di ruas Jalan Kota.',
            'created_at' => now()->subDay(),
        ]);

        ReportHistory::create([
            'report_id' => $rep1->id,
            'user_id' => $admin->id,
            'actor_name' => 'Ir. Hendra Wijaya (Admin)',
            'previous_status' => 'verified',
            'new_status' => 'assigned',
            'remarks' => 'Ditugaskan kepada Bambang Sudarsono (Bina Marga). SLA 48 jam.',
            'created_at' => now()->subDay(),
        ]);

        // Report 2: PJU (In Progress)
        $rep2 = Report::create([
            'ticket_number' => 'CR-2026-00002',
            'user_id' => $citizen->id,
            'category_id' => $catPju->id,
            'facility_id' => $facPju->id,
            'title' => 'Lampu PJU mati sepanjang 200 meter di Sudirman',
            'description' => 'Sebanyak 4 tiang lampu penerangan jalan umum mati total sejak 3 hari lalu.',
            'address' => 'Jl. Jend. Sudirman Blok A No. 128',
            'latitude' => -6.920556,
            'longitude' => 107.595833,
            'status' => 'in_progress',
            'priority' => 'medium',
            'assigned_officer_id' => $officerDishub->id,
            'assigned_at' => now()->subHours(12),
            'due_date' => now()->addHours(12),
            'work_notes' => 'Cek panel MCB dan sambungan trafo PJU di titik tiang A12.',
            'maintenance_notes' => 'Pengecekan panel menunjukkan kontaktor terbakar. Sedang penggantian modul.',
            'before_image_url' => 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?w=800&auto=format&fit=crop&q=80',
        ]);

        // Report 3: Completed (Before & After)
        $rep3 = Report::create([
            'ticket_number' => 'CR-2026-00004',
            'user_id' => $citizen->id,
            'category_id' => $catTaman->id,
            'facility_id' => $facTaman->id,
            'title' => 'Ayunan dan wahana perosotan anak patah',
            'description' => 'Rantai ayunan putus dan papan perosotan fiber retak tajam.',
            'address' => 'Area Bermain Anak, Taman Lansia Cisangkuy',
            'latitude' => -6.903444,
            'longitude' => 107.621944,
            'status' => 'completed',
            'priority' => 'medium',
            'assigned_officer_id' => $officerBinaMarga->id,
            'assigned_at' => now()->subDays(5),
            'due_date' => now()->subDays(3),
            'work_notes' => 'Ganti rantai stainless galvanis dan dempul cat pelindung perosotan.',
            'maintenance_notes' => 'Rantai diganti baru 2 set. Perosotan diperkuat dengan fiberglass baru.',
            'admin_feedback' => 'Hasil rapi dan aman untuk anak-anak.',
            'before_image_url' => 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&auto=format&fit=crop&q=80',
            'after_image_url' => 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=800&auto=format&fit=crop&q=80',
            'completed_at' => now()->subDays(2),
        ]);
    }
}
