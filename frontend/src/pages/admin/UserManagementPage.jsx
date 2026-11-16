import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  Users,
  Search,
  UserPlus,
  ShieldCheck,
  Wrench,
  User,
  Phone,
  Mail,
  Building,
  CheckCircle2,
  Lock
} from 'lucide-react';

export const UserManagementPage = () => {
  const { users, currentUser, switchUserById } = useAuth();
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  const filteredUsers = users.filter((u) => {
    if (roleFilter !== 'all' && u.role !== roleFilter) return false;
    if (
      search &&
      !u.name.toLowerCase().includes(search.toLowerCase()) &&
      !u.email.toLowerCase().includes(search.toLowerCase()) &&
      !u.department?.toLowerCase().includes(search.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-200">
              Manajemen Pengguna & Hak Akses
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1 flex items-center gap-2.5">
            <Users className="w-8 h-8 text-purple-600" />
            User & Officer Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            Kelola akun masyarakat pelapor, teknisi dinas lapangan (Officer), dan administrator sistem pemerintah daerah.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
            Total Pengguna: <strong className="text-slate-800">{users.length} Akun</strong>
          </span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nama, email, dinas..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto text-xs">
          <label className="text-slate-500 font-medium shrink-0">Filter Peran:</label>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="p-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="all">Semua Peran</option>
            <option value="admin">Administrator</option>
            <option value="officer">Petugas Lapangan (Officer)</option>
            <option value="citizen">Masyarakat (Citizen)</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-bold text-[10px] tracking-wider">
              <tr>
                <th className="py-4 px-6">Pengguna</th>
                <th className="py-4 px-6">Peran & Hak Akses</th>
                <th className="py-4 px-6">Instansi / Departemen</th>
                <th className="py-4 px-6">Kontak</th>
                <th className="py-4 px-6 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUsers.map((u) => {
                const isCurrent = currentUser?.id === u.id;

                return (
                  <tr key={u.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <img
                          src={u.avatar}
                          alt={u.name}
                          className="w-10 h-10 rounded-xl object-cover border border-slate-200 ring-2 ring-slate-100"
                        />
                        <div>
                          <p className="font-bold text-slate-900 text-sm">{u.name}</p>
                          <p className="text-slate-500 text-xs flex items-center gap-1">
                            <Mail className="w-3 h-3 text-slate-400" />
                            {u.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      {u.role === 'admin' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-200">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          Administrator
                        </span>
                      )}
                      {u.role === 'officer' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800 border border-indigo-200">
                          <Wrench className="w-3.5 h-3.5" />
                          Petugas Lapangan
                        </span>
                      )}
                      {u.role === 'citizen' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
                          <User className="w-3.5 h-3.5" />
                          Warga Pelapor
                        </span>
                      )}
                    </td>

                    <td className="py-4 px-6 font-medium text-slate-700">
                      <div className="flex items-center gap-1.5">
                        <Building className="w-3.5 h-3.5 text-slate-400" />
                        <span>{u.department}</span>
                      </div>
                    </td>

                    <td className="py-4 px-6 font-mono text-slate-600">
                      <div className="flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-slate-400" />
                        <span>{u.phone}</span>
                      </div>
                    </td>

                    <td className="py-4 px-6 text-right">
                      {isCurrent ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3" />
                          Sesi Aktif
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => switchUserById(u.id)}
                          className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 transition-colors"
                          title="Beralih sesi login ke pengguna ini untuk testing"
                        >
                          Masuk Sebagai Akun Ini
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

