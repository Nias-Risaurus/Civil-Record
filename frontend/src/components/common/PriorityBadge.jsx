import React from 'react';
import { AlertCircle, AlertTriangle, Info, Flame } from 'lucide-react';

export const PriorityBadge = ({ priority }) => {
  switch (priority?.toLowerCase()) {
    case 'emergency':
      return (
        <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded bg-red-100 text-red-800 border border-red-300 animate-pulse">
          <Flame className="w-3 h-3 text-red-600" />
          Darurat
        </span>
      );
    case 'high':
      return (
        <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded bg-orange-100 text-orange-800 border border-orange-200">
          <AlertCircle className="w-3 h-3 text-orange-600" />
          Tinggi
        </span>
      );
    case 'medium':
      return (
        <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded bg-yellow-100 text-yellow-800 border border-yellow-200">
          <AlertTriangle className="w-3 h-3 text-yellow-600" />
          Sedang
        </span>
      );
    case 'low':
    default:
      return (
        <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
          <Info className="w-3 h-3 text-slate-500" />
          Rendah
        </span>
      );
  }
};

