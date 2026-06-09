import axios from 'axios'

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
})

API.interceptors.response.use(
  (res) => res.data,
  (err) => Promise.reject(new Error(err?.response?.data?.message || 'Something went wrong'))
)

export const submitContact = (data) => API.post('/contact', data)
export const submitApplication = (data) => API.post('/applications/submit', data)
export const getApplications = (token) => API.get('/applications/all', { headers: { Authorization: `Bearer ${token}` } })
export const updateApplicationStatus = (id, status, token) => API.patch(`/applications/${id}/status`, { status }, { headers: { Authorization: `Bearer ${token}` } })
export const deleteApplication = (id, token) => API.delete(`/applications/${id}`, { headers: { Authorization: `Bearer ${token}` } })
export const loginAdmin = (data) => API.post('/auth/login', data)
export const createAdmin = (data, token) => API.post('/admins/create', data, { headers: { Authorization: `Bearer ${token}` } })
export const getAllAdmins = (token) => API.get('/admins/all', { headers: { Authorization: `Bearer ${token}` } })

// Blog Endpoints
export const fetchBlogs = () => API.get('/blogs')
export const fetchBlogBySlug = (slug) => API.get(`/blogs/${slug}`)
export const createBlog = (data, token) => API.post('/blogs', data, { headers: { Authorization: `Bearer ${token}` } })
export const updateBlog = (id, data, token) => API.put(`/blogs/${id}`, data, { headers: { Authorization: `Bearer ${token}` } })
export const deleteBlog = (id, token) => API.delete(`/blogs/${id}`, { headers: { Authorization: `Bearer ${token}` } })
export const seedBlogs = (data, token) => API.post('/blogs/seed', data, { headers: { Authorization: `Bearer ${token}` } })

// Upload Endpoints
export const uploadImage = (formData, token) => API.post('/upload', formData, { 
  headers: { 
    Authorization: `Bearer ${token}`,
    'Content-Type': 'multipart/form-data' 
  } 
})

// Assessment Leads Endpoints
export const submitAssessmentLead = (data) => API.post('/assessment-leads', data)
export const getAssessmentLeads = (token) => API.get('/assessment-leads', { headers: { Authorization: `Bearer ${token}` } })
export const deleteAssessmentLead = (id, token) => API.delete(`/assessment-leads/${id}`, { headers: { Authorization: `Bearer ${token}` } })

export default API
