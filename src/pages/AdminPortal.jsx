import React, { useEffect, useState, useCallback } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Users, BrainCircuit, Code2, Rocket, CalendarCheck, LineChart, Settings, Plus, Search, Edit2, Trash2, ChevronRight, FileText, Globe, BarChart3, Loader2 } from 'lucide-react';

const API = 'http://localhost:5000/api/admin';

// ─── Reusable Fetch Hook ─────────────────────────────────
const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const refetch = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(url);
      const json = await res.json();
      setData(json);
    } catch (e) {
      console.error('Fetch error:', e);
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => { refetch(); }, [refetch]);
  return { data, loading, refetch };
};

// ─── Loading Spinner ─────────────────────────────────────
const Spinner = () => (
  <div className="flex items-center justify-center py-20">
    <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
  </div>
);

// ─── OVERVIEW ────────────────────────────────────────────
const OverviewContent = ({ stats, growth, onTabChange }) => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in zoom-in-95 duration-500">
    <div className="lg:col-span-2 space-y-6">
      {/* Growth Chart */}
      <div className="bg-[#1e293b]/80 border border-white/5 rounded-2xl p-6 backdrop-blur-xl shadow-xl">
        <div className="flex items-center justify-between mb-6 gap-4">
          <h3 className="text-xl font-bold text-white">Platform Growth</h3>
          <span className="text-sm font-bold text-cyan-400">{growth ? `${growth.reduce((a,b)=>a+b.count,0)} total signups` : ''}</span>
        </div>
        <div className="h-64 flex items-end gap-2 sm:gap-3 justify-between border-b border-l border-white/10 p-4 opacity-80">
          {growth ? growth.map((m, i) => {
            const maxVal = Math.max(...growth.map(g=>g.count), 1);
            const heightPct = (m.count / maxVal) * 100;
            return (
              <div key={i} className="w-full bg-gradient-to-t from-blue-600/50 to-cyan-400/50 rounded-t-md relative group cursor-pointer border-t border-cyan-400/50" style={{ height: `${Math.max(heightPct, 4)}%` }}>
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 text-xs font-bold text-white bg-slate-800 px-2 py-1 rounded transition-opacity whitespace-nowrap">+{m.count}</span>
              </div>
            );
          }) : Array(12).fill(0).map((_, i) => (
            <div key={i} className="w-full bg-slate-800 rounded-t-md animate-pulse" style={{ height: '20%' }} />
          ))}
        </div>
        {growth && (
          <div className="flex justify-between text-[10px] text-slate-500 font-medium mt-3 px-2 overflow-x-auto">
            {growth.map((m, i) => <span key={i} className="truncate">{m.month.split(' ')[0]}</span>)}
          </div>
        )}
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div onClick={() => onTabChange('events')} className="bg-[#1e293b]/80 border border-white/5 rounded-2xl p-6 backdrop-blur-xl shadow-xl hover:border-blue-500/30 transition-colors group cursor-pointer relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-[50px] -mr-10 -mt-10 group-hover:bg-blue-500/20 transition-colors" />
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4 border border-blue-500/20 group-hover:bg-blue-500/20 transition-colors relative z-10">
            <CalendarCheck className="w-6 h-6 text-blue-400" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2 relative z-10">Events Management</h3>
          <p className="text-sm text-slate-400 mb-4 relative z-10">Create hackathons, manage registrations, and track attendance.</p>
          <div className="text-sm font-bold text-blue-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform relative z-10">Manage Events <ChevronRight className="w-4 h-4" /></div>
        </div>
        <div onClick={() => onTabChange('domains')} className="bg-[#1e293b]/80 border border-white/5 rounded-2xl p-6 backdrop-blur-xl shadow-xl hover:border-purple-500/30 transition-colors group cursor-pointer relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-[50px] -mr-10 -mt-10 group-hover:bg-purple-500/20 transition-colors" />
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-4 border border-purple-500/20 group-hover:bg-purple-500/20 transition-colors relative z-10">
            <Code2 className="w-6 h-6 text-purple-400" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2 relative z-10">Domains Setup</h3>
          <p className="text-sm text-slate-400 mb-4 relative z-10">Add new domains, assign mentors, and structure curriculum.</p>
          <div className="text-sm font-bold text-purple-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform relative z-10">Manage Domains <ChevronRight className="w-4 h-4" /></div>
        </div>
      </div>
    </div>

    {/* Right Column */}
    <div className="space-y-6">
      <div className="bg-[#1e293b]/80 border border-white/5 rounded-2xl p-6 backdrop-blur-xl shadow-xl">
        <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
        <div className="space-y-3">
          <button onClick={() => onTabChange('students')} className="w-full py-3 bg-slate-900 border border-white/10 hover:border-cyan-500/50 hover:bg-slate-800 text-white font-bold rounded-xl transition-all flex items-center justify-start px-4 gap-3">
            <div className="p-1 bg-cyan-500/20 rounded text-cyan-400"><Plus className="w-4 h-4" /></div> Add New Student
          </button>
          <button onClick={() => onTabChange('mentors')} className="w-full py-3 bg-slate-900 border border-white/10 hover:border-purple-500/50 hover:bg-slate-800 text-white font-bold rounded-xl transition-all flex items-center justify-start px-4 gap-3">
            <div className="p-1 bg-purple-500/20 rounded text-purple-400"><Plus className="w-4 h-4" /></div> Add New Mentor
          </button>
          <button onClick={() => onTabChange('projects')} className="w-full py-3 bg-slate-900 border border-white/10 hover:border-blue-500/50 hover:bg-slate-800 text-white font-bold rounded-xl transition-all flex items-center justify-start px-4 gap-3">
            <div className="p-1 bg-blue-500/20 rounded text-blue-400"><Plus className="w-4 h-4" /></div> Launch Project
          </button>
        </div>
      </div>
      <div className="bg-gradient-to-br from-rose-900/20 to-slate-900 border border-rose-500/20 rounded-2xl p-6 backdrop-blur-xl shadow-xl group">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-rose-500/10 rounded-lg border border-rose-500/20"><Settings className="w-5 h-5 text-rose-400" /></div>
          <h3 className="text-lg font-bold text-white">System Settings</h3>
        </div>
        <p className="text-sm text-slate-400 mb-6">Manage global portal access, API keys, and admin credentials.</p>
        <Link to="/admin-portal/settings" className="w-full py-2.5 bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white font-bold rounded-xl transition-all border border-rose-500/30 text-sm flex justify-center">Open Access Control</Link>
      </div>
    </div>
  </div>
);

// ─── MEMBERS TABLE (Students / Mentors) ──────────────────
const MembersView = ({ role, onRefresh }) => {
  const [search, setSearch] = useState('');
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ name: '', email: '' });
  const displayRole = role === 'student' ? 'Students' : 'Mentors';
  const { data: members, loading, refetch } = useFetch(`${API}/members?role=${role}${search ? `&search=${search}` : ''}`);

  useEffect(() => { refetch(); }, [search]);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await fetch(`${API}/members`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, role })
      });
      setForm({ name: '', email: '' });
      setAdding(false);
      refetch();
      if (onRefresh) onRefresh();
    } catch (err) { console.error(err); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this member permanently?')) return;
    try {
      await fetch(`${API}/members/${id}`, { method: 'DELETE' });
      refetch();
      if (onRefresh) onRefresh();
    } catch (err) { console.error(err); }
  };

  return (
    <div className="bg-[#1e293b]/80 border border-white/5 rounded-2xl p-6 backdrop-blur-xl shadow-xl animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h3 className="text-2xl font-bold text-white">{displayRole} Directory</h3>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input type="text" placeholder={`Search ${displayRole.toLowerCase()}...`} value={search} onChange={e => setSearch(e.target.value)} className="bg-slate-900 border border-white/10 text-sm rounded-full pl-9 pr-4 py-2.5 text-white outline-none focus:border-cyan-500 w-full sm:w-64 transition-colors" />
          </div>
          <button onClick={() => setAdding(!adding)} className="h-10 px-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-full transition-all flex items-center gap-2 flex-shrink-0 shadow-lg">
            <Plus className="w-4 h-4" /> Add
          </button>
        </div>
      </div>

      {adding && (
        <form onSubmit={handleAdd} className="mb-6 p-4 bg-slate-900/50 rounded-xl border border-white/10 flex flex-col sm:flex-row gap-3 animate-in slide-in-from-top-2 duration-300">
          <input type="text" placeholder="Full Name" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="flex-1 bg-slate-800 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm outline-none focus:border-cyan-500" />
          <input type="email" placeholder="Email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="flex-1 bg-slate-800 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm outline-none focus:border-cyan-500" />
          <button type="submit" className="px-6 py-2.5 bg-cyan-500 text-slate-950 font-bold rounded-lg hover:bg-cyan-400 transition-colors">Create</button>
        </form>
      )}

      {loading ? <Spinner /> : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-white/10 text-slate-400 text-sm uppercase tracking-wider bg-slate-900/50">
                <th className="py-4 pl-4 font-semibold rounded-tl-lg">Name</th>
                <th className="py-4 font-semibold">Email</th>
                <th className="py-4 font-semibold">Role</th>
                <th className="py-4 font-semibold">Joined</th>
                <th className="py-4 font-semibold text-right pr-4 rounded-tr-lg">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {members && members.length > 0 ? members.map((m, i) => (
                <tr key={m.id || i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-4 pl-4 font-bold text-white flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center font-bold text-white text-xs flex-shrink-0">{m.name?.charAt(0) || '?'}</div>
                    <span className="truncate">{m.name}</span>
                  </td>
                  <td className="py-4 text-slate-400 truncate">{m.email}</td>
                  <td className="py-4"><span className={`px-3 py-1 rounded-full text-xs font-bold border ${m.role === 'admin' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' : m.role === 'mentor' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' : 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'}`}>{m.role}</span></td>
                  <td className="py-4 text-slate-400">{new Date(m.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                  <td className="py-4 pr-4">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => handleDelete(m.id)} className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan="5" className="py-12 text-center text-slate-500">No {displayRole.toLowerCase()} found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

// ─── PROJECTS TABLE ──────────────────────────────────────
const ProjectsView = ({ onRefresh }) => {
  const [search, setSearch] = useState('');
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ title: '', description: '' });
  const { data: projects, loading, refetch } = useFetch(`${API}/projects${search ? `?search=${search}` : ''}`);

  useEffect(() => { refetch(); }, [search]);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await fetch(`${API}/projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      setForm({ title: '', description: '' });
      setAdding(false);
      refetch();
      if (onRefresh) onRefresh();
    } catch (err) { console.error(err); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this project permanently?')) return;
    try {
      await fetch(`${API}/projects/${id}`, { method: 'DELETE' });
      refetch();
      if (onRefresh) onRefresh();
    } catch (err) { console.error(err); }
  };

  return (
    <div className="bg-[#1e293b]/80 border border-white/5 rounded-2xl p-6 backdrop-blur-xl shadow-xl animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h3 className="text-2xl font-bold text-white">Projects Directory</h3>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input type="text" placeholder="Search projects..." value={search} onChange={e => setSearch(e.target.value)} className="bg-slate-900 border border-white/10 text-sm rounded-full pl-9 pr-4 py-2.5 text-white outline-none focus:border-cyan-500 w-full sm:w-64 transition-colors" />
          </div>
          <button onClick={() => setAdding(!adding)} className="h-10 px-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-full transition-all flex items-center gap-2 flex-shrink-0 shadow-lg">
            <Plus className="w-4 h-4" /> Add
          </button>
        </div>
      </div>

      {adding && (
        <form onSubmit={handleAdd} className="mb-6 p-4 bg-slate-900/50 rounded-xl border border-white/10 flex flex-col sm:flex-row gap-3 animate-in slide-in-from-top-2 duration-300">
          <input type="text" placeholder="Project Title" required value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="flex-1 bg-slate-800 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm outline-none focus:border-cyan-500" />
          <input type="text" placeholder="Description" value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="flex-1 bg-slate-800 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm outline-none focus:border-cyan-500" />
          <button type="submit" className="px-6 py-2.5 bg-cyan-500 text-slate-950 font-bold rounded-lg hover:bg-cyan-400 transition-colors">Launch</button>
        </form>
      )}

      {loading ? <Spinner /> : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-white/10 text-slate-400 text-sm uppercase tracking-wider bg-slate-900/50">
                <th className="py-4 pl-4 font-semibold rounded-tl-lg">Project</th>
                <th className="py-4 font-semibold">Description</th>
                <th className="py-4 font-semibold">Status</th>
                <th className="py-4 font-semibold">Launched</th>
                <th className="py-4 font-semibold text-right pr-4 rounded-tr-lg">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {projects && projects.length > 0 ? projects.map((p, i) => (
                <tr key={p.id || i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-4 pl-4 font-bold text-white flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center flex-shrink-0"><Rocket className="w-4 h-4 text-white" /></div>
                    <span className="truncate">{p.title}</span>
                  </td>
                  <td className="py-4 text-slate-400 truncate max-w-[250px]">{p.description}</td>
                  <td className="py-4"><span className={`px-3 py-1 rounded-full text-xs font-bold border ${p.status === 'active' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : p.status === 'completed' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : p.status === 'pending' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 'bg-slate-800 text-slate-400 border-white/10'}`}>{p.status}</span></td>
                  <td className="py-4 text-slate-400">{p.launch_date ? new Date(p.launch_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—'}</td>
                  <td className="py-4 pr-4">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => handleDelete(p.id)} className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan="5" className="py-12 text-center text-slate-500">No projects found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

// ─── EVENTS VIEW ─────────────────────────────────────────
const EventsView = () => {
  const { data: events, loading } = useFetch(`${API}/events`);
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <h2 className="text-3xl font-black text-white border-b border-white/10 pb-4">Events Management</h2>
      {loading ? <Spinner /> : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events && events.map((ev, i) => (
            <div key={ev.id || i} className="bg-[#1e293b]/80 border border-white/5 rounded-2xl p-6 backdrop-blur-xl shadow-xl hover:border-blue-500/30 transition-all group">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${ev.status === 'upcoming' ? 'bg-cyan-500/10 border border-cyan-500/20' : ev.status === 'ongoing' ? 'bg-emerald-500/10 border border-emerald-500/20' : 'bg-slate-800 border border-white/10'}`}>
                  <CalendarCheck className={`w-5 h-5 ${ev.status === 'upcoming' ? 'text-cyan-400' : ev.status === 'ongoing' ? 'text-emerald-400' : 'text-slate-400'}`} />
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${ev.status === 'upcoming' ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' : ev.status === 'ongoing' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : ev.status === 'completed' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-rose-500/10 text-rose-400 border-rose-500/20'}`}>{ev.status}</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{ev.title}</h3>
              <p className="text-sm text-slate-400 mb-4 leading-relaxed line-clamp-2">{ev.description}</p>
              <div className="flex items-center justify-between text-xs text-slate-500 border-t border-white/5 pt-4 mt-4">
                <span>{new Date(ev.event_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                <span className="font-bold text-white">{ev.registration_count} registered</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ─── DOMAINS VIEW ────────────────────────────────────────
const DomainsView = () => {
  const { data: domains, loading } = useFetch(`${API}/domains`);
  const colors = [
    { bg: 'from-cyan-500/20', border: 'border-cyan-500/20', text: 'text-cyan-400', icon: <Globe className="w-6 h-6 text-cyan-400" /> },
    { bg: 'from-purple-500/20', border: 'border-purple-500/20', text: 'text-purple-400', icon: <BrainCircuit className="w-6 h-6 text-purple-400" /> },
    { bg: 'from-emerald-500/20', border: 'border-emerald-500/20', text: 'text-emerald-400', icon: <Code2 className="w-6 h-6 text-emerald-400" /> },
  ];
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <h2 className="text-3xl font-black text-white border-b border-white/10 pb-4">Domains Management</h2>
      {loading ? <Spinner /> : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {domains && domains.map((d, i) => {
            const c = colors[i % colors.length];
            return (
              <div key={d.id || i} className={`bg-gradient-to-br ${c.bg} to-[#1e293b] border ${c.border} rounded-2xl p-6 backdrop-blur-xl shadow-xl hover:-translate-y-1 transition-all group`}>
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-slate-900/50 flex items-center justify-center border ${c.border}`}>{c.icon}</div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{d.name}</h3>
                    <p className={`text-xs font-bold ${c.text} uppercase tracking-widest`}>{d.student_count} students enrolled</p>
                  </div>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed mb-4">{d.description}</p>
                {d.mentor && <p className="text-xs text-slate-500">Mentor: <span className="text-white font-semibold">{d.mentor.name}</span></p>}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

// ─── REPORTS VIEW ────────────────────────────────────────
const ReportsView = () => {
  const { data: reports, loading } = useFetch(`${API}/reports`);
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <h2 className="text-3xl font-black text-white border-b border-white/10 pb-4">Reports Archive</h2>
      {loading ? <Spinner /> : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports && reports.map((r, i) => (
            <div key={r.id || i} className="bg-[#1e293b]/80 border border-white/5 rounded-2xl p-6 backdrop-blur-xl shadow-xl hover:border-white/20 transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20"><FileText className="w-5 h-5 text-amber-400" /></div>
                <div>
                  <h3 className="text-lg font-bold text-white">{r.type}</h3>
                  <p className="text-xs text-slate-500">{new Date(r.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                </div>
              </div>
              <div className="space-y-2">
                {r.data && Object.entries(r.data).map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between text-sm py-1.5 border-b border-white/5 last:border-0">
                    <span className="text-slate-400 capitalize">{k.replace(/_/g, ' ')}</span>
                    <span className="text-white font-bold">{typeof v === 'number' && v < 1 ? `${(v * 100).toFixed(0)}%` : v}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ─── SETTINGS PLACEHOLDER ────────────────────────────────
const SettingsView = () => (
  <div className="flex flex-col items-center justify-center min-h-[50vh] text-center animate-in fade-in duration-500">
    <div className="w-24 h-24 bg-slate-800 rounded-3xl flex items-center justify-center mb-8 border border-white/10 shadow-2xl relative">
      <Settings className="w-10 h-10 text-slate-500 animate-spin" style={{ animationDuration: '8s' }} />
    </div>
    <h2 className="text-3xl font-black text-white mb-2">ACCESS CONTROL</h2>
    <span className="px-4 py-1.5 text-xs font-bold bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-full mb-6">Coming Soon</span>
    <p className="text-slate-400 text-lg max-w-lg">System settings and API key management will be available in the next release.</p>
  </div>
);

// ═══════════════════════════════════════════════════════════
// MAIN ADMIN PORTAL COMPONENT
// ═══════════════════════════════════════════════════════════
const AdminPortal = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  // Live data
  const { data: stats, loading: statsLoading, refetch: refetchStats } = useFetch(`${API}/stats`);
  const { data: growth } = useFetch(`${API}/growth`);

  useEffect(() => {
    const path = location.pathname;
    if (path.endsWith('/students')) setActiveTab('students');
    else if (path.endsWith('/mentors')) setActiveTab('mentors');
    else if (path.endsWith('/projects')) setActiveTab('projects');
    else if (path.endsWith('/domains')) setActiveTab('domains');
    else if (path.endsWith('/events')) setActiveTab('events');
    else if (path.endsWith('/reports')) setActiveTab('reports');
    else if (path.endsWith('/settings')) setActiveTab('settings');
    else setActiveTab('overview');
  }, [location.pathname]);

  const handleTabChange = (id) => {
    setActiveTab(id);
    navigate(id === 'overview' ? '/admin-portal' : `/admin-portal/${id}`);
  };

  const tabs = [
    { id: 'overview', name: 'Overview', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'students', name: 'Students', icon: <Users className="w-4 h-4" /> },
    { id: 'mentors', name: 'Mentors', icon: <BrainCircuit className="w-4 h-4" /> },
    { id: 'projects', name: 'Projects', icon: <Rocket className="w-4 h-4" /> },
    { id: 'events', name: 'Events', icon: <CalendarCheck className="w-4 h-4" /> },
    { id: 'domains', name: 'Domains', icon: <Globe className="w-4 h-4" /> },
    { id: 'reports', name: 'Reports', icon: <FileText className="w-4 h-4" /> },
  ];

  return (
    <div className="space-y-6 relative">

      {/* ─── TOP STAT CARDS (DYNAMIC) ─────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Total Members', value: stats?.totalMembers, icon: <Users className="w-6 h-6 text-blue-400" />, color: 'from-blue-500/20' },
          { title: 'Total Mentors', value: stats?.totalMentors, icon: <BrainCircuit className="w-6 h-6 text-purple-400" />, color: 'from-purple-500/20' },
          { title: 'Active Domains', value: stats?.activeDomains, icon: <Code2 className="w-6 h-6 text-emerald-400" />, color: 'from-emerald-500/20' },
          { title: 'Launched Projects', value: stats?.launchedProjects, icon: <Rocket className="w-6 h-6 text-cyan-400" />, color: 'from-cyan-500/20' },
        ].map((stat, idx) => (
          <div key={idx} className={`bg-slate-900/50 border border-white/10 rounded-2xl p-6 bg-gradient-to-br ${stat.color} to-transparent relative overflow-hidden group hover:border-white/20 transition-all`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium mb-1">{stat.title}</p>
                <h3 className="text-3xl font-black text-white">{statsLoading ? '...' : (stat.value ?? 0)}</h3>
              </div>
              <div className="p-3 bg-slate-800/50 rounded-xl group-hover:scale-110 transition-transform">{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ─── TAB NAVIGATION ───────────────────────────────── */}
      <div className="flex border-b border-white/10 overflow-x-auto hide-scrollbar">
        {tabs.map((tab) => (
          <button key={tab.id} onClick={() => handleTabChange(tab.id)}
            className={`flex items-center gap-2 px-6 py-4 border-b-2 font-bold text-sm whitespace-nowrap transition-colors ${activeTab === tab.id ? 'border-cyan-400 text-cyan-400 bg-cyan-400/5' : 'border-transparent text-slate-400 hover:text-white hover:bg-white/5'}`}>
            {tab.icon} {tab.name}
          </button>
        ))}
      </div>

      {/* ─── CONTENT SWITCHER ─────────────────────────────── */}
      {activeTab === 'overview' && <OverviewContent stats={stats} growth={growth} onTabChange={handleTabChange} />}
      {activeTab === 'students' && <MembersView role="student" onRefresh={refetchStats} />}
      {activeTab === 'mentors' && <MembersView role="mentor" onRefresh={refetchStats} />}
      {activeTab === 'projects' && <ProjectsView onRefresh={refetchStats} />}
      {activeTab === 'events' && <EventsView />}
      {activeTab === 'domains' && <DomainsView />}
      {activeTab === 'reports' && <ReportsView />}
      {activeTab === 'settings' && <SettingsView />}
    </div>
  );
};

export default AdminPortal;
