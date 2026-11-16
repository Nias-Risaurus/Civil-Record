import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  ShieldAlert,
  Mail,
  Lock,
  ArrowRight,
  User,
  Wrench,
  Building2,
  AlertCircle
} from 'lucide-react';

export const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = login(email, password);
    setLoading(false);

    if (res.success) {
      if (res.user.role === 'admin') navigate('/admin');
      else if (res.user.role === 'officer') navigate('/officer');
      else navigate('/citizen');
    } else {
      setError(res.message || 'Email atau kata sandi tidak valid.');
    }
  };

  // Quick 1-click login for demo accounts
  const handleQuickLogin = (userEmail) => {
    setEmail(userEmail);
    setPassword('password123');
    const res = login(userEmail, 'password123');
    if (res.success) {
      if (res.user.role === 'admin') navigate('/admin');
      else if (res.user.role === 'officer') navigate('/officer');
      else navigate('/citizen');
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-3xl border border-slate-200 shadow-xl">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white mx-auto shadow-md shadow-blue-500/20">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Masuk ke CivilRecord
          </h2>
          <p className="text-xs text-slate-500">
            Sistem Informasi Pelaporan & Pemeliharaan Fasilitas Publik
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3 rounded-xl flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Email Pengguna</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@email.com"
                className="w-full pl-9 pr-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Kata Sandi</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <span>{loading ? 'Memverifikasi...' : 'Masuk ke Akun'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* 1-Click Quick Demo Login */}
        <div className="pt-4 border-t border-slate-100 space-y-2.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block text-center">
            Atau Masuk Cepat Akun Demo (1-Klik):
          </span>
          <div className="grid grid-cols-1 gap-2 text-xs">
            <button
              type="button"
              onClick={() => handleQuickLogin('anisa.warga@gmail.com')}
              className="p-2.5 rounded-xl border border-blue-200 bg-blue-50/50 hover:bg-blue-100 text-left transition-colors flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-blue-600" />
                <div>
                  <p className="font-bold text-blue-950">Citizen: Anisa Rahmawati</p>
                  <p className="text-[10px] text-blue-700">Masyarakat Pelapor</p>
                </div>
              </div>
              <span className="text-[10px] font-bold text-blue-600">Pilih →</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickLogin('bambang@bina-marga.go.id')}
              className="p-2.5 rounded-xl border border-indigo-200 bg-indigo-50/50 hover:bg-indigo-100 text-left transition-colors flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <Wrench className="w-4 h-4 text-indigo-600" />
                <div>
                  <p className="font-bold text-indigo-950">Officer: Bambang Sudarsono</p>
                  <p className="text-[10px] text-indigo-700">Teknisi Dinas Bina Marga & SDA</p>
                </div>
              </div>
              <span className="text-[10px] font-bold text-indigo-600">Pilih →</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickLogin('admin@civilrecord.go.id')}
              className="p-2.5 rounded-xl border border-purple-200 bg-purple-50/50 hover:bg-purple-100 text-left transition-colors flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-purple-600" />
                <div>
                  <p className="font-bold text-purple-950">Admin: Ir. Hendra Wijaya</p>
                  <p className="text-[10px] text-purple-700">Pengelola Sistem Pemkot</p>
                </div>
              </div>
              <span className="text-[10px] font-bold text-purple-600">Pilih →</span>
            </button>
          </div>
        </div>

        {/* Footer info */}
        <div className="text-center text-xs text-slate-500 pt-2">
          Belum punya akun warga?{' '}
          <Link to="/register" className="font-bold text-blue-600 hover:underline">
            Daftar Sekarang
          </Link>
        </div>
      </div>
    </div>
  );
};
