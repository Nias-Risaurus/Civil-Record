import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ReportProvider } from './context/ReportContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';

// Pages
import { LandingPage } from './pages/public/LandingPage';
import { AboutPage } from './pages/public/AboutPage';
import { PublicMapPage } from './pages/public/PublicMapPage';
import { TrackPage } from './pages/public/TrackPage';
import { CitizenDashboard } from './pages/citizen/CitizenDashboard';
import { CreateReportPage } from './pages/citizen/CreateReportPage';
import { ReportDetailPage } from './pages/citizen/ReportDetailPage';
import { OfficerDashboard } from './pages/officer/OfficerDashboard';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { FacilityRegistryPage } from './pages/admin/FacilityRegistryPage';
import { VerificationQueuePage } from './pages/admin/VerificationQueuePage';
import { UserManagementPage } from './pages/admin/UserManagementPage';

export default function App() {
  return (
    <AuthProvider>
      <ReportProvider>
        <BrowserRouter>
          <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-800 antialiased selection:bg-blue-600 selection:text-white">
            <Navbar />
            <main className="flex-1">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/map" element={<PublicMapPage />} />
                <Route path="/track" element={<TrackPage />} />
                <Route path="/facilities" element={<FacilityRegistryPage />} />

                {/* Citizen Routes */}
                <Route path="/citizen" element={<CitizenDashboard />} />
                <Route path="/citizen/create" element={<CreateReportPage />} />

                {/* Officer Routes */}
                <Route path="/officer" element={<OfficerDashboard />} />

                {/* Admin Routes */}
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/facilities" element={<FacilityRegistryPage />} />
                <Route path="/admin/verification" element={<VerificationQueuePage />} />
                <Route path="/admin/users" element={<UserManagementPage />} />

                {/* Universal Report Detail Route */}
                <Route path="/reports/:id" element={<ReportDetailPage />} />

                {/* Fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </ReportProvider>
    </AuthProvider>
  );
}
