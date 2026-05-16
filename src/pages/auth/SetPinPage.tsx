import { useState } from 'react';
import apiClient from '../../api/client';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const SetPinPage = () => {
  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false); // State untuk toggle mata
  const [error, setError] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await apiClient.post('/set-pin', { pin });
      navigate(user?.role === 'super_admin' ? '/admin' : '/user');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Gagal');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6">
      <h2 className="text-xl font-bold mb-4">Buat PIN Baru</h2>
      {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
        <div className="relative">
          <input
            type={showPin ? 'text' : 'password'}
            placeholder="PIN (6 digit)"
            maxLength={6}
            className="border rounded-lg p-3 w-full"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            required
            autoComplete="off"
          />
          <i
            className={`fa-solid ${showPin ? 'fa-eye' : 'fa-eye-slash'} absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer`}
            onClick={() => setShowPin(!showPin)}
          />
        </div>
        <button type="submit" className="w-full bg-[#08F] text-white py-3 rounded-lg">Simpan PIN</button>
      </form>
    </div>
  );
};

export default SetPinPage;