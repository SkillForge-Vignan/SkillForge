import React from 'react';
import { useLocation } from 'react-router-dom';
import { Rocket, BookOpen, Trophy, Target, Clock, CheckCircle2, MessageSquare, BrainCircuit, Code2, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const OverviewView = () => (
  <div className="space-y-6">
    {/* Top Stat Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {[
        { title: 'Total Projects', value: '4', icon: <Rocket className="w-6 h-6 text-cyan-400" />, color: 'from-cyan-500/20' },
        { title: 'Skills Learned', value: '12', icon: <BookOpen className="w-6 h-6 text-purple-400" />, color: 'from-purple-500/20' },
        { title: 'Overall Progress', value: '68%', icon: <Target className="w-6 h-6 text-blue-400" />, color: 'from-blue-500/20' },
        { title: 'Leaderboard Rank', value: '#15', icon: <Trophy className="w-6 h-6 text-yellow-400" />, color: 'from-yellow-500/20' }
      ].map((stat, idx) => (
        <div key={idx} className={`bg-slate-900/50 border border-white/10 rounded-2xl p-6 bg-gradient-to-br ${stat.color} to-transparent relative overflow-hidden group hover:border-white/20 transition-all`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm font-medium mb-1">{stat.title}</p>
              <h3 className="text-3xl font-black text-white">{stat.value}</h3>
            </div>
            <div className="p-3 bg-slate-800/50 rounded-xl group-hover:scale-110 transition-transform">
              {stat.icon}
            </div>
          </div>
        </div>
      ))}
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* Left Column (Wider) */}
      <div className="lg:col-span-2 space-y-6">
        
        {/* Progress Tracker (Graph/Bar Placeholder) */}
        <div className="bg-[#1e293b]/80 border border-white/5 rounded-2xl p-6 relative overflow-hidden backdrop-blur-xl shadow-xl">
          <h3 className="text-xl font-bold text-white mb-6">Skill Level Progression</h3>
          <div className="relative pt-8 pb-4">
            <div className="flex justify-between text-xs font-bold text-slate-400 mb-2">
              <span>Beginner</span>
              <span className="text-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,0.8)]">Intermediate</span>
              <span>Advanced</span>
            </div>
            <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden border border-white/5">
              <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 w-[68%] rounded-full shadow-[0_0_15px_rgba(34,211,238,0.6)]"></div>
            </div>
            <p className="text-sm text-slate-400 mt-4">You are <span className="text-white font-bold">32%</span> away from reaching the Advanced tier in Web Development.</p>
          </div>
        </div>

        {/* Assigned Tasks */}
        <div className="bg-[#1e293b]/80 border border-white/5 rounded-2xl p-6 backdrop-blur-xl shadow-xl">
          <h3 className="text-xl font-bold text-white mb-6">Assigned Tasks</h3>
          <div className="space-y-4">
            {[
              { title: 'Build React Portfolio', deadline: 'Today, 11:59 PM', status: 'Pending', type: 'urgent' },
              { title: 'Complete Node.js API module', deadline: 'Tomorrow', status: 'Pending', type: 'normal' },
              { title: 'Figma Landing Page UI', deadline: 'Completed', status: 'Completed', type: 'done' }
            ].map((task, i) => (
              <div key={i} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-xl bg-slate-900/50 border border-white/5 hover:bg-slate-800/80 transition-colors gap-4">
                <div className="flex items-center gap-4">
                  {task.type === 'done' ? (
                    <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0" />
                  ) : (
                    <Clock className="w-6 h-6 text-blue-400 flex-shrink-0" />
                  )}
                  <div>
                    <h4 className="font-semibold text-white">{task.title}</h4>
                    <p className="text-sm text-slate-400 flex items-center gap-1">
                       Deadline: <span className={task.type === 'urgent' ? 'text-rose-400 font-bold' : ''}>{task.deadline}</span>
                    </p>
                  </div>
                </div>
                <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                  task.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                }`}>
                  {task.status}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Right Column */}
      <div className="space-y-6">
        
        {/* My Domains */}
        <div className="bg-[#1e293b]/80 border border-white/5 rounded-2xl p-6 backdrop-blur-xl shadow-xl">
          <h3 className="text-xl font-bold text-white mb-4">My Domains</h3>
          <div className="flex flex-wrap gap-2">
            <span className="px-4 py-2 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-xl text-sm font-bold flex items-center gap-2">
              <Code2 className="w-4 h-4" /> Web Dev
            </span>
            <span className="px-4 py-2 bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-xl text-sm font-bold flex items-center gap-2">
              <BrainCircuit className="w-4 h-4" /> AI/ML
            </span>
          </div>
        </div>

        {/* Mentor Section */}
        <div className="bg-gradient-to-br from-blue-900/40 to-slate-900 border border-blue-500/20 rounded-2xl p-6 backdrop-blur-xl group shadow-xl">
          <h3 className="text-xs uppercase tracking-widest text-cyan-500 font-bold mb-4">Assigned Mentor</h3>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-full bg-slate-700 flex flex-shrink-0 items-center justify-center text-xl font-bold border-2 border-cyan-500 shadow-[0_0_15px_rgba(34,211,238,0.4)] overflow-hidden">
              <img src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=2070&auto=format&fit=crop" alt="Mentor" className="w-full h-full object-cover" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white">Dr. Sarah Miller</h4>
              <p className="text-sm text-cyan-400 font-medium">Sr. Frontend Engineer</p>
            </div>
          </div>
          <button className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-xl transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(34,211,238,0.3)]">
            <MessageSquare className="w-5 h-5" /> Message Mentor
          </button>
        </div>

        {/* Recent Activity */}
        <div className="bg-[#1e293b]/80 border border-white/5 rounded-2xl p-6 backdrop-blur-xl shadow-xl">
          <h3 className="text-lg font-bold text-white mb-4">Recent Activity</h3>
          <div className="space-y-4 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-700">
            {[
              { title: 'Project Submitted', desc: 'Smart Home Hub v1', time: '2 hrs ago', dot: 'bg-emerald-400' },
              { title: 'Mentor Feedback', desc: '"Great code structure!"', time: '5 hrs ago', dot: 'bg-cyan-400' },
              { title: 'New Task Assigned', desc: 'React Hooks Intro', time: '1 day ago', dot: 'bg-amber-400' }
            ].map((act, idx) => (
              <div key={idx} className="relative pl-8">
                <div className={`absolute left-0 top-1.5 w-[22px] h-[22px] rounded-full border-4 border-[#1e293b] ${act.dot} z-10 flex items-center justify-center`} />
                <p className="text-sm font-bold text-white">{act.title}</p>
                <p className="text-xs text-slate-400 mt-0.5">{act.desc}</p>
                <span className="text-[10px] text-slate-500 block mt-1">{act.time}</span>
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </div>
  </div>
);

const ProjectsView = () => (
  <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
    <h2 className="text-3xl font-black text-white mb-8 border-b border-white/10 pb-4">My Projects Showcase</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
       {[1, 2, 3, 4, 5, 6].map((i) => (
         <div key={i} className="bg-[#1e293b]/80 border border-white/5 rounded-[2rem] p-6 backdrop-blur-xl shadow-xl hover:border-cyan-500/50 transition-all hover:-translate-y-2 cursor-pointer group">
           <div className="h-40 bg-slate-800 rounded-xl mb-6 flex items-center justify-center border border-white/5 group-hover:bg-cyan-500/10 transition-colors relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              <Rocket className="w-12 h-12 text-slate-600 group-hover:text-cyan-400 transition-colors relative z-10 group-hover:scale-125" />
           </div>
           <h3 className="text-xl font-bold text-white mb-2">Project Architecture {i}</h3>
           <p className="text-sm text-slate-400 mb-6 leading-relaxed">Comprehensive integration bridging front-end React dynamics with a robust backend AI system.</p>
           <span className="px-4 py-1.5 text-xs font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-full">Active Phase {i}</span>
         </div>
       ))}
    </div>
  </div>
);

const ProfileView = () => {
  const { profile } = useAuth();
  const displayName = profile?.name || 'Student';
  const email = profile?.email || '';
  const getInitials = (name) => {
    const parts = name.trim().split(' ');
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return parts[0].substring(0, 2).toUpperCase();
  };
  const initials = getInitials(displayName);

  return (
   <div className="max-w-4xl mx-auto space-y-6 animate-in slide-in-from-bottom-8 duration-500">
     <div className="bg-[#1e293b]/80 border border-white/5 rounded-[3rem] p-8 md:p-14 backdrop-blur-xl shadow-2xl flex flex-col md:flex-row items-center gap-8 md:gap-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px] -mr-32 -mt-32 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[100px] -ml-32 -mb-32 pointer-events-none" />
        
        <div className="w-32 h-32 md:w-48 md:h-48 bg-slate-800 rounded-full flex-shrink-0 flex items-center justify-center border-4 border-cyan-500 shadow-[0_0_40px_rgba(34,211,238,0.4)] font-black text-6xl text-white relative z-10 transition-transform hover:scale-105">
          {initials}
        </div>
        <div className="text-center md:text-left relative z-10 w-full">
           <h2 className="text-5xl font-black text-white mb-2">{displayName}</h2>
           <p className="text-sm text-slate-500 mb-2">{email}</p>
           <p className="text-xl md:text-2xl text-cyan-400 font-medium mb-8 uppercase tracking-widest">Computer Science & Engineering</p>
           <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-slate-900 border border-white/10 rounded-2xl p-4 text-center hover:bg-slate-800 transition-colors">
                 <span className="block text-3xl font-black text-white mb-1">7</span>
                 <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Domains</span>
              </div>
              <div className="bg-slate-900 border border-white/10 rounded-2xl p-4 text-center hover:bg-slate-800 transition-colors">
                 <span className="block text-3xl font-black text-white mb-1">12</span>
                 <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Projects</span>
              </div>
              <div className="bg-slate-900 border border-white/10 rounded-2xl p-4 text-center hover:bg-slate-800 transition-colors">
                 <span className="block text-3xl font-black text-emerald-400 mb-1">A+</span>
                 <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Grade</span>
              </div>
              <div className="bg-slate-900 border border-white/10 rounded-2xl p-4 text-center hover:bg-slate-800 transition-colors">
                 <span className="block text-3xl font-black text-yellow-400 mb-1">4</span>
                 <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Awards</span>
              </div>
           </div>
        </div>
     </div>
   </div>
  );
};

const FallbackView = ({ title }) => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] text-center animate-in fade-in duration-500">
    <div className="relative">
       <div className="absolute inset-0 bg-blue-500/20 blur-[50px] rounded-full" />
       <div className="w-28 h-28 bg-slate-800 rounded-3xl flex items-center justify-center mb-8 border border-white/10 relative z-10 shadow-2xl">
         <Code2 className="w-12 h-12 text-slate-400" />
       </div>
    </div>
    <h2 className="text-4xl font-black text-white mb-4">{title} Framework</h2>
    <span className="px-4 py-1.5 text-xs font-bold bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-full mb-6 block w-fit mx-auto">Development Prototype</span>
    <p className="text-slate-400 text-lg max-w-lg leading-relaxed">This specific view logic module acts as a routing placeholder. Real functional bindings will connect via the master database state natively.</p>
  </div>
);

const StudentPortal = () => {
  const location = useLocation();
  const path = location.pathname;

  const renderContent = () => {
    if (path.endsWith('/projects')) return <ProjectsView />;
    if (path.endsWith('/profile')) return <ProfileView />;
    if (path.endsWith('/domains')) return <FallbackView title="My Domains Module" />;
    if (path.endsWith('/assignments')) return <FallbackView title="Assignments Engine" />;
    if (path.endsWith('/progress')) return <FallbackView title="Analytics Tracking" />;
    if (path.endsWith('/mentor')) return <FallbackView title="Mentor Synchronization" />;
    
    return <OverviewView />;
  };

  return (
    <div className="w-full">
      {renderContent()}
    </div>
  );
};

export default StudentPortal;
