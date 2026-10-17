import api from './client';

export const authApi = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  register: (data) => api.post('/auth/register', data),
  getMe: () => api.get('/auth/me'),
};

export const homeworkApi = {
  getAll: (params) => api.get('/homework', { params }),
  getById: (id) => api.get(`/homework/${id}`),
  create: (data) => api.post('/homework', data),
  submit: (id, submission) => api.post(`/homework/${id}/submit`, submission),
  toggleCompletion: (id, data) => api.patch(`/homework/${id}/complete`, data),
};

export const testsApi = {
  getAll: () => api.get('/tests'),
  getById: (id) => api.get(`/tests/${id}`),
  submit: (id, answers) => api.post(`/tests/${id}/submit`, { answers }),
};

export const examsApi = {
  getAll: () => api.get('/exams'),
  getById: (id) => api.get(`/exams/${id}`),
};

export const classesApi = {
  getAll: () => api.get('/classes'),
  getById: (id) => api.get(`/classes/${id}`),
};

export const reportsApi = {
  getPlatformStats: () => api.get('/reports/stats'),
  getStudentReport: (studentId) => api.get(`/reports/student/${studentId}`),
};

export const requestsApi = {
  getPending: () => api.get('/requests/pending'),
  approve: (id) => api.post(`/requests/${id}/approve`),
  reject: (id, reason) => api.post(`/requests/${id}/reject`, { reason }),
};
