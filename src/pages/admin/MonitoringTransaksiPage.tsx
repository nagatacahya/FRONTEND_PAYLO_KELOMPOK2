import { useEffect, useState } from 'react';
import apiClient from '../../api/client';
import { Link } from 'react-router-dom';
import BackButton from '../../components/shared/BackButton';
import LoadingSpinner from '../../components/shared/LoadingSpinner';

interface TransaksiItem {
  id_transaksi: number;
  jenis_transaksi: string;
  jumlah: number;
  status: string;
  tanggal: string;
  user: { nama: string };
}

const MonitoringTransaksiPage = () => {
  const [data, setData] = useState<TransaksiItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient.get('/admin/transaksi').then(res => { setData(res.data.data); setLoading(false); });
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-200 via-blue-100/30 to-slate-200 p-8">
      <div className="relative flex items-center justify-center mb-8 w-full">
        <div className="absolute left-0">
          <BackButton to="/admin" className="bg-red-500 hover:bg-red-600 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-slate-700">Monitoring Transaksi</h1>
      </div>
      
      <div className="bg-white/90 backdrop-blur-sm border border-slate-200 shadow-sm rounded-2xl p-6">
        <table className="w-full text-left">
          <thead className="border-b border-slate-200">
            <tr className="text-lg text-slate-600">
              <th className="py-3">ID Transaksi</th>
              <th>Pengguna</th>
              <th>Jumlah</th>
              <th>Status</th>
              <th>Tanggal</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr key={item.id_transaksi} className="border-b border-slate-100">
                <td className="py-3 text-slate-700">TG{item.id_transaksi}</td>
                <td className="text-slate-600">{item.user?.nama}</td>
                <td className="text-slate-700 font-medium">Rp {item.jumlah.toLocaleString()}</td>
                <td>
                  <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${
                    item.status === 'success' || item.status === 'completed' 
                      ? 'bg-emerald-100 text-emerald-700' 
                      : item.status === 'pending' 
                      ? 'bg-yellow-100 text-yellow-700' 
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className="text-slate-500">{new Date(item.tanggal).toLocaleDateString()}</td>
                <td>
                  <Link 
                    to={`/admin/transaksi/${item.id_transaksi}`} 
                    className="text-blue-500 hover:text-blue-700 underline transition-colors"
                  >
                    Detail
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MonitoringTransaksiPage;