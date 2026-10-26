import api from './client';

export const authApi = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  register: (data) => api.post('/auth/register', data),
  getMe: () => api.get('/auth/me'),
};

export const homeworkApi = {
  getForStudent: () => api.get('/homework/student'),
  getForParent: () => api.get('/homework/parent'),
  getForClass: (classId) => api.get(`/homework/class/${classId}`),
  create: (data) => api.post('/homework', data),
  markParentDone: (id, studentId, done = true) => api.patch(`/homework/${id}/parent-done`, { studentId, done }),
  markTeacherDone: (id, studentId, done = true) => api.patch(`/homework/${id}/teacher-done`, { studentId, done }),
  remove: (id) => api.delete(`/homework/${id}`),
};

export const testsApi = {
  getForStudent: () => api.get('/tests/student'),
  getForParent: () => api.get('/tests/parent'),
  getForClass: (classId) => api.get(`/tests/class/${classId}`),
  create: (data) => api.post('/tests', data),
  submit: (id, answers) => api.post(`/tests/${id}/submit`, { answers }),
  remove: (id) => api.delete(`/tests/${id}`),
};

export const examsApi = {
  getForStudent: () => api.get('/exams/student'),
  getForParent: () => api.get('/exams/parent'),
  getForClass: (classId) => api.get(`/exams/class/${classId}`),
  create: (data) => api.post('/exams', data),
  addMarks: (id, studentId, marksObtained) => api.post(`/exams/${id}/marks`, { studentId, marksObtained }),
  remove: (id) => api.delete(`/exams/${id}`),
};

export const classesApi = {
  getAll: () => api.get('/classes'),
  getMyClass: () => api.get('/classes/my-class'),
  create: (data) => api.post('/classes', data),
  update: (id, data) => api.put(`/classes/${id}`, data),
  remove: (id) => api.delete(`/classes/${id}`),
};

export const reportsApi = {
  getMyReport: () => api.get('/reports/me'),
  getParentReport: () => api.get('/reports/parent'),
  getStudentReport: (studentId) => api.get(`/reports/student/${studentId}`),
  getClassReport: (classId) => api.get(`/reports/class/${classId}`),
  getPlatformStats: () => api.get('/reports/school-summary'),
};

export const requestsApi = {
  getPending: () => api.get('/requests/pending'),
  approve: (id, data = {}) => api.post(`/requests/${id}/approve`, data),
  reject: (id, reason) => api.post(`/requests/${id}/reject`, { reason }),
};
