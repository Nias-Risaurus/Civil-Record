import React, { useState } from 'react';
import { Columns, Split, CheckCircle2, Clock, MoveHorizontal } from 'lucide-react';

export const BeforeAfterViewer = ({
  beforeImage,
  afterImage,
  beforeCaption = 'Foto Kondisi Awal (Pelapor)',
  afterCaption = 'Foto Hasil Perbaikan (Petugas Lapangan)'
}) => {
  const [activeTab, setActiveTab] = useState('slider'); // 'slider', 'side-by-side', 'before', 'after'
  const [sliderPos, setSliderPos] = useState(50);

  if (!afterImage) {
    return (
      <div className="bg-slate-50 border border-slate-200 rounded-3xl p-5">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-amber-500" />
            Dokumentasi Kondisi Awal Fasilitas
          </h4>
          <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
            Menunggu Pengerjaan Selesai
          </span>
        </div>
        <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-sm max-h-96">
          <img
            src={beforeImage}
            alt="Foto Kerusakan Awal"
            className="w-full h-80 object-cover"
          />
          <div className="absolute top-3 left-3 bg-red-600/90 text-white text-[10px] font-black px-2.5 py-1 rounded-md shadow backdrop-blur uppercase tracking-wider">
            BEFORE (KONDISI AWAL)
          </div>
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
            <p className="text-xs text-slate-200 font-medium">{beforeCaption}</p>
          </div>
        </div>
        <p className="text-xs text-slate-500 mt-3 text-center italic">
          *Foto hasil perbaikan (AFTER) dan slider komparasi akan otomatis aktif setelah petugas menyelesaikan pekerjaan di lapangan.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div>
          <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Verifikasi Bukti Fisik Lapangan (Before & After)
          </h4>
          <p className="text-xs text-slate-500 mt-0.5">
            Geser slider atau pilih mode tampilan untuk membandingkan mutu hasil perbaikan aset
          </p>
        </div>

        {/* View toggle tabs */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('slider')}
            className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1 transition-all ${
              activeTab === 'slider'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Split className="w-3.5 h-3.5" />
            <span>Slider Interaktif</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('side-by-side')}
            className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1 transition-all ${
              activeTab === 'side-by-side'
                ? 'bg-white text-slate-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Columns className="w-3.5 h-3.5" />
            <span>Bandingan</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('before')}
            className={`px-2.5 py-1.5 rounded-lg font-medium transition-all ${
              activeTab === 'before'
                ? 'bg-white text-slate-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Sebelum
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('after')}
            className={`px-2.5 py-1.5 rounded-lg font-medium transition-all ${
              activeTab === 'after'
                ? 'bg-white text-slate-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Sesudah
          </button>
        </div>
      </div>

      {/* 1. Interactive Split Screen Slider */}
      {activeTab === 'slider' && (
        <div className="space-y-2">
          <div className="relative w-full h-80 sm:h-96 rounded-2xl overflow-hidden border border-slate-300 select-none shadow-inner group">
            {/* Background: AFTER Image */}
            <img
              src={afterImage}
              alt="Setelah Perbaikan"
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            />
            <div className="absolute top-3 right-3 bg-emerald-600 text-white text-[10px] font-black px-2.5 py-1 rounded shadow-md z-10">
              SESUDAH (AFTER)
            </div>

            {/* Foreground: BEFORE Image Clipped */}
            <div
              className="absolute inset-0 overflow-hidden pointer-events-none"
              style={{ width: `${sliderPos}%` }}
            >
              <img
                src={beforeImage}
                alt="Sebelum Perbaikan"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ width: '100%', maxWidth: 'none', minWidth: '100%' }}
              />
              <div className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-black px-2.5 py-1 rounded shadow-md z-10">
                SEBELUM (BEFORE)
              </div>
            </div>

            {/* Vertical Splitter Line */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] pointer-events-none z-20 flex items-center justify-center"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="w-8 h-8 rounded-full bg-white shadow-lg border border-slate-300 flex items-center justify-center text-slate-800 -ml-3.5">
                <MoveHorizontal className="w-4 h-4 text-blue-600" />
              </div>
            </div>

            {/* Range Input on Top */}
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPos}
              onChange={(e) => setSliderPos(Number(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30 m-0 p-0"
              aria-label="Geser untuk membandingkan foto sebelum dan sesudah perbaikan"
            />
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 px-1 font-medium">
            <span className="text-red-600 font-bold">← Geser ke kiri untuk melihat Hasil Perbaikan (After)</span>
            <span className="text-emerald-700 font-bold">Geser ke kanan untuk melihat Kondisi Awal (Before) →</span>
          </div>
        </div>
      )}

      {/* 2. Side by side view */}
      {activeTab === 'side-by-side' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative rounded-2xl overflow-hidden border border-red-200 shadow-sm group">
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

          <div className="relative rounded-2xl overflow-hidden border border-emerald-300 shadow-sm group">
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

      {/* 3. Before Single */}
      {activeTab === 'before' && (
        <div className="relative rounded-2xl overflow-hidden border border-red-200 shadow-sm">
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

      {/* 4. After Single */}
      {activeTab === 'after' && (
        <div className="relative rounded-2xl overflow-hidden border border-emerald-300 shadow-sm">
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
