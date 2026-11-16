import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useReports } from '../../context/ReportContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { BeforeAfterViewer } from '../../components/reports/BeforeAfterViewer';
import { ReportTimeline } from '../../components/reports/ReportTimeline';
import { InteractiveMap } from '../../components/maps/InteractiveMap';
import {
  Search,
  CheckCircle,
  Clock,
  MapPin,
  Calendar,
  User,
  ShieldCheck,
  AlertCircle,
  ArrowRight
} from 'lucide-react';

export const TrackPage = () => {
  const [searchParams] = useSearchParams();
  const { reports } = useReports();
  const ticketFromUrl = searchParams.get('ticket') || '';

  const [inputTicket, setInputTicket] = useState(ticketFromUrl);
  const [searchedTicket, setSearchedTicket] = useState(ticketFromUrl);

  useEffect(() => {
    if (ticketFromUrl) {
      setInputTicket(ticketFromUrl);
      setSearchedTicket(ticketFromUrl);
    }
  }, [ticketFromUrl]);

  const report = reports.find(
    (r) => r.ticketNumber.toUpperCase() === searchedTicket.trim().toUpperCase()
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchedTicket(inputTicket);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Lacak Perkembangan Laporan Kerusakan
        </h1>
        <p className="text-sm text-slate-600">
          Masukkan nomor registrasi tiket laporan Anda (contoh: <code className="font-mono font-bold text-blue-600">CR-2026-00001</code>) untuk memantau status pengerjaan secara transparan.
        </p>
      </div>

      {/* Search Input Box */}
      <div className="max-w-xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 p-2 bg-white rounded-2xl border border-slate-300 shadow-md focus-within:ring-2 focus-within:ring-blue-500"
        >
          <Search className="w-5 h-5 text-slate-400 ml-3" />
          <input
            type="text"
            value={inputTicket}
            onChange={(e) => setInputTicket(e.target.value)}
            placeholder="Contoh: CR-2026-00001..."
            className="flex-1 bg-transparent border-none text-sm text-slate-800 focus:outline-none"
          />
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors shadow-xs"
          >
            Cari Laporan
          </button>
        </form>

        {/* Quick sample chips */}
        <div className="flex items-center justify-center gap-2 mt-3 text-xs text-slate-500">
          <span>Contoh cepat:</span>
          {reports.slice(0, 3).map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => {
                setInputTicket(r.ticketNumber);
                setSearchedTicket(r.ticketNumber);
              }}
              className="font-mono text-[11px] font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 px-2 py-0.5 rounded transition-colors"
            >
              {r.ticketNumber}
            </button>
          ))}
        </div>
      </div>

      {/* Search Result */}
      {searchedTicket && !report && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-8 text-center max-w-lg mx-auto space-y-3">
          <AlertCircle className="w-10 h-10 text-amber-500 mx-auto" />
          <h3 className="text-base font-bold text-amber-900">Laporan Tidak Ditemukan</h3>
          <p className="text-xs text-amber-700">
            Nomor tiket <span className="font-mono font-bold">{searchedTicket}</span> tidak ditemukan dalam database kami. Pastikan nomor tiket sudah sesuai dengan format.
          </p>
        </div>
      )}

      {report && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-lg overflow-hidden space-y-6 p-6 sm:p-8">
          {/* Top banner info */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="font-mono text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
                  {report.ticketNumber}
                </span>
                <StatusBadge status={report.status} size="lg" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">{report.title}</h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                <span>{report.address}</span>
              </p>
            </div>

            <div className="text-left sm:text-right text-xs text-slate-500 space-y-1">
              <p>
                Dilaporkan pada:{' '}
                <strong className="text-slate-800">
                  {new Date(report.createdAt).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </strong>
              </p>
              {report.assignedOfficerName && (
                <p>
                  Petugas Lapangan:{' '}
                  <strong className="text-slate-800">{report.assignedOfficerName}</strong>
                </p>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Deskripsi Kerusakan
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {report.description}
            </p>
          </div>

          {/* Before & After Viewer */}
          <BeforeAfterViewer
            beforeImage={report.beforeImage}
            afterImage={report.afterImage}
            afterCaption={report.maintenanceNotes || 'Hasil perbaikan petugas di lokasi'}
          />

          {/* Timeline & Map Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
            {/* Timeline */}
            <div className="lg:col-span-6 space-y-3">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600" />
                Riwayat & Timeline Penanganan
              </h4>
              <div className="bg-slate-50/60 p-4 rounded-2xl border border-slate-100">
                <ReportTimeline histories={report.histories} />
              </div>
            </div>

            {/* Map */}
            <div className="lg:col-span-6 space-y-3">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-600" />
                Titik Lokasi Kerusakan
              </h4>
              <InteractiveMap
                reports={[report]}
                selectedReport={report}
                height="320px"
                showControls={false}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

