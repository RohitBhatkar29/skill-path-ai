import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Assessment from './pages/Assessment';
import Courses from './pages/Courses';
import Jobs from './pages/Jobs';
import Resume from './pages/Resume';
import Feedback from './pages/Feedback';
import Profile from './pages/Profile';
import LandingPage from './pages/LandingPage';

// Logic to Protect Routes
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div>Loading...</div>;

  // Not logged in -> Landing Page
  if (!user) return <Navigate to="/landing" replace />;

  // Logged in but no assessment -> Assessment
  // We allow access to assessment page itself to prevent loop
  if (!user.hasCompletedAssessment && location.pathname !== '/assessment') {
    return <Navigate to="/assessment" replace />;
  }

  return children;
};

// Access only if NOT logged in (e.g. Landing, Login)
const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;

  if (user) {
    return <Navigate to="/" replace />;
  }
  return children;
};

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/landing" element={<PublicRoute><LandingPage /></PublicRoute>} />
      <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/signup" element={<PublicRoute><SignUp /></PublicRoute>} />

      {/* Protected Routes */}
      <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        <Route index element={<Dashboard />} />
        <Route path="assessment" element={<Assessment />} />
        <Route path="courses" element={<Courses />} />
        <Route path="jobs" element={<Jobs />} />
        <Route path="resume" element={<Resume />} />
        <Route path="profile" element={<Profile />} />
        <Route path="feedback" element={<Feedback />} />
      </Route>

      {/* Default Redirect */}
      <Route path="*" element={<Navigate to="/landing" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
