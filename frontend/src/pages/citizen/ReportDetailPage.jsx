import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useReports } from '../../context/ReportContext';
import { useAuth } from '../../context/AuthContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { PriorityBadge } from '../../components/common/PriorityBadge';
import { BeforeAfterViewer } from '../../components/reports/BeforeAfterViewer';
import { ReportTimeline } from '../../components/reports/ReportTimeline';
import { InteractiveMap } from '../../components/maps/InteractiveMap';
import {
  ArrowLeft,
  MapPin,
  Calendar,
  User,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Wrench,
  Sparkles,
  Send,
  XCircle,
  FileCheck,
  Building,
  Printer,
  FileSpreadsheet,
  Download
} from 'lucide-react';

export const ReportDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    reports,
    facilities,
    verifyReport,
    rejectReport,
    assignReport,
    startReportWork,
    resolveReportWork,
    validateReport
  } = useReports();
  const { currentUser, isAdmin, isOfficer, isCitizen } = useAuth();

  // Find target report by ID or Ticket Number
  const report = reports.find(
    (r) => r.id === id || r.ticketNumber?.toUpperCase() === id?.toUpperCase()
  );

  // Modal / Action states
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedOfficer, setSelectedOfficer] = useState('usr-officer-01');
  const [workInstructions, setWorkInstructions] = useState(
    'Lakukan perbaikan sesuai standar teknis keselamatan kerja.'
  );

  const [showResolveModal, setShowResolveModal] = useState(false);
  const [resolveNotes, setResolveNotes] = useState(
    'Pengerjaan perbaikan telah selesai 100% dan siap diinspeksi.'
  );
  const [afterImagePreset, setAfterImagePreset] = useState(
    'https://images.unsplash.com/photo-1541888946425-d0fbb18615f3?w=800&auto=format&fit=crop&q=80'
  );

  const [showValidateModal, setShowValidateModal] = useState(false);
  const [validationRemarks, setValidationRemarks] = useState(
    'Hasil pengerjaan dinilai baik, rapi, dan sesuai spesifikasi.'
  );

  const [showPrintModal, setShowPrintModal] = useState(false);

  if (!report) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-4">
        <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto" />
        <h2 className="text-xl font-bold text-slate-900">Laporan Tidak Ditemukan</h2>
        <p className="text-xs text-slate-500">
          Data laporan dengan ID tersebut tidak ada di sistem.
        </p>
        <Link
          to="/"
          className="inline-block px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold"
        >
          Kembali ke Beranda
        </Link>
      </div>
    );
  }

  // Find linked facility
  const linkedFacility = facilities.find((f) => f.id === report.facilityId);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Bar Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900 shadow-xs"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded">
                {report.ticketNumber}
              </span>
              <StatusBadge status={report.status} size="sm" />
              <PriorityBadge priority={report.priority} />
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
              {report.title}
            </h1>
          </div>
        </div>

        {/* Dynamic Action Buttons for testing flow */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Admin: Pending -> Verify or Reject */}
          {isAdmin && report.status === 'pending' && (
            <>
              <button
                onClick={() => verifyReport(report.id)}
                className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5 transition-colors"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Verifikasi Laporan</span>
              </button>
              <button
                onClick={() => setShowRejectModal(true)}
                className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold text-xs rounded-xl transition-colors"
              >
                <XCircle className="w-4 h-4" />
                <span>Tolak Laporan</span>
              </button>
            </>
          )}

          {/* Admin: Verified -> Assign Officer */}
          {isAdmin && report.status === 'verified' && (
            <button
              onClick={() => setShowAssignModal(true)}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5 transition-colors"
            >
              <User className="w-4 h-4" />
              <span>Tugaskan Petugas</span>
            </button>
          )}

          {/* Officer: Assigned -> Start In Progress */}
          {isOfficer && report.status === 'assigned' && (
            <button
              onClick={() => startReportWork(report.id)}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5 transition-colors animate-pulse"
            >
              <Wrench className="w-4 h-4" />
              <span>Mulai Pengerjaan Lapangan</span>
            </button>
          )}

          {/* Officer: In Progress -> Resolve with After photo */}
          {isOfficer && report.status === 'in_progress' && (
            <button
              onClick={() => setShowResolveModal(true)}
              className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5 transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              <span>Selesaikan & Unggah Bukti After</span>
            </button>
          )}

          {/* Admin: Resolved -> Validate (Approve/Rework) */}
          {isAdmin && report.status === 'resolved' && (
            <button
              onClick={() => setShowValidateModal(true)}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5 transition-colors"
            >
              <FileCheck className="w-4 h-4" />
              <span>Validasi Hasil Perbaikan</span>
            </button>
          )}

          {/* Official Printable Work Order / Receipt */}
          <button
            type="button"
            onClick={() => setShowPrintModal(true)}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors shadow-xs"
            title="Cetak Surat Tugas & Lembar Kerja Fisik"
          >
            <Printer className="w-4 h-4 text-slate-500" />
            <span>Cetak Lembar Kerja</span>
          </button>
        </div>
      </div>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Information, Photos, Map */}
        <div className="lg:col-span-7 space-y-6">
          {/* Metadata Cards */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div>
              <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">
                Lokasi Fasilitas
              </span>
              <p className="text-sm font-semibold text-slate-800 flex items-start gap-1.5 mt-0.5">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span>{report.address}</span>
              </p>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">
                Deskripsi Lengkap
              </span>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mt-0.5 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                {report.description}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-100 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Pelapor</span>
                <span className="font-semibold text-slate-800">{report.reporterName}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Tanggal Masuk</span>
                <span className="font-semibold text-slate-800">
                  {new Date(report.createdAt).toLocaleDateString('id-ID')}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Petugas Teknis</span>
                <span className="font-semibold text-slate-800">
                  {report.assignedOfficerName || 'Belum Ditugaskan'}
                </span>
              </div>
            </div>

            {/* Linked Facility info */}
            {linkedFacility && (
              <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-200/60 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Building className="w-4 h-4 text-blue-600" />
                  <div>
                    <span className="font-bold text-blue-900">{linkedFacility.name}</span>
                    <span className="text-[10px] text-blue-700 block font-mono">
                      {linkedFacility.code} ({linkedFacility.lengthOrCapacity})
                    </span>
                  </div>
                </div>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                  Aset Pemda
                </span>
              </div>
            )}
          </div>

          {/* Before & After Photo Viewer */}
          <BeforeAfterViewer
            beforeImage={report.beforeImage}
            afterImage={report.afterImage}
            afterCaption={report.maintenanceNotes || 'Hasil perbaikan petugas di lokasi'}
          />

          {/* Interactive Map */}
          <div className="bg-white rounded-3xl border border-slate-200 p-4 shadow-xs space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-blue-600" />
              Titik Koordinat Geospasial
            </h3>
            <InteractiveMap reports={[report]} selectedReport={report} height="280px" showControls={false} />
          </div>
        </div>

        {/* Right Column: Audit Trail Timeline */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600" />
                <h3 className="font-bold text-sm text-slate-900">Riwayat Perjalanan Laporan</h3>
              </div>
              <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                Audit Trail
              </span>
            </div>

            <ReportTimeline histories={report.histories} />
          </div>
        </div>
      </div>

      {/* Modal: Tolak Laporan (Admin) */}
      {showRejectModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center gap-2 text-rose-600">
              <XCircle className="w-6 h-6" />
              <h3 className="text-base font-bold text-slate-900">Tolak Laporan Masuk</h3>
            </div>
            <p className="text-xs text-slate-600">
              Tuliskan alasan penolakan secara jelas agar pelapor memahami penyebabnya (misal: bukan wewenang pemda, foto tidak relevan, atau duplikat).
            </p>
            <textarea
              rows={3}
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Contoh: Laporan berada di area perumahan privat pengembang dan bukan merupakan kewenangan jalan kota..."
              className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500"
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
                  rejectReport(report.id, rejectReason || 'Laporan tidak memenuhi kriteria verifikasi.');
                  setShowRejectModal(false);
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white"
              >
                Tolak Sekarang
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Penugasan Petugas (Admin) */}
      {showAssignModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center gap-2 text-indigo-600">
              <User className="w-6 h-6" />
              <h3 className="text-base font-bold text-slate-900">Disposisi & Penugasan Petugas</h3>
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Pilih Petugas Lapangan</label>
              <select
                value={selectedOfficer}
                onChange={(e) => setSelectedOfficer(e.target.value)}
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="usr-officer-01">Bambang Sudarsono (Dinas Bina Marga & SDA)</option>
                <option value="usr-officer-02">Rian Pratama (Dinas Perhubungan - PJU)</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Instruksi Pengerjaan (SLA 48 Jam)</label>
              <textarea
                rows={3}
                value={workInstructions}
                onChange={(e) => setWorkInstructions(e.target.value)}
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAssignModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={() => {
                  const officerName =
                    selectedOfficer === 'usr-officer-01' ? 'Bambang Sudarsono' : 'Rian Pratama';
                  assignReport(report.id, selectedOfficer, officerName, workInstructions);
                  setShowAssignModal(false);
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                Konfirmasi Penugasan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Selesaikan Pekerjaan & Unggah Foto After (Officer) */}
      {showResolveModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center gap-2 text-teal-600">
              <Sparkles className="w-6 h-6" />
              <h3 className="text-base font-bold text-slate-900">Dokumentasi Hasil Perbaikan Lapangan</h3>
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Catatan Tindakan Teknis</label>
              <textarea
                rows={3}
                value={resolveNotes}
                onChange={(e) => setResolveNotes(e.target.value)}
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Foto Bukti Setelah Perbaikan (AFTER)
              </label>
              <div className="h-44 rounded-xl overflow-hidden border border-slate-200 mb-2">
                <img
                  src={afterImagePreset}
                  alt="After"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-center gap-2 text-[11px] text-slate-500">
                <span>Preset contoh bukti perbaikan:</span>
                <button
                  type="button"
                  onClick={() =>
                    setAfterImagePreset(
                      'https://images.unsplash.com/photo-1541888946425-d0fbb18615f3?w=800&auto=format&fit=crop&q=80'
                    )
                  }
                  className="font-bold text-teal-600 hover:underline"
                >
                  Aspal Rapi
                </button>
                <span>•</span>
                <button
                  type="button"
                  onClick={() =>
                    setAfterImagePreset(
                      'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=800&auto=format&fit=crop&q=80'
                    )
                  }
                  className="font-bold text-teal-600 hover:underline"
                >
                  Taman Rapi
                </button>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowResolveModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={() => {
                  resolveReportWork(report.id, {
                    maintenanceNotes: resolveNotes,
                    afterImage: afterImagePreset
                  });
                  setShowResolveModal(false);
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-teal-600 hover:bg-teal-700 text-white"
              >
                Kirim untuk Validasi Admin
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Validasi Akhir Perbaikan (Admin) */}
      {showValidateModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center gap-2 text-emerald-600">
              <FileCheck className="w-6 h-6" />
              <h3 className="text-base font-bold text-slate-900">Validasi Hasil Pekerjaan</h3>
            </div>
            <p className="text-xs text-slate-600">
              Admin memeriksa bukti foto BEFORE vs AFTER. Jika sesuai, laporan akan resmi ditutup (<span className="text-emerald-600 font-bold">COMPLETED</span>). Jika belum sesuai, kembalikan ke petugas untuk revisi (<span className="text-amber-600 font-bold">REWORK</span>).
            </p>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Catatan Validasi Admin</label>
              <textarea
                rows={3}
                value={validationRemarks}
                onChange={(e) => setValidationRemarks(e.target.value)}
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => {
                  validateReport(report.id, false, validationRemarks || 'Perlu perbaikan ulang.');
                  setShowValidateModal(false);
                }}
                className="px-3.5 py-2 rounded-xl text-xs font-bold bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200"
              >
                Minta Revisi (Rework)
              </button>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowValidateModal(false)}
                  className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={() => {
                    validateReport(report.id, true, validationRemarks || 'Disetujui.');
                    setShowValidateModal(false);
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs"
                >
                  Setujui & Selesai (Approve)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Official Printable Work Order / Lembar Kerja Lapangan Modal */}
      {showPrintModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto print:p-0 print:shadow-none">
            {/* Modal Actions Bar (hidden when printing) */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 print:hidden">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Printer className="w-4 h-4 text-blue-600" />
                Lembar Perintah Kerja & Dokumen Resmi
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow flex items-center gap-1.5"
                >
                  <Printer className="w-4 h-4" />
                  <span>Cetak / Simpan PDF</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowPrintModal(false)}
                  className="p-2 text-slate-400 hover:text-slate-700 text-sm font-bold"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Official Municipal Document Layout */}
            <div className="border-2 border-slate-900 p-6 rounded-2xl space-y-6 bg-white text-slate-900 font-sans">
              {/* Header Surat Resmi */}
              <div className="text-center pb-4 border-b-2 border-slate-900 space-y-1">
                <h2 className="text-base font-black uppercase tracking-wider">
                  PEMERINTAH KOTA • SISTEM CIVILRECORD
                </h2>
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-600">
                  SURAT TUGAS & LEMBAR VERIFIKASI PEMELIHARAAN FASILITAS UMUM
                </h3>
                <p className="text-[11px] font-mono text-slate-500">
                  NOMOR TIKET: <strong>{report.ticketNumber}</strong> • TANGGAL:{' '}
                  {new Date(report.createdAt).toLocaleDateString('id-ID')}
                </p>
              </div>

              {/* Data Laporan */}
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">
                    Nama Fasilitas / Laporan:
                  </span>
                  <p className="font-bold text-slate-900 text-sm mt-0.5">{report.title}</p>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">
                    Status Dokumen:
                  </span>
                  <p className="font-bold uppercase text-slate-900 mt-0.5">
                    {report.status.toUpperCase()} ({report.priority.toUpperCase()} PRIORITY)
                  </p>
                </div>
                <div className="col-span-2">
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">
                    Lokasi Fisik:
                  </span>
                  <p className="font-semibold text-slate-800 mt-0.5">{report.address}</p>
                  <p className="font-mono text-[11px] text-slate-500">
                    Koordinat GPS: {report.lat}, {report.lng}
                  </p>
                </div>
                <div className="col-span-2">
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">
                    Uraian Masalah:
                  </span>
                  <p className="text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-200 mt-0.5 italic">
                    "{report.description}"
                  </p>
                </div>
              </div>

              {/* Assigned Officer & Work notes */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="font-semibold">Petugas Teknis Lapangan:</span>
                  <span className="font-bold">{report.assignedOfficerName || 'Belum Ditugaskan'}</span>
                </div>
                {report.workNotes && (
                  <div>
                    <span className="font-semibold">Instruksi Pengerjaan:</span>
                    <p className="text-slate-600 italic">{report.workNotes}</p>
                  </div>
                )}
                {report.dueDate && (
                  <div className="flex justify-between pt-1 border-t border-slate-200 text-rose-700 font-semibold">
                    <span>Tenggat Waktu SLA:</span>
                    <span>{new Date(report.dueDate).toLocaleDateString('id-ID')}</span>
                  </div>
                )}
              </div>

              {/* Photo Evidence in Document */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-600 block">
                    FOTO AWAL (SEBELUM)
                  </span>
                  <div className="h-32 rounded-lg overflow-hidden border border-slate-300">
                    <img
                      src={report.beforeImage}
                      alt="Before"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-600 block">
                    FOTO HASIL PERBAIKAN (SESUDAH)
                  </span>
                  <div className="h-32 rounded-lg overflow-hidden border border-slate-300 bg-slate-100 flex items-center justify-center text-[10px] text-slate-400">
                    {report.afterImage ? (
                      <img
                        src={report.afterImage}
                        alt="After"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      'Belum ada foto sesudah'
                    )}
                  </div>
                </div>
              </div>

              {/* Tanda Tangan Pengesahan Lapangan */}
              <div className="pt-4 border-t border-slate-300 grid grid-cols-2 gap-8 text-center text-xs">
                <div className="space-y-12">
                  <p className="font-semibold text-slate-600">Petugas Teknis Pelaksana</p>
                  <p className="font-bold border-t border-slate-400 pt-1">
                    ({report.assignedOfficerName || '....................................'})
                  </p>
                </div>
                <div className="space-y-12">
                  <p className="font-semibold text-slate-600">Pejabat Verifikator / Admin</p>
                  <p className="font-bold border-t border-slate-400 pt-1">
                    ( Ir. Hendra Wijaya )
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

