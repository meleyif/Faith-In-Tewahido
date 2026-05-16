import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import DashboardLayout from "./components/layout/DashboardLayout";

// Public Pages
import CatalogPage from "./pages/CatalogPage";
import CourseDetailPage from "./pages/CourseDetailPage";
import LoginPage from "./pages/auth/LoginPage";

// Dashboard Pages
import DashboardPage from "./pages/DashboardPage";
import SessionsPage from "./pages/SessionsPage";
import ProfilePage from "./pages/ProfilePage";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import InstructorDashboard from "./pages/dashboard/InstructorDashboard";

export default function App() {
  return (
    <Routes>
      {/* Public Pages */}
      <Route element={<AppLayout />}>
        <Route path="/" element={<Navigate to="/catalog" replace />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/course/:courseId" element={<CourseDetailPage />} />
        <Route path="/auth/login" element={<LoginPage />} />
      </Route>

      {/* Authenticated Dashboards */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        {/* Student Routes */}
        <Route path="student" element={<DashboardPage />} />
        <Route path="student/sessions" element={<SessionsPage />} />
        <Route path="student/certificates" element={<ProfilePage />} />
        
        {/* Instructor Routes */}
        <Route path="instructor" element={<InstructorDashboard />} />
        
        {/* School Admin Routes */}
        <Route path="school" element={<div className="text-white font-serif text-2xl">School Admin Dashboard</div>} />
        
        {/* Super Admin Routes */}
        <Route path="admin" element={<AdminDashboard />} />
      </Route>

      <Route path="*" element={<div className="text-center font-mono py-20 text-gold bg-deep min-h-screen pt-40">404 // NOT FOUND</div>} />
    </Routes>
  );
}
