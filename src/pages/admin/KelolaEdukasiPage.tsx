import { useEffect, useState } from 'react';
import apiClient from '../../api/client';
import { Link } from 'react-router-dom';
import BackButton from '../../components/shared/BackButton';
import LoadingSpinner from '../../components/shared/LoadingSpinner';
import { useToast } from '../../hooks/useToast';

interface EdukasiItem {
  id_edukasi: number;
  judul: string;
  tanggal_dibuat: string;
}

const KelolaEdukasiPage = () => {
  const [list, setList] = useState<EdukasiItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast, showToast } = useToast();

  const fetchData = () => {
    setLoading(true);
    apiClient.get('/edukasi')
      .then(res => setList(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchData(); }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm('Hapus edukasi ini?')) return;
    try {
      await apiClient.delete(`/admin/edukasi/${id}`);
      showToast('Edukasi berhasil dihapus');
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
        <h1 className="text-4xl font-bold text-slate-700">Kelola Edukasi</h1>
        <Link to="/admin/edukasi/tambah" className="bg-blue-500/80 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-full shadow-sm hover:shadow-md transition-all duration-200">
          + Edukasi
        </Link>
      </div>
      
      <div className="bg-white/90 backdrop-blur-sm border border-slate-200 shadow-sm rounded-2xl p-6">
        <table className="w-full text-left">
          <thead className="border-b border-slate-200">
            <tr className="text-lg text-slate-600">
              <th className="py-3">Judul</th>
              <th>Tanggal</th>
              <th>Aksi</th>
             </tr>
          </thead>
          <tbody>
            {list.map(item => (
              <tr key={item.id_edukasi} className="border-b border-slate-100">
                <td className="py-3 text-slate-700">{item.judul}</td>
                <td className="text-slate-600">{new Date(item.tanggal_dibuat).toLocaleDateString()}</td>
                <td className="flex gap-3">
                  <Link to={`/admin/edukasi/edit/${item.id_edukasi}`} className="text-blue-500 hover:text-blue-700 transition-colors">
                    <i className="fa-solid fa-pen" />
                  </Link>
                  <button onClick={() => handleDelete(item.id_edukasi)} className="text-red-400 hover:text-red-600 transition-colors">
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

export default KelolaEdukasiPage;