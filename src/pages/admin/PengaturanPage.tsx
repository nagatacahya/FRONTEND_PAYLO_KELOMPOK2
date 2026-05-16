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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-zinc-900 p-8 text-slate-100">
      <div className="flex items-center gap-4 mb-8">
        <BackButton to="/admin" />
        <h1 className="text-4xl font-bold text-white">Pengaturan Sistem</h1>
      </div>
      <div className="bg-slate-950/40 border border-white/10 backdrop-blur-xl  p-6 shadow-2xl rounded-2xl p-8 max-w-2xl">
        <div>
          <label className="block text-sm font-semibold">Batas Transfer (Rp)</label>
          <input type="number" className="bg-slate-900/60 border border-white/10 rounded-lg p-3 w-full text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" value={batasTransfer} onChange={e => setBatasTransfer(Number(e.target.value))} />
        </div>
        <div>
          <label className="block text-sm font-semibold">Biaya Admin (Rp)</label>
          <input type="number" className="bg-slate-900/60 border border-white/10 rounded-lg p-3 w-full text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" value={biayaAdmin} onChange={e => setBiayaAdmin(Number(e.target.value))} />
        </div>
        <div>
          <label className="block text-sm font-semibold">Nama Aplikasi</label>
          <input type="text" className="bg-slate-900/60 border border-white/10 rounded-lg p-3 w-full text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" value={namaAplikasi} onChange={e => setNamaAplikasi(e.target.value)} />
        </div>
        <button onClick={handleSave} className="bg-[#08F] hover:bg-blue-600 active:scale-95 text-white px-8 py-3 rounded-full font-semibold shadow-lg shadow-blue-500/20 transition-all duration-200">
          Simpan
        </button>
      </div>
      {toast && <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-full">{toast.message}</div>}
    </div>
  );
};

export default PengaturanPage;