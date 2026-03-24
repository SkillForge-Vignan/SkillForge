import React from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, Rocket, Trophy, Activity, Users, Star, Award, CheckCircle2, Code2, Target } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white pt-24 pb-20 relative overflow-hidden selection:bg-cyan-500/30">
      
      {/* Dynamic Backgrounds */}
      <div className="absolute top-0 right-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[40%] left-[-10%] w-[30%] h-[30%] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-4xl mx-auto mb-20 relative pt-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-3xl rotate-12 flex items-center justify-center shadow-[0_0_30px_rgba(34,211,238,0.4)]"
          >
            <BrainCircuit className="w-12 h-12 text-white -rotate-12" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-7xl font-black mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyan-400"
          >
            The Story of SkillForge
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl text-slate-400 font-medium tracking-wide mb-8"
          >
             Established by the elite <span className="text-cyan-400 font-bold border-b border-cyan-400/30 pb-1">Data Science Section</span>
          </motion.p>
        </div>

         {/* Genesis Core Section */}
        <section className="mb-24">
          <div className="bg-[#1e293b]/60 backdrop-blur-xl border border-white/10 rounded-[3rem] p-8 md:p-12 lg:p-16 flex flex-col lg:flex-row gap-12 items-center group hover:border-cyan-500/30 transition-all shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] -mr-32 -mt-32 transition-transform duration-700 group-hover:scale-150" />
            <div className="lg:w-1/2 space-y-6 relative z-10">
              <div className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 text-cyan-400 font-bold text-sm border border-cyan-500/20 uppercase tracking-widest">
                Our Origins
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">What is SkillForge?</h2>
              <p className="text-lg text-slate-300 leading-relaxed">
                SkillForge is a new tech club created to help students go beyond classroom theory. We know that traditional classes don't always give you the hands-on experience needed for real-world engineering jobs.
              </p>
              <p className="text-lg text-slate-300 leading-relaxed font-medium">
                Started by the <span className="text-cyan-400 font-bold">Data Science Section</span>, our goal is to build a community where students can actually write code, launch full websites, and create smart systems that people will really use, while getting guidance from like-minded individuals who have been doing it.
              </p>
            </div>
            <div className="lg:w-1/2 grid grid-cols-2 gap-4 relative z-10 w-full">
              {[
                { label: 'Founded', val: '2026', desc: 'By Data Science Sec.', icon: <Award className="w-6 h-6 text-yellow-400" /> },
                { label: 'Active Mentors', val: '30+', desc: '', icon: <Users className="w-6 h-6 text-blue-400" /> },
                { label: 'Domains', val: '12', desc: 'Modern Stacks', icon: <Code2 className="w-6 h-6 text-purple-400" /> },
                { label: 'Freelancing Skills', val: '', desc: 'Can learn from those who have been doing it', icon: <CheckCircle2 className="w-6 h-6 text-emerald-400" /> }
              ].map((b, i) => (
                <div key={i} className="bg-slate-900/50 border border-white/5 p-6 rounded-3xl hover:bg-slate-800 transition-colors flex flex-col items-center text-center">
                   <div className="mb-4">{b.icon}</div>
                   <h4 className="text-3xl font-black text-white mb-1">{b.val}</h4>
                   <span className="text-sm font-bold text-cyan-400 block mb-1">{b.label}</span>
                   <span className="text-xs text-slate-500 font-medium">{b.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default About;
