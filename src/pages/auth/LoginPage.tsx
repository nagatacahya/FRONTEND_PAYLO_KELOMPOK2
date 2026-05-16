import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError('');

  // Validasi format email
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    setError('Format email tidak valid. Contoh: nama@gmail.com');
    return;
  }

  try {
    const user = await login(email, password);
    navigate(user.role === 'super_admin' ? '/admin' : '/user');
  } catch (err: any) {
    setError(err.response?.data?.message || 'Gagal login');
  }
};

  return (
    <div className="min-h-screen flex flex-col bg-white">
      
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <h1 className="text-3xl font-bold mb-8">PAYLO</h1>
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
          <input type="email" placeholder="Email" className="border border-gray-300 rounded-lg p-3 w-full" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <div className="relative">
            <input type={show ? 'text' : 'password'} placeholder="Password" className="border border-gray-300 rounded-lg p-3 w-full" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <i className={`fa-solid ${show ? 'fa-eye' : 'fa-eye-slash'} absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer`} onClick={() => setShow(!show)} />
          </div>
          <button type="submit" className="w-full bg-[#08F] text-white py-3 rounded-lg font-semibold">Masuk</button>
        </form>
        <div className="mt-6 text-center text-sm w-full max-w-sm">
          <span className="text-gray-600">Apakah anda belum punya akun? </span>
          <Link to="/register" className="text-[#08F] font-bold">Sign in</Link>
        </div>
        <p className="mt-4 text-xs text-gray-400 text-center max-w-sm">By clicking continue, you agree to our Terms of Service and Privacy Policy</p>
        <Link to="/forgot-password" className="text-sm text-[#08F] mt-4">Lupa Password?</Link>
      </div>
      <div className="h-8 bg-gray-100 flex items-end justify-center pb-1">
        <div className="w-1/3 h-1 bg-black rounded-full" />
      </div>
    </div>
  );
};

export default LoginPage;