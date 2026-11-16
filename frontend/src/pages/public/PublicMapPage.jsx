import React, { useState } from 'react';
import { useReports } from '../../context/ReportContext';
import { InteractiveMap } from '../../components/maps/InteractiveMap';
import { StatusBadge } from '../../components/common/StatusBadge';
import { MapPin, Search, Filter, Layers, ExternalLink, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PublicMapPage = () => {
  const { reports, categories } = useReports();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [activeReport, setActiveReport] = useState(null);

  const filteredReports = reports.filter((r) => {
    if (selectedCategory !== 'all' && r.categoryId !== selectedCategory) return false;
    if (selectedStatus !== 'all' && r.status !== selectedStatus) return false;
    if (
      searchQuery &&
      !r.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !r.address.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !r.ticketNumber.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <MapPin className="w-7 h-7 text-emerald-600" />
            Peta Geospasial Fasilitas Publik
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Menampilkan seluruh sebaran titik kerusakan fasilitas umum di wilayah kota secara transparan.
          </p>
        </div>

        <Link
          to="/citizen/create"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-md transition-colors shrink-0"
        >
          <span>Laporkan Kerusakan Baru</span>
        </Link>
      </div>

      {/* Main Grid: Sidebar List + Map */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Sidebar Filter & List */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari jalan, tiket, atau kata kunci..."
                className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
                  Kategori
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="all">Semua Kategori</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
                  Status
                </label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full p-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="all">Semua Status</option>
                  <option value="pending">Pending</option>
                  <option value="verified">Verified</option>
                  <option value="assigned">Assigned</option>
                  <option value="in_progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-500">
              <span>Hasil Pencarian:</span>
              <span className="font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                {filteredReports.length} Laporan
              </span>
            </div>
          </div>

          {/* List of filtered cards */}
          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
            {filteredReports.length === 0 ? (
              <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center text-xs text-slate-400">
                Tidak ada laporan yang cocok dengan filter.
              </div>
            ) : (
              filteredReports.map((report) => (
                <div
                  key={report.id}
                  onClick={() => setActiveReport(report)}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    activeReport?.id === report.id
                      ? 'bg-blue-50/70 border-blue-500 ring-2 ring-blue-500/20 shadow-sm'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-xs'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="font-mono text-[10px] font-bold text-blue-600 bg-blue-100/60 px-1.5 py-0.5 rounded">
                      {report.ticketNumber}
                    </span>
                    <StatusBadge status={report.status} size="xs" />
                  </div>

                  <h3 className="font-bold text-xs text-slate-900 leading-snug line-clamp-1">
                    {report.title}
                  </h3>

                  <p className="text-[11px] text-slate-500 mt-1 flex items-start gap-1">
                    <MapPin className="w-3 h-3 text-slate-400 shrink-0 mt-0.5" />
                    <span className="line-clamp-1">{report.address}</span>
                  </p>

                  <div className="mt-2.5 pt-2 border-t border-slate-100/80 flex items-center justify-between text-[11px]">
                    <span className="text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(report.createdAt).toLocaleDateString('id-ID')}
                    </span>
                    <Link
                      to={`/reports/${report.id}`}
                      className="font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span>Lihat Detail</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Map Panel */}
        <div className="lg:col-span-8">
          <InteractiveMap
            reports={filteredReports}
            selectedReport={activeReport}
            height="620px"
            showControls={false}
          />
        </div>
      </div>
    </div>
  );
};

