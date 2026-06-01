import { motion } from 'framer-motion'
import { staggerContainer, staggerItem, fadeUp, viewportOptions } from '../../animations/variants'
import { TESTIMONIALS } from '../../constants'
import SectionLabel from '../../components/ui/SectionLabel'

export default function TestimonialsSection() {
  return (
    <section className="pt-36 pb-28 px-[4%] bg-white relative overflow-hidden bg-dots-light">
      {/* Top Wave (Transition from Systems - #0B1120) */}
      <div className="absolute top-0 left-0 right-0 w-full overflow-hidden leading-[0] z-10 pointer-events-none">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="relative block w-full h-[65px] text-[#0B1120] fill-current">
          <path d="M0,32L120,42.7C240,53,480,75,720,74.7C960,75,1200,53,1320,42.7L1440,32L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-20">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOptions} className="mb-14">
          <SectionLabel>Proof of Velocity</SectionLabel>
          <h2 className="section-heading text-navy">Case Studies &<br />Client Results</h2>
        </motion.div>
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOptions} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <motion.div key={t.name} variants={staggerItem} whileHover={{ y: -4 }} className="light-card hover:border-gold/40 flex flex-col justify-between">
              <div>
                <div className="flex gap-2 mb-4 flex-wrap">
                  <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-1 rounded bg-slate-100 text-navy/60 border border-slate-200">{t.industry}</span>
                  <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-1 rounded bg-gold/10 text-gold border border-gold/20">{t.timeline}</span>
                </div>
                <h3 className="font-serif text-xl font-bold text-navy mb-3">{t.result}</h3>
                <p className="text-navy/70 text-sm leading-relaxed italic mb-6">"{t.text}"</p>
              </div>
              <div className="flex items-center gap-3 pt-5 border-t border-slate-100">
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm flex-shrink-0" style={{ background: 'linear-gradient(135deg, #9A7A40, #C8A96B)', color: '#0B1120' }}>{t.initials}</div>
                <div><div className="text-sm font-semibold text-navy">{t.name}</div><div className="text-navy/55 text-xs">{t.role}</div></div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
