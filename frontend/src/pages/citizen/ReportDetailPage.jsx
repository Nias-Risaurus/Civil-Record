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
  Download,
  Star,
  ShieldCheck,
  CheckSquare,
  Truck,
  HardHat,
  MessageSquareQuote
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
    validateReport,
    rateReport
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

  // Officer Resolve & K3 Safety & Material Ledger state
  const [showResolveModal, setShowResolveModal] = useState(false);
  const [resolveNotes, setResolveNotes] = useState(
    'Pengerjaan perbaikan telah selesai 100% dan siap diinspeksi.'
  );
  const [k3SafetyVest, setK3SafetyVest] = useState(true);
  const [k3Cones, setK3Cones] = useState(true);
  const [k3Ppe, setK3Ppe] = useState(true);
  const [materialUsed, setMaterialUsed] = useState('Aspal Cold Mix 6 Sak, Emulsi Tack Coat 1 Drum');
  const [equipmentUsed, setEquipmentUsed] = useState('Baby Roller Vibratory 1-Ton, Jack Hammer');
  const [afterImagePreset, setAfterImagePreset] = useState(
    'https://images.unsplash.com/photo-1541888946425-d0fbb18615f3?w=800&auto=format&fit=crop&q=80'
  );

  const [showValidateModal, setShowValidateModal] = useState(false);
  const [validationRemarks, setValidationRemarks] = useState(
    'Hasil pengerjaan dinilai baik, rapi, dan sesuai spesifikasi.'
  );

  // Citizen Satisfaction (IKM) modal & rating state
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [ratingScore, setRatingScore] = useState(5);
  const [ratingHover, setRatingHover] = useState(0);
  const [ratingFeedback, setRatingFeedback] = useState(
    'Pelayanan sangat cepat, perbaikan jalan rapi dan aman dilewati!'
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

          {/* Citizen: Completed -> Rate / IKM Survey Button or Badge */}
          {report.status === 'completed' && (
            report.citizenRating ? (
              <div className="px-3.5 py-1.5 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-1.5 text-xs font-bold text-amber-800 shadow-xs">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>IKM: {report.citizenRating}/5 Bintang</span>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setShowRatingModal(true)}
                className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5 transition-all animate-pulse"
              >
                <Star className="w-4 h-4 fill-white" />
                <span>Beri Penilaian Warga (IKM)</span>
              </button>
            )
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

          {/* Citizen Satisfaction Index (IKM) Card if completed or rated */}
          {report.status === 'completed' && (
            <div className="bg-gradient-to-br from-amber-500/10 via-amber-50 to-orange-50 rounded-3xl border border-amber-200/80 p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-amber-200/60">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">
                      Survei Indeks Kepuasan Masyarakat (IKM)
                    </h3>
                    <p className="text-[11px] text-slate-600">
                      Evaluasi mutu layanan perbaikan infrastruktur publik sesuai PermenPAN-RB
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-100 text-amber-900">
                  Akuntabilitas Publik
                </span>
              </div>

              {report.citizenRating ? (
                <div className="bg-white/80 backdrop-blur rounded-2xl p-4 border border-amber-200/60 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-5 h-5 ${
                            star <= report.citizenRating
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-slate-200'
                          }`}
                        />
                      ))}
                      <span className="text-xs font-black text-slate-800 ml-2">
                        {report.citizenRating}.0 / 5.0
                      </span>
                      <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded ml-1">
                        {report.citizenRating === 5
                          ? 'Sangat Memuaskan'
                          : report.citizenRating === 4
                          ? 'Memuaskan'
                          : report.citizenRating === 3
                          ? 'Cukup'
                          : 'Perlu Ditingkatkan'}
                      </span>
                    </div>
                    <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" /> Terverifikasi
                    </span>
                  </div>

                  {report.citizenFeedback && (
                    <div className="text-xs text-slate-700 bg-amber-50/50 p-3 rounded-xl border border-amber-100 italic flex items-start gap-2">
                      <MessageSquareQuote className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span>"{report.citizenFeedback}"</span>
                    </div>
                  )}
                  <p className="text-[10px] text-slate-400 text-right">
                    Dinilai oleh pelapor: {report.reporterName}
                  </p>
                </div>
              ) : (
                <div className="bg-white/90 backdrop-blur rounded-2xl p-4 border border-amber-200/60 space-y-3">
                  <p className="text-xs text-slate-700 font-medium">
                    Fasilitas publik telah selesai diperbaiki! Bagaimana penilaian Anda terhadap kecepatan dan kualitas perbaikan dinas terkait?
                  </p>

                  {/* Interactive 5-Star Selector */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onMouseEnter={() => setRatingHover(star)}
                          onMouseLeave={() => setRatingHover(0)}
                          onClick={() => setRatingScore(star)}
                          className="p-1 hover:scale-125 transition-transform"
                        >
                          <Star
                            className={`w-7 h-7 cursor-pointer transition-colors ${
                              star <= (ratingHover || ratingScore)
                                ? 'fill-amber-400 text-amber-400 drop-shadow-xs'
                                : 'text-slate-300 hover:text-slate-400'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                    <span className="text-xs font-bold text-amber-800">
                      {(ratingHover || ratingScore) === 5 && '⭐⭐⭐⭐⭐ Sangat Memuaskan'}
                      {(ratingHover || ratingScore) === 4 && '⭐⭐⭐⭐ Memuaskan'}
                      {(ratingHover || ratingScore) === 3 && '⭐⭐⭐ Cukup Memuaskan'}
                      {(ratingHover || ratingScore) === 2 && '⭐⭐ Kurang Memuaskan'}
                      {(ratingHover || ratingScore) === 1 && '⭐ Sangat Tidak Memuaskan'}
                    </span>
                  </div>

                  <div>
                    <textarea
                      rows={2}
                      value={ratingFeedback}
                      onChange={(e) => setRatingFeedback(e.target.value)}
                      placeholder="Tuliskan apresiasi atau masukan Anda terkait perbaikan fasilitas publik ini..."
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      rateReport(report.id, ratingScore, ratingFeedback);
                    }}
                    className="w-full sm:w-auto px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-xs shadow-md shadow-amber-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <Star className="w-4 h-4 fill-white" />
                    <span>Kirim Penilaian Kepuasan (IKM)</span>
                  </button>
                </div>
              )}
            </div>
          )}

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
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-7 space-y-4 shadow-2xl max-h-[92vh] overflow-y-auto">
            <div className="flex items-center gap-2.5 text-teal-700 pb-2 border-b border-slate-100">
              <div className="w-9 h-9 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center">
                <HardHat className="w-5 h-5 text-teal-600" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 leading-tight">
                  Dokumentasi Teknis & Berita Acara Perbaikan Lapangan
                </h3>
                <p className="text-[11px] text-slate-500">
                  Formulir penyelesaian pekerjaan fisik sesuai Standar Operasional Prosedur (SOP) Dinas PU
                </p>
              </div>
            </div>

            {/* K3 Safety Checklist */}
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Pematuhan K3 & Keselamatan Lapangan (Mandatori)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                <label className="flex items-center gap-2 p-2 bg-white rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-50">
                  <input
                    type="checkbox"
                    checked={k3SafetyVest}
                    onChange={(e) => setK3SafetyVest(e.target.checked)}
                    className="w-4 h-4 rounded text-teal-600 focus:ring-teal-500"
                  />
                  <span className="text-slate-700 font-medium">Rompi & Helm K3</span>
                </label>
                <label className="flex items-center gap-2 p-2 bg-white rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-50">
                  <input
                    type="checkbox"
                    checked={k3Cones}
                    onChange={(e) => setK3Cones(e.target.checked)}
                    className="w-4 h-4 rounded text-teal-600 focus:ring-teal-500"
                  />
                  <span className="text-slate-700 font-medium">Traffic Cones</span>
                </label>
                <label className="flex items-center gap-2 p-2 bg-white rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-50">
                  <input
                    type="checkbox"
                    checked={k3Ppe}
                    onChange={(e) => setK3Ppe(e.target.checked)}
                    className="w-4 h-4 rounded text-teal-600 focus:ring-teal-500"
                  />
                  <span className="text-slate-700 font-medium">Sepatu & Sarung APD</span>
                </label>
              </div>
            </div>

            {/* Material Usage & Heavy Equipment Ledger */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Realisasi Material Fisik
                </label>
                <input
                  type="text"
                  value={materialUsed}
                  onChange={(e) => setMaterialUsed(e.target.value)}
                  placeholder="Contoh: Aspal Cold Mix 6 Sak, Tack Coat 1 Drum"
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Peralatan / Armada Dinas
                </label>
                <input
                  type="text"
                  value={equipmentUsed}
                  onChange={(e) => setEquipmentUsed(e.target.value)}
                  placeholder="Contoh: Baby Roller Vibratory, Jack Hammer"
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Catatan Berita Acara Pengerjaan
              </label>
              <textarea
                rows={2}
                value={resolveNotes}
                onChange={(e) => setResolveNotes(e.target.value)}
                placeholder="Rincian teknis pengerjaan dan volume pekerjaan yang diselesaikan..."
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Dokumentasi Foto Bukti Setelah Perbaikan (AFTER)
              </label>
              <div className="h-40 rounded-xl overflow-hidden border border-slate-200 mb-2">
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
                  className="font-bold text-teal-600 hover:underline cursor-pointer"
                >
                  Aspal Rapi (Bina Marga)
                </button>
                <span>•</span>
                <button
                  type="button"
                  onClick={() =>
                    setAfterImagePreset(
                      'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=800&auto=format&fit=crop&q=80'
                    )
                  }
                  className="font-bold text-teal-600 hover:underline cursor-pointer"
                >
                  Taman Kota Rapi (DKPP)
                </button>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
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
                  const combinedNotes = `${resolveNotes} (Material: ${materialUsed} | Armada: ${equipmentUsed} | K3: ${
                    k3SafetyVest && k3Cones && k3Ppe ? 'SOP Lengkap' : 'Parsial'
                  })`;
                  resolveReportWork(report.id, {
                    maintenanceNotes: combinedNotes,
                    afterImage: afterImagePreset
                  });
                  setShowResolveModal(false);
                }}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-teal-600 hover:bg-teal-700 text-white shadow-md shadow-teal-600/25 cursor-pointer"
              >
                Kirim Berita Acara & Validasi Admin
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

      {/* Modal: Rating Kepuasan Pelapor (IKM) */}
      {showRatingModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center gap-2.5 text-amber-600 pb-2 border-b border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center">
                <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 leading-tight">
                  Survei Kepuasan Layanan (IKM)
                </h3>
                <p className="text-[11px] text-slate-500">
                  Tiket: {report.ticketNumber} • Fasilitas: {report.title}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Suara Anda sangat berarti bagi peningkatan kualitas fasilitas umum kota. Silakan berikan rating kepuasan atas hasil perbaikan oleh dinas terkait.
            </p>

            {/* Star selector */}
            <div className="flex flex-col items-center justify-center p-4 bg-amber-50/60 rounded-2xl border border-amber-200/60 space-y-2">
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onMouseEnter={() => setRatingHover(star)}
                    onMouseLeave={() => setRatingHover(0)}
                    onClick={() => setRatingScore(star)}
                    className="p-1 hover:scale-125 transition-transform cursor-pointer"
                  >
                    <Star
                      className={`w-8 h-8 transition-colors ${
                        star <= (ratingHover || ratingScore)
                          ? 'fill-amber-400 text-amber-400 drop-shadow-xs'
                          : 'text-slate-300 hover:text-slate-400'
                      }`}
                    />
                  </button>
                ))}
              </div>
              <span className="text-xs font-black text-amber-900">
                {(ratingHover || ratingScore) === 5 && '⭐⭐⭐⭐⭐ Sangat Memuaskan'}
                {(ratingHover || ratingScore) === 4 && '⭐⭐⭐⭐ Memuaskan'}
                {(ratingHover || ratingScore) === 3 && '⭐⭐⭐ Cukup Memuaskan'}
                {(ratingHover || ratingScore) === 2 && '⭐⭐ Kurang Memuaskan'}
                {(ratingHover || ratingScore) === 1 && '⭐ Sangat Tidak Memuaskan'}
              </span>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Komentar / Masukan Warga
              </label>
              <textarea
                rows={3}
                value={ratingFeedback}
                onChange={(e) => setRatingFeedback(e.target.value)}
                placeholder="Bagikan pengalaman Anda mengenai kecepatan dan mutu perbaikan ini..."
                className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowRatingModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={() => {
                  rateReport(report.id, ratingScore, ratingFeedback);
                  setShowRatingModal(false);
                }}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-600 text-white shadow-md shadow-amber-500/25 cursor-pointer flex items-center gap-1.5"
              >
                <Star className="w-4 h-4 fill-white" />
                <span>Simpan Penilaian IKM</span>
              </button>
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

              {/* Maintenance Notes & Realization Ledger */}
              {report.maintenanceNotes && (
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                  <span className="font-bold text-slate-800 block">
                    Berita Acara Pengerjaan Fisik & Standar K3:
                  </span>
                  <p className="text-slate-700">{report.maintenanceNotes}</p>
                </div>
              )}

              {/* Citizen Satisfaction Index in Document */}
              <div className="p-3 bg-amber-50/50 rounded-xl border border-amber-200 text-xs flex items-center justify-between">
                <div>
                  <span className="font-bold text-amber-900 block">
                    Indeks Kepuasan Masyarakat (IKM PermenPAN-RB):
                  </span>
                  {report.citizenRating ? (
                    <p className="text-slate-700">
                      Skor: <strong>{report.citizenRating}/5 Bintang</strong> — "{report.citizenFeedback || 'Layanan baik dan memuaskan.'}"
                    </p>
                  ) : (
                    <p className="text-slate-500 italic">Menunggu evaluasi berkala oleh pelapor.</p>
                  )}
                </div>
                <span className="font-mono text-[10px] font-bold px-2 py-1 rounded bg-amber-100 text-amber-800">
                  {report.citizenRating ? 'TERVERIFIKASI' : 'PENDING EVAL'}
                </span>
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

