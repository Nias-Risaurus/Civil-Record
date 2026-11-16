import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import { createColoredIcon } from '../../utils/leafletIcons';
import { MapPin, Navigation, Crosshair, Check, AlertCircle } from 'lucide-react';

// Map event listener for clicking coordinates
function MapClickMarker({ position, setPosition, onLocationSelected }) {
  const map = useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setPosition([lat, lng]);
      if (onLocationSelected) {
        onLocationSelected({ lat, lng });
      }
    }
  });

  return position ? (
    <Marker position={position} icon={createColoredIcon('#ef4444')} />
  ) : null;
}

// Center updater
function ChangeView({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, 16);
    }
  }, [center, map]);
  return null;
}

export const LocationPicker = ({
  initialLat = -6.917464,
  initialLng = 107.619123,
  onLocationChange
}) => {
  const [position, setPosition] = useState([initialLat, initialLng]);
  const [locating, setLocating] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      setErrorMsg('Browser Anda tidak mendukung geolokasi GPS.');
      return;
    }

    setLocating(true);
    setErrorMsg('');

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const newPos = [latitude, longitude];
        setPosition(newPos);
        setLocating(false);
        if (onLocationChange) {
          onLocationChange({ lat: latitude, lng: longitude });
        }
      },
      (err) => {
        setLocating(false);
        setErrorMsg('Gagal mendeteksi GPS. Silakan klik langsung titik pada peta.');
        console.warn('Geolocation error:', err);
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  const handleManualMapSelect = ({ lat, lng }) => {
    setPosition([lat, lng]);
    if (onLocationChange) {
      onLocationChange({ lat, lng });
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
          <MapPin className="w-4 h-4 text-blue-600" />
          Titik Lokasi Kerusakan (Klik pada Peta)
        </label>
        <button
          type="button"
          onClick={handleGetCurrentLocation}
          disabled={locating}
          className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-lg bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition-colors"
        >
          <Navigation className={`w-3.5 h-3.5 ${locating ? 'animate-spin' : ''}`} />
          <span>{locating ? 'Mencari GPS...' : 'Gunakan GPS Saya'}</span>
        </button>
      </div>

      {errorMsg && (
        <div className="flex items-center gap-2 text-xs text-amber-700 bg-amber-50 p-2 rounded-lg border border-amber-200">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Map box */}
      <div className="relative w-full h-72 rounded-xl overflow-hidden border border-slate-300 shadow-inner">
        <MapContainer
          center={position}
          zoom={15}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <ChangeView center={position} />
          <MapClickMarker
            position={position}
            setPosition={setPosition}
            onLocationSelected={handleManualMapSelect}
          />
        </MapContainer>

        <div className="absolute bottom-2 left-2 z-[400] bg-white/90 backdrop-blur px-2.5 py-1 rounded-md text-[10px] font-mono text-slate-600 border border-slate-200 shadow-xs flex items-center gap-2">
          <Crosshair className="w-3 h-3 text-red-500" />
          <span>
            Lat: {position[0]?.toFixed(6)}, Lng: {position[1]?.toFixed(6)}
          </span>
        </div>
      </div>

      <p className="text-[11px] text-slate-500">
        💡 <span className="font-semibold">Tips:</span> Geser dan klik tepat di lokasi kerusakan fasilitas umum untuk memastikan petugas tidak keliru menemukan lokasi.
      </p>
    </div>
  );
};

