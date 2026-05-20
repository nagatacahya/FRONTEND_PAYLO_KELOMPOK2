import { useState, useEffect } from 'react';
import apiClient from '../../api/client';
import { useNavigate, useParams } from 'react-router-dom';
import BackButton from '../../components/shared/BackButton';
import { useToast } from '../../hooks/useToast';

const FormUserPage = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const [form, setForm] = useState({ nama: '', email: '', no_hp: '', password: '', alamat: '' });
  const navigate = useNavigate();
  const { toast, showToast } = useToast();

  useEffect(() => {
    if (isEdit) {
      apiClient.get(`/admin/users/${id}`).then(res => {
        const user = res.data;
        setForm({ nama: user.nama, email: user.email, no_hp: user.no_hp, password: '', alamat: user.alamat || '' });
      });
    }
  }, [id, isEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await apiClient.put(`/admin/users/${id}`, form);
        showToast('User berhasil diperbarui', 'success');
      } else {
        await apiClient.post('/admin/users', form);
        showToast('User berhasil ditambahkan', 'success');
      }
      setTimeout(() => navigate('/admin/users'), 1500);
    } catch (err: any) {
      showToast(err.response?.data?.message || 'Gagal', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-200 via-blue-100/30 to-slate-200 p-8 flex flex-col items-center justify-center antialiased">
      <div className="w-full max-w-2xl">
        <div className="flex items-center justify-center mb-8">
          <h1 className="text-4xl font-bold text-slate-700">{isEdit ? 'Edit User' : 'Tambah User'}</h1>
        </div>
        
        <div className="bg-white/90 backdrop-blur-sm border border-slate-200 shadow-sm rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input 
              className="bg-white border border-slate-200 rounded-lg p-3 w-full text-slate-700 placeholder-slate-400 focus:outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100 transition-all" 
              placeholder="Nama" 
              value={form.nama} 
              onChange={e => setForm({...form, nama: e.target.value})} 
              required 
            />
            <input 
              className="bg-white border border-slate-200 rounded-lg p-3 w-full text-slate-700 placeholder-slate-400 focus:outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100 transition-all" 
              placeholder="Email" 
              type="email" 
              value={form.email} 
              onChange={e => setForm({...form, email: e.target.value})} 
              required 
            />
            <input 
              className="bg-white border border-slate-200 rounded-lg p-3 w-full text-slate-700 placeholder-slate-400 focus:outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100 transition-all" 
              placeholder="No HP" 
              value={form.no_hp} 
              onChange={e => setForm({...form, no_hp: e.target.value})} 
              required 
            />
            <input 
              className="bg-white border border-slate-200 rounded-lg p-3 w-full text-slate-700 placeholder-slate-400 focus:outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100 transition-all" 
              placeholder="Alamat" 
              value={form.alamat} 
              onChange={e => setForm({...form, alamat: e.target.value})} 
            />
            {!isEdit && (
              <input 
                className="bg-white border border-slate-200 rounded-lg p-3 w-full text-slate-700 placeholder-slate-400 focus:outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100 transition-all" 
                placeholder="Password" 
                type="password" 
                value={form.password} 
                onChange={e => setForm({...form, password: e.target.value})} 
                required 
              />
            )}
            <div className="flex gap-4 pt-4">
              <button 
                type="submit" 
                className="bg-blue-500/80 hover:bg-blue-600 active:scale-95 text-white px-8 py-3 rounded-full font-semibold shadow-sm hover:shadow-md transition-all duration-200"
              >
                Simpan
              </button>
              <button 
                type="button" 
                onClick={() => navigate('/admin/users')} 
                className="border border-slate-300 text-slate-600 bg-transparent px-8 py-3 rounded-full font-semibold transition-all duration-200 hover:border-red-400 hover:text-red-500 hover:bg-red-50 active:scale-95"
              >
                Batal
              </button>
            </div>
          </form>
        </div>
      </div>
      
      {toast && (
        <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-emerald-500 text-white px-6 py-3 rounded-full shadow-lg z-50">
          {toast.message}
        </div>
      )}
    </div>
  );
};

export default FormUserPage;