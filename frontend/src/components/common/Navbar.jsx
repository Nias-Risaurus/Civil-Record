import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useReports } from '../../context/ReportContext';
import {
  ShieldAlert,
  MapPin,
  Bell,
  Search,
  CheckCircle,
  Clock,
  User,
  LogOut,
  RotateCcw,
  Sparkles,
  Layers,
  Wrench,
  Users,
  CheckSquare,
  Building2,
  ChevronDown
} from 'lucide-react';

export const Navbar = () => {
  const { currentUser, switchRole, logout, isAdmin, isOfficer, isCitizen } = useAuth();
  const { notifications, markNotificationRead, resetDemoData } = useReports();
  const location = useLocation();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Filter notifications for current user
  const userNotifs = notifications.filter(
    (n) => n.userId === currentUser?.id || (isAdmin && n.userId === 'usr-admin-01')
  );
  const unreadCount = userNotifs.filter((n) => !n.isRead).length;

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Tagline */}
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-bold tracking-tight text-slate-900">
                    Civil<span className="text-blue-600">Record</span>
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-blue-100 text-blue-800">
                    GovTech
                  </span>
                </div>
                <p className="text-[11px] font-medium text-slate-500 tracking-wide">
                  Report. Record. Repair.
                </p>
              </div>
            </Link>

            {/* Navigation links based on role */}
            <nav className="hidden md:flex items-center gap-1">
              <Link
                to="/"
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive('/')
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                Beranda
              </Link>
              <Link
                to="/about"
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive('/about')
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                Tentang
              </Link>
              <Link
                to="/map"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive('/map')
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <MapPin className="w-4 h-4 text-emerald-500" />
                Peta Publik
              </Link>
              <Link
                to="/track"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive('/track')
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Search className="w-4 h-4 text-slate-400" />
                Lacak Tiket
              </Link>

              {/* Citizen specific links */}
              {isCitizen && (
                <>
                  <Link
                    to="/citizen"
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive('/citizen')
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    Dashboard Warga
                  </Link>
                  <Link
                    to="/citizen/create"
                    className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors ${
                      isActive('/citizen/create')
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    + Buat Laporan
                  </Link>
                </>
              )}

              {/* Officer specific link */}
              {isOfficer && (
                <Link
                  to="/officer"
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive('/officer')
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <Wrench className="w-4 h-4 text-indigo-600" />
                  Dashboard Tugas Petugas
                </Link>
              )}

              {/* Admin specific links */}
              {isAdmin && (
                <>
                  <Link
                    to="/admin"
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive('/admin')
                        ? 'bg-purple-50 text-purple-700 font-bold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    <Building2 className="w-4 h-4 text-purple-600" />
                    Admin Console
                  </Link>
                  <Link
                    to="/admin/verification"
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive('/admin/verification')
                        ? 'bg-amber-50 text-amber-800 font-bold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    Verifikasi
                  </Link>
                  <Link
                    to="/admin/facilities"
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive('/admin/facilities')
                        ? 'bg-blue-50 text-blue-700 font-bold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    Fasilitas
                  </Link>
                  <Link
                    to="/admin/users"
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive('/admin/users')
                        ? 'bg-purple-50 text-purple-700 font-bold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    Pengguna
                  </Link>
                </>
              )}
            </nav>
          </div>

          {/* Quick Role Switcher Pill + Notifications + Profile */}
          <div className="flex items-center gap-3">
            {/* Quick Role Switcher for seamless demo testing */}
            <div className="hidden lg:flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider px-2">
                Mode Demo:
              </span>
              <button
                onClick={() => switchRole('citizen')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                  isCitizen
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Masuk sebagai Citizen (Masyarakat Pelapor)"
              >
                Citizen
              </button>
              <button
                onClick={() => switchRole('officer')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                  isOfficer
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Masuk sebagai Officer (Petugas Lapangan)"
              >
                Officer
              </button>
              <button
                onClick={() => switchRole('admin')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                  isAdmin
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Masuk sebagai Admin Pemda"
              >
                Admin
              </button>
            </div>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowUserMenu(false);
                }}
                className="relative p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                title="Notifikasi"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center animate-bounce">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Popover */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-200 p-4 z-50">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <Bell className="w-4 h-4 text-blue-600" />
                      <h4 className="font-semibold text-slate-800 text-sm">Notifikasi</h4>
                    </div>
                    <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-medium">
                      {unreadCount} baru
                    </span>
                  </div>

                  <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto mt-2">
                    {userNotifs.length === 0 ? (
                      <p className="text-center py-6 text-xs text-slate-400">
                        Belum ada notifikasi baru.
                      </p>
                    ) : (
                      userNotifs.map((n) => (
                        <div
                          key={n.id}
                          onClick={() => markNotificationRead(n.id)}
                          className={`py-3 px-2 rounded-lg cursor-pointer transition-colors ${
                            n.isRead ? 'opacity-70 hover:bg-slate-50' : 'bg-blue-50/50 hover:bg-blue-50'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <span className="text-xs font-semibold text-slate-900">{n.title}</span>
                            <span className="text-[10px] text-slate-400">
                              {new Date(n.timestamp).toLocaleTimeString('id-ID', {
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 mt-1 line-clamp-2">{n.message}</p>
                          {n.ticketNumber && (
                            <span className="inline-block mt-1 font-mono text-[10px] font-semibold text-blue-600 bg-blue-100/60 px-1.5 py-0.5 rounded">
                              {n.ticketNumber}
                            </span>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* User Profile dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowUserMenu(!showUserMenu);
                  setShowNotifications(false);
                }}
                className="flex items-center gap-2 p-1 pl-2 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors"
              >
                <img
                  src={currentUser?.avatar}
                  alt={currentUser?.name}
                  className="w-8 h-8 rounded-lg object-cover ring-2 ring-blue-500/20"
                />
                <div className="text-left hidden sm:block pr-1">
                  <p className="text-xs font-bold text-slate-900 leading-tight">
                    {currentUser?.name}
                  </p>
                  <p className="text-[10px] font-semibold uppercase text-blue-600 leading-tight">
                    {currentUser?.role}
                  </p>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {/* User Menu Dropdown */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50">
                  <div className="p-3 border-b border-slate-100 bg-slate-50 rounded-xl mb-1">
                    <p className="text-xs font-bold text-slate-900">{currentUser?.name}</p>
                    <p className="text-xs text-slate-500">{currentUser?.email}</p>
                    <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 text-[11px] font-medium">
                      <span>{currentUser?.department}</span>
                    </div>
                  </div>

                  {/* Mobile Role Switcher */}
                  <div className="lg:hidden p-2 border-b border-slate-100">
                    <p className="text-[11px] font-semibold text-slate-500 uppercase mb-1.5">
                      Ganti Peran:
                    </p>
                    <div className="grid grid-cols-3 gap-1">
                      <button
                        onClick={() => {
                          switchRole('citizen');
                          setShowUserMenu(false);
                        }}
                        className={`text-xs py-1 rounded text-center font-medium ${
                          isCitizen ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        Citizen
                      </button>
                      <button
                        onClick={() => {
                          switchRole('officer');
                          setShowUserMenu(false);
                        }}
                        className={`text-xs py-1 rounded text-center font-medium ${
                          isOfficer ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        Officer
                      </button>
                      <button
                        onClick={() => {
                          switchRole('admin');
                          setShowUserMenu(false);
                        }}
                        className={`text-xs py-1 rounded text-center font-medium ${
                          isAdmin ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        Admin
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      resetDemoData();
                      setShowUserMenu(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    <RotateCcw className="w-4 h-4 text-amber-500" />
                    <span>Reset Data Demo Awal</span>
                  </button>

                  <button
                    onClick={() => {
                      logout();
                      setShowUserMenu(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Keluar (Switch ke Warga)</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

