import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import AboutUs from './components/AboutUs';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import UserDashboard from './pages/UserDashboard';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import MetaAdsSection from './components/marketing/MetaAdsSection';
import DevelopmentServices from './components/services/DevelopmentServices';
import DeveloperSection from './components/services/DeveloperSection';
import ContactPage from './pages/ContactPage';
import { AuthProvider, useAuth } from './contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'admin' | 'user';
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { session, userRole } = useAuth();

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to={userRole === 'admin' ? '/dashboard' : '/user-dashboard'} replace />;
  }

  return <>{children}</>;
};

function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-b from-slate-900 to-blue-900 text-slate-100 dark:text-white transition-all duration-500">
          <Navbar onContactClick={() => setIsContactOpen(true)} />
          <main className="pt-20 md:pt-24 transition-all duration-300">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />
              <Route path="/meta-ads" element={<MetaAdsSection />} />
              <Route path="/services/development" element={<DevelopmentServices />} />
              <Route 
                path="/developers" 
                element={<DeveloperSection onContactClick={() => setIsContactOpen(true)} />} 
              />
              <Route path="/services" element={<HomePage />} />
              <Route path="/careers" element={<HomePage />} />
              <Route path="/blog" element={<HomePage />} />
              <Route path="/privacy" element={<HomePage />} />
              <Route path="/terms" element={<HomePage />} />
              <Route path="/cookies" element={<HomePage />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute requiredRole="admin">
                    <DashboardPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/user-dashboard"
                element={
                  <ProtectedRoute requiredRole="user">
                    <UserDashboard />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
          <Footer onContactClick={() => setIsContactOpen(true)} />
          {isContactOpen && (
            <div className="fixed inset-0 z-50 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4">
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setIsContactOpen(false)} />
                <div className="relative bg-gradient-to-b from-slate-900 to-blue-900 rounded-xl shadow-2xl max-w-4xl w-full mx-auto">
                  <button
                    onClick={() => setIsContactOpen(false)}
                    className="absolute top-4 right-4 p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                  >
                    ×
                  </button>
                  <ContactPage />
                </div>
              </div>
            </div>
          )}
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;