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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-zinc-900 p-8 text-slate-100">
      <div className="relative flex items-center justify-center mb-8 w-full">
          <div className="absolute left-0">
          <BackButton to="/admin" />
          </div>
        <h1 className="text-4xl font-bold text-white">Monitoring Transaksi</h1>
      </div>
      <div className="bg-slate-950/40 border border-brown/10 backdrop-blur-xl rounded-2xl p-6 shadow-2xl">
        <table className="w-full text-left">
          <thead className="border-b">
            <tr className="text-lg">
              <th>ID Transaksi</th>
              <th>Pengguna</th>
              <th>Jumlah</th>
              <th>Status</th>
              <th>Tanggal</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr key={item.id_transaksi} className="border-b">
                <td className="py-3">TG{item.id_transaksi}</td>
                <td>{item.user?.nama}</td>
                <td>Rp {item.jumlah.toLocaleString()}</td>
                <td>{item.status}</td>
                <td>{new Date(item.tanggal).toLocaleDateString()}</td>
                <td>
                  <Link to={`/admin/transaksi/${item.id_transaksi}`} className="text-blue-500 underline">Detail</Link>
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