import { useState, useEffect } from 'react';
import apiClient from '../../api/client';
import { useNavigate, useParams } from 'react-router-dom';
import BackButton from '../../components/shared/BackButton';
import { useToast } from '../../hooks/useToast';

const FormEdukasiPage = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const [judul, setJudul] = useState('');
  const [isi, setIsi] = useState('');
  const navigate = useNavigate();
  const { toast, showToast } = useToast();

  useEffect(() => {
    if (isEdit) {
      apiClient.get(`/edukasi/${id}`)
        .then(res => {
          setJudul(res.data.judul);
          setIsi(res.data.isi_edukasi);
        })
        .catch(console.error);
    }
  }, [id, isEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { judul, isi_edukasi: isi };
    try {
      if (isEdit) {
        await apiClient.put(`/admin/edukasi/${id}`, payload);
        showToast('Edukasi berhasil diperbarui');
      } else {
        await apiClient.post('/admin/edukasi', payload);
        showToast('Edukasi berhasil ditambahkan');
      }
      setTimeout(() => navigate('/admin/edukasi'), 1500);
    } catch (err: any) {
      showToast(err.response?.data?.message || 'Gagal', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-200 via-blue-100/30 to-slate-200 p-8 flex flex-col items-center justify-center antialiased">
      <div className="w-full max-w-2xl">
        <div className="relative flex items-center justify-center mb-8">
          <h1 className="text-4xl font-bold text-slate-700">{isEdit ? 'Edit Edukasi' : 'Tambah Edukasi'}</h1>
        </div>
        
        <div className="bg-white/90 backdrop-blur-sm border border-slate-200 shadow-sm rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              className="bg-white border border-slate-200 rounded-lg p-3 w-full text-slate-700 placeholder-slate-400 focus:outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100 transition-all"
              placeholder="Judul"
              value={judul}
              onChange={e => setJudul(e.target.value)}
              required
            />
            <textarea
              className="bg-white border border-slate-200 rounded-lg p-3 w-full text-slate-700 placeholder-slate-400 focus:outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100 transition-all"
              placeholder="Isi Edukasi"
              rows={8}
              value={isi}
              onChange={e => setIsi(e.target.value)}
              required
            />
            <div className="flex gap-4 pt-4">
              <button 
                type="submit" 
                className="bg-blue-500/80 hover:bg-blue-600 active:scale-95 text-white px-8 py-3 rounded-full font-semibold shadow-sm hover:shadow-md transition-all duration-200"
              >
                Simpan
              </button>
              <button 
                type="button" 
                onClick={() => navigate('/admin/edukasi')} 
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

export default FormEdukasiPage;