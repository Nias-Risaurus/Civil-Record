import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ReportProvider } from './context/ReportContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';

// Pages
import { LandingPage } from './pages/public/LandingPage';
import { PublicMapPage } from './pages/public/PublicMapPage';
import { TrackPage } from './pages/public/TrackPage';
import { CitizenDashboard } from './pages/citizen/CitizenDashboard';
import { CreateReportPage } from './pages/citizen/CreateReportPage';
import { ReportDetailPage } from './pages/citizen/ReportDetailPage';
import { OfficerDashboard } from './pages/officer/OfficerDashboard';
import { AdminDashboard } from './pages/admin/AdminDashboard';

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
                <Route path="/map" element={<PublicMapPage />} />
                <Route path="/track" element={<TrackPage />} />

                {/* Citizen Routes */}
                <Route path="/citizen" element={<CitizenDashboard />} />
                <Route path="/citizen/create" element={<CreateReportPage />} />

                {/* Officer Routes */}
                <Route path="/officer" element={<OfficerDashboard />} />

                {/* Admin Routes */}
                <Route path="/admin" element={<AdminDashboard />} />

                {/* Report Detail Route */}
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
