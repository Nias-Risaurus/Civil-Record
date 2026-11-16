// API Service for CivilRecord connecting to Laravel Backend API
const API_BASE_URL = 'http://127.0.0.1:8000/api';

class ApiService {
  constructor() {
    this.token = localStorage.getItem('civilrecord_auth_token') || null;
  }

  setToken(token) {
    this.token = token;
    if (token) {
      localStorage.setItem('civilrecord_auth_token', token);
    } else {
      localStorage.removeItem('civilrecord_auth_token');
    }
  }

  async request(endpoint, options = {}) {
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...options.headers,
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
      });

      const data = await response.json();
      return { ok: response.ok, status: response.status, data };
    } catch (err) {
      console.warn(`API call to ${endpoint} failed, falling back to local store:`, err.message);
      return { ok: false, error: err.message };
    }
  }

  // Auth
  async login(email, password) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(userData) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  // Reports
  async getReports(params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.request(`/reports${query ? `?${query}` : ''}`);
  }

  async getReport(idOrTicket) {
    return this.request(`/reports/${idOrTicket}`);
  }

  async trackReport(ticketNumber) {
    return this.request(`/track/${ticketNumber}`);
  }

  async createReport(reportData) {
    return this.request('/reports', {
      method: 'POST',
      body: JSON.stringify(reportData),
    });
  }

  // Admin Actions
  async verifyReport(reportId, facilityId = null) {
    return this.request(`/admin/reports/${reportId}/verify`, {
      method: 'PATCH',
      body: JSON.stringify({ facility_id: facilityId }),
    });
  }

  async rejectReport(reportId, reason) {
    return this.request(`/admin/reports/${reportId}/reject`, {
      method: 'PATCH',
      body: JSON.stringify({ reason }),
    });
  }

  async assignReport(reportId, officerId, instructions, dueDate) {
    return this.request(`/admin/reports/${reportId}/assign`, {
      method: 'POST',
      body: JSON.stringify({
        officer_id: officerId,
        instructions,
        due_date: dueDate,
      }),
    });
  }

  async validateReport(reportId, isApproved, remarks) {
    return this.request(`/admin/reports/${reportId}/validate`, {
      method: 'PATCH',
      body: JSON.stringify({
        is_approved: isApproved,
        remarks,
      }),
    });
  }

  async getAnalytics() {
    return this.request('/admin/analytics');
  }

  // Officer Actions
  async getOfficerTasks() {
    return this.request('/officer/tasks');
  }

  async startWork(reportId) {
    return this.request(`/officer/tasks/${reportId}/start`, {
      method: 'PATCH',
    });
  }

  async resolveWork(reportId, payload) {
    return this.request(`/officer/tasks/${reportId}/resolve`, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  // Facilities & Categories
  async getFacilities() {
    return this.request('/facilities');
  }

  async getFacility(id) {
    return this.request(`/facilities/${id}`);
  }

  async getCategories() {
    return this.request('/categories');
  }
}

export const api = new ApiService();
