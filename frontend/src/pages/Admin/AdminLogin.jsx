import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { fadeUp, viewportOptions } from '../../animations/variants'
import { loginAdmin } from '../../services/api' // Need to check if this exists or create it
import SectionLabel from '../../components/ui/SectionLabel'

export default function AdminLogin() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    setError('')
    try {
      const data = await loginAdmin(form)
      
      if (!data.success) {
        throw new Error(data.message || 'Login failed')
      }

      localStorage.setItem('adminToken', data.token)
      localStorage.setItem('adminUser', JSON.stringify(data.admin))
      setStatus('success')
      
      // Redirect to dashboard
      setTimeout(() => navigate('/admin/dashboard'), 1500)
    } catch (err) {
      setStatus('error')
      setError(err.message || 'Invalid credentials. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col justify-center py-20">
      <div className="max-w-md w-full mx-auto px-4 relative">
        
        {/* Glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gold/10 rounded-full blur-[80px] pointer-events-none" />

        <motion.div 
          variants={fadeUp} 
          initial="hidden" 
          animate="visible" 
          viewport={viewportOptions}
          className="bg-white p-8 sm:p-10 rounded-2xl shadow-xl border border-gold/20 relative z-10"
        >
          <div className="text-center mb-8">
            <SectionLabel centered>Secure Portal</SectionLabel>
            <h1 className="font-serif text-3xl font-bold text-navy mt-2">Admin Login</h1>
            <p className="text-navy/60 text-sm mt-3">Enter your credentials to access the dashboard.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-navy/70 text-xs font-semibold uppercase tracking-wider mb-2">Email Address</label>
              <input 
                type="email" 
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full bg-[#FAF8F5] border border-gold/20 rounded-lg px-4 py-3 text-navy text-sm placeholder-navy/40 focus:outline-none focus:border-gold/60 focus:bg-white transition-all"
                placeholder="admin@kriti.com"
              />
            </div>
            
            <div>
              <label className="block text-navy/70 text-xs font-semibold uppercase tracking-wider mb-2">Password</label>
              <input 
                type="password" 
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full bg-[#FAF8F5] border border-gold/20 rounded-lg px-4 py-3 text-navy text-sm placeholder-navy/40 focus:outline-none focus:border-gold/60 focus:bg-white transition-all"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center bg-red-500/10 py-2 rounded">{error}</p>
            )}

            {status === 'success' ? (
              <div className="text-green-600 text-center font-medium py-3 bg-green-500/10 rounded-lg border border-green-500/20">
                Login successful. Redirecting...
              </div>
            ) : (
              <button 
                type="submit" 
                disabled={status === 'loading'}
                className="btn-primary w-full py-3.5 mt-2 flex justify-center items-center"
              >
                {status === 'loading' ? 'Authenticating...' : 'Secure Login'}
              </button>
            )}
          </form>
          
        </motion.div>
      </div>
    </div>
  )
}
