import React from 'react';
import {
  Clock,
  CheckCircle,
  XCircle,
  UserCheck,
  Wrench,
  Sparkles,
  CheckCheck
} from 'lucide-react';

export const StatusBadge = ({ status, size = 'sm' }) => {
  const getBadgeConfig = () => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return {
          label: 'Pending',
          desc: 'Menunggu Verifikasi',
          bg: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800',
          dot: 'bg-amber-500',
          icon: Clock
        };
      case 'verified':
        return {
          label: 'Verified',
          desc: 'Terverifikasi',
          bg: 'bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950/40 dark:text-sky-300 dark:border-sky-800',
          dot: 'bg-sky-500',
          icon: CheckCircle
        };
      case 'assigned':
        return {
          label: 'Assigned',
          desc: 'Petugas Ditugaskan',
          bg: 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-300 dark:border-indigo-800',
          dot: 'bg-indigo-500',
          icon: UserCheck
        };
      case 'in_progress':
        return {
          label: 'In Progress',
          desc: 'Sedang Dikerjakan',
          bg: 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-800',
          dot: 'bg-purple-500',
          icon: Wrench
        };
      case 'resolved':
        return {
          label: 'Resolved',
          desc: 'Selesai Lapangan (Menunggu Validasi)',
          bg: 'bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-950/40 dark:text-teal-300 dark:border-teal-800',
          dot: 'bg-teal-500',
          icon: Sparkles
        };
      case 'completed':
        return {
          label: 'Completed',
          desc: 'Selesai & Divalidasi',
          bg: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800',
          dot: 'bg-emerald-500',
          icon: CheckCheck
        };
      case 'rejected':
        return {
          label: 'Rejected',
          desc: 'Laporan Ditolak',
          bg: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800',
          dot: 'bg-rose-500',
          icon: XCircle
        };
      default:
        return {
          label: status || 'Unknown',
          desc: status,
          bg: 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700',
          dot: 'bg-slate-400',
          icon: Clock
        };
    }
  };

  const config = getBadgeConfig();
  const Icon = config.icon;

  const sizeClasses =
    size === 'xs'
      ? 'text-xs px-2 py-0.5'
      : size === 'lg'
      ? 'text-sm px-3.5 py-1.5'
      : 'text-xs px-2.5 py-1';

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-full border ${config.bg} ${sizeClasses}`}
      title={config.desc}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      <Icon className="w-3.5 h-3.5" />
      <span>{config.label}</span>
    </span>
  );
};

