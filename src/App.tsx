import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { LoginForm } from './components/auth/LoginForm';
import { useAuth } from './contexts/AuthContext';
import { AllUsers } from './pages/AllUsers';
import { ServiceManagement } from './pages/ServiceManagement';
import { MainLayout } from './components/layout/MainLayout';
import './components/layout/layout.css';

// Protected Route bileşeni
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <MainLayout>{children}</MainLayout>;
};

// Public Route bileşeni - giriş yapmış kullanıcıları dashboard'a yönlendirir
const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter basename="/">
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginForm />
              </PublicRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <div>Dashboard (Protected)</div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/allusers"
            element={
              <ProtectedRoute>
                <AllUsers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/service-management"
            element={
              <ProtectedRoute>
                <ServiceManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <div>Settings (Protected)</div>
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App; 