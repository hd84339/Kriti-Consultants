import { motion } from 'framer-motion'
import { fadeUp, slideLeft, slideRight, viewportOptions } from '../../animations/variants'
import SectionLabel from '../../components/ui/SectionLabel'

const before = ['Founder makes every small decision','Team unclear on priorities and roles','No documented processes or SOPs','Performance reviews feel like guesswork','Growth creates more confusion','Reactive fire-fighting culture']
const after = ['Teams self-manage with clear frameworks','Everyone knows their KPIs and KRAs','Documented SOPs for every function','Data-driven performance culture','Systems scale ahead of growth','Proactive strategic decision-making']

export default function GrowthSection() {
  return (
    <section className="pt-36 pb-28 px-[4%] bg-[#FAF8F5] relative overflow-hidden bg-dots-light">
      {/* Top Layered Wave (Transition from Services - #111726) */}
      <div className="absolute top-0 left-0 right-0 w-full overflow-hidden leading-[0] z-10 pointer-events-none opacity-40">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="relative block w-full h-[70px] text-[#111726] fill-current">
          <path d="M0,50C240,70,480,90,720,85C960,80,1200,50,1320,35L1440,20L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z" />
        </svg>
      </div>
      <div className="absolute top-0 left-0 right-0 w-full overflow-hidden leading-[0] z-10 pointer-events-none">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="relative block w-full h-[55px] text-[#111726] fill-current">
          <path d="M0,32L120,42.7C240,53,480,75,720,74.7C960,75,1200,53,1320,42.7L1440,32L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z" />
        </svg>
      </div>

      {/* Decorative corner blobs */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-gold/5 rounded-full blur-[80px] pointer-events-none z-0" />
      <div className="absolute top-20 right-10 w-64 h-64 bg-blue-500/5 rounded-full blur-[80px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-20">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOptions} className="text-center mb-16">
          <SectionLabel centered>The Transformation</SectionLabel>
          <h2 className="section-heading text-navy">Before Kriti vs. After Kriti</h2>
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 items-center">
          <motion.div variants={slideLeft} initial="hidden" whileInView="visible" viewport={viewportOptions} className="bg-[#FFFDFD] border border-red-200/70 rounded-xl p-8 shadow-sm">
            <h3 className="text-lg font-semibold text-navy mb-6 flex items-center gap-3">
              Before Kriti
              <span className="text-xs px-3 py-1 rounded-full border font-sans animate-pulse" style={{ background: 'rgba(239,68,68,0.08)', color: '#dc2626', borderColor: 'rgba(239,68,68,0.2)' }}>Chaos Mode</span>
            </h3>
            <div className="space-y-3">{before.map((item) => (<div key={item} className="flex items-start gap-3 text-sm text-navy/70"><span className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0 mt-1.5" />{item}</div>))}</div>
          </motion.div>
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOptions} className="text-4xl text-gold text-center hidden lg:block">&#10230;</motion.div>
          <div className="text-4xl text-gold text-center lg:hidden">&#8595;</div>
          <motion.div variants={slideRight} initial="hidden" whileInView="visible" viewport={viewportOptions} className="border rounded-xl p-8 shadow-sm" style={{ background: 'rgba(200,169,107,0.06)', borderColor: 'rgba(200,169,107,0.45)' }}>
            <h3 className="text-lg font-semibold text-navy mb-6 flex items-center gap-3">
              After Kriti
              <span className="text-xs px-3 py-1 rounded-full border font-sans" style={{ background: 'rgba(200,169,107,0.15)', color: '#9A7A40', borderColor: 'rgba(200,169,107,0.25)' }}>Systems Mode</span>
            </h3>
            <div className="space-y-3">{after.map((item) => (<div key={item} className="flex items-start gap-3 text-sm text-navy/70"><span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0 mt-1.5" />{item}</div>))}</div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
