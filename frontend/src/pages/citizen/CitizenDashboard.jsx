import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useReports } from '../../context/ReportContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import {
  Camera,
  PlusCircle,
  Clock,
  CheckCircle,
  FileText,
  MapPin,
  Calendar,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const CitizenDashboard = () => {
  const { currentUser } = useAuth();
  const { reports } = useReports();

  // My reports (or all citizen reports for demo)
  const myReports = reports.filter(
    (r) => r.userId === currentUser?.id || r.reporterName === currentUser?.name
  );

  const pendingCount = myReports.filter((r) => r.status === 'pending').length;
  const inProgressCount = myReports.filter(
    (r) => r.status === 'in_progress' || r.status === 'assigned'
  ).length;
  const completedCount = myReports.filter((r) => r.status === 'completed').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-semibold backdrop-blur">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Dashboard Warga (Citizen Portal)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Halo, {currentUser?.name || 'Warga Masyarakat'}!
          </h1>
          <p className="text-xs sm:text-sm text-blue-100 max-w-xl">
            Mari bersama merawat fasilitas publik kota. Laporkan kerusakan di sekitar Anda dan pantau langsung proses perbaikannya secara transparan.
          </p>
        </div>

        <Link
          to="/citizen/create"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white text-blue-700 hover:bg-blue-50 font-bold text-xs sm:text-sm shadow-md transition-all hover:scale-102 shrink-0 self-start md:self-auto"
        >
          <Camera className="w-4 h-4" />
          <span>Buat Laporan Baru</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Total Laporan Saya</span>
            <FileText className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-2xl font-black text-slate-900 mt-2">{myReports.length}</p>
          <span className="text-[11px] text-slate-400">Semua laporan terdaftar</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-amber-700">Menunggu Verifikasi</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl font-black text-amber-900 mt-2">{pendingCount}</p>
          <span className="text-[11px] text-amber-600">Status Pending</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-purple-700">Dalam Pengerjaan</span>
            <Clock className="w-4 h-4 text-purple-500" />
          </div>
          <p className="text-2xl font-black text-purple-900 mt-2">{inProgressCount}</p>
          <span className="text-[11px] text-purple-600">Sedang ditangani petugas</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-emerald-700">Selesai & Valid</span>
            <CheckCircle className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-2xl font-black text-emerald-900 mt-2">{completedCount}</p>
          <span className="text-[11px] text-emerald-600">Perbaikan telah tuntas</span>
        </div>
      </div>

      {/* Reports List */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Riwayat Laporan Saya</h2>
            <p className="text-xs text-slate-500">
              Daftar seluruh laporan kerusakan fasilitas publik yang pernah Anda kirimkan
            </p>
          </div>

          <Link
            to="/citizen/create"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Tambah</span>
          </Link>
        </div>

        <div className="divide-y divide-slate-100">
          {myReports.length === 0 ? (
            <div className="p-12 text-center space-y-3">
              <Camera className="w-12 h-12 text-slate-300 mx-auto" />
              <p className="text-sm font-semibold text-slate-600">
                Anda belum pernah mengirimkan laporan.
              </p>
              <Link
                to="/citizen/create"
                className="inline-block px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold shadow"
              >
                Buat Laporan Pertama Sekarang
              </Link>
            </div>
          ) : (
            myReports.map((report) => (
              <div
                key={report.id}
                className="p-5 sm:p-6 hover:bg-slate-50/70 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={report.beforeImage}
                    alt={report.title}
                    className="w-20 h-20 rounded-xl object-cover shrink-0 border border-slate-200 shadow-xs"
                  />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                        {report.ticketNumber}
                      </span>
                      <StatusBadge status={report.status} size="xs" />
                    </div>
                    <h3 className="font-bold text-sm text-slate-900">{report.title}</h3>
                    <p className="text-xs text-slate-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                      <span className="line-clamp-1">{report.address}</span>
                    </p>
                    <p className="text-xs text-slate-600 line-clamp-1">{report.description}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between md:flex-col md:items-end gap-2 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
                  <span className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(report.createdAt).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </span>
                  <Link
                    to={`/reports/${report.id}`}
                    className="inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 text-xs font-bold transition-colors"
                  >
                    <span>Pantau Detail</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

