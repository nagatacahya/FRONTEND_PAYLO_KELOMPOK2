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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-zinc-900 p-8 text-slate-100">
      <div className="flex items-center gap-4 mb-8">
        <BackButton to="/admin/transaksi" />
        <h1 className="text-4xl font-bold text-white">Detail Transaksi</h1>
      </div>
      <div className="bg-slate-950/40 border border-white/10 backdrop-blur-xl  p-6 shadow-2xl rounded-2xl p-8 max-w-2xl space-y-4">
        <div className="flex justify-between border-b pb-2">
          <span className="font-semibold">ID Transaksi</span>
          <span>{data.id_transaksi}</span>
        </div>
        <div className="flex justify-between border-b pb-2">
          <span className="font-semibold">Pengirim</span>
          <span>{data.user?.nama}</span>
        </div>
        {data.penerima && (
          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold">Penerima</span>
            <span>{data.penerima.nama}</span>
          </div>
        )}
        <div className="flex justify-between border-b pb-2">
          <span className="font-semibold">Jenis</span>
          <span>{data.jenis_transaksi}</span>
        </div>
        <div className="flex justify-between border-b pb-2">
          <span className="font-semibold">Jumlah</span>
          <span>Rp {data.jumlah.toLocaleString()}</span>
        </div>
        <div className="flex justify-between border-b pb-2">
          <span className="font-semibold">Status</span>
          <span className={data.status === 'berhasil' ? 'text-green-600' : 'text-red-600'}>
            {data.status}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Tanggal</span>
          <span>{new Date(data.tanggal).toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default DetailTransaksiPage;