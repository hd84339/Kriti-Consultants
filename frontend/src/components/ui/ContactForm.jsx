import { useState, useEffect } from 'react'
import { submitContact } from '../../services/api'
import { BUSINESS_TYPES } from '../../constants'

export default function ContactForm({ theme = 'light', defaultBusinessType = '', defaultMessage = '', onSuccess }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', businessType: defaultBusinessType, message: defaultMessage })
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      businessType: defaultBusinessType || prev.businessType,
      message: defaultMessage || prev.message
    }))
  }, [defaultBusinessType, defaultMessage])

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    setError('')
    try {
      await submitContact(form)
      setStatus('success')
      setForm({ name: '', email: '', phone: '', businessType: defaultBusinessType, message: '' })
      if (onSuccess) onSuccess()
    } catch (err) {
      setStatus('error')
      setError(err.message || 'Something went wrong. Please try again.')
    }
  }

  const isDark = theme === 'dark'
  
  const inputClass = isDark
    ? 'w-full bg-[#111726] border border-gold/25 rounded-lg px-4 py-3 text-white text-sm placeholder-white/45 focus:outline-none focus:border-gold/50 focus:bg-[#0B1120] transition-all duration-300'
    : 'w-full bg-[#FAF8F5] border border-gold/25 rounded-lg px-4 py-3 text-navy text-sm placeholder-navy/45 focus:outline-none focus:border-gold/50 focus:bg-white transition-all duration-300'

  const selectColor = isDark
    ? (form.businessType ? 'text-white' : 'text-white/45')
    : (form.businessType ? 'text-navy' : 'text-navy/45')

  const labelClass = isDark ? 'text-white/60' : 'text-navy/60'
  const titleClass = isDark ? 'text-white' : 'text-navy'
  const textClass = isDark ? 'text-white/60' : 'text-navy/60'

  if (status === 'success') {
    return (
      <div className="text-center py-12">
        <div className="text-5xl mb-4">✅</div>
        <h3 className={`font-serif text-2xl font-semibold mb-2 ${titleClass}`}>Message Received!</h3>
        <p className={`text-sm ${textClass}`}>We will reach out within 24 hours to schedule your free audit.</p>
        <button onClick={() => setStatus('idle')} className="btn-gold mt-6 text-sm py-2.5 px-6">Send Another</button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input className={inputClass} type="text" name="name" placeholder="Full Name *" value={form.name} onChange={handleChange} required />
        <input className={inputClass} type="email" name="email" placeholder="Email Address *" value={form.email} onChange={handleChange} required />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input className={inputClass} type="tel" name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} />
        <select className={inputClass} name="businessType" value={form.businessType} onChange={handleChange} style={{ color: selectColor }}>
          <option value="" disabled>Business Type</option>
          {BUSINESS_TYPES.map((t) => (
            <option key={t} value={t} className={isDark ? 'bg-[#111726] text-white' : 'bg-white text-navy'}>
              {t}
            </option>
          ))}
        </select>
      </div>
      <textarea className={inputClass} name="message" placeholder="Tell us about your business challenges..." rows={4} value={form.message} onChange={handleChange} style={{ resize: 'none' }} />
      {error && <p className="text-red-500 text-xs">{error}</p>}
      <button type="submit" disabled={status === 'loading'} className="btn-gold w-full py-4 text-sm" style={{ opacity: status === 'loading' ? 0.7 : 1 }}>
        {status === 'loading' ? 'Sending...' : 'Get Free Business Audit'}
      </button>
      <p className={`text-xs text-center ${labelClass}`}>No spam. No commitment. Just clarity.</p>
    </form>
  )
}
