import React, { useState } from 'react';
import { useReports } from '../../context/ReportContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { PriorityBadge } from '../../components/common/PriorityBadge';
import { InteractiveMap } from '../../components/maps/InteractiveMap';
import { findNearbyReports } from '../../utils/geoUtils';
import {
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  MapPin,
  Calendar,
  Layers,
  ArrowRight,
  Eye,
  ShieldAlert,
  Search
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const VerificationQueuePage = () => {
  const { reports, facilities, verifyReport, rejectReport } = useReports();
  const [selectedReport, setSelectedReport] = useState(null);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [search, setSearch] = useState('');

  // Pending reports queue
  const pendingReports = reports.filter((r) => r.status === 'pending');

  const filteredQueue = pendingReports.filter(
    (r) =>
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.ticketNumber.toLowerCase().includes(search.toLowerCase()) ||
      r.address.toLowerCase().includes(search.toLowerCase())
  );

  // Active item for inspection
  const activeItem = selectedReport || filteredQueue[0] || null;

  // Potential duplicate detection for active item (within 100 meters)
  const nearbyReports = activeItem ? findNearbyReports(activeItem, reports, 100) : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
              Antrean Verifikasi Validitas
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1 flex items-center gap-2.5">
            <Clock className="w-8 h-8 text-amber-500" />
            Antrean Verifikasi Laporan Masuk
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            Pemeriksaan keabsahan foto bukti, kesesuaian titik geospasial, serta deteksi otomatis potensi duplikasi laporan dalam radius 100 meter.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-amber-800 bg-amber-100 px-3.5 py-1.5 rounded-xl">
            {pendingReports.length} Laporan Menunggu
          </span>
        </div>
      </div>

      {pendingReports.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-3">
          <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
          <h3 className="text-base font-bold text-slate-900">
            Antrean Bersih! Semua Laporan Telah Diverifikasi
          </h3>
          <p className="text-xs text-slate-500">
            Tidak ada laporan berstatus Pending yang menunggu tinjauan administratif saat ini.
          </p>
          <Link
            to="/admin"
            className="inline-block px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold"
          >
            Kembali ke Admin Console
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Queue List */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari antrean tiket..."
                className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-xs"
              />
            </div>

            <div className="space-y-3 max-h-[680px] overflow-y-auto pr-1">
              {filteredQueue.map((item) => {
                const isSelected = activeItem?.id === item.id;
                const hasNearby = findNearbyReports(item, reports, 100).length > 0;

                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedReport(item)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all space-y-2 ${
                      isSelected
                        ? 'bg-amber-50/70 border-amber-400 ring-2 ring-amber-400/20 shadow-sm'
                        : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-blue-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                        {item.ticketNumber}
                      </span>
                      <PriorityBadge priority={item.priority} />
                    </div>

                    <div className="flex items-start gap-3">
                      <img
                        src={item.beforeImage}
                        alt={item.title}
                        className="w-16 h-16 rounded-xl object-cover shrink-0 border border-slate-200"
                      />
                      <div className="space-y-0.5 min-w-0 flex-1">
                        <h4 className="font-bold text-xs text-slate-900 leading-snug line-clamp-1">
                          {item.title}
                        </h4>
                        <p className="text-[11px] text-slate-500 line-clamp-1">{item.address}</p>
                        <p className="text-[10px] text-slate-400">
                          Pelapor: <strong>{item.reporterName}</strong>
                        </p>
                      </div>
                    </div>

                    {hasNearby && (
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-amber-700 bg-amber-100/80 px-2 py-0.5 rounded-md">
                        <AlertTriangle className="w-3 h-3 text-amber-600 shrink-0" />
                        <span>Deteksi: Ada laporan lain di radius 100m!</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Detailed Inspection & Actions Panel */}
          {activeItem && (
            <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
              {/* Top Banner info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
                <div>
                  <span className="font-mono text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded">
                    {activeItem.ticketNumber}
                  </span>
                  <h2 className="text-xl font-bold text-slate-900 mt-1">{activeItem.title}</h2>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{activeItem.address}</span>
                  </p>
                </div>

                <div className="text-xs text-slate-500 text-left sm:text-right">
                  <p>
                    Masuk:{' '}
                    <strong>{new Date(activeItem.createdAt).toLocaleDateString('id-ID')}</strong>
                  </p>
                  <p>
                    Kontak: <strong>{activeItem.reporterPhone}</strong>
                  </p>
                </div>
              </div>

              {/* Proximity / Duplicate Warning Banner */}
              {nearbyReports.length > 0 && (
                <div className="p-4 bg-amber-50 rounded-2xl border border-amber-300 space-y-2">
                  <div className="flex items-center gap-2 text-amber-900 font-bold text-xs">
                    <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Peringatan Deteksi Duplikasi (Proximity Alert)</span>
                  </div>
                  <p className="text-xs text-amber-800 leading-relaxed">
                    Sistem mendeteksi ada{' '}
                    <strong>{nearbyReports.length} laporan lain</strong> dalam radius 100 meter dari titik koordinat ini. Mohon pastikan apakah ini bukan laporan ganda sebelum melakukan verifikasi:
                  </p>
                  <div className="divide-y divide-amber-200/60 pt-1 text-xs">
                    {nearbyReports.map((near) => (
                      <div key={near.id} className="py-1.5 flex items-center justify-between">
                        <span className="font-semibold text-amber-900">
                          {near.ticketNumber} — {near.title}
                        </span>
                        <span className="font-mono text-[10px] bg-amber-200/60 px-2 py-0.5 rounded font-bold text-amber-900">
                          Jarak: ~{near.distanceMeters} Meter
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Photo & Description Inspection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-500 uppercase">
                    Foto Bukti Kerusakan
                  </span>
                  <div className="h-64 rounded-2xl overflow-hidden border border-slate-200">
                    <img
                      src={activeItem.beforeImage}
                      alt={activeItem.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="space-y-3 flex flex-col justify-between">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-500 uppercase">
                      Deskripsi Warga
                    </span>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      {activeItem.description}
                    </p>
                  </div>

                  <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-100 text-xs text-blue-900 space-y-1">
                    <span className="font-bold">Koordinat Geospasial:</span>
                    <p className="font-mono text-[11px] text-blue-700">
                      Lat: {activeItem.lat}, Lng: {activeItem.lng}
                    </p>
                  </div>
                </div>
              </div>

              {/* Location Pin Map */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-slate-500 uppercase">
                  Pengecekan Lokasi di Peta
                </span>
                <InteractiveMap
                  reports={[activeItem, ...nearbyReports]}
                  selectedReport={activeItem}
                  height="260px"
                  showControls={false}
                />
              </div>

              {/* Verification Action Buttons */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowRejectModal(true)}
                  className="px-5 py-2.5 rounded-xl border border-rose-200 text-rose-700 hover:bg-rose-50 font-bold text-xs flex items-center gap-1.5 transition-colors"
                >
                  <XCircle className="w-4 h-4" />
                  <span>Tolak Laporan (Invalid/Duplikat)</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    verifyReport(activeItem.id);
                    setSelectedReport(null);
                  }}
                  className="px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-md shadow-sky-500/20 flex items-center gap-1.5 transition-colors"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Verifikasi Laporan (Valid)</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Reject Modal */}
      {showRejectModal && activeItem && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center gap-2 text-rose-600">
              <XCircle className="w-6 h-6" />
              <h3 className="text-base font-bold text-slate-900">Konfirmasi Penolakan Laporan</h3>
            </div>
            <p className="text-xs text-slate-600">
              Pilih atau tuliskan alasan penolakan secara jelas agar tercatat di audit trail dan transparan bagi pelapor.
            </p>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() =>
                  setRejectReason('Duplikasi laporan dengan nomor tiket lain di lokasi yang sama.')
                }
                className="w-full text-left text-xs p-2 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 font-medium"
              >
                Duplikasi laporan di lokasi yang sama
              </button>
              <button
                type="button"
                onClick={() =>
                  setRejectReason('Bukan merupakan wewenang jalan/fasilitas Pemerintah Kota.')
                }
                className="w-full text-left text-xs p-2 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 font-medium"
              >
                Di luar wewenang Pemerintah Kota
              </button>
              <button
                type="button"
                onClick={() =>
                  setRejectReason('Foto bukti tidak jelas atau lokasi tidak dapat ditemukan.')
                }
                className="w-full text-left text-xs p-2 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 font-medium"
              >
                Foto bukti tidak jelas / lokasi tidak valid
              </button>
            </div>
            <textarea
              rows={2}
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Atau tulis alasan penolakan kustom..."
              className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-rose-500"
            />
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowRejectModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={() => {
                  rejectReport(
                    activeItem.id,
                    rejectReason || 'Laporan tidak memenuhi kriteria verifikasi dinas.'
                  );
                  setShowRejectModal(false);
                  setSelectedReport(null);
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white"
              >
                Tolak Sekarang
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

