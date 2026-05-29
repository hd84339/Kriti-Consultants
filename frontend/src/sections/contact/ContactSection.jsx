import { motion } from 'framer-motion'
import { MapPin, Mail, Phone } from 'lucide-react'
import { slideLeft, slideRight, viewportOptions } from '../../animations/variants'
import { BRAND } from '../../constants'
import SectionLabel from '../../components/ui/SectionLabel'
import ContactForm from '../../components/ui/ContactForm'

export default function ContactSection() {
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
            <ContactForm theme="light" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
