import React from 'react';
import { StatusBadge } from '../common/StatusBadge';
import { Clock, CheckCircle2 } from 'lucide-react';

export const ReportTimeline = ({ histories = [] }) => {
  if (!histories || histories.length === 0) {
    return (
      <div className="text-center py-6 text-xs text-slate-400">
        Belum ada riwayat aktivitas.
      </div>
    );
  }

  // Sort descending by timestamp or preserve chronological flow
  const sorted = [...histories].reverse();

  return (
    <div className="flow-root">
      <ul className="-mb-8">
        {sorted.map((item, idx) => {
          const isLatest = idx === 0;
          return (
            <li key={item.id || idx}>
              <div className="relative pb-8">
                {idx !== sorted.length - 1 ? (
                  <span
                    className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-slate-200"
                    aria-hidden="true"
                  />
                ) : null}
                <div className="relative flex space-x-3 items-start">
                  <div>
                    <span
                      className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${
                        isLatest
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {isLatest ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : (
                        <Clock className="w-4 h-4" />
                      )}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1 pt-0.5">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <StatusBadge status={item.status} size="xs" />
                        <span className="text-xs font-semibold text-slate-800">
                          {item.actor}
                        </span>
                      </div>
                      <time className="text-[11px] text-slate-400 font-medium">
                        {new Date(item.timestamp).toLocaleString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </time>
                    </div>
                    <p className="mt-1.5 text-xs text-slate-600 leading-relaxed bg-slate-50/80 p-2.5 rounded-xl border border-slate-100">
                      {item.note}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
