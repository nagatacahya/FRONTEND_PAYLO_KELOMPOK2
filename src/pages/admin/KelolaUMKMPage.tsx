import { useEffect, useState } from 'react';
import apiClient from '../../api/client';
import { Link } from 'react-router-dom';
import BackButton from '../../components/shared/BackButton';
import LoadingSpinner from '../../components/shared/LoadingSpinner';
import { useToast } from '../../hooks/useToast';

interface UMKMItem {
  id_umkm: number;
  nama_umkm: string;
  alamat: string;
  kategori?: string;
}

const KelolaUMKMPage = () => {
  const [umkmList, setUmkmList] = useState<UMKMItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast, showToast } = useToast();

  const fetchData = () => {
    setLoading(true);
    apiClient.get('/umkm') // endpoint UMKM public, tapi admin juga bisa akses
      .then(res => setUmkmList(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchData(); }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm('Yakin ingin menghapus UMKM ini?')) return;
    try {
      await apiClient.delete(`/admin/umkm/${id}`);
      showToast('UMKM berhasil dihapus');
      fetchData();
    } catch (err: any) {
      showToast(err.response?.data?.message || 'Gagal', 'error');
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-200 via-blue-100/30 to-slate-200 p-8">
      <div className="flex items-center justify-between mb-8">
        <BackButton to="/admin" className="bg-red-500 hover:bg-red-600 text-white" />
        <h1 className="text-4xl font-bold text-slate-700">Kelola UMKM</h1>
        <Link to="/admin/umkm/tambah" className="bg-blue-500/80 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-full shadow-sm hover:shadow-md transition-all duration-200">
          + UMKM
        </Link>
      </div>
      
      <div className="bg-white/90 backdrop-blur-sm border border-slate-200 shadow-sm rounded-2xl p-6">
        <table className="w-full text-left">
          <thead className="border-b border-slate-200">
            <tr className="text-lg text-slate-600">
              <th className="py-3">Nama UMKM</th>
              <th>Alamat</th>
              <th>Aksi</th>
             </tr>
          </thead>
          <tbody>
            {umkmList.map(umkm => (
              <tr key={umkm.id_umkm} className="border-b border-slate-100">
                <td className="py-3 text-slate-700">{umkm.nama_umkm}</td>
                <td className="text-slate-600">{umkm.alamat}</td>
                <td className="flex gap-3">
                  <Link to={`/admin/umkm/edit/${umkm.id_umkm}`} className="text-blue-500 hover:text-blue-700 transition-colors">
                    <i className="fa-solid fa-pen" />
                  </Link>
                  <button onClick={() => handleDelete(umkm.id_umkm)} className="text-red-400 hover:text-red-600 transition-colors">
                    <i className="fa-solid fa-trash" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {toast && (
        <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-emerald-500 text-white px-6 py-3 rounded-full shadow-lg z-50">
          {toast.message}
        </div>
      )}
    </div>
  );
};

export default KelolaUMKMPage;