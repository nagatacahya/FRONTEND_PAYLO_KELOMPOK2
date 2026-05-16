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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-zinc-900 p-8 text-slate-100">
      <div className="flex items-center justify-between mb-8">
        <BackButton to="/admin" />
        <h1 className="text-4xl font-bold text-white">Kelola User</h1>
        <Link to="/admin/users/tambah" className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-full">+ User</Link>
      </div>
      <div className="bg-slate-950/40 border border-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-2xl">
        <table className="w-full text-left">
          <thead className="border-b">
            <tr className="text-lg">
              <th className="py-3">Nama</th>
              <th>Email</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id_user} className="border-b">
                <td className="py-3">{user.nama}</td>
                <td>{user.email}</td>
                <td className="flex gap-2 items-center py-4 px-1">
                  <Link to={`/admin/users/edit/${user.id_user}`} className="text-blue-500"><i className="fa-solid fa-pen" /></Link>
                  <button onClick={() => hapusUser(user.id_user)} className="text-red-500"><i className="fa-solid fa-trash" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {toast && <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-full">{toast.message}</div>}
    </div>
  );
};

export default KelolaUserPage;