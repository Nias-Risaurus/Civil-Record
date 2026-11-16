import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_REPORTS,
  INITIAL_FACILITIES,
  CATEGORIES,
  INITIAL_NOTIFICATIONS
} from '../data/mockData';
import { useAuth } from './AuthContext';

const ReportContext = createContext();

export const ReportProvider = ({ children }) => {
  const { currentUser } = useAuth();

  // Load reports from localStorage or fallback to INITIAL_REPORTS
  const [reports, setReports] = useState(() => {
    const saved = localStorage.getItem('civilrecord_reports');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing stored reports', e);
      }
    }
    return INITIAL_REPORTS;
  });

  // Facilities registry
  const [facilities, setFacilities] = useState(() => {
    const saved = localStorage.getItem('civilrecord_facilities');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing stored facilities', e);
      }
    }
    return INITIAL_FACILITIES;
  });

  // Notifications
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('civilrecord_notifications');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing stored notifications', e);
      }
    }
    return INITIAL_NOTIFICATIONS;
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('civilrecord_reports', JSON.stringify(reports));
  }, [reports]);

  useEffect(() => {
    localStorage.setItem('civilrecord_facilities', JSON.stringify(facilities));
  }, [facilities]);

  useEffect(() => {
    localStorage.setItem('civilrecord_notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Push new notification
  const notifyUser = (userId, title, message, ticketNumber) => {
    const newNotif = {
      id: `notif-${Date.now()}`,
      userId,
      title,
      message,
      ticketNumber,
      isRead: false,
      timestamp: new Date().toISOString()
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  // Helper to generate ticket ID: CR-2026-00006 (Collision-proof)
  const generateTicketNumber = () => {
    const year = new Date().getFullYear();
    let maxSeq = 0;
    reports.forEach((r) => {
      const match = r.ticketNumber?.match(/CR-\d{4}-(\d+)/);
      if (match) {
        const seq = parseInt(match[1], 10);
        if (seq > maxSeq) maxSeq = seq;
      }
    });
    const nextSeq = maxSeq + 1;
    return `CR-${year}-${String(nextSeq).padStart(5, '0')}`;
  };

  // 1. Citizen: Create Report
  const createReport = ({
    title,
    categoryId,
    description,
    address,
    lat,
    lng,
    image,
    facilityId = null
  }) => {
    const ticketNumber = generateTicketNumber();
    const newReport = {
      id: `rep-${Date.now()}`,
      ticketNumber,
      title,
      categoryId,
      facilityId,
      userId: currentUser?.id || 'usr-citizen-01',
      reporterName: currentUser?.name || 'Warga Masyarakat',
      reporterPhone: currentUser?.phone || '0857-xxxx-xxxx',
      description,
      address,
      lat: Number(lat) || -6.917464,
      lng: Number(lng) || 107.619123,
      status: 'pending',
      priority: 'medium',
      assignedOfficerId: null,
      assignedOfficerName: null,
      assignedAt: null,
      dueDate: null,
      workNotes: null,
      createdAt: new Date().toISOString(),
      beforeImage:
        image ||
        'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=800&auto=format&fit=crop&q=80',
      afterImage: null,
      maintenanceNotes: null,
      histories: [
        {
          id: `h-${Date.now()}`,
          status: 'pending',
          actor: `${currentUser?.name || 'Warga'} (Citizen)`,
          note: 'Laporan baru dibuat dan menunggu verifikasi dari admin.',
          timestamp: new Date().toISOString()
        }
      ]
    };

    setReports((prev) => [newReport, ...prev]);

    // Send notification to admin
    notifyUser(
      'usr-admin-01',
      'Laporan Baru Masuk',
      `Laporan baru ${ticketNumber} (${title}) memerlukan verifikasi.`,
      ticketNumber
    );

    return newReport;
  };

  // 2. Admin: Verify Report
  const verifyReport = (reportId, facilityId = null) => {
    setReports((prev) =>
      prev.map((rep) => {
        if (rep.id === reportId) {
          const updatedHistories = [
            ...rep.histories,
            {
              id: `h-${Date.now()}`,
              status: 'verified',
              actor: `${currentUser?.name || 'Admin'} (Admin)`,
              note: 'Laporan diverifikasi valid dan siap ditugaskan.',
              timestamp: new Date().toISOString()
            }
          ];

          notifyUser(
            rep.userId,
            'Laporan Terverifikasi',
            `Laporan ${rep.ticketNumber} telah disetujui admin dan masuk antrean penugasan.`,
            rep.ticketNumber
          );

          return {
            ...rep,
            status: 'verified',
            facilityId: facilityId || rep.facilityId,
            histories: updatedHistories
          };
        }
        return rep;
      })
    );
  };

  // 3. Admin: Reject Report
  const rejectReport = (reportId, reason) => {
    setReports((prev) =>
      prev.map((rep) => {
        if (rep.id === reportId) {
          const updatedHistories = [
            ...rep.histories,
            {
              id: `h-${Date.now()}`,
              status: 'rejected',
              actor: `${currentUser?.name || 'Admin'} (Admin)`,
              note: `Laporan ditolak: ${reason}`,
              timestamp: new Date().toISOString()
            }
          ];

          notifyUser(
            rep.userId,
            'Laporan Ditolak',
            `Laporan ${rep.ticketNumber} ditolak. Alasan: ${reason}`,
            rep.ticketNumber
          );

          return {
            ...rep,
            status: 'rejected',
            rejectionReason: reason,
            histories: updatedHistories
          };
        }
        return rep;
      })
    );
  };

  // 4. Admin: Assign Officer
  const assignReport = (reportId, officerId, officerName, instructions, dueDate) => {
    setReports((prev) =>
      prev.map((rep) => {
        if (rep.id === reportId) {
          const updatedHistories = [
            ...rep.histories,
            {
              id: `h-${Date.now()}`,
              status: 'assigned',
              actor: `${currentUser?.name || 'Admin'} (Admin)`,
              note: `Penugasan didelegasikan ke ${officerName}. Batas waktu: ${new Date(
                dueDate
              ).toLocaleDateString('id-ID')}. Instruksi: ${instructions}`,
              timestamp: new Date().toISOString()
            }
          ];

          // Notify Officer
          notifyUser(
            officerId,
            'Tugas Baru',
            `Anda ditugaskan menangani tiket ${rep.ticketNumber} di ${rep.address}.`,
            rep.ticketNumber
          );

          // Notify Citizen
          notifyUser(
            rep.userId,
            'Petugas Ditugaskan',
            `Petugas ${officerName} telah ditugaskan untuk memperbaiki fasilitas ${rep.ticketNumber}.`,
            rep.ticketNumber
          );

          return {
            ...rep,
            status: 'assigned',
            assignedOfficerId: officerId,
            assignedOfficerName: officerName,
            assignedAt: new Date().toISOString(),
            dueDate: dueDate || new Date(Date.now() + 48 * 3600 * 1000).toISOString(),
            workNotes: instructions,
            histories: updatedHistories
          };
        }
        return rep;
      })
    );
  };

  // 5. Officer: Start Work (In Progress)
  const startReportWork = (reportId) => {
    setReports((prev) =>
      prev.map((rep) => {
        if (rep.id === reportId) {
          const updatedHistories = [
            ...rep.histories,
            {
              id: `h-${Date.now()}`,
              status: 'in_progress',
              actor: `${currentUser?.name || 'Petugas'} (Officer)`,
              note: 'Petugas telah tiba di lokasi dan memulai proses pengerjaan perbaikan.',
              timestamp: new Date().toISOString()
            }
          ];

          notifyUser(
            rep.userId,
            'Perbaikan Sedang Berlangsung',
            `Petugas ${rep.assignedOfficerName || 'lapangan'} sedang melakukan tindakan perbaikan di lokasi.`,
            rep.ticketNumber
          );

          return {
            ...rep,
            status: 'in_progress',
            histories: updatedHistories
          };
        }
        return rep;
      })
    );
  };

  // 6. Officer: Resolve Work (Upload After photo & Notes)
  const resolveReportWork = (reportId, { maintenanceNotes, afterImage }) => {
    setReports((prev) =>
      prev.map((rep) => {
        if (rep.id === reportId) {
          const updatedHistories = [
            ...rep.histories,
            {
              id: `h-${Date.now()}`,
              status: 'resolved',
              actor: `${currentUser?.name || 'Petugas'} (Officer)`,
              note: `Perbaikan fisik selesai dilakukan. Catatan: ${maintenanceNotes}. Foto bukti hasil diunggah.`,
              timestamp: new Date().toISOString()
            }
          ];

          // Notify Admin for review
          notifyUser(
            'usr-admin-01',
            'Pengajuan Penyelesaian Tugas',
            `Petugas telah menyelesaikan perbaikan ${rep.ticketNumber} dan menunggu validasi bukti Anda.`,
            rep.ticketNumber
          );

          return {
            ...rep,
            status: 'resolved',
            maintenanceNotes,
            afterImage:
              afterImage ||
              'https://images.unsplash.com/photo-1541888946425-d0fbb18615f3?w=800&auto=format&fit=crop&q=80',
            histories: updatedHistories
          };
        }
        return rep;
      })
    );
  };

  // 7. Admin: Validate Resolution (Approve -> Completed OR Rework -> In Progress)
  const validateReport = (reportId, isApproved, remarks) => {
    setReports((prev) =>
      prev.map((rep) => {
        if (rep.id === reportId) {
          const newStatus = isApproved ? 'completed' : 'in_progress';
          const updatedHistories = [
            ...rep.histories,
            {
              id: `h-${Date.now()}`,
              status: newStatus,
              actor: `${currentUser?.name || 'Admin'} (Admin)`,
              note: isApproved
                ? `Admin memvalidasi dan menyetujui hasil perbaikan. Laporan ditutup dengan sukses. Catatan: ${remarks || 'Hasil rapi dan sesuai standar.'}`
                : `Admin mengembalikan perbaikan untuk pengerjaan ulang (Rework). Catatan revisi: ${remarks}`,
              timestamp: new Date().toISOString()
            }
          ];

          if (isApproved) {
            // Update facility condition to Good if linked
            if (rep.facilityId) {
              setFacilities((facs) =>
                facs.map((f) =>
                  f.id === rep.facilityId
                    ? { ...f, condition: 'Baik', conditionBadge: 'good' }
                    : f
                )
              );
            }

            // Notify Citizen
            notifyUser(
              rep.userId,
              'Fasilitas Selesai Diperbaiki! 🎉',
              `Laporan Anda ${rep.ticketNumber} telah selesai diperbaiki dan diverifikasi oleh pemerintah daerah. Terima kasih telah melapor!`,
              rep.ticketNumber
            );
          } else {
            // Notify Officer to rework
            notifyUser(
              rep.assignedOfficerId,
              'Perbaikan Perlu Revisi',
              `Laporan ${rep.ticketNumber} memerlukan pengerjaan ulang. Catatan: ${remarks}`,
              rep.ticketNumber
            );
          }

          return {
            ...rep,
            status: newStatus,
            completedAt: isApproved ? new Date().toISOString() : null,
            adminFeedback: remarks,
            histories: updatedHistories
          };
        }
        return rep;
      })
    );
  };

  // Mark notification read
  const markNotificationRead = (notifId) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notifId ? { ...n, isRead: true } : n))
    );
  };

  // Reset to initial demo data
  const resetDemoData = () => {
    setReports(INITIAL_REPORTS);
    setFacilities(INITIAL_FACILITIES);
    setNotifications(INITIAL_NOTIFICATIONS);
    localStorage.removeItem('civilrecord_reports');
    localStorage.removeItem('civilrecord_facilities');
    localStorage.removeItem('civilrecord_notifications');
  };

  return (
    <ReportContext.Provider
      value={{
        reports,
        facilities,
        categories: CATEGORIES,
        notifications,
        createReport,
        verifyReport,
        rejectReport,
        assignReport,
        startReportWork,
        resolveReportWork,
        validateReport,
        markNotificationRead,
        resetDemoData
      }}
    >
      {children}
    </ReportContext.Provider>
  );
};

export const useReports = () => useContext(ReportContext);

