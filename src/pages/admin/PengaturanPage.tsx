import { useState, useEffect } from 'react';
import apiClient from '../../api/client';
import BackButton from '../../components/shared/BackButton';
import { useToast } from '../../hooks/useToast';

const PengaturanPage = () => {
  const [batasTransfer, setBatasTransfer] = useState(0);
  const [biayaAdmin, setBiayaAdmin] = useState(0);
  const [namaAplikasi, setNamaAplikasi] = useState('');
  const { toast, showToast } = useToast();

  useEffect(() => {
    apiClient.get('/admin/pengaturan').then(res => {
      const d = res.data;
      setBatasTransfer(d.batas_transfer);
      setBiayaAdmin(d.biaya_admin);
      setNamaAplikasi(d.nama_aplikasi);
    });
  }, []);

  const handleSave = async () => {
    try {
      await apiClient.put('/admin/pengaturan', {
        batas_transfer: batasTransfer,
        biaya_admin: biayaAdmin,
        nama_aplikasi: namaAplikasi,
      });
      showToast('Pengaturan berhasil disimpan', 'success');
    } catch (err: any) {
      showToast('Gagal menyimpan', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-200 via-blue-100/30 to-slate-200 p-8">
      <div className=" flex items-center gap-4 mb-8">
       <BackButton to="/admin" className="bg-red-500 hover:bg-red-600 text-white" />
        <h1 className="text-4xl font-bold text-slate-700">Pengaturan Sistem</h1>
      </div>
      
      <div className="bg-white/90 backdrop-blur-sm border border-slate-200 shadow-sm rounded-2xl p-8 max-w-2xl">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-600 mb-2">
              Batas Transfer (Rp)
            </label>
            <input 
              type="number" 
              className="bg-white border border-slate-200 rounded-lg p-3 w-full text-slate-700 placeholder-slate-400 focus:outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100 transition-all" 
              value={batasTransfer} 
              onChange={e => setBatasTransfer(Number(e.target.value))} 
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-slate-600 mb-2">
              Biaya Admin (Rp)
            </label>
            <input 
              type="number" 
              className="bg-white border border-slate-200 rounded-lg p-3 w-full text-slate-700 placeholder-slate-400 focus:outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100 transition-all" 
              value={biayaAdmin} 
              onChange={e => setBiayaAdmin(Number(e.target.value))} 
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-slate-600 mb-2">
              Nama Aplikasi
            </label>
            <input 
              type="text" 
              className="bg-white border border-slate-200 rounded-lg p-3 w-full text-slate-700 placeholder-slate-400 focus:outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100 transition-all" 
              value={namaAplikasi} 
              onChange={e => setNamaAplikasi(e.target.value)} 
            />
          </div>
          
          <button 
            onClick={handleSave} 
            className="bg-blue-500/80 hover:bg-blue-600 active:scale-95 text-white px-8 py-3 rounded-full font-semibold shadow-sm hover:shadow-md transition-all duration-200"
          >
            Simpan
          </button>
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

export default PengaturanPage;