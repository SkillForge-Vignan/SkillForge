import React from 'react';
import { useLocation } from 'react-router-dom';
import { Users, UserCheck, FileText, TrendingUp, Search, Plus, MessageSquare, ChevronRight, Code2 } from 'lucide-react';

const OverviewView = () => (
  <div className="space-y-6">
    
    {/* Top Stat Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {[
        { title: 'Total Students', value: '42', icon: <Users className="w-6 h-6 text-blue-400" />, color: 'from-blue-500/20' },
        { title: 'Active Students', value: '38', icon: <UserCheck className="w-6 h-6 text-emerald-400" />, color: 'from-emerald-500/20' },
        { title: 'Tasks Assigned', value: '156', icon: <FileText className="w-6 h-6 text-purple-400" />, color: 'from-purple-500/20' },
        { title: 'Avg Performance', value: '84%', icon: <TrendingUp className="w-6 h-6 text-cyan-400" />, color: 'from-cyan-500/20' }
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

        {/* Student Progress Overview Chart */}
        <div className="bg-[#1e293b]/80 border border-white/5 rounded-2xl p-6 backdrop-blur-xl shadow-xl">
           <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
             <h3 className="text-xl font-bold text-white text-center sm:text-left">Cohort Performance Overview</h3>
             <select className="bg-slate-900 border border-white/10 text-slate-300 text-sm rounded-lg px-4 py-2 outline-none focus:border-cyan-500 w-full sm:w-auto text-center">
               <option>Last 30 Days</option>
               <option>This Quarter</option>
               <option>All Time</option>
             </select>
           </div>
           
           <div className="h-64 flex items-end gap-2 sm:gap-4 justify-between border-b border-l border-white/10 p-4">
              {[45, 60, 35, 80, 55, 90, 75, 85].map((height, i) => (
                 <div key={i} className="w-full bg-slate-800 rounded-t-md relative group cursor-pointer" style={{ height: `${height}%` }}>
                   <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 to-cyan-400 opacity-80 group-hover:opacity-100 transition-opacity rounded-t-md border-t border-cyan-300"></div>
                   <span className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 text-xs font-bold text-white bg-slate-800 px-2 py-1 rounded transition-opacity">{height}%</span>
                 </div>
              ))}
           </div>
           <div className="flex justify-between text-xs text-slate-500 font-medium mt-3 px-4">
              <span>Wk 1</span><span>Wk 2</span><span>Wk 3</span><span>Wk 4</span>
           </div>
        </div>

      </div>

      {/* Right Column */}
      <div className="space-y-6">

        {/* Messages Snippet */}
        <div className="bg-[#1e293b]/80 border border-white/5 rounded-2xl p-6 backdrop-blur-xl shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-white">Recent Messages</h3>
            <button className="text-xs font-bold text-cyan-400 hover:text-cyan-300">View All</button>
          </div>
          
          <div className="space-y-4">
            {[
              { name: 'Priya Sharma', msg: 'I am stuck on the neural net config...', time: '10m ago' },
              { name: 'Alex Carter', msg: 'Submitted the portfolio link!', time: '1h ago' },
              { name: 'Emma Watson', msg: 'Can we schedule a 1:1 call?', time: '3h ago' }
            ].map((msg, i) => (
              <div key={i} className="flex gap-3 items-start group cursor-pointer hover:bg-white/5 p-2 rounded-xl transition-colors -mx-2">
                <div className="w-10 h-10 rounded-full bg-slate-700 flex-shrink-0 flex items-center justify-center font-bold text-xs text-white">
                  {msg.name.charAt(0)}
                </div>
                <div className="overflow-hidden w-full">
                  <div className="flex items-baseline justify-between gap-2 w-full">
                    <p className="text-sm font-bold text-slate-200 group-hover:text-cyan-400 truncate">{msg.name}</p>
                    <span className="text-[10px] font-medium text-slate-500 flex-shrink-0">{msg.time}</span>
                  </div>
                  <p className="text-xs text-slate-400 truncate">{msg.msg}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  </div>
);

const StudentsView = () => (
  <div className="bg-[#1e293b]/80 border border-white/5 rounded-2xl p-6 backdrop-blur-xl shadow-xl min-h-[70vh] animate-in fade-in duration-500">
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
      <h2 className="text-3xl font-black text-white">My Students Roster</h2>
      <div className="relative">
        <Search className="w-5 h-5 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
        <input type="text" placeholder="Search students..." className="bg-slate-900 border border-white/10 text-sm rounded-full pl-12 pr-4 py-3 text-white outline-none focus:border-cyan-500 w-full sm:w-72 transition-colors shadow-inner" />
      </div>
    </div>

    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse min-w-[500px]">
        <thead>
          <tr className="border-b border-white/10 text-slate-400 text-sm">
            <th className="pb-4 font-semibold pl-4">Student Identity</th>
            <th className="pb-4 font-semibold">Active Domain</th>
            <th className="pb-4 font-semibold">Tracked Progress</th>
            <th className="pb-4 font-semibold text-right pr-4">Action</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {[
            { name: 'Alex Carter', email: 'alex.c@student.com', domain: 'Web Dev', progress: 75 },
            { name: 'Priya Sharma', email: 'priya.s@student.com', domain: 'AI/ML', progress: 92 },
            { name: 'Marcus Lin', email: 'marcus.l@student.com', domain: 'App Dev', progress: 45 },
            { name: 'Emma Watson', email: 'emma.w@student.com', domain: 'Web Dev', progress: 60 },
            { name: 'Lucas Wright', email: 'lucas.w@student.com', domain: 'CyberSecurity', progress: 81 },
            { name: 'Sophia Lee', email: 'sophia.l@student.com', domain: 'AI/ML', progress: 34 }
          ].map((student, i) => (
            <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
              <td className="py-4 pl-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center font-bold text-white shadow-lg text-sm flex-shrink-0">
                    {student.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-white text-base">{student.name}</p>
                    <p className="text-xs text-slate-500 block">{student.email}</p>
                  </div>
                </div>
              </td>
              <td className="py-4 text-slate-300">
                <span className="px-3 py-1.5 rounded-md bg-slate-800 text-xs font-bold border border-white/5">{student.domain}</span>
              </td>
              <td className="py-4 w-40">
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2.5 bg-slate-800 rounded-full overflow-hidden border border-white/5">
                    <div className={`h-full rounded-full ${student.progress > 80 ? 'bg-emerald-400 drop-shadow-[0_0_5px_rgba(52,211,153,0.8)]' : student.progress > 50 ? 'bg-blue-400 drop-shadow-[0_0_5px_rgba(96,165,250,0.8)]' : 'bg-amber-400'}`} style={{ width: `${student.progress}%` }}></div>
                  </div>
                  <span className="text-xs font-black text-slate-200">{student.progress}%</span>
                </div>
              </td>
              <td className="py-4 text-right pr-4">
                <button className="p-2.5 bg-slate-800 text-cyan-400 rounded-xl hover:bg-cyan-500 hover:text-slate-900 transition-all shadow-md">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const AssignTasksView = () => (
  <div className="max-w-2xl mx-auto">
    <div className="bg-gradient-to-br from-purple-900/30 to-[#1e293b] border border-purple-500/20 rounded-[2rem] p-8 md:p-12 backdrop-blur-xl shadow-2xl animate-in slide-in-from-top-8 duration-500">
      <h2 className="text-3xl font-black text-white mb-8 flex items-center gap-3 border-b border-white/10 pb-6">
        <Plus className="w-8 h-8 text-purple-400" /> Dispatch New Task
      </h2>
      
      <form className="space-y-6" onSubmit={e => e.preventDefault()}>
        <div>
          <label className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-2 block">Task Title</label>
          <input type="text" className="w-full bg-slate-900 border border-white/10 rounded-xl px-5 py-3.5 text-white text-base outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all" placeholder="e.g. Deploy React Application to Vercel" />
        </div>

        <div>
          <label className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-2 block">Detailed Description</label>
          <textarea rows="4" className="w-full bg-slate-900 border border-white/10 rounded-xl px-5 py-3.5 text-white text-base outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all resize-none" placeholder="Provide precise instructions here..."></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-2 block">Assign To Directory</label>
            <select className="w-full bg-slate-900 border border-white/10 rounded-xl px-5 py-3.5 text-white text-base outline-none focus:border-purple-500 transition-colors appearance-none">
              <option>All Supervised Students</option>
              <option>Web Dev Track Only</option>
              <option>Specific Individual...</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-2 block">Binding Deadline</label>
            <input type="date" className="w-full bg-slate-900 border border-white/10 rounded-xl px-5 py-3.5 text-slate-300 text-base outline-none focus:border-purple-500 transition-colors" />
          </div>
        </div>

        <button className="w-full py-4 mt-8 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-black text-lg rounded-xl transition-all shadow-[0_0_30px_rgba(168,85,247,0.4)] flex justify-center items-center gap-3">
          Dispatch Assignment Securely
        </button>
      </form>
    </div>
  </div>
);

const FallbackView = ({ title }) => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] text-center animate-in fade-in duration-500">
    <div className="relative">
       <div className="absolute inset-0 bg-blue-500/20 blur-[50px] rounded-full" />
       <div className="w-28 h-28 bg-slate-800 rounded-3xl flex items-center justify-center mb-8 border border-white/10 relative z-10 shadow-2xl">
         <Code2 className="w-12 h-12 text-slate-400" />
       </div>
    </div>
    <h2 className="text-4xl font-black text-white mb-4">{title} System</h2>
    <span className="px-4 py-1.5 text-xs font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-full mb-6 block w-fit mx-auto">Active Development Branch</span>
    <p className="text-slate-400 text-lg max-w-lg leading-relaxed">This view serves purely as a structural mockup to demonstrate routing paths seamlessly isolating dashboard modes.</p>
  </div>
);

const MentorPortal = () => {
  const location = useLocation();
  const path = location.pathname;

  const renderContent = () => {
    if (path.endsWith('/students')) return <StudentsView />;
    if (path.endsWith('/assign')) return <AssignTasksView />;
    if (path.endsWith('/progress')) return <FallbackView title="Progress Analytics" />;
    if (path.endsWith('/messages')) return <FallbackView title="Mentor Messaging Inbox" />;
    if (path.endsWith('/profile')) return <FallbackView title="Authorized Profile settings" />;
    
    return <OverviewView />;
  };

  return <div className="w-full">{renderContent()}</div>;
};

export default MentorPortal;
