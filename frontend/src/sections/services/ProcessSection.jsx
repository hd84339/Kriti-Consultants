import { motion } from 'framer-motion'
import { PROCESS_STEPS } from '../../constants'
import SectionLabel from '../../components/ui/SectionLabel'
import { fadeUp, viewportOptions } from '../../animations/variants'

export default function ProcessSection() {
  return (
    <section className="py-36 px-[4%] relative overflow-hidden bg-[#111726] bg-dots-dark">
      {/* Top Slant / Triangle Separator (Transition from CTA Section - #FAF8F5) */}
      <div className="absolute top-0 left-0 right-0 w-full overflow-hidden leading-[0] z-10 pointer-events-none">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="relative block w-full h-[60px] text-[#FAF8F5] fill-current">
          <path d="M0,0 L1440,0 L0,90 Z" />
        </svg>
      </div>

      {/* Glowing background blobs */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-gold/10 rounded-full blur-[130px] pointer-events-none z-0" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[130px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-20">
        <motion.div 
          variants={fadeUp} 
          initial="hidden" 
          whileInView="visible" 
          viewport={viewportOptions} 
          className="text-center mb-20"
        >
          <SectionLabel centered>Our Process</SectionLabel>
          <h2 className="section-heading text-white">How We Engineer Your Systems</h2>
          <p className="text-white/55 text-base leading-relaxed font-light mt-4 max-w-xl mx-auto font-light">
            We don't just deliver templates. We deploy a systematic 5-step operational engineering framework to guarantee adoption and scale.
          </p>
        </motion.div>

        {/* Process Timeline/Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 relative z-10">
          {PROCESS_STEPS.map((step, idx) => (
            <motion.div
              key={step.num}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOptions}
              transition={{ delay: idx * 0.1 }}
              className="group relative backdrop-blur-md bg-white/[0.02] border border-white/10 rounded-xl p-6 hover:bg-white/[0.05] hover:border-gold/30 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="absolute -top-3 -right-3 font-serif text-6xl font-bold text-white/5 group-hover:text-gold/10 transition-colors duration-300 pointer-events-none">
                {step.num}
              </div>
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-lg border border-gold/30 flex items-center justify-center font-serif text-lg font-bold text-gold mb-6 bg-gold/5">
                  {step.num}
                </div>
                <h4 className="text-base font-semibold text-white mb-2">{step.title}</h4>
                <p className="text-white/40 text-xs leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Wave (Transition to Footer - Dark Gray/Navy #111827) */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-[0] z-10 pointer-events-none">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="relative block w-full h-[60px] text-[#111827] fill-current">
          <path d="M0,96L120,85.3C240,75,480,53,720,53.3C960,53,1200,75,1320,85.3L1440,96L1440,120L1320,120C1200,120,960,120,720,120C480,120,240,120,120,120L0,120Z" />
        </svg>
      </div>
    </section>
  )
}
