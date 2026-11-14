import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './layouts/ProtectedRoute';

// Pages
import HomePage from './pages/Home/HomePage';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import ForgotPasswordPage from './pages/Auth/ForgotPasswordPage';
import CandidateDashboardPage from './pages/Candidate/CandidateDashboardPage';
import CandidateProfilePage from './pages/Candidate/CandidateProfilePage';
import CareerToolsPage from './pages/Candidate/CareerToolsPage';
import EmployerDashboardPage from './pages/Employer/EmployerDashboardPage';
import EmployerProfilePage from './pages/Employer/EmployerProfilePage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />

          {/* Candidate Protected Routes */}
          <Route
            path="/candidate/dashboard"
            element={
              <ProtectedRoute allowedRole="candidate">
                <CandidateDashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/candidate/profile"
            element={
              <ProtectedRoute allowedRole="candidate">
                <CandidateProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/candidate/tools"
            element={
              <ProtectedRoute allowedRole="candidate">
                <CareerToolsPage />
              </ProtectedRoute>
            }
          />

          {/* Employer Protected Routes */}
          <Route
            path="/employer/dashboard"
            element={
              <ProtectedRoute allowedRole="employer">
                <EmployerDashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/employer/profile"
            element={
              <ProtectedRoute allowedRole="employer">
                <EmployerProfilePage />
              </ProtectedRoute>
            }
          />

          {/* 404 Catch All */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
