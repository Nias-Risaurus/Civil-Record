import React, { useState } from 'react';
import { useReports } from '../../context/ReportContext';
import { InteractiveMap } from '../../components/maps/InteractiveMap';
import { StatusBadge } from '../../components/common/StatusBadge';
import {
  Building2,
  Search,
  PlusCircle,
  MapPin,
  Wrench,
  CheckCircle2,
  AlertTriangle,
  History,
  Clock,
  Layers,
  ArrowRight,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const FacilityRegistryPage = () => {
  const { facilities, reports, categories } = useReports();
  const [search, setSearch] = useState('');
  const [selectedCondition, setSelectedCondition] = useState('all');
  const [activeFacility, setActiveFacility] = useState(null);

  const filteredFacilities = facilities.filter((fac) => {
    if (selectedCondition !== 'all' && fac.condition !== selectedCondition) return false;
    if (
      search &&
      !fac.name.toLowerCase().includes(search.toLowerCase()) &&
      !fac.code.toLowerCase().includes(search.toLowerCase()) &&
      !fac.address.toLowerCase().includes(search.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  // Calculate reports associated with a facility
  const getFacilityReports = (facilityId) => {
    return reports.filter((r) => r.facilityId === facilityId);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">
              Pemerintah Daerah • Aset Publik
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1 flex items-center gap-2.5">
            <Building2 className="w-8 h-8 text-blue-600" />
            Facility Registry & Maintenance Ledger
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            Sistem pencatatan terpadu inventaris aset fasilitas umum daerah. Melacak kondisi fisik terkini, riwayat laporan kerusakan, serta buku riwayat pemeliharaan berkala (*maintenance ledger*).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
            Total Terdaftar: <strong className="text-slate-800">{facilities.length} Aset</strong>
          </span>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-semibold text-slate-500">Total Fasilitas</span>
          <p className="text-2xl font-black text-slate-900 mt-1">{facilities.length}</p>
          <span className="text-[10px] text-slate-400">Jalan, PJU, Taman & Drainase</span>
        </div>

        <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200 shadow-xs">
          <span className="text-xs font-semibold text-emerald-800">Kondisi Baik</span>
          <p className="text-2xl font-black text-emerald-900 mt-1">
            {facilities.filter((f) => f.condition === 'Baik').length}
          </p>
          <span className="text-[10px] text-emerald-700">Berfungsi normal</span>
        </div>

        <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200 shadow-xs">
          <span className="text-xs font-semibold text-amber-800">Perlu Perbaikan</span>
          <p className="text-2xl font-black text-amber-900 mt-1">
            {facilities.filter((f) => f.condition === 'Perlu Perbaikan').length}
          </p>
          <span className="text-[10px] text-amber-700">Masuk jadwal dinas</span>
        </div>

        <div className="bg-rose-50/70 p-4 rounded-2xl border border-rose-200 shadow-xs">
          <span className="text-xs font-semibold text-rose-800">Kondisi Rusak</span>
          <p className="text-2xl font-black text-rose-900 mt-1">
            {facilities.filter((f) => f.condition === 'Rusak').length}
          </p>
          <span className="text-[10px] text-rose-700">Perlu perbaikan segera</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari kode FAC, nama fasilitas, alamat..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto text-xs">
          <label className="text-slate-500 font-medium shrink-0">Filter Kondisi:</label>
          <select
            value={selectedCondition}
            onChange={(e) => setSelectedCondition(e.target.value)}
            className="p-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="all">Semua Kondisi</option>
            <option value="Baik">Baik</option>
            <option value="Perlu Perbaikan">Perlu Perbaikan</option>
            <option value="Rusak">Rusak</option>
          </select>
        </div>
      </div>

      {/* Facility Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFacilities.map((fac) => {
          const facReports = getFacilityReports(fac.id);
          const hasActiveDamage = facReports.some(
            (r) => r.status === 'pending' || r.status === 'assigned' || r.status === 'in_progress'
          );

          return (
            <div
              key={fac.id}
              className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs font-black text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
                    {fac.code}
                  </span>
                  <span
                    className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                      fac.condition === 'Baik'
                        ? 'bg-emerald-100 text-emerald-800'
                        : fac.condition === 'Rusak'
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {fac.condition}
                  </span>
                </div>

                <h3 className="font-bold text-base text-slate-900 leading-snug">{fac.name}</h3>
                <p className="text-xs text-slate-500 mt-1 flex items-start gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                  <span className="line-clamp-2">{fac.address}</span>
                </p>

                <div className="mt-4 p-3 bg-slate-50 rounded-2xl border border-slate-100 space-y-1 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span className="text-slate-400">Kapasitas/Dimensi:</span>
                    <span className="font-semibold text-slate-800">{fac.lengthOrCapacity}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span className="text-slate-400">Inspeksi Terakhir:</span>
                    <span className="font-semibold text-slate-800">
                      {new Date(fac.lastInspected).toLocaleDateString('id-ID')}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span className="text-slate-400">Total Riwayat Laporan:</span>
                    <span className="font-bold text-blue-600">{facReports.length} Laporan</span>
                  </div>
                </div>
              </div>

              {/* Action: Open Maintenance Ledger Modal */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                {hasActiveDamage ? (
                  <span className="text-[11px] font-semibold text-amber-600 flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3 text-amber-500" />
                    Sedang ditangani
                  </span>
                ) : (
                  <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                    Tidak ada masalah aktif
                  </span>
                )}

                <button
                  type="button"
                  onClick={() => setActiveFacility(fac)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800 bg-blue-50 px-3 py-1.5 rounded-xl transition-colors"
                >
                  <History className="w-3.5 h-3.5" />
                  <span>Buka Riwayat Perawatan</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Maintenance History Ledger Modal */}
      {activeFacility && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-black text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                    {activeFacility.code}
                  </span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                    Kondisi: {activeFacility.condition}
                  </span>
                </div>
                <h3 className="text-xl font-black text-slate-900 mt-1">
                  {activeFacility.name}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">{activeFacility.address}</p>
              </div>
              <button
                type="button"
                onClick={() => setActiveFacility(null)}
                className="text-slate-400 hover:text-slate-700 text-lg font-bold p-1"
              >
                ✕
              </button>
            </div>

            {/* Ledger List */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                <History className="w-4 h-4 text-blue-600" />
                Buku Catatan Perawatan & Laporan Kerusakan
              </h4>

              {getFacilityReports(activeFacility.id).length === 0 ? (
                <div className="p-8 text-center text-xs text-slate-400 bg-slate-50 rounded-2xl">
                  Belum ada catatan pemeliharaan untuk fasilitas ini.
                </div>
              ) : (
                <div className="space-y-3">
                  {getFacilityReports(activeFacility.id).map((rep) => (
                    <div
                      key={rep.id}
                      className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 hover:bg-slate-50 transition-colors space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-blue-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                          {rep.ticketNumber}
                        </span>
                        <StatusBadge status={rep.status} size="xs" />
                      </div>

                      <h5 className="font-bold text-xs text-slate-900">{rep.title}</h5>

                      {rep.maintenanceNotes && (
                        <p className="text-xs text-emerald-800 bg-emerald-50 p-2.5 rounded-xl border border-emerald-200">
                          <strong>Tindakan Perbaikan:</strong> {rep.maintenanceNotes}
                        </p>
                      )}

                      <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                        <span>
                          Tanggal: {new Date(rep.createdAt).toLocaleDateString('id-ID')}
                        </span>
                        <Link
                          to={`/reports/${rep.id}`}
                          className="font-bold text-blue-600 hover:underline flex items-center gap-1"
                        >
                          Lihat Bukti Foto <ExternalLink className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => setActiveFacility(null)}
                className="px-5 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs shadow-xs"
              >
                Tutup Buku Catatan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
