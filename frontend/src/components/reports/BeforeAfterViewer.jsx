import React, { useState } from 'react';
import { Columns, Split, Eye, CheckCircle2, Clock } from 'lucide-react';

export const BeforeAfterViewer = ({
  beforeImage,
  afterImage,
  beforeCaption = 'Foto Kondisi Awal (Pelapor)',
  afterCaption = 'Foto Hasil Perbaikan (Petugas Lapangan)'
}) => {
  const [activeTab, setActiveTab] = useState('side-by-side'); // 'side-by-side', 'before', 'after'

  if (!afterImage) {
    return (
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <Clock className="w-4 h-4 text-amber-500" />
          Dokumentasi Kerusakan (Awal)
        </h4>
        <div className="relative rounded-xl overflow-hidden border border-slate-200 shadow-sm max-h-96">
          <img
            src={beforeImage}
            alt="Foto Kerusakan Awal"
            className="w-full h-80 object-cover"
          />
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/75 to-transparent p-3 text-white">
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-500 text-white inline-block mb-1">
              BEFORE
            </span>
            <p className="text-xs text-slate-200">{beforeCaption}</p>
          </div>
        </div>
        <p className="text-xs text-slate-500 mt-2 italic text-center">
          *Foto hasil perbaikan (AFTER) akan diunggah oleh petugas lapangan setelah pengerjaan selesai.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Komparasi Bukti Fisik: Sebelum vs Sesudah
          </h4>
          <p className="text-xs text-slate-500">
            Perbandingan kondisi fasilitas untuk validasi administratif
          </p>
        </div>

        {/* View toggle */}
        <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('side-by-side')}
            className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
              activeTab === 'side-by-side'
                ? 'bg-white text-blue-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Bandingan (Side by Side)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('before')}
            className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
              activeTab === 'before'
                ? 'bg-white text-blue-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Sebelum
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('after')}
            className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
              activeTab === 'after'
                ? 'bg-white text-blue-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Sesudah
          </button>
        </div>
      </div>

      {/* Side by side display */}
      {activeTab === 'side-by-side' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Before */}
          <div className="relative rounded-xl overflow-hidden border border-red-200 shadow-sm group">
            <img
              src={beforeImage}
              alt="Sebelum Perbaikan"
              className="w-full h-72 object-cover transition-transform group-hover:scale-102"
            />
            <div className="absolute top-3 left-3 bg-red-600/90 text-white text-[11px] font-bold px-2.5 py-1 rounded-md shadow-md backdrop-blur">
              SEBELUM (BEFORE)
            </div>
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-3 text-white">
              <p className="text-xs font-medium text-slate-200">{beforeCaption}</p>
            </div>
          </div>

          {/* After */}
          <div className="relative rounded-xl overflow-hidden border border-emerald-300 shadow-sm group">
            <img
              src={afterImage}
              alt="Setelah Perbaikan"
              className="w-full h-72 object-cover transition-transform group-hover:scale-102"
            />
            <div className="absolute top-3 left-3 bg-emerald-600/90 text-white text-[11px] font-bold px-2.5 py-1 rounded-md shadow-md backdrop-blur flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              SESUDAH (AFTER)
            </div>
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-3 text-white">
              <p className="text-xs font-medium text-slate-200">{afterCaption}</p>
            </div>
          </div>
        </div>
      )}

      {/* Before single */}
      {activeTab === 'before' && (
        <div className="relative rounded-xl overflow-hidden border border-red-200 shadow-sm">
          <img
            src={beforeImage}
            alt="Sebelum Perbaikan"
            className="w-full h-96 object-cover"
          />
          <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-md shadow">
            SEBELUM PERBAIKAN
          </div>
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
            <p className="text-sm font-medium">{beforeCaption}</p>
          </div>
        </div>
      )}

      {/* After single */}
      {activeTab === 'after' && (
        <div className="relative rounded-xl overflow-hidden border border-emerald-300 shadow-sm">
          <img
            src={afterImage}
            alt="Setelah Perbaikan"
            className="w-full h-96 object-cover"
          />
          <div className="absolute top-3 left-3 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-md shadow">
            HASIL PERBAIKAN SELESAI
          </div>
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
            <p className="text-sm font-medium">{afterCaption}</p>
          </div>
        </div>
      )}
    </div>
  );
};

