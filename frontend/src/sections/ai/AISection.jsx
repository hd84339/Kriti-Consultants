import { motion } from 'framer-motion'
import { staggerContainer, staggerItem, fadeUp, viewportOptions } from '../../animations/variants'
import { AI_FEATURES } from '../../constants'
import SectionLabel from '../../components/ui/SectionLabel'

export default function AISection() {
  return (
    <section className="pt-36 pb-28 px-[4%] relative overflow-hidden bg-dots-dark" style={{ background: 'linear-gradient(180deg, rgba(37,99,235,0.06) 0%, #0B1120 60%)' }}>
      {/* Top Curve (Transition from Growth - #FAF8F5) */}
      <div className="absolute top-0 left-0 right-0 w-full overflow-hidden leading-[0] z-10 pointer-events-none">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="relative block w-full h-[60px] text-[#FAF8F5] fill-current">
          <path d="M0,0 L1440,0 L1440,60 C1080,90 720,90 0,60 Z" />
        </svg>
      </div>

      {/* Glowing blue background blob */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[150px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-20">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOptions} className="mb-14">
          <SectionLabel>AI-Powered Consulting</SectionLabel>
          <h2 className="section-heading">Modern Consulting<br />Powered By AI</h2>
          <p className="section-sub max-w-xl">We integrate cutting-edge AI tools into every engagement — delivering faster insights, sharper analysis, and automated execution at scale.</p>
        </motion.div>
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOptions} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {AI_FEATURES.map((f) => (
            <motion.div key={f.title} variants={staggerItem}
              className="relative rounded-xl p-7 border transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(37,99,235,0.2)' }}>
              <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(37,99,235,0.5), transparent)' }} />
              <div className="text-2xl mb-4">{f.icon}</div>
              <h4 className="text-base font-semibold text-white mb-2">{f.title}</h4>
              <p className="text-white/40 text-sm leading-relaxed mb-4">{f.desc}</p>
              <span className="text-xs px-3 py-1 rounded-full border tracking-wide" style={{ background: 'rgba(37,99,235,0.12)', color: '#93c5fd', borderColor: 'rgba(37,99,235,0.2)' }}>{f.tag}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
