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
export default API
