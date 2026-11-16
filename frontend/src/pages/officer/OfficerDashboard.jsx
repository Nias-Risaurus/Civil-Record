import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useReports } from '../../context/ReportContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { PriorityBadge } from '../../components/common/PriorityBadge';
import {
  Wrench,
  Clock,
  CheckCircle2,
  AlertCircle,
  MapPin,
  Calendar,
  ArrowRight,
  Sparkles,
  Navigation,
  HardHat,
  ShieldCheck,
  CheckSquare,
  FileText,
  AlertTriangle,
  Building
} from 'lucide-react';

export const OfficerDashboard = () => {
  const { currentUser } = useAuth();
  const { reports, startReportWork } = useReports();
  const [activeTab, setActiveTab] = useState('all');

  // Tasks assigned to this officer (or all assigned/in_progress tasks for demo preview)
  const myTasks = reports.filter(
    (r) =>
      r.assignedOfficerId === currentUser?.id ||
      r.assignedOfficerName === currentUser?.name ||
      r.status === 'assigned' ||
      r.status === 'in_progress' ||
      r.status === 'resolved' ||
      r.status === 'completed'
  );

  const assignedTasks = myTasks.filter((t) => t.status === 'assigned');
  const inProgressTasks = myTasks.filter((t) => t.status === 'in_progress');
  const resolvedTasks = myTasks.filter((t) => t.status === 'resolved');
  const completedTasks = myTasks.filter((t) => t.status === 'completed');

  const displayedTasks =
    activeTab === 'all'
      ? myTasks
      : activeTab === 'assigned'
      ? assignedTasks
      : activeTab === 'in_progress'
      ? inProgressTasks
      : activeTab === 'resolved'
      ? resolvedTasks
      : completedTasks;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Officer Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/30 border border-indigo-400/30 text-xs font-semibold backdrop-blur text-indigo-200">
            <HardHat className="w-3.5 h-3.5 text-amber-400" />
            <span>Dashboard Lapangan Petugas Teknis OPD</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Semangat Bekerja, {currentUser?.name}!
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            {currentUser?.department}. Anda memiliki{' '}
            <strong className="text-amber-400 font-bold">{inProgressTasks.length} pekerjaan aktif</strong> yang sedang berjalan hari ini.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/map"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs backdrop-blur border border-white/20 transition-all"
          >
            <Navigation className="w-4 h-4 text-emerald-400" />
            <span>Peta Rute Lapangan</span>
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-indigo-700">Tugas Baru Masuk</span>
            <Clock className="w-4 h-4 text-indigo-500" />
          </div>
          <p className="text-2xl font-black text-indigo-900 mt-2">{assignedTasks.length}</p>
          <span className="text-[11px] text-indigo-600">Perlu konfirmasi pengerjaan</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-purple-700">Sedang Dikerjakan</span>
            <Wrench className="w-4 h-4 text-purple-500" />
          </div>
          <p className="text-2xl font-black text-purple-900 mt-2">{inProgressTasks.length}</p>
          <span className="text-[11px] text-purple-600">Aktivitas di lapangan</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-teal-700">Menunggu Review Admin</span>
            <Sparkles className="w-4 h-4 text-teal-500" />
          </div>
          <p className="text-2xl font-black text-teal-900 mt-2">{resolvedTasks.length}</p>
          <span className="text-[11px] text-teal-600">Bukti After telah diunggah</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-emerald-700">Selesai & Disetujui</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-2xl font-black text-emerald-900 mt-2">{completedTasks.length}</p>
          <span className="text-[11px] text-emerald-600">Laporan ditutup sukses</span>
        </div>
      </div>

      {/* K3 Safety & Compliance Municipal Protocol Banner */}
      <div className="bg-gradient-to-r from-amber-500/10 via-amber-50 to-orange-50 border border-amber-200/80 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
              <span>Standar Keselamatan Kerja (K3) Dinas PU & Perhubungan</span>
              <span className="text-[10px] bg-amber-200 text-amber-800 px-2 py-0.5 rounded-full font-bold">
                MANDATORI
              </span>
            </h4>
            <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
              Wajib gunakan <strong>Rompi Reflektif</strong>, <strong>Helm SNI</strong>, serta pasang <strong>Traffic Cones</strong> minimal 15 meter sebelum area pengerjaan fisik di badan jalan. Catat bahan dan alat berat pada formulir berita acara sebelum submit.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 text-xs font-bold text-amber-800 bg-white/80 backdrop-blur px-3 py-2 rounded-xl border border-amber-200">
          <HardHat className="w-4 h-4 text-amber-600" />
          <span>SOP No. 04/K3-PU/2026</span>
        </div>
      </div>

      {/* Task List */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Daftar Tugas Perbaikan Saya</h2>
            <p className="text-xs text-slate-500">
              Tiket penugasan lapangan dari administrator pemda yang ditujukan kepada Anda
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-white text-slate-900 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Semua ({myTasks.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('assigned')}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'assigned'
                  ? 'bg-indigo-600 text-white shadow-xs font-bold'
                  : 'text-slate-600 hover:text-indigo-600'
              }`}
            >
              Baru ({assignedTasks.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('in_progress')}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'in_progress'
                  ? 'bg-purple-600 text-white shadow-xs font-bold'
                  : 'text-slate-600 hover:text-purple-600'
              }`}
            >
              Dikerjakan ({inProgressTasks.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('resolved')}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'resolved'
                  ? 'bg-teal-600 text-white shadow-xs font-bold'
                  : 'text-slate-600 hover:text-teal-600'
              }`}
            >
              Review ({resolvedTasks.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('completed')}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'completed'
                  ? 'bg-emerald-600 text-white shadow-xs font-bold'
                  : 'text-slate-600 hover:text-emerald-600'
              }`}
            >
              Selesai ({completedTasks.length})
            </button>
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {displayedTasks.length === 0 ? (
            <div className="p-12 text-center text-xs text-slate-400">
              Tidak ada tugas di kategori tab ini.
            </div>
          ) : (
            displayedTasks.map((task) => (
              <div
                key={task.id}
                className="p-5 sm:p-6 hover:bg-slate-50/70 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={task.beforeImage}
                    alt={task.title}
                    className="w-20 h-20 rounded-xl object-cover shrink-0 border border-slate-200 shadow-xs"
                  />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                        {task.ticketNumber}
                      </span>
                      <StatusBadge status={task.status} size="xs" />
                      <PriorityBadge priority={task.priority} />
                    </div>

                    <h3 className="font-bold text-sm text-slate-900">{task.title}</h3>

                    <p className="text-xs text-slate-500 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{task.address}</span>
                    </p>

                    {task.workNotes && (
                      <p className="text-xs text-indigo-700 bg-indigo-50/70 p-2 rounded-lg border border-indigo-100 mt-1">
                        <strong>Instruksi Admin:</strong> {task.workNotes}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between md:flex-col md:items-end gap-2 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
                  {task.dueDate && (
                    <span className="text-[11px] font-semibold text-rose-600 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Batas SLA: {new Date(task.dueDate).toLocaleDateString('id-ID')}
                    </span>
                  )}

                  <div className="flex items-center gap-2">
                    {task.status === 'assigned' && (
                      <button
                        onClick={() => startReportWork(task.id)}
                        className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
                      >
                        <Wrench className="w-3.5 h-3.5" />
                        <span>Mulai Kerja</span>
                      </button>
                    )}

                    {task.status === 'in_progress' && (
                      <Link
                        to={`/reports/${task.id}`}
                        className="px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5 animate-pulse"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Selesaikan (After & K3)</span>
                      </Link>
                    )}

                    <Link
                      to={`/reports/${task.id}`}
                      className="inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 text-xs font-bold transition-colors"
                    >
                      <span>Lembar Kerja</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

