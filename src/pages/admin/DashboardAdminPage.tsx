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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { logout } = useAuth();

  useEffect(() => {
    apiClient.get('/admin/dashboard').then(res => setData(res.data)).catch(console.error);
  }, []);

  if (!data) return <LoadingSpinner />;

  const menuItems = [
    { path: '/admin/users', label: 'Kelola User', icon: '👥', description: 'Manajemen data pengguna' },
    { path: '/admin/transaksi', label: 'Monitoring Transaksi', icon: '📊', description: 'Pantau riwayat pembayaran' },
    { path: '/admin/umkm', label: 'Kelola UMKM', icon: '🏪', description: 'Manajemen data mitra UMKM' },
    { path: '/admin/edukasi', label: 'Kelola Edukasi', icon: '📚', description: 'Manajemen konten artikel & materi edukasi' },
    { path: '/admin/pengaturan', label: 'Pengaturan Sistem', icon: '⚙️', description: 'Konfigurasi nilai transaksi' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-200 via-blue-100/30 to-slate-200 p-8">
      {/* Header dengan tombol hamburger */}
      <div className="relative mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-center text-slate-700 drop-shadow-sm">
          Dashboard Admin PAYLO
        </h1>
        
        {/* Tombol Hamburger */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="absolute top-0 right-0 z-20 flex flex-col items-center justify-center w-12 h-12 space-y-1.5 rounded-xl bg-white/80 backdrop-blur-sm shadow-sm border border-slate-200 hover:bg-slate-50 transition-all duration-300 group"
        >
          <span className={`block w-6 h-0.5 bg-slate-500 rounded-full transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-slate-500 rounded-full transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-slate-500 rounded-full transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>

        {/* Dropdown Menu - SEMUA MENU BERADA DI SINI */}
        <div className={`absolute top-14 right-0 z-10 w-80 rounded-2xl bg-white/95 backdrop-blur-sm shadow-lg border border-slate-200 overflow-hidden transition-all duration-300 origin-top-right ${isMenuOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}`}>
          <div className="py-2">
            {/* Menu Items */}
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 px-5 py-3.5 hover:bg-slate-50 transition-all duration-200 group"
              >
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <div className="font-semibold text-slate-600 group-hover:text-slate-800 transition-colors">
                    {item.label}
                  </div>
                  <div className="text-xs text-slate-400 group-hover:text-slate-500 transition-colors">
                    {item.description}
                  </div>
                </div>
              </Link>
            ))}
            
            {/* Separator */}
            <div className="my-2 h-px bg-slate-100 mx-3" />
            
            {/* Logout */}
            <button
              onClick={() => {
                setIsMenuOpen(false);
                logout();
              }}
              className="w-full flex items-center gap-3 px-5 py-3.5 hover:bg-red-50 transition-all duration-200 group"
            >
              <span className="text-2xl">🚪</span>
              <div>
                <div className="font-semibold text-red-400 group-hover:text-red-500 transition-colors">
                  Logout
                </div>
                <div className="text-xs text-slate-400">Keluar dari dashboard</div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Cards Statistik */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow duration-300">
          <p className="text-lg text-slate-500">Total Users</p>
          <p className="text-3xl font-bold text-slate-700">{data.total_users}</p>
          <p className="text-sm mt-2 text-slate-400">+{data.new_users_this_week} minggu ini</p>
        </div>
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow duration-300">
          <p className="text-lg text-slate-500">Total Transaksi</p>
          <p className="text-3xl font-bold text-slate-700">{data.total_transaksi}</p>
          <p className="text-sm mt-2 text-slate-400">+{data.transaksi_this_week} minggu ini</p>
        </div>
      </div>

      {/* Hanya menampilkan teks sederhana sebagai pengganti menu grid yang dihapus */}
      <div className="text-center mt-8">
        <p className="text-sm text-slate-400">Klik ikon ☰ di pojok kanan atas untuk membuka menu navigasi</p>
      </div>
    </div>
  );
};

export default DashboardAdminPage;