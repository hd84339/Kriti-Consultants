import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import useCounter from '../../hooks/useCounter'

function StatItem({ value, suffix, label, delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const count = useCounter(value, 2000, inView)
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay }} className="text-center">
      <div className="font-serif text-5xl font-bold text-gold leading-none">
        {typeof value === 'number' ? `${count}${suffix}` : value}
      </div>
      <div className="text-white/40 text-xs tracking-widest uppercase mt-2">{label}</div>
    </motion.div>
  )
}

export default function TrustedSection() {
  return (
    <div className="py-20 px-[4%] relative overflow-hidden bg-dots-dark" style={{ background: 'rgba(255,255,255,0.02)' }}>
      {/* Top Wave (Transition from Hero - #0B1120) */}
      <div className="absolute top-0 left-0 right-0 w-full overflow-hidden leading-[0] z-10 pointer-events-none">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="relative block w-full h-[50px] text-[#0B1120] fill-current">
          <path d="M0,0 L1440,0 L1440,50 C960,110 480,110 0,50 Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 relative z-20">
        <StatItem value={20} suffix="+" label="Years of Experience" delay={0} />
        <StatItem value={100} suffix="+" label="Businesses Guided" delay={0.1} />
        <StatItem value="HR & Ops" suffix="" label="Deep Expertise" delay={0.2} />
        <StatItem value="AI" suffix="" label="Workflow Integration" delay={0.3} />
      </div>
    </div>
  )
}
