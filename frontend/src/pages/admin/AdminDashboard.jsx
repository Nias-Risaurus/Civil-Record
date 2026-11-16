import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useReports } from '../../context/ReportContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { PriorityBadge } from '../../components/common/PriorityBadge';
import {
  Building2,
  CheckCircle2,
  Clock,
  AlertTriangle,
  XCircle,
  UserCheck,
  Wrench,
  Sparkles,
  BarChart3,
  Users,
  Layers,
  ArrowRight,
  TrendingUp,
  MapPin,
  Calendar,
  FileCheck
} from 'lucide-react';

export const AdminDashboard = () => {
  const { currentUser } = useAuth();
  const {
    reports,
    facilities,
    categories,
    verifyReport,
    rejectReport,
    validateReport
  } = useReports();

  // Metrics
  const total = reports.length;
  const pending = reports.filter((r) => r.status === 'pending');
  const verified = reports.filter((r) => r.status === 'verified');
  const assigned = reports.filter((r) => r.status === 'assigned');
  const inProgress = reports.filter((r) => r.status === 'in_progress');
  const resolved = reports.filter((r) => r.status === 'resolved');
  const completed = reports.filter((r) => r.status === 'completed');
  const rejected = reports.filter((r) => r.status === 'rejected');

  // Mean Time To Repair (Simulated average: 34.5 jam)
  const mttrHours = '32.4 Jam';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/30 border border-purple-400/30 text-xs font-semibold backdrop-blur text-purple-200">
            <Building2 className="w-3.5 h-3.5 text-purple-300" />
            <span>Pemerintah Kota • Pusat Komando Pengelolaan Fasilitas Publik</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Selamat Datang, {currentUser?.name}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            {currentUser?.department}. Pantau kinerja perbaikan, verifikasi laporan masuk, serta kelola fasilitas umum kota dalam satu kendali.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/map"
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs backdrop-blur border border-white/20 transition-all flex items-center gap-1.5"
          >
            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
            <span>Peta Monitoring</span>
          </Link>
        </div>
      </div>

      {/* Analytics KPI Row */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-500 block">Total Laporan</span>
          <p className="text-2xl font-black text-slate-900 mt-1">{total}</p>
          <span className="text-[10px] text-slate-400">Arsip terdaftar</span>
        </div>

        <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200 shadow-xs">
          <span className="text-[11px] font-bold text-amber-700 block">1. Menunggu Verifikasi</span>
          <p className="text-2xl font-black text-amber-900 mt-1">{pending.length}</p>
          <span className="text-[10px] text-amber-600 font-semibold">Perlu tinjauan admin</span>
        </div>

        <div className="bg-sky-50/70 p-4 rounded-2xl border border-sky-200 shadow-xs">
          <span className="text-[11px] font-bold text-sky-700 block">2. Siap Ditugaskan</span>
          <p className="text-2xl font-black text-sky-900 mt-1">{verified.length}</p>
          <span className="text-[10px] text-sky-600 font-semibold">Telah terverifikasi</span>
        </div>

        <div className="bg-purple-50/70 p-4 rounded-2xl border border-purple-200 shadow-xs">
          <span className="text-[11px] font-bold text-purple-700 block">3. Dikerjakan</span>
          <p className="text-2xl font-black text-purple-900 mt-1">{inProgress.length + assigned.length}</p>
          <span className="text-[10px] text-purple-600 font-semibold">Di lapangan</span>
        </div>

        <div className="bg-teal-50/70 p-4 rounded-2xl border border-teal-200 shadow-xs">
          <span className="text-[11px] font-bold text-teal-700 block">4. Menunggu Validasi</span>
          <p className="text-2xl font-black text-teal-900 mt-1">{resolved.length}</p>
          <span className="text-[10px] text-teal-600 font-semibold">Butuh approval bukti</span>
        </div>

        <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200 shadow-xs">
          <span className="text-[11px] font-bold text-emerald-700 block">5. Selesai Tuntas</span>
          <p className="text-2xl font-black text-emerald-900 mt-1">{completed.length}</p>
          <span className="text-[10px] text-emerald-600 font-semibold">SLA: {mttrHours}</span>
        </div>
      </div>

      {/* Two Column Layout: Verification Queue + Validation Queue */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Box 1: Antrean Verifikasi Laporan Baru (Pending) */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden flex flex-col justify-between">
          <div>
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-amber-500" />
                  Antrean Verifikasi Laporan Baru
                </h3>
                <p className="text-xs text-slate-500">
                  Laporan masuk dari masyarakat yang membutuhkan pengecekan validitas
                </p>
              </div>
              <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full">
                {pending.length} Tiket
              </span>
            </div>

            <div className="divide-y divide-slate-100 max-h-96 overflow-y-auto">
              {pending.length === 0 ? (
                <div className="p-8 text-center text-xs text-slate-400">
                  Semua laporan baru telah diverifikasi.
                </div>
              ) : (
                pending.map((item) => (
                  <div key={item.id} className="p-4 hover:bg-slate-50 transition-colors space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[11px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                        {item.ticketNumber}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {new Date(item.createdAt).toLocaleDateString('id-ID')}
                      </span>
                    </div>

                    <div className="flex items-start gap-3">
                      <img
                        src={item.beforeImage}
                        alt={item.title}
                        className="w-16 h-16 rounded-xl object-cover shrink-0 border border-slate-200"
                      />
                      <div className="space-y-0.5 flex-1">
                        <h4 className="font-bold text-xs text-slate-900">{item.title}</h4>
                        <p className="text-[11px] text-slate-500 line-clamp-1">{item.address}</p>
                        <p className="text-[11px] text-slate-600 line-clamp-1 italic">
                          "{item.description}"
                        </p>
                      </div>
                    </div>

                    {/* Quick action buttons */}
                    <div className="flex items-center justify-end gap-2 pt-1">
                      <Link
                        to={`/reports/${item.id}`}
                        className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-lg border border-slate-200"
                      >
                        Detail
                      </Link>
                      <button
                        onClick={() => rejectReport(item.id, 'Foto tidak jelas atau di luar yurisdiksi')}
                        className="text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-lg border border-rose-200"
                      >
                        Tolak
                      </button>
                      <button
                        onClick={() => verifyReport(item.id)}
                        className="text-xs font-bold text-white bg-sky-600 hover:bg-sky-700 px-3 py-1.5 rounded-lg shadow-xs"
                      >
                        Verifikasi (Valid)
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Box 2: Antrean Validasi Penyelesaian Pekerjaan (Resolved -> Completed) */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden flex flex-col justify-between">
          <div>
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                  <FileCheck className="w-4 h-4 text-teal-600" />
                  Antrean Validasi Hasil Perbaikan Lapangan
                </h3>
                <p className="text-xs text-slate-500">
                  Periksa kesesuaian foto Before vs After sebelum disetujui tuntas
                </p>
              </div>
              <span className="text-xs font-bold text-teal-800 bg-teal-100 px-2.5 py-0.5 rounded-full">
                {resolved.length} Pengajuan
              </span>
            </div>

            <div className="divide-y divide-slate-100 max-h-96 overflow-y-auto">
              {resolved.length === 0 ? (
                <div className="p-8 text-center text-xs text-slate-400">
                  Tidak ada perbaikan yang menunggu validasi admin saat ini.
                </div>
              ) : (
                resolved.map((item) => (
                  <div key={item.id} className="p-4 hover:bg-slate-50 transition-colors space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[11px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded">
                        {item.ticketNumber}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        Oleh: <strong>{item.assignedOfficerName}</strong>
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-red-600">SEBELUM:</span>
                        <img
                          src={item.beforeImage}
                          alt="Before"
                          className="w-full h-20 object-cover rounded-lg border border-red-200"
                        />
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-emerald-600">SESUDAH (AFTER):</span>
                        <img
                          src={item.afterImage}
                          alt="After"
                          className="w-full h-20 object-cover rounded-lg border border-emerald-300"
                        />
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-600 line-clamp-1 italic">
                      Catatan Petugas: "{item.maintenanceNotes}"
                    </p>

                    {/* Validation actions */}
                    <div className="flex items-center justify-end gap-2 pt-1">
                      <button
                        onClick={() => validateReport(item.id, false, 'Kualitas perbaikan belum rata, mohon aspal ulang')}
                        className="text-xs font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded-lg border border-amber-200"
                      >
                        Minta Revisi (Rework)
                      </button>
                      <button
                        onClick={() => validateReport(item.id, true, 'Hasil pengerjaan dinilai baik dan tuntas')}
                        className="text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 px-3 py-1.5 rounded-lg shadow-xs"
                      >
                        Setujui & Selesaikan (Approve)
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Facility Registry Summary */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-blue-600" />
              Facility Registry (Data Fasilitas Publik Terkelola)
            </h3>
            <p className="text-xs text-slate-500">
              Registri aset fasilitas publik dan riwayat pemeliharaan berkala
            </p>
          </div>
          <span className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            {facilities.length} Aset Kota
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {facilities.map((fac) => (
            <div
              key={fac.id}
              className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-2 hover:border-slate-300 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-black text-blue-700">{fac.code}</span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    fac.condition === 'Baik'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {fac.condition}
                </span>
              </div>
              <h4 className="font-bold text-xs text-slate-900 leading-snug">{fac.name}</h4>
              <p className="text-[11px] text-slate-500 line-clamp-1">{fac.address}</p>
              <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[10px] text-slate-500">
                <span>{fac.lengthOrCapacity}</span>
                <span className="font-semibold text-blue-600">{fac.totalReports} Laporan</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

