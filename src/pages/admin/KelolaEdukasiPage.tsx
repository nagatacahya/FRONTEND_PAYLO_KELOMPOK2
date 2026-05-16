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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-zinc-900 p-8 text-slate-100">
      <div className="flex items-center justify-between mb-8">
        <BackButton to="/admin" />
        <h1 className="text-4xl font-bold text-white">Kelola Edukasi</h1>
        <Link to="/admin/edukasi/tambah" className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-full">+ Edukasi</Link>
      </div>
      <div className="bg-slate-950/40 border border-white/10 backdrop-blur-xl  p-6 shadow-2xl rounded-2xl">
        <table className="w-full text-left">
          <thead className="border-b">
            <tr className="text-lg">
              <th className="py-3">Judul</th>
              <th>Tanggal</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {list.map(item => (
              <tr key={item.id_edukasi} className="border-b">
                <td className="py-3">{item.judul}</td>
                <td>{new Date(item.tanggal_dibuat).toLocaleDateString()}</td>
                <td className="flex gap-3">
                  <Link to={`/admin/edukasi/edit/${item.id_edukasi}`} className="text-blue-500"><i className="fa-solid fa-pen" /></Link>
                  <button onClick={() => handleDelete(item.id_edukasi)} className="text-red-500"><i className="fa-solid fa-trash" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {toast && (
        <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-full">
          {toast.message}
        </div>
      )}
    </div>
  );
};

export default KelolaEdukasiPage;