import { useEffect, useState } from 'react';
import apiClient from '../../api/client';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../../components/shared/LoadingSpinner';

interface AdminDashboardData {
  total_users: number;
  new_users_this_week: number;
  total_transaksi: number;
  transaksi_this_week: number;
  user_growth: Record<string, number>;
}

const DashboardAdminPage = () => {
  const [data, setData] = useState<AdminDashboardData | null>(null);
  const { logout } = useAuth();

  useEffect(() => {
    apiClient.get('/admin/dashboard').then(res => setData(res.data)).catch(console.error);
  }, []);

  if (!data) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-zinc-900 p-8 text-slate-100">
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-center bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-indigo-200 mb-12 drop-shadow-sm">Dashboard Admin</h1>
      <div className="grid grid-cols-3 gap-8 mb-8">
        <div className="bg-white/20 backdrop-blur rounded-2xl p-6 text-white">
          <p className="text-lg">Total Users</p>
          <p className="text-3xl font-bold">{data.total_users}</p>
          <p className="text-sm mt-2">+{data.new_users_this_week} minggu ini</p>
        </div>
        <div className="bg-white/20 backdrop-blur rounded-2xl p-6 text-white">
          <p className="text-lg">Total Transaksi</p>
          <p className="text-3xl font-bold">{data.total_transaksi}</p>
          <p className="text-sm mt-2">+{data.transaksi_this_week} minggu ini</p>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        <Link to="/admin/users" className="relative group overflow-hidden bg-gradient-to-br from-blue-600/30 to-teal-600/30 border border-blue-400/40 backdrop-blur-md rounded-xl p-6 shadow-lg text-center font-semibold text-white transition-all duration-300 hover:scale-[1.03] hover:border-blue-400 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]">
          <div className="flex flex-col items-center gap-1">
          <span className="text-2xl tracking-wide"> Kelola User</span>
          <span className="text-sm font-normal text-emerald-200/80 group-hover:text-white transition-colors">Manajemen data pengguna </span>
          </div>
        </Link>
        <Link to="/admin/transaksi" className="relative group overflow-hidden bg-gradient-to-br from-emerald-600/20 to-teal-600/20 border border-emerald-400/30 backdrop-blur-md rounded-xl p-6 shadow-lg text-center font-semibold text-white transition-all duration-300 hover:scale-[1.03] hover:border-emerald-400/60 hover:shadow-[0_0_25px_rgba(16,185,129,0.3)]">
          <div className="flex flex-col items-center gap-1">
          <span className="text-2xl tracking-wide">Monitoring Transaksi</span>
          <span className="text-sm font-normal text-emerald-200/80 group-hover:text-white transition-colors">Pantau riwayat pembayaran</span>
          </div>
        </Link>
        <Link to="/admin/umkm" className="relative group overflow-hidden bg-gradient-to-br from-amber-600/20 to-orange-600/20 border border-amber-400/30 backdrop-blur-md rounded-xl p-6 shadow-lg text-center font-semibold text-white transition-all duration-300 hover:scale-[1.03] hover:border-amber-400/60 hover:shadow-[0_0_25px_rgba(245,158,11,0.3)]">
          <div className="flex flex-col items-center gap-1">
          <span className="text-2xl tracking-wide">Kelola UMKM</span>
          <span className="text-sm font-normal text-amber-200/80 group-hover:text-white transition-colors">Manajemen data mitra & verifikasi toko UMKM</span>
          </div>
        </Link>
        <Link to="/admin/edukasi" className="relative group overflow-hidden bg-gradient-to-br from-indigo-600/20 to-violet-600/20 border border-indigo-400/30 backdrop-blur-md rounded-xl p-6 shadow-lg text-center font-semibold text-white transition-all duration-300 hover:scale-[1.03] hover:border-indigo-400/60 hover:shadow-[0_0_25px_rgba(99,102,241,0.3)]">
          <div className="flex flex-col items-center gap-1">
          <span className="text-2xl tracking-wide"> Kelola Edukasi</span>
          <span className="text-sm font-normal text-violet-200/90 group-hover:text-white transition-colors">Manajemen konten artikel & materi edukasi</span>
          </div>
        </Link>
        <Link to="/admin/pengaturan" className="relative group overflow-hidden bg-gradient-to-br from-cyan-600/20 to-blue-600/20 border border-cyan-400/30 backdrop-blur-md rounded-xl p-6 shadow-lg text-center font-semibold text-white transition-all duration-300 hover:scale-[1.03] hover:border-cyan-400/60 hover:shadow-[0_0_25px_rgba(34,211,238,0.3)]">
          <div className="flex flex-col items-center gap-1">
          <span className="text-2xl tracking-wide">Pengaturan Sistem</span>
          <span className="text-sm font-normal text-slate-300/80 group-hover:text-white transition-colors">Konfigurasi aplikasi, fitur, & batasan sistem</span>
          </div>
        </Link>
        <button onClick={logout} className="bg-red-400 rounded-xl p-6 shadow-lg text-center font-semibold text-lg text-white hover:bg-red-500">
          Logout
        </button>
      </div>
    </div>
  );
};

export default DashboardAdminPage;