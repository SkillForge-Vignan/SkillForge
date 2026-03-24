import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, profile, loading } = useAuth();

  // Optionally add a beautiful loading spinner or skeleton here
  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-slate-900 text-white">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
    </div>
  );

  // Re-route unauthenticated users to login
  if (!user) return <Navigate to="/login" replace />;

  // Enforce role-based access control based on DB profile
  if (allowedRoles && profile && !allowedRoles.includes(profile.role)) {
    // If they are logged in but unauthorized, route back to home or a strict "no access" page 
    return <Navigate to="/" replace />; 
  }

  // Permitted!
  return children;
};

export default ProtectedRoute;
