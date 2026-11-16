import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldAlert,
  Target,
  Users,
  CheckCircle2,
  Clock,
  Sparkles,
  Building2,
  ArrowRight,
  ShieldCheck,
  Award,
  Layers
} from 'lucide-react';

export const AboutPage = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Hero / Vision */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-blue-900 text-xs font-semibold">
          <ShieldAlert className="w-4 h-4 text-blue-600" />
          <span>Tentang CivilRecord</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          Report. Record.{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500">
            Repair.
          </span>
        </h1>
        <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Platform web manajemen pemeliharaan fasilitas umum daerah untuk menjembatani aspirasi masyarakat, penugasan teknis lapangan, hingga pembuktian hasil fisik yang terverifikasi.
        </p>
      </div>

      {/* Why CivilRecord */}
      <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xs space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2.5">
          <Target className="w-6 h-6 text-blue-600" />
          Mengapa Bukan Sekadar Website Pengaduan Biasa?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <p>
            Banyak website pengaduan konvensional berhenti pada tahap formulir dan pemberian nomor antrean. Warga tidak tahu siapa petugas yang menangani, apakah material sudah disiapkan, atau apakah perbaikan benar-benar dilakukan secara tuntas di lapangan.
          </p>
          <p>
            CivilRecord dibangun dengan <strong>Siklus Tertutup (*Closed-Loop System*)</strong>: setiap laporan memiliki alur status bertahap, bukti foto fisik sebelum dan sesudah perbaikan (*Before & After*), serta terhubung ke <strong>Facility Registry</strong> sebagai buku besar pemeliharaan aset pemda.
          </p>
        </div>
      </div>

      {/* 3 Pillars */}
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900">Tiga Pilar Pengguna CivilRecord</h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Setiap peran memiliki tanggung jawab dan antarmuka kerja terspesialisasi
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
              1
            </div>
            <h3 className="font-bold text-base text-slate-900">Citizen (Masyarakat)</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Warga yang menemukan fasilitas rusak dapat membuat laporan dalam waktu kurang dari 2 menit: unggah foto, kunci koordinat di peta, dan pantau progres secara realtime.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
              2
            </div>
            <h3 className="font-bold text-base text-slate-900">Officer (Petugas Lapangan)</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Tim teknis dinas yang menerima tiket tugas penugasan langsung di gawai lapangan, melakukan perbaikan, dan wajib mengunggah foto bukti fisik hasil perbaikan (*After*).
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
              3
            </div>
            <h3 className="font-bold text-base text-slate-900">Admin (Pemerintah Kota)</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Pengelola sistem yang memverifikasi validitas, mencegah duplikasi laporan, menugaskan petugas teknis, dan memvalidasi mutu hasil perbaikan sebelum laporan dinyatakan selesai.
            </p>
          </div>
        </div>
      </div>

      {/* OPD Integrations */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">Organisasi Perangkat Daerah (OPD) Terintegrasi</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700">
            <h4 className="font-bold text-sm text-blue-400">Dinas Bina Marga & Sumber Daya Air</h4>
            <p className="text-slate-400 mt-1">
              Menangani jalan berlubang, jalan amblas, trotoar, gorong-gorong rusak, serta normalisasi saluran drainase perkotaan.
            </p>
          </div>
          <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700">
            <h4 className="font-bold text-sm text-amber-400">Dinas Perhubungan</h4>
            <p className="text-slate-400 mt-1">
              Menangani lampu Penerangan Jalan Umum (PJU) padam, rambu lalu lintas rusak, traffic light padam, serta halte bus.
            </p>
          </div>
          <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700">
            <h4 className="font-bold text-sm text-emerald-400">Dinas Lingkungan Hidup & Pertamanan</h4>
            <p className="text-slate-400 mt-1">
              Menangani fasilitas bermain anak di ruang terbuka hijau, bangku taman publik, dan penanganan sampah liar.
            </p>
          </div>
          <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700">
            <h4 className="font-bold text-sm text-purple-400">Dinas Komunikasi & Informatika</h4>
            <p className="text-slate-400 mt-1">
              Penyedia infrastruktur server, integrasi data geospasial satu data, serta pemantauan SLA pelayanan publik kota.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Bottom */}
      <div className="text-center pt-6 space-y-4">
        <h3 className="text-xl font-bold text-slate-900">Ingin Mencoba Melaporkan Kerusakan?</h3>
        <div className="flex justify-center gap-3">
          <Link
            to="/citizen/create"
            className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-colors"
          >
            Buat Laporan Baru Sekarang
          </Link>
          <Link
            to="/map"
            className="px-6 py-3 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-xs transition-colors"
          >
            Buka Peta Fasilitas Publik
          </Link>
        </div>
      </div>
    </div>
  );
};

