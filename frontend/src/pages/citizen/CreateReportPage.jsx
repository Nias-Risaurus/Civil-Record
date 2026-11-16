import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useReports } from '../../context/ReportContext';
import { LocationPicker } from '../../components/maps/LocationPicker';
import {
  Camera,
  MapPin,
  FileText,
  AlertTriangle,
  Upload,
  CheckCircle2,
  ArrowLeft,
  Sparkles,
  Layers,
  Image as ImageIcon
} from 'lucide-react';

const SAMPLE_IMAGES = [
  {
    name: 'Jalan Berlubang Aspal',
    url: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=800&auto=format&fit=crop&q=80'
  },
  {
    name: 'Lampu PJU Padam',
    url: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?w=800&auto=format&fit=crop&q=80'
  },
  {
    name: 'Drainase Tersumbat Sampah',
    url: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=800&auto=format&fit=crop&q=80'
  },
  {
    name: 'Ayunan Taman Patah',
    url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&auto=format&fit=crop&q=80'
  }
];

export const CreateReportPage = () => {
  const navigate = useNavigate();
  const { categories, createReport } = useReports();

  const [title, setTitle] = useState('');
  const [categoryId, setCategoryId] = useState('cat-01');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('Jl. Mawar Raya KM 2.5');
  const [coords, setCoords] = useState({ lat: -6.917464, lng: 107.619123 });
  const [imagePreview, setImagePreview] = useState(SAMPLE_IMAGES[0].url);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState('');

  // Handle image upload from disk
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setValidationError('Ukuran foto maksimal 5 MB.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationError('');

    if (!title.trim()) {
      setValidationError('Judul laporan wajib diisi.');
      return;
    }
    if (!description.trim()) {
      setValidationError('Deskripsi detail kerusakan wajib diisi.');
      return;
    }
    if (!address.trim()) {
      setValidationError('Alamat atau patokan lokasi wajib diisi.');
      return;
    }

    setIsSubmitting(true);

    try {
      const created = createReport({
        title,
        categoryId,
        description,
        address,
        lat: coords.lat,
        lng: coords.lng,
        image: imagePreview
      });

      // Redirect to report detail page
      navigate(`/reports/${created.id}`);
    } catch (err) {
      setValidationError('Terjadi kesalahan saat menyimpan laporan.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Back button & Page Title */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors shadow-xs"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Buat Laporan Kerusakan Fasilitas
          </h1>
          <p className="text-xs text-slate-500">
            Sampaikan laporan Anda secara akurat agar dinas teknis dapat segera menindaklanjuti.
          </p>
        </div>
      </div>

      {validationError && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3.5 rounded-xl flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 shrink-0 text-red-500" />
          <span>{validationError}</span>
        </div>
      )}

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
        {/* Step 1: Kategori */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
            1. Kategori Kerusakan <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategoryId(cat.id)}
                className={`p-3.5 rounded-2xl border text-left transition-all ${
                  categoryId === cat.id
                    ? 'border-blue-600 bg-blue-50/80 ring-2 ring-blue-500/20 shadow-xs'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold mb-2 shadow-xs"
                  style={{ backgroundColor: cat.color }}
                >
                  <Layers className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-slate-900 leading-snug">{cat.name}</h4>
                <p className="text-[10px] text-slate-500 mt-1 line-clamp-2">{cat.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Judul & Deskripsi */}
        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-800 block mb-1">
              Judul Laporan <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Contoh: Jalan berlubang besar membahayakan di Jl. Mawar"
              className="w-full text-xs sm:text-sm p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-800 block mb-1">
              Deskripsi Kerusakan <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Jelaskan kondisi kerusakan secara detail, perkiraan ukuran/kedalaman, dampak bagi warga atau kendaraan, serta waktu kejadian..."
              className="w-full text-xs sm:text-sm p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        {/* Step 3: Alamat & Titik Peta */}
        <div className="space-y-4 pt-2 border-t border-slate-100">
          <div>
            <label className="text-xs font-bold text-slate-800 block mb-1">
              Alamat Lengkap / Patokan Lokasi <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Contoh: Jl. Mawar Raya No. 45, depan Minimarket Sumber Berkah, Kel. Sukamaju"
              className="w-full text-xs sm:text-sm p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Leaflet Location Picker */}
          <LocationPicker
            initialLat={coords.lat}
            initialLng={coords.lng}
            onLocationChange={({ lat, lng }) => setCoords({ lat, lng })}
          />
        </div>

        {/* Step 4: Unggah Foto Bukti */}
        <div className="space-y-3 pt-2 border-t border-slate-100">
          <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
            4. Foto Bukti Kerusakan (Wajib) <span className="text-red-500">*</span>
          </label>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Upload Box */}
            <div className="border-2 border-dashed border-slate-300 rounded-2xl p-6 text-center hover:border-blue-500 transition-colors bg-slate-50/50 flex flex-col items-center justify-center space-y-2">
              <Camera className="w-8 h-8 text-slate-400" />
              <div className="text-xs text-slate-600">
                <label className="font-semibold text-blue-600 hover:text-blue-700 cursor-pointer">
                  <span>Pilih file dari perangkat</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="sr-only"
                  />
                </label>
                <p className="text-[11px] text-slate-400 mt-1">PNG, JPG, WebP hingga 5 MB</p>
              </div>
            </div>

            {/* Preview Box */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 h-52">
              {imagePreview ? (
                <>
                  <img
                    src={imagePreview}
                    alt="Preview Kerusakan"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-2 left-2 bg-black/70 text-white text-[10px] font-semibold px-2 py-0.5 rounded backdrop-blur">
                    Foto yang akan diunggah
                  </span>
                </>
              ) : (
                <div className="flex items-center justify-center h-full text-xs text-slate-400">
                  Belum ada foto yang dipilih
                </div>
              )}
            </div>
          </div>

          {/* Quick preset selector for testing convenience */}
          <div className="pt-2">
            <span className="text-[11px] font-semibold text-slate-500 block mb-1.5">
              Atau gunakan foto contoh kerusakan berikut untuk tes cepat:
            </span>
            <div className="flex flex-wrap gap-2">
              {SAMPLE_IMAGES.map((sample, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setImagePreview(sample.url)}
                  className={`text-[11px] px-2.5 py-1 rounded-lg border transition-colors ${
                    imagePreview === sample.url
                      ? 'bg-blue-600 text-white border-blue-600 font-bold'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                >
                  {sample.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold text-xs transition-colors"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all flex items-center gap-2 disabled:opacity-50"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{isSubmitting ? 'Mengirim Laporan...' : 'Kirim Laporan Resmi'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

