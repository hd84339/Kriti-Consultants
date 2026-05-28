import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { fadeUp, staggerContainer, staggerItem, viewportOptions } from '../../animations/variants'
import { SERVICES } from '../../constants'
import CTASection from '../../sections/cta/CTASection'
import SectionLabel from '../../components/ui/SectionLabel'

export default function Services() {
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
      <section className="py-10 pb-28 px-[4%]">
        <div className="max-w-7xl mx-auto">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOptions} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((s) => (
              <motion.div key={s.slug} variants={staggerItem} className="group glass-card hover:border-gold/40 hover:-translate-y-1 cursor-pointer relative overflow-hidden">
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                <div className="text-3xl mb-5">{s.icon}</div>
                <h3 className="font-serif text-xl font-semibold text-white mb-3">{s.title}</h3>
                <p className="text-white/45 text-sm leading-relaxed mb-6">{s.desc}</p>
                <Link to="/contact" className="text-gold text-sm tracking-wide flex items-center gap-2">Enquire Now <span>→</span></Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      <CTASection />
    </>
  )
}
