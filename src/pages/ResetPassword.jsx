import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, ShieldCheck, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const { error: updateError } = await supabase.auth.updateUser({
        password: password
      });

      if (updateError) throw updateError;
      
      setMessage("Password updated safely! Redirecting you to login...");
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 px-4 flex flex-col items-center justify-center bg-[#0f172a] relative overflow-hidden text-white w-full">
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md relative z-10 my-8">
        
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-400/20 to-cyan-600/20 border border-emerald-400/30 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(52,211,153,0.2)]">
            <Lock className="w-8 h-8 text-emerald-400" />
          </div>
          <h1 className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">Secure Account</h1>
          <p className="text-slate-400 mt-2 text-sm font-medium">Create a strong, new password</p>
        </div>

        <div className="bg-[#1e293b]/80 border border-white/5 backdrop-blur-xl shadow-2xl rounded-[2rem] p-8">
          
          <form className="space-y-4 relative z-10" onSubmit={handleUpdate}>
            {error && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm font-medium rounded-xl text-center">
                {error}
              </motion.div>
            )}
            
            {message && !error && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium rounded-xl text-center">
                {message}
              </motion.div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">New Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
                <input required minLength={6} type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full bg-slate-900 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors" />
              </div>
            </div>

            <button disabled={loading} type="submit" className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:opacity-90 text-slate-900 font-bold py-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 mt-8 disabled:opacity-70 group">
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Confirm New Password'}
              {!loading && <ShieldCheck className="w-5 h-5" />}
            </button>
          </form>

        </div>
      </motion.div>
    </div>
  );
};

export default ResetPassword;
