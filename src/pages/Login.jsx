import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, Github, KeyRound, Loader2, ArrowRight } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [authMode, setAuthMode] = useState('password'); // 'password' | 'otp'
  const [otpSent, setOtpSent] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();
  const { profile, user } = useAuth();

  useEffect(() => {
    if (user && profile) {
      if (profile.role === 'admin') navigate('/admin-portal');
      else if (profile.role === 'mentor') navigate('/mentor-portal');
      else navigate('/student-portal');
    }
  }, [user, profile, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (authMode === 'password') {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else {
        if (!otpSent) {
          const { error } = await supabase.auth.signInWithOtp({ email });
          if (error) throw error;
          setOtpSent(true);
        } else {
          const { error } = await supabase.auth.verifyOtp({ email, token: otp, type: 'magiclink' });
          if (error) throw error;
        }
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthLogin = async (provider) => {
    setError(null);
    try {
      const { error } = await supabase.auth.signInWithOAuth({ provider });
      if (error) throw error;
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen pt-20 px-4 flex flex-col items-center justify-center bg-[#0f172a] relative overflow-hidden text-white w-full">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md relative z-10">
        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">Welcome Back</h1>
          <p className="text-slate-400 mt-2 text-sm font-medium">Log in to your Skill Forge account</p>
        </div>

        <div className="bg-[#1e293b]/80 border border-white/5 backdrop-blur-xl shadow-2xl rounded-[2rem] p-8">
          <div className="flex bg-slate-900/50 rounded-xl p-1 border border-white/5 mb-6">
            <button type="button" onClick={() => { setAuthMode('password'); setOtpSent(false); setError(null); }} className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${authMode === 'password' ? 'bg-slate-800 text-white shadow-md' : 'text-slate-500 hover:text-white'}`}>Password Log In</button>
            <button type="button" onClick={() => { setAuthMode('otp'); setError(null); }} className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${authMode === 'otp' ? 'bg-slate-800 text-white shadow-md' : 'text-slate-500 hover:text-white'}`}>Magic Link / OTP</button>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm font-medium rounded-xl text-center">
                {error}
              </motion.div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
                <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={otpSent} placeholder="you@example.com" className="w-full bg-slate-900 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white text-sm focus:outline-none focus:border-cyan-500 transition-colors disabled:opacity-50" />
              </div>
            </div>

            <AnimatePresence mode="wait">
              {authMode === 'password' ? (
                <motion.div key="pass" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="space-y-1 overflow-hidden">
                  <div className="flex justify-between items-center text-xs ml-1">
                    <label className="font-bold text-slate-400 uppercase tracking-wider">Password</label>
                    <Link to="/forgot-password" className="font-bold text-cyan-400 hover:text-cyan-300">Forgot?</Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
                    <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full bg-slate-900 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white text-sm focus:outline-none focus:border-cyan-500 transition-colors" />
                  </div>
                </motion.div>
              ) : otpSent ? (
                <motion.div key="otp" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="space-y-1 overflow-hidden">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Security Code (OTP)</label>
                  <div className="relative">
                    <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
                    <input required type="text" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="123456" className="w-full bg-slate-900 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white text-sm font-bold tracking-widest focus:outline-none focus:border-cyan-500 transition-colors" />
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>

            <button disabled={loading} type="submit" className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-3.5 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 mt-6 disabled:opacity-70">
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : authMode === 'otp' && !otpSent ? 'Send OTP' : 'Sign In'}
              {!loading && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
            <div className="relative flex justify-center text-xs"><span className="bg-[#1e293b] px-4 text-slate-500 font-bold uppercase tracking-wider">Or continue with</span></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button onClick={() => handleOAuthLogin('github')} className="w-full bg-slate-800 hover:bg-slate-700 border border-white/10 text-white font-bold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 text-sm">
              <Github className="w-4 h-4" /> GitHub
            </button>
            <button onClick={() => handleOAuthLogin('google')} className="w-full bg-slate-800 hover:bg-slate-700 border border-white/10 text-white font-bold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 text-sm">
              <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              Google
            </button>
          </div>

          <p className="mt-8 text-center text-sm font-medium text-slate-400">
            Don't have an account? <Link to="/signup" className="text-cyan-400 hover:text-cyan-300 ml-1">Sign up</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
