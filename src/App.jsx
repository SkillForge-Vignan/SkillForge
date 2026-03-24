import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Providers & Auth
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Layouts
import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Domains from './pages/Domains';
import Projects from './pages/Projects';
import Events from './pages/Events';
import Team from './pages/Team';
import Contact from './pages/Contact';
import Feedback from './pages/Feedback';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import StudentPortal from './pages/StudentPortal';
import AdminPortal from './pages/AdminPortal';
import MentorPortal from './pages/MentorPortal';

// Icons for Dashboard Menus
import { LayoutDashboard, BookOpen, Rocket, BookOpenCheck, BrainCircuit, MessageSquare, User, Users, ClipboardCheck, Code2, LineChart, CalendarCheck, Settings } from 'lucide-react';

const studentMenu = [
  { title: 'Dashboard', path: '/student-portal', icon: <LayoutDashboard /> },
  { title: 'My Domains', path: '/student-portal/domains', icon: <BookOpen /> },
  { title: 'My Projects', path: '/student-portal/projects', icon: <Rocket /> },
  { title: 'Assignments', path: '/student-portal/assignments', icon: <ClipboardCheck /> },
  { title: 'Progress', path: '/student-portal/progress', icon: <LineChart /> },
  { title: 'Mentor', path: '/student-portal/mentor', icon: <BrainCircuit /> },
  { title: 'Profile', path: '/student-portal/profile', icon: <User /> },
];

const mentorMenu = [
  { title: 'Dashboard', path: '/mentor-portal', icon: <LayoutDashboard /> },
  { title: 'My Students', path: '/mentor-portal/students', icon: <Users /> },
  { title: 'Assign Tasks', path: '/mentor-portal/assign', icon: <BookOpenCheck /> },
  { title: 'Student Progress', path: '/mentor-portal/progress', icon: <LineChart /> },
  { title: 'Messages', path: '/mentor-portal/messages', icon: <MessageSquare /> },
  { title: 'Profile', path: '/mentor-portal/profile', icon: <User /> },
];

const adminMenu = [
  { title: 'Dashboard', path: '/admin-portal', icon: <LayoutDashboard /> },
  { title: 'Manage Students', path: '/admin-portal/students', icon: <Users /> },
  { title: 'Manage Mentors', path: '/admin-portal/mentors', icon: <BrainCircuit /> },
  { title: 'Domains', path: '/admin-portal/domains', icon: <Code2 /> },
  { title: 'Projects', path: '/admin-portal/projects', icon: <Rocket /> },
  { title: 'Events', path: '/admin-portal/events', icon: <CalendarCheck /> },
  { title: 'Reports', path: '/admin-portal/reports', icon: <LineChart /> },
  { title: 'Settings', path: '/admin-portal/settings', icon: <Settings /> },
];

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Main Website Routes */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/domains" element={<Domains />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/events" element={<Events />} />
            <Route path="/team" element={<Team />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Route>

          {/* Student Portal Routes Protected */}
          <Route element={<ProtectedRoute allowedRoles={['student']}><DashboardLayout menuItems={studentMenu} role="Student" /></ProtectedRoute>}>
            <Route path="/student-portal" element={<StudentPortal />} />
            <Route path="/student-portal/*" element={<StudentPortal />} />
          </Route>

          {/* Mentor Portal Routes Protected */}
          <Route element={<ProtectedRoute allowedRoles={['mentor']}><DashboardLayout menuItems={mentorMenu} role="Mentor" /></ProtectedRoute>}>
            <Route path="/mentor-portal" element={<MentorPortal />} />
            <Route path="/mentor-portal/*" element={<MentorPortal />} />
          </Route>

          {/* Admin Portal Routes Protected */}
          <Route element={<ProtectedRoute allowedRoles={['admin']}><DashboardLayout menuItems={adminMenu} role="Admin" /></ProtectedRoute>}>
            <Route path="/admin-portal" element={<AdminPortal />} />
            <Route path="/admin-portal/*" element={<AdminPortal />} />
          </Route>

        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
