import { useEffect, useState } from 'react';
import apiClient from '../../api/client';
import { Link } from 'react-router-dom';
import BackButton from '../../components/shared/BackButton';
import LoadingSpinner from '../../components/shared/LoadingSpinner';
import { useToast } from '../../hooks/useToast';

interface UserItem {
  id_user: number;
  nama: string;
  email: string;
  no_hp: string;
  status: string;
}

const KelolaUserPage = () => {
  const [users, setUsers] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast, showToast } = useToast();

  const fetchUsers = () => {
    apiClient.get('/admin/users').then(res => { setUsers(res.data.data); setLoading(false); });
  };

  useEffect(() => { fetchUsers(); }, []);

  const hapusUser = async (id: number) => {
    if (!window.confirm('Yakin hapus user ini?')) return;
    try {
      await apiClient.delete(`/admin/users/${id}`);
      showToast('User berhasil dihapus', 'success');
      fetchUsers();
    } catch (err: any) {
      showToast('Gagal menghapus', 'error');
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-200 via-blue-100/30 to-slate-200 p-8">
      <div className="flex items-center justify-between mb-8">
        <BackButton to="/admin" className="bg-red-500 hover:bg-red-600 text-white" />
        <h1 className="text-4xl font-bold text-slate-700">Kelola User</h1>
        <Link to="/admin/users/tambah" className="bg-blue-500/80 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-full shadow-sm hover:shadow-md transition-all duration-200">
          + User
        </Link>
      </div>
      
      <div className="bg-white/90 backdrop-blur-sm border border-slate-200 shadow-sm rounded-2xl p-6">
        <table className="w-full text-left">
          <thead className="border-b border-slate-200">
            <tr className="text-lg text-slate-600">
              <th className="py-3">Nama</th>
              <th>Email</th>
              <th>Aksi</th>
             </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id_user} className="border-b border-slate-100">
                <td className="py-3 text-slate-700">{user.nama}</td>
                <td className="text-slate-600">{user.email}</td>
                <td className="flex gap-3 items-center py-4 px-1">
                  <Link to={`/admin/users/edit/${user.id_user}`} className="text-blue-500 hover:text-blue-700 transition-colors">
                    <i className="fa-solid fa-pen" />
                  </Link>
                  <button onClick={() => hapusUser(user.id_user)} className="text-red-400 hover:text-red-600 transition-colors">
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

export default KelolaUserPage;