import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Link } from 'react-router-dom';
import { createColoredIcon, getStatusColor } from '../../utils/leafletIcons';
import { StatusBadge } from '../common/StatusBadge';
import { PriorityBadge } from '../common/PriorityBadge';
import { MapPin, Navigation, ExternalLink, Calendar, User } from 'lucide-react';

// Subcomponent to fly to a selected coordinate
function FlyToLocation({ center, zoom }) {
  const map = useMap();
  React.useEffect(() => {
    if (center) {
      map.flyTo(center, zoom || 15, { duration: 1.2 });
    }
  }, [center, zoom, map]);
  return null;
}

export const InteractiveMap = ({
  reports = [],
  selectedReport = null,
  height = '500px',
  center = [-6.917464, 107.619123],
  zoom = 13,
  showControls = true
}) => {
  const [activeLayer, setActiveLayer] = useState('osm'); // osm or satellite
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredReports = reports.filter((r) => {
    if (filterCategory !== 'all' && r.categoryId !== filterCategory) return false;
    if (filterStatus !== 'all' && r.status !== filterStatus) return false;
    return true;
  });

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-slate-200 shadow-md">
      {/* Map Filter Controls Overlay */}
      {showControls && (
        <div className="absolute top-4 left-4 z-[400] bg-white/95 backdrop-blur-md p-3 rounded-xl shadow-lg border border-slate-200 max-w-sm flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-blue-600" />
              Filter Peta Laporan
            </span>
            <span className="text-[11px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
              {filteredReports.length} Titik
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <label className="text-[10px] text-slate-500 font-semibold block mb-0.5">
                Kategori
              </label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-1.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="all">Semua Kategori</option>
                <option value="cat-01">Jalan Rusak</option>
                <option value="cat-02">Lampu PJU</option>
                <option value="cat-03">Drainase</option>
                <option value="cat-04">Fasilitas Taman</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] text-slate-500 font-semibold block mb-0.5">
                Status
              </label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-1.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
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
        </div>
      )}

      {/* Map Legend overlay */}
      <div className="absolute bottom-4 left-4 z-[400] bg-white/90 backdrop-blur-md px-3 py-2 rounded-xl shadow border border-slate-200 hidden sm:flex items-center gap-3 text-[11px] font-medium text-slate-700">
        <span className="font-semibold text-slate-900">Legenda:</span>
        <span className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span> Pending
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 inline-block"></span> Assigned
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded-full bg-purple-500 inline-block"></span> In Progress
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span> Selesai
        </span>
      </div>

      {/* Leaflet Container */}
      <MapContainer
        center={selectedReport ? [selectedReport.lat, selectedReport.lng] : center}
        zoom={selectedReport ? 15 : zoom}
        style={{ height, width: '100%' }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {selectedReport && (
          <FlyToLocation center={[selectedReport.lat, selectedReport.lng]} zoom={16} />
        )}

        {filteredReports.map((report) => {
          const color = getStatusColor(report.status);
          const icon = createColoredIcon(color);

          return (
            <Marker key={report.id} position={[report.lat, report.lng]} icon={icon}>
              <Popup className="custom-popup">
                <div className="w-64 p-1">
                  {report.beforeImage && (
                    <img
                      src={report.beforeImage}
                      alt={report.title}
                      className="w-full h-28 object-cover rounded-lg mb-2"
                    />
                  )}
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="font-mono text-[10px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                      {report.ticketNumber}
                    </span>
                    <StatusBadge status={report.status} size="xs" />
                  </div>

                  <h4 className="font-bold text-xs text-slate-900 leading-snug line-clamp-2">
                    {report.title}
                  </h4>

                  <p className="text-[11px] text-slate-500 mt-1 flex items-start gap-1">
                    <MapPin className="w-3 h-3 text-slate-400 shrink-0 mt-0.5" />
                    <span className="line-clamp-2">{report.address}</span>
                  </p>

                  <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(report.createdAt).toLocaleDateString('id-ID')}
                    </span>
                    <Link
                      to={`/reports/${report.id}`}
                      className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
                    >
                      <span>Detail</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

