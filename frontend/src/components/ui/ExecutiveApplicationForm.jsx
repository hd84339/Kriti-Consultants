import { useState } from 'react'
import { submitApplication } from '../../services/api'
import { BUSINESS_TYPES } from '../../constants'

const REVENUE_RANGES = [
  'Under ₹1 Crore',
  '₹1 Crore - ₹5 Crores',
  '₹5 Crores - ₹20 Crores',
  '₹20 Crores - ₹100 Crores',
  'Above ₹100 Crores'
]

const TEAM_SIZES = [
  '1-10 Employees',
  '11-50 Employees',
  '51-200 Employees',
  '200+ Employees'
]

export default function ExecutiveApplicationForm({ theme = 'light' }) {
  const [form, setForm] = useState({
    name: '',
    designation: '',
    mobile: '',
    company: '',
    industry: '',
    teamSize: '',
    revenue: '',
    bottleneck: ''
  })
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    setError('')
    try {
      await submitApplication(form)
      setStatus('success')
    } catch (err) {
      setStatus('error')
      setError(err.message || 'Something went wrong. Please try again.')
    }
  }

  const isDark = theme === 'dark'
  
  const inputClass = isDark
    ? 'w-full bg-[#111726] border border-gold/25 rounded-lg px-4 py-3 text-white text-sm placeholder-white/45 focus:outline-none focus:border-gold/50 focus:bg-[#0B1120] transition-all duration-300'
    : 'w-full bg-[#FAF8F5] border border-gold/25 rounded-lg px-4 py-3 text-navy text-sm placeholder-navy/45 focus:outline-none focus:border-gold/50 focus:bg-white transition-all duration-300'

  if (status === 'success') {
    return (
      <div className="text-center py-12">
        <div className="text-5xl mb-4">✓</div>
        <h3 className={`font-serif text-2xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-navy'}`}>Application Received</h3>
        <p className={`text-sm ${isDark ? 'text-white/60' : 'text-navy/60'}`}>Our executive team will review your application and contact you within 24 hours.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input className={inputClass} type="text" name="name" placeholder="Full Name *" value={form.name} onChange={handleChange} required />
        <input className={inputClass} type="text" name="designation" placeholder="Designation *" value={form.designation} onChange={handleChange} required />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input className={inputClass} type="tel" name="mobile" placeholder="Mobile Number *" value={form.mobile} onChange={handleChange} required />
        <input className={inputClass} type="text" name="company" placeholder="Company Name *" value={form.company} onChange={handleChange} required />
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        <select className={inputClass} name="industry" value={form.industry} onChange={handleChange} required>
          <option value="" disabled>Industry *</option>
          {BUSINESS_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <select className={inputClass} name="teamSize" value={form.teamSize} onChange={handleChange} required>
          <option value="" disabled>Team Size *</option>
          {TEAM_SIZES.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        <select className={inputClass} name="revenue" value={form.revenue} onChange={handleChange} required>
          <option value="" disabled>Revenue Range *</option>
          {REVENUE_RANGES.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      <textarea className={inputClass} name="bottleneck" placeholder="What is your biggest operational bottleneck right now? *" rows={4} value={form.bottleneck} onChange={handleChange} required style={{ resize: 'none' }} />
      
      {error && <p className="text-red-500 text-xs">{error}</p>}
      
      <button type="submit" disabled={status === 'loading'} className="btn-gold w-full py-4 text-sm mt-2" style={{ opacity: status === 'loading' ? 0.7 : 1 }}>
        {status === 'loading' ? 'Submitting...' : 'Apply For Consultation'}
      </button>
      <p className={`text-[10px] uppercase tracking-wider text-center mt-3 ${isDark ? 'text-white/40' : 'text-navy/40'}`}>Confidential Application</p>
    </form>
  )
}
