import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, MapPin, Phone, Mail } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1: Brand */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
                <ShieldAlert className="w-4 h-4" />
              </div>
              <span className="text-base font-bold text-white tracking-tight">
                Civil<span className="text-blue-500">Record</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Public Facility Reporting & Management System. Membantu pemerintah daerah dan masyarakat menjaga kualitas fasilitas umum bersama.
            </p>
            <p className="text-[11px] text-blue-400 font-semibold">
              Tagline: Report. Record. Repair.
            </p>
          </div>

          {/* Col 2: Navigasi */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Navigasi Utama</h4>
            <ul className="space-y-1.5">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  Tentang CivilRecord
                </Link>
              </li>
              <li>
                <Link to="/map" className="hover:text-white transition-colors">
                  Peta Publik Geospasial
                </Link>
              </li>
              <li>
                <Link to="/track" className="hover:text-white transition-colors">
                  Lacak Nomor Tiket
                </Link>
              </li>
              <li>
                <Link to="/citizen/create" className="hover:text-white transition-colors">
                  Buat Laporan Baru
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Dinas Terintegrasi */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">OPD Terintegrasi</h4>
            <ul className="space-y-1.5 text-slate-400">
              <li>• Dinas Bina Marga & Sumber Daya Air</li>
              <li>• Dinas Perhubungan (PJU & Rambu)</li>
              <li>• Dinas Perumahan & Pertamanan</li>
              <li>• Dinas Komunikasi & Informatika</li>
            </ul>
          </div>

          {/* Col 4: Kontak Darurat */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Layanan Informasi</h4>
            <div className="space-y-1 text-slate-400">
              <p className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-blue-400" />
                Call Center 112 (Bebas Pulsa)
              </p>
              <p className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-blue-400" />
                lapor@civilrecord.go.id
              </p>
              <p className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-blue-400" />
                Balai Kota & Kantor Dinas Teknis
              </p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 text-center text-[11px] text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>&copy; 2026 CivilRecord System. All rights reserved.</span>
          <span>Sistem Manajemen Fasilitas Publik Daerah</span>
        </div>
      </div>
    </footer>
  );
};
