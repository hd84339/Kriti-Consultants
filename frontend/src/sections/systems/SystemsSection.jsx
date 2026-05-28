import { motion } from 'framer-motion'
import { staggerContainer, staggerItem, fadeUp, viewportOptions } from '../../animations/variants'
import { PROCESS_STEPS } from '../../constants'
import SectionLabel from '../../components/ui/SectionLabel'

export default function SystemsSection() {
  return (
    <section className="pt-36 pb-28 px-[4%] relative overflow-hidden bg-dots-dark" id="process">
      {/* Top Slant (Transition from Founder - #FAF8F5) */}
      <div className="absolute top-0 left-0 right-0 w-full overflow-hidden leading-[0] z-10 pointer-events-none">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="relative block w-full h-[60px] text-[#FAF8F5] fill-current">
          <path d="M0,0 L1440,0 L0,80 Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-20">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOptions} className="text-center mb-20">
          <SectionLabel centered>Our Process</SectionLabel>
          <h2 className="section-heading">How We Engineer Your<br />Business Transformation</h2>
        </motion.div>
        <div className="hidden lg:block relative">
          <motion.div className="absolute top-7 left-7 right-7 h-px" style={{ background: 'linear-gradient(90deg, #C8A96B, rgba(200,169,107,0.3), #C8A96B)' }}
            initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={viewportOptions} transition={{ duration: 1, ease: 'easeOut' }} />
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOptions} className="flex gap-0">
            {PROCESS_STEPS.map((step) => (
              <motion.div key={step.num} variants={staggerItem} className="flex-1 text-center relative z-10">
                <div className="w-14 h-14 rounded-full border-2 border-gold flex items-center justify-center mx-auto mb-5 font-serif text-xl font-bold text-gold" style={{ background: '#0B1120' }}>{step.num}</div>
                <h4 className="text-sm font-semibold text-white mb-2">{step.title}</h4>
                <p className="text-white/35 text-xs leading-relaxed px-2">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
        <div className="lg:hidden space-y-6">
          {PROCESS_STEPS.map((step, i) => (
            <motion.div key={step.num} variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOptions} transition={{ delay: i * 0.1 }} className="flex gap-5 items-start">
              <div className="w-12 h-12 rounded-full border-2 border-gold flex items-center justify-center flex-shrink-0 font-serif text-lg font-bold text-gold" style={{ background: '#0B1120' }}>{step.num}</div>
              <div className="pt-1"><h4 className="text-base font-semibold text-white mb-1">{step.title}</h4><p className="text-white/40 text-sm leading-relaxed">{step.desc}</p></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
