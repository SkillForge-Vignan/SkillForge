import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserPlus, Mail, Lock, User, KeyRound, Loader2, ArrowRight, Github } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const navigate = useNavigate();
  const { user, profile } = useAuth();

  useEffect(() => {
    if (user && profile) {
      if (profile.role === 'admin') navigate('/admin-portal');
      else if (profile.role === 'mentor') navigate('/mentor-portal');
      else navigate('/student-portal');
    }
  }, [user, profile, navigate]);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      if (!otpSent) {
        const { data, error: signupError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { name, role }
          }
        });
        
        if (signupError) throw signupError;
        setOtpSent(true);
        setMessage("Account created! Check your email for the 6-digit verification code.");
      } else {
        const { error: verifyError } = await supabase.auth.verifyOtp({
          email,
          token: otp,
          type: 'signup'
        });
        
        if (verifyError) throw verifyError;
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthSignup = async (provider) => {
    setError(null);
    try {
      // Note: role isn't passed here directly in OAuth easily without custom metadata logic on initial redirect
      const { error } = await supabase.auth.signInWithOAuth({ provider });
      if (error) throw error;
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen pt-20 px-4 flex flex-col items-center justify-center bg-[#0f172a] relative overflow-hidden text-white w-full">
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md relative z-10 my-8">
        
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-cyan-400/20 to-blue-600/20 border border-cyan-400/30 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(34,211,238,0.2)]">
            <UserPlus className="w-8 h-8 text-cyan-400" />
          </div>
          <h1 className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">Create Account</h1>
          <p className="text-slate-400 mt-2 text-sm font-medium">Join Skill Forge and start building</p>
        </div>

        <div className="bg-[#1e293b]/80 border border-white/5 backdrop-blur-xl shadow-2xl rounded-[2rem] p-8">
          <form onSubmit={handleSignup} className="space-y-4">
            
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

            <AnimatePresence mode="wait">
              {!otpSent ? (
                <motion.div key="details" exit={{ opacity: 0, height: 0 }} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
                      <input required type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Arjun Reddy" className="w-full bg-slate-900 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white text-sm focus:outline-none focus:border-cyan-500 transition-colors" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
                      <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="arjun@example.com" className="w-full bg-slate-900 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white text-sm focus:outline-none focus:border-cyan-500 transition-colors" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
                      <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" minLength={6} className="w-full bg-slate-900 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white text-sm focus:outline-none focus:border-cyan-500 transition-colors" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Join As</label>
                    <div className="relative">
                      <select required value={role} onChange={(e) => setRole(e.target.value)} className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-cyan-500 transition-colors appearance-none cursor-pointer font-medium">
                        <option value="student">Student — I want to learn and build</option>
                        <option value="mentor">Mentor — I want to guide and teach</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-slate-500">
                        <ArrowRight className="h-4 w-4 rotate-90" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div key="otp" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-1 text-center">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Security Code (OTP)</label>
                  <p className="text-xs text-slate-500 mb-4">Check {email} for verification code.</p>
                  <div className="relative">
                    <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
                    <input required type="text" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="123456" className="w-full bg-slate-900 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-cyan-400 text-lg tracking-[0.5em] font-black focus:outline-none focus:border-cyan-500 transition-colors text-center" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <button disabled={loading} type="submit" className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:opacity-90 text-slate-950 font-bold py-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 mt-8 disabled:opacity-70 group">
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : otpSent ? 'Verify Account' : 'Create Account'}
              {!loading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>

          {!otpSent && (
            <>
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
                <div className="relative flex justify-center text-xs"><span className="bg-[#1e293b] px-4 text-slate-500 font-bold uppercase tracking-wider">Or sign up with</span></div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button onClick={() => handleOAuthSignup('github')} className="w-full bg-slate-800 hover:bg-slate-700 border border-white/10 text-white font-bold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 text-sm">
                  <Github className="w-4 h-4" /> GitHub
                </button>
                <button onClick={() => handleOAuthSignup('google')} className="w-full bg-slate-800 hover:bg-slate-700 border border-white/10 text-white font-bold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 text-sm">
                  <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                  Google
                </button>
              </div>
            </>
          )}

          <p className="mt-8 text-center text-sm font-medium text-slate-400">
            Already have an account? <Link to="/login" className="text-cyan-400 hover:text-cyan-300 ml-1">Log in</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
