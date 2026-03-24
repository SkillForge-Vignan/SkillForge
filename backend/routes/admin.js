import express from 'express';
import { supabaseAdmin } from '../config/supabase.js';

const router = express.Router();

// ─── GET /api/admin/stats ────────────────────────────────
router.get('/stats', async (req, res) => {
  try {
    const [members, mentors, projects, domains] = await Promise.all([
      supabaseAdmin.from('users').select('id', { count: 'exact', head: true }),
      supabaseAdmin.from('users').select('id', { count: 'exact', head: true }).eq('role', 'mentor'),
      supabaseAdmin.from('projects').select('id', { count: 'exact', head: true }),
      supabaseAdmin.from('domains').select('id', { count: 'exact', head: true }),
    ]);

    res.json({
      totalMembers: members.count || 0,
      totalMentors: mentors.count || 0,
      launchedProjects: projects.count || 0,
      activeDomains: domains.count || 0,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── GET /api/admin/members ──────────────────────────────
router.get('/members', async (req, res) => {
  try {
    const { role, search } = req.query;
    let query = supabaseAdmin.from('users').select('*').order('created_at', { ascending: false });

    if (role) query = query.eq('role', role);
    if (search) query = query.ilike('name', `%${search}%`);

    const { data, error } = await query;
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── POST /api/admin/members ─────────────────────────────
router.post('/members', async (req, res) => {
  try {
    const { name, email, role, password } = req.body;
    // Create in auth first
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password: password || 'SkillForge@2026',
      email_confirm: true,
      user_metadata: { name, role: role || 'student' },
    });
    if (authError) throw authError;
    res.status(201).json({ message: 'Member created', user: authData.user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── DELETE /api/admin/members/:id ───────────────────────
router.delete('/members/:id', async (req, res) => {
  try {
    const { error } = await supabaseAdmin.auth.admin.deleteUser(req.params.id);
    if (error) throw error;
    res.json({ message: 'Member deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── GET /api/admin/projects ─────────────────────────────
router.get('/projects', async (req, res) => {
  try {
    const { search } = req.query;
    let query = supabaseAdmin.from('projects').select('*').order('created_at', { ascending: false });
    if (search) query = query.ilike('title', `%${search}%`);
    const { data, error } = await query;
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── POST /api/admin/projects ────────────────────────────
router.post('/projects', async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const { data, error } = await supabaseAdmin.from('projects').insert({ title, description, status: status || 'active' }).select().single();
    if (error) throw error;
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── DELETE /api/admin/projects/:id ──────────────────────
router.delete('/projects/:id', async (req, res) => {
  try {
    const { error } = await supabaseAdmin.from('projects').delete().eq('id', req.params.id);
    if (error) throw error;
    res.json({ message: 'Project deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── GET /api/admin/events ───────────────────────────────
router.get('/events', async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin.from('events').select('*').order('event_date', { ascending: false });
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── POST /api/admin/events ──────────────────────────────
router.post('/events', async (req, res) => {
  try {
    const { title, description, event_date } = req.body;
    const { data, error } = await supabaseAdmin.from('events').insert({ title, description, event_date }).select().single();
    if (error) throw error;
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── GET /api/admin/domains ──────────────────────────────
router.get('/domains', async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin.from('domains').select('*, mentor:users(name, email)').order('created_at', { ascending: false });
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── POST /api/admin/domains ─────────────────────────────
router.post('/domains', async (req, res) => {
  try {
    const { name, description } = req.body;
    const { data, error } = await supabaseAdmin.from('domains').insert({ name, description }).select().single();
    if (error) throw error;
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── GET /api/admin/reports ──────────────────────────────
router.get('/reports', async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin.from('reports').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── GET /api/admin/growth ───────────────────────────────
router.get('/growth', async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin.from('users').select('created_at');
    if (error) throw error;

    // Aggregate by month
    const monthCounts = {};
    const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    data.forEach(u => {
      const d = new Date(u.created_at);
      const key = `${monthNames[d.getMonth()]} ${d.getFullYear()}`;
      monthCounts[key] = (monthCounts[key] || 0) + 1;
    });

    // Return last 12 month slots
    const result = [];
    const now = new Date();
    for (let i = 11; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = `${monthNames[d.getMonth()]} ${d.getFullYear()}`;
      result.push({ month: key, count: monthCounts[key] || 0 });
    }
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
