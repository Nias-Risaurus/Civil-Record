import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useReports } from '../../context/ReportContext';
import { useAuth } from '../../context/AuthContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { InteractiveMap } from '../../components/maps/InteractiveMap';
import {
  ShieldAlert,
  ArrowRight,
  MapPin,
  Camera,
  CheckCircle2,
  Clock,
  Wrench,
  Search,
  Sparkles,
  BarChart3,
  Users,
  CheckCheck,
  Building,
  AlertTriangle,
  Lightbulb,
  Droplets,
  Trees
} from 'lucide-react';

export const LandingPage = () => {
  const { reports } = useReports();
  const { switchRole } = useAuth();
  const navigate = useNavigate();

  const [trackInput, setTrackInput] = useState('');

  const handleTrack = (e) => {
    e.preventDefault();
    if (trackInput.trim()) {
      navigate(`/track?ticket=${encodeURIComponent(trackInput.trim().toUpperCase())}`);
    }
  };

  // Stats calculation
  const total = reports.length;
  const inProgress = reports.filter(
    (r) => r.status === 'in_progress' || r.status === 'assigned'
  ).length;
  const completed = reports.filter((r) => r.status === 'completed').length;
  const pending = reports.filter((r) => r.status === 'pending').length;

  return (
    <div className="space-y-16 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 bg-gradient-to-b from-blue-50/70 via-white to-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Headline */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-blue-900 text-xs font-semibold tracking-wide">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                Sistem Terpadu Manajemen Fasilitas Publik Daerah
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
                Report. Record.{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500">
                  Repair.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-normal">
                Bukan sekadar website pengaduan. <strong>CivilRecord</strong> mengintegrasikan pelaporan masyarakat, pengelolaan penugasan lapangan petugas teknis, dokumentasi bukti perbaikan (*Before & After*), hingga riwayat pemeliharaan aset publik pemda.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  to="/citizen/create"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-lg shadow-blue-500/25 transition-all hover:scale-102"
                >
                  <Camera className="w-4 h-4" />
                  <span>Laporkan Kerusakan Fasilitas</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/map"
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 font-semibold text-sm shadow-xs transition-colors"
                >
                  <MapPin className="w-4 h-4 text-emerald-600" />
                  <span>Jelajahi Peta Publik</span>
                </Link>
              </div>

              {/* Track Input Bar */}
              <div className="pt-4 max-w-lg">
                <form
                  onSubmit={handleTrack}
                  className="flex items-center gap-2 p-1.5 rounded-2xl bg-white border border-slate-300 shadow-md focus-within:ring-2 focus-within:ring-blue-500 transition-all"
                >
                  <Search className="w-5 h-5 text-slate-400 ml-3" />
                  <input
                    type="text"
                    value={trackInput}
                    onChange={(e) => setTrackInput(e.target.value)}
                    placeholder="Masukkan Nomor Tiket (Contoh: CR-2026-00001)..."
                    className="flex-1 bg-transparent border-none text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-blue-600 text-white font-medium text-xs transition-colors"
                  >
                    Lacak
                  </button>
                </form>
              </div>
            </div>

            {/* Right Column: Hero Visual / Quick Metric Card */}
            <div className="lg:col-span-5">
              <div className="relative bg-white rounded-3xl p-6 shadow-xl border border-slate-200/80 space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping"></span>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Live Metric Kota
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                    Realtime Data
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <p className="text-xs font-semibold text-slate-500">Total Laporan</p>
                    <p className="text-3xl font-black text-slate-900 mt-1">{total}</p>
                    <span className="text-[11px] text-blue-600 font-medium">Masuk sistem</span>
                  </div>

                  <div className="bg-amber-50/60 p-4 rounded-2xl border border-amber-100">
                    <p className="text-xs font-semibold text-amber-700">Antrean Verifikasi</p>
                    <p className="text-3xl font-black text-amber-900 mt-1">{pending}</p>
                    <span className="text-[11px] text-amber-700 font-medium">Menunggu admin</span>
                  </div>

                  <div className="bg-purple-50/60 p-4 rounded-2xl border border-purple-100">
                    <p className="text-xs font-semibold text-purple-700">Dikerjakan Petugas</p>
                    <p className="text-3xl font-black text-purple-900 mt-1">{inProgress}</p>
                    <span className="text-[11px] text-purple-700 font-medium">Di lapangan</span>
                  </div>

                  <div className="bg-emerald-50/60 p-4 rounded-2xl border border-emerald-100">
                    <p className="text-xs font-semibold text-emerald-700">Selesai & Valid</p>
                    <p className="text-3xl font-black text-emerald-900 mt-1">{completed}</p>
                    <span className="text-[11px] text-emerald-700 font-medium">Perbaikan tuntas</span>
                  </div>
                </div>

                {/* Role Switcher Sandbox for testers */}
                <div className="pt-2 border-t border-slate-100">
                  <p className="text-xs font-semibold text-slate-700 mb-2">
                    Jelajahi Portal Sebagai Peran:
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => {
                        switchRole('citizen');
                        navigate('/citizen');
                      }}
                      className="p-2.5 rounded-xl border border-blue-200 bg-blue-50/50 hover:bg-blue-100 text-blue-800 text-left transition-colors"
                    >
                      <p className="text-xs font-bold">1. Citizen</p>
                      <p className="text-[10px] text-slate-600">Pelapor Warga</p>
                    </button>
                    <button
                      onClick={() => {
                        switchRole('officer');
                        navigate('/officer');
                      }}
                      className="p-2.5 rounded-xl border border-indigo-200 bg-indigo-50/50 hover:bg-indigo-100 text-indigo-800 text-left transition-colors"
                    >
                      <p className="text-xs font-bold">2. Officer</p>
                      <p className="text-[10px] text-slate-600">Petugas Teknis</p>
                    </button>
                    <button
                      onClick={() => {
                        switchRole('admin');
                        navigate('/admin');
                      }}
                      className="p-2.5 rounded-xl border border-purple-200 bg-purple-50/50 hover:bg-purple-100 text-purple-800 text-left transition-colors"
                    >
                      <p className="text-xs font-bold">3. Admin</p>
                      <p className="text-[10px] text-slate-600">Verifikator Pemda</p>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 1: Gambaran Masalah yang Ingin Diselesaikan */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
            Konteks Lapangan
          </span>
          <h2 className="text-3xl font-bold text-slate-900 mt-3 tracking-tight">
            Fasilitas Umum Sering Mengalami Kerusakan
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Bila warga hanya mengeluh di media sosial, penanganan menjadi lambat dan sulit didata. CivilRecord menyatukan seluruh proses ini dalam satu platform terstruktur.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Jalan Rusak */}
          <div className="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all">
            <div className="relative h-48 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=600&auto=format&fit=crop&q=80"
                alt="Jalan rusak dan berlubang"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                Infrastruktur Jalan
              </span>
            </div>
            <div className="p-4 space-y-1.5">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-red-500" />
                Jalan Berlubang & Rusak
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Membahayakan keselamatan pengguna motor dan mobil, memicu kecelakaan, dan merusak kendaraan bila tak segera ditambal.
              </p>
            </div>
          </div>

          {/* Card 2: Lampu Jalan */}
          <div className="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all">
            <div className="relative h-48 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1509114397022-ed747cca3f65?w=600&auto=format&fit=crop&q=80"
                alt="Lampu jalan PJU mati"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute top-3 left-3 bg-amber-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                Penerangan (PJU)
              </span>
            </div>
            <div className="p-4 space-y-1.5">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 text-amber-500" />
                Lampu Jalan Mati
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Membuat koridor jalan gelap gulita, meningkatkan kerawanan tindak kejahatan malam, dan mengurangi visibilitas pengendara.
              </p>
            </div>
          </div>

          {/* Card 3: Drainase */}
          <div className="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all">
            <div className="relative h-48 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=600&auto=format&fit=crop&q=80"
                alt="Drainase tersumbat sampah"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute top-3 left-3 bg-cyan-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                Tata Air & Banjir
              </span>
            </div>
            <div className="p-4 space-y-1.5">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <Droplets className="w-4 h-4 text-cyan-500" />
                Drainase Tersumbat
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Sampah padat dan sedimentasi menghambat laju air, menyebabkan genangan banjir ke pemukiman dan merusak lapisan aspal.
              </p>
            </div>
          </div>

          {/* Card 4: Fasilitas Taman */}
          <div className="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all">
            <div className="relative h-48 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&auto=format&fit=crop&q=80"
                alt="Fasilitas taman rusak"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute top-3 left-3 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                Ruang Terbuka Hijau
              </span>
            </div>
            <div className="p-4 space-y-1.5">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <Trees className="w-4 h-4 text-emerald-500" />
                Fasilitas Taman Rusak
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Wahana bermain anak yang patah, bangku taman rusak, dan pagar jebol yang mengurangi kenyamanan dan keamanan warga.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Alur 8 Tahap Penanganan */}
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-950/80 border border-blue-800 px-3 py-1 rounded-full">
              Siklus Tertutup (Closed-Loop System)
            </span>
            <h2 className="text-3xl font-bold mt-3 tracking-tight">
              Alur Lengkap CivilRecord dari Laporan ke Perbaikan
            </h2>
            <p className="text-slate-400 text-sm mt-2">
              Setiap langkah terdata dengan akurat, memiliki bukti nyata, dan tidak ada tombol selesai yang ditekan tanpa pertanggungjawaban.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/60 relative">
              <span className="text-2xl font-black text-blue-500 mb-2 block">01</span>
              <h4 className="font-bold text-sm text-white">Masyarakat Temukan Kerusakan</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Warga melihat fasilitas umum rusak dan membuka aplikasi CivilRecord.
              </p>
            </div>

            <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/60 relative">
              <span className="text-2xl font-black text-blue-500 mb-2 block">02</span>
              <h4 className="font-bold text-sm text-white">Buat Laporan & Pin Lokasi</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Unggah foto, pilih kategori, dan kunci koordinat di peta Leaflet. Dapat nomor tiket <code className="text-blue-400">CR-2026-XXXXX</code>.
              </p>
            </div>

            <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/60 relative">
              <span className="text-2xl font-black text-blue-500 mb-2 block">03</span>
              <h4 className="font-bold text-sm text-white">Admin Verifikasi Laporan</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Admin memeriksa validitas foto, deteksi duplikasi lokasi, dan menyetujui status <span className="text-sky-400">Verified</span>.
              </p>
            </div>

            <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/60 relative">
              <span className="text-2xl font-black text-blue-500 mb-2 block">04</span>
              <h4 className="font-bold text-sm text-white">Penugasan Petugas (Dispatch)</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Admin memilih teknisi dinas terkait dan menetapkan batas waktu pengerjaan (SLA).
              </p>
            </div>

            <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/60 relative">
              <span className="text-2xl font-black text-indigo-400 mb-2 block">05</span>
              <h4 className="font-bold text-sm text-white">Petugas Mulai Bekerja</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Petugas tiba di lokasi dan mengubah status menjadi <span className="text-purple-400">In Progress</span>.
              </p>
            </div>

            <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/60 relative">
              <span className="text-2xl font-black text-indigo-400 mb-2 block">06</span>
              <h4 className="font-bold text-sm text-white">Unggah Bukti Hasil (After)</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Petugas wajib mengunggah foto sesudah perbaikan & rincian tindakan. Status: <span className="text-teal-400">Resolved</span>.
              </p>
            </div>

            <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/60 relative">
              <span className="text-2xl font-black text-emerald-400 mb-2 block">07</span>
              <h4 className="font-bold text-sm text-white">Admin Validasi Hasil</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Admin memeriksa komparasi Before vs After. Bila lolos, disetujui menjadi <span className="text-emerald-400">Completed</span>.
              </p>
            </div>

            <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/60 relative">
              <span className="text-2xl font-black text-emerald-400 mb-2 block">08</span>
              <h4 className="font-bold text-sm text-white">Masyarakat & Arsip Aset</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Warga melihat hasil perbaikan, dan data tercatat permanen di riwayat pemeliharaan fasilitas pemda.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Peta Publik Interaktif Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
              Peta Geospasial
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2 tracking-tight">
              Pemantauan Titik Kerusakan Fasilitas Terkini
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Transparansi titik laporan di wilayah perkotaan berbasis OpenStreetMap & Leaflet.
            </p>
          </div>

          <Link
            to="/map"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 bg-blue-50 px-4 py-2 rounded-xl border border-blue-200 transition-colors shrink-0"
          >
            <span>Buka Peta Layar Penuh</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <InteractiveMap reports={reports} height="440px" />
      </section>

      {/* Section 4: Laporan Terbaru */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900">Laporan Publik Terkini</h2>
          <Link
            to="/map"
            className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1"
          >
            Lihat semua di peta <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reports.slice(0, 3).map((r) => (
            <div
              key={r.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col"
            >
              <div className="relative h-44">
                <img
                  src={r.beforeImage}
                  alt={r.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3">
                  <StatusBadge status={r.status} size="xs" />
                </div>
                <span className="absolute bottom-3 right-3 font-mono text-[11px] font-bold bg-black/75 text-white px-2 py-0.5 rounded backdrop-blur">
                  {r.ticketNumber}
                </span>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm line-clamp-1">{r.title}</h3>
                  <p className="text-xs text-slate-500 mt-1 flex items-start gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                    <span className="line-clamp-1">{r.address}</span>
                  </p>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-2">{r.description}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">
                    {new Date(r.createdAt).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </span>
                  <Link
                    to={`/reports/${r.id}`}
                    className="text-xs font-bold text-blue-600 hover:text-blue-800"
                  >
                    Detail Laporan →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

