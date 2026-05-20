import { useEffect, useState } from 'react';
import apiClient from '../../api/client';
import { useParams } from 'react-router-dom';
import BackButton from '../../components/shared/BackButton';
import LoadingSpinner from '../../components/shared/LoadingSpinner';

interface TransaksiDetail {
  id_transaksi: number;
  jenis_transaksi: string;
  jumlah: number;
  status: string;
  tanggal: string;
  user: { nama: string; email: string };
  penerima?: { nama: string } | null;
}

const DetailTransaksiPage = () => {
  const { id } = useParams();
  const [data, setData] = useState<TransaksiDetail | null>(null);

  useEffect(() => {
    apiClient.get(`/admin/transaksi/${id}`)
      .then(res => setData(res.data))
      .catch(console.error);
  }, [id]);

  if (!data) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-200 via-blue-100/30 to-slate-200 p-8">
      <div className="relative flex items-center justify-center mb-8">
        <div className="absolute left-0">
          <BackButton to="/admin/transaksi" className="bg-red-500 hover:bg-red-600 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-slate-700">Detail Transaksi</h1>
      </div>
      
      <div className="bg-white/90 backdrop-blur-sm border border-slate-200 shadow-sm rounded-2xl p-8 max-w-2xl mx-auto space-y-4">
        <div className="flex justify-between border-b border-slate-200 pb-3">
          <span className="font-semibold text-slate-600">ID Transaksi</span>
          <span className="text-slate-700">TG{data.id_transaksi}</span>
        </div>
        <div className="flex justify-between border-b border-slate-200 pb-3">
          <span className="font-semibold text-slate-600">Pengirim</span>
          <span className="text-slate-700">{data.user?.nama}</span>
        </div>
        {data.penerima && (
          <div className="flex justify-between border-b border-slate-200 pb-3">
            <span className="font-semibold text-slate-600">Penerima</span>
            <span className="text-slate-700">{data.penerima.nama}</span>
          </div>
        )}
        <div className="flex justify-between border-b border-slate-200 pb-3">
          <span className="font-semibold text-slate-600">Jenis</span>
          <span className="text-slate-700">{data.jenis_transaksi}</span>
        </div>
        <div className="flex justify-between border-b border-slate-200 pb-3">
          <span className="font-semibold text-slate-600">Jumlah</span>
          <span className="text-slate-700 font-medium">Rp {data.jumlah.toLocaleString()}</span>
        </div>
        <div className="flex justify-between border-b border-slate-200 pb-3">
          <span className="font-semibold text-slate-600">Status</span>
          <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${
            data.status === 'berhasil' || data.status === 'success' || data.status === 'completed'
              ? 'bg-emerald-100 text-emerald-700'
              : data.status === 'pending'
              ? 'bg-yellow-100 text-yellow-700'
              : 'bg-red-100 text-red-700'
          }`}>
            {data.status}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold text-slate-600">Tanggal</span>
          <span className="text-slate-500">{new Date(data.tanggal).toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default DetailTransaksiPage;