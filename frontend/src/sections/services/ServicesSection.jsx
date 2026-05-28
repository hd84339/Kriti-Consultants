import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { staggerContainer, staggerItem, fadeUp, viewportOptions } from '../../animations/variants'
import { SERVICES } from '../../constants'
import SectionLabel from '../../components/ui/SectionLabel'

export default function ServicesSection() {
  return (
    <section className="pt-36 pb-28 px-[4%] relative overflow-hidden bg-dots-dark" id="services" style={{ background: 'rgba(255,255,255,0.02)' }}>
      {/* Top Slant (Transition from Problem - #FAF8F5) */}
      <div className="absolute top-0 left-0 right-0 w-full overflow-hidden leading-[0] z-10 pointer-events-none">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="relative block w-full h-[60px] text-[#FAF8F5] fill-current">
          <path d="M0,0 L1440,0 L1440,80 Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-20">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOptions} className="mb-14">
          <SectionLabel>What We Do</SectionLabel>
          <h2 className="section-heading">End-to-End Business Systems<br />Engineering</h2>
          <p className="section-sub max-w-xl">From clarity to scale — we architect the complete operational backbone your business needs to run without you.</p>
        </motion.div>
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOptions} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICES.map((s) => (
            <motion.div key={s.slug} variants={staggerItem}
              className="group relative bg-white/[0.03] border border-gold/20 rounded-xl p-7 transition-all duration-300 cursor-pointer hover:bg-gold/5 hover:border-gold/40 hover:-translate-y-1 overflow-hidden">
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              <div className="text-2xl mb-5">{s.icon}</div>
              <h4 className="font-serif text-base font-semibold text-white mb-2">{s.title}</h4>
              <p className="text-white/40 text-xs leading-relaxed mb-5">{s.desc}</p>
              <Link to="/services" className="text-gold text-xs tracking-wide flex items-center gap-1.5">Explore Service <span>→</span></Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
