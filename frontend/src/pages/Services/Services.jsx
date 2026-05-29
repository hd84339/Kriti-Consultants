import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { fadeUp, staggerContainer, staggerItem, viewportOptions } from '../../animations/variants'
import { SERVICES } from '../../constants'
import CTASection from '../../sections/cta/CTASection'
import SectionLabel from '../../components/ui/SectionLabel'
import { useContactModal } from '../../context/ContactModalContext'
import ProcessSection from '../../sections/services/ProcessSection'

export default function Services() {
  const { openModal } = useContactModal()

  return (
    <>
      <section className="pt-40 pb-24 px-[4%]">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div variants={fadeUp} initial="hidden" animate="visible">
            <SectionLabel centered>Our Services</SectionLabel>
            <h1 className="font-serif font-bold leading-tight tracking-tight mb-6" style={{ fontSize: 'clamp(2.8rem, 5vw, 4.5rem)' }}>
              Every Service We Offer Is<br />a <em className="text-gold not-italic">System Solution</em>
            </h1>
            <p className="text-white/55 text-lg leading-relaxed max-w-2xl mx-auto">We do not offer advice — we build operational infrastructure. Every engagement delivers tangible, documented, team-ready frameworks.</p>
          </motion.div>
        </div>
      </section>
      <section className="py-10 pb-36 px-[4%] relative overflow-hidden bg-dots-dark">
        <div className="max-w-7xl mx-auto relative z-20">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOptions} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((s) => (
              <motion.div key={s.slug} variants={staggerItem}
                className="group glass-card p-0 hover:border-gold/45 hover:-translate-y-1.5 cursor-pointer relative overflow-hidden flex flex-col justify-between h-full shadow-lg shadow-black/20 hover:shadow-gold/5">
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
                    <h3 className="font-serif text-xl font-semibold text-white mb-3">{s.title}</h3>
                    <p className="text-white/45 text-sm leading-relaxed mb-6">{s.desc}</p>
                  </div>
                  <button onClick={() => openModal('', `I am interested in ${s.title}. `)} className="text-gold text-sm tracking-wide flex items-center gap-2 bg-transparent border-none p-0 cursor-pointer self-start hover:text-white transition-colors">Enquire Now <span>→</span></button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bottom Wave (Transition to CTA - Warm Cream #FAF8F5) */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-[0] z-10 pointer-events-none">
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="relative block w-full h-[60px] text-[#FAF8F5] fill-current">
            <path d="M0,96L120,85.3C240,75,480,53,720,53.3C960,53,1200,75,1320,85.3L1440,96L1440,120L1320,120C1200,120,960,120,720,120C480,120,240,120,120,120L0,120Z" />
          </svg>
        </div>
      </section>
      <CTASection />
      <ProcessSection />
    </>
  )
}
