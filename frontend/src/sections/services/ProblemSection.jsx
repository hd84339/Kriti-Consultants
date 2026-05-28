import { motion } from 'framer-motion'
import { staggerContainer, staggerItem, fadeUp, viewportOptions } from '../../animations/variants'
import { PROBLEMS } from '../../constants'
import SectionLabel from '../../components/ui/SectionLabel'

import founderDependencyImg from '../../assets/images/founder_dependency.png'
import teamConfusionImg from '../../assets/images/team_confusion.png'
import noSopsImg from '../../assets/images/no_sops.png'
import lowAccountabilityImg from '../../assets/images/low_accountability.png'
import scalingChaosImg from '../../assets/images/scaling_chaos.png'
import poorKpiImg from '../../assets/images/poor_kpi.png'

const PROBLEM_IMAGES = [
  founderDependencyImg,
  teamConfusionImg,
  noSopsImg,
  lowAccountabilityImg,
  scalingChaosImg,
  poorKpiImg
]

export default function ProblemSection() {
  return (
    <section className="pt-36 pb-28 px-[4%] bg-[#FAF8F5] relative overflow-hidden bg-dots-light">
      {/* Top Wave (Transition from Trusted - #111726) */}
      <div className="absolute top-0 left-0 right-0 w-full overflow-hidden leading-[0] z-10 pointer-events-none">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="relative block w-full h-[65px] text-[#111726] fill-current">
          <path d="M0,0 L1440,0 L1440,50 C960,110 480,110 0,50 Z" />
        </svg>
      </div>
      <div className="max-w-7xl mx-auto">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOptions} className="mb-14">
          <SectionLabel>The Core Problem</SectionLabel>
          <h2 className="section-heading text-navy">Invisible Operational Leakage<br />Is Killing Business Growth</h2>
          <p className="text-navy/65 text-base leading-relaxed font-light mt-4 max-w-xl">Most founders work harder, not smarter — fighting fires daily while structural gaps quietly drain profits and energy.</p>
        </motion.div>
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOptions} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROBLEMS.map((p, idx) => (
            <motion.div key={p.title} variants={staggerItem} className="light-card p-0 group relative overflow-hidden flex flex-col">
              <div className="w-full aspect-[16/10] overflow-hidden relative border-b border-gold/15 bg-slate-50">
                <img 
                  src={PROBLEM_IMAGES[idx]} 
                  alt={p.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-gold/5 to-transparent" />
              </div>
              <div className="p-7 flex-1 flex flex-col justify-between">
                <div>
                  <div className="w-11 h-11 rounded-lg flex items-center justify-center text-xl mb-5 border border-gold/30" style={{ background: 'rgba(200,169,107,0.1)' }}>{p.icon}</div>
                  <h4 className="text-base font-semibold text-navy mb-2">{p.title}</h4>
                  <p className="text-navy/60 text-sm leading-relaxed">{p.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
