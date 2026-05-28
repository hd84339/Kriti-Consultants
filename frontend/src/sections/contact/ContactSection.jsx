import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Mail, Phone } from 'lucide-react'
import { slideLeft, slideRight, viewportOptions } from '../../animations/variants'
import { submitContact } from '../../services/api'
import { BUSINESS_TYPES, BRAND } from '../../constants'
import SectionLabel from '../../components/ui/SectionLabel'

const ic = 'w-full bg-[#FAF8F5] border border-gold/25 rounded-lg px-4 py-3 text-navy text-sm placeholder-navy/45 focus:outline-none focus:border-gold/50 focus:bg-white transition-all duration-300'

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', businessType: '', message: '' })
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  const handleSubmit = async (e) => {
    e.preventDefault(); setStatus('loading'); setError('')
    try {
      await submitContact(form)
      setStatus('success')
      setForm({ name: '', email: '', phone: '', businessType: '', message: '' })
    } catch (err) { setStatus('error'); setError(err.message || 'Something went wrong. Please try again.') }
  }
  return (
    <section className="py-28 px-[4%] border-t border-gold/15 bg-[#FAF8F5]" id="contact">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <motion.div variants={slideLeft} initial="hidden" whileInView="visible" viewport={viewportOptions}>
          <SectionLabel>Get In Touch</SectionLabel>
          <h2 className="section-heading text-navy mb-6">Ready to Build Your<br />Business Systems?</h2>
          <p className="text-navy/65 text-base leading-relaxed mb-10">Start with a free 30-minute business audit. We will identify your top operational gaps and outline a clear path to scalable systems.</p>
          <div className="space-y-5">
            {BRAND.locations.map((loc) => (<div key={loc} className="flex items-start gap-4"><div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 border border-gold/30" style={{ background: 'rgba(200,169,107,0.1)' }}><MapPin size={14} className="text-gold" /></div><div><div className="text-navy/55 text-xs tracking-widest uppercase mb-0.5">Location</div><div className="text-navy/75 text-sm">{loc}</div></div></div>))}
            <div className="flex items-center gap-4"><div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 border border-gold/30" style={{ background: 'rgba(200,169,107,0.1)' }}><Mail size={14} className="text-gold" /></div><div><div className="text-navy/55 text-xs tracking-widest uppercase mb-0.5">Email</div><a href={`mailto:${BRAND.email}`} className="text-navy/75 text-sm hover:text-gold transition-colors">{BRAND.email}</a></div></div>
            <div className="flex items-center gap-4"><div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 border border-gold/30" style={{ background: 'rgba(200,169,107,0.1)' }}><Phone size={14} className="text-gold" /></div><div><div className="text-navy/55 text-xs tracking-widest uppercase mb-0.5">Phone</div><a href={`tel:${BRAND.phone}`} className="text-navy/75 text-sm hover:text-gold transition-colors">{BRAND.phone}</a></div></div>
          </div>
        </motion.div>
        <motion.div variants={slideRight} initial="hidden" whileInView="visible" viewport={viewportOptions}>
          <div className="rounded-2xl p-8 border border-gold/30 bg-white shadow-md">
            {status === 'success' ? (
              <div className="text-center py-12">
                <div className="text-5xl mb-4">✅</div>
                <h3 className="font-serif text-2xl font-semibold text-navy mb-2">Message Received!</h3>
                <p className="text-navy/60 text-sm">We will reach out within 24 hours to schedule your free audit.</p>
                <button onClick={() => setStatus('idle')} className="btn-gold mt-6 text-sm py-2.5 px-6">Send Another</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input className={ic} type="text" name="name" placeholder="Full Name *" value={form.name} onChange={handleChange} required />
                  <input className={ic} type="email" name="email" placeholder="Email Address *" value={form.email} onChange={handleChange} required />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input className={ic} type="tel" name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} />
                  <select className={ic} name="businessType" value={form.businessType} onChange={handleChange} style={{ color: form.businessType ? '#0B1120' : 'rgba(11,17,32,0.45)' }}>
                    <option value="" disabled>Business Type</option>
                    {BUSINESS_TYPES.map((t) => (<option key={t} value={t} style={{ background: '#ffffff', color: '#0B1120' }}>{t}</option>))}
                  </select>
                </div>
                <textarea className={ic} name="message" placeholder="Tell us about your business challenges..." rows={4} value={form.message} onChange={handleChange} style={{ resize: 'none' }} />
                {error && <p className="text-red-500 text-xs">{error}</p>}
                <button type="submit" disabled={status === 'loading'} className="btn-gold w-full py-4 text-sm" style={{ opacity: status === 'loading' ? 0.7 : 1 }}>
                  {status === 'loading' ? 'Sending...' : 'Get Free Business Audit'}
                </button>
                <p className="text-navy/40 text-xs text-center">No spam. No commitment. Just clarity.</p>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
