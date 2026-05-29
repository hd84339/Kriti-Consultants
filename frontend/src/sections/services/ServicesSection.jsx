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
              className="group relative backdrop-blur-md bg-white/[0.02] border border-white/10 rounded-xl p-0 transition-all duration-300 cursor-pointer hover:bg-white/[0.06] hover:border-gold/45 hover:-translate-y-1.5 overflow-hidden flex flex-col justify-between h-full shadow-lg shadow-black/20 hover:shadow-gold/5">
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              
              {/* Card Image */}
              <div className="w-full aspect-[16/10] overflow-hidden relative border-b border-white/5 bg-[#0B1120]/50">
                <img 
                  src={s.image} 
                  alt={s.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-gold/5 to-transparent" />
              </div>

              {/* Card Info */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xl mb-4 border border-gold/20 bg-gold/5">{s.icon}</div>
                  <h4 className="font-serif text-base font-semibold text-white mb-2">{s.title}</h4>
                  <p className="text-white/45 text-xs leading-relaxed mb-5">{s.desc}</p>
                </div>
                <Link to="/services" className="text-gold text-xs tracking-wide flex items-center gap-1.5 hover:text-white transition-colors">Explore Service <span>→</span></Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
