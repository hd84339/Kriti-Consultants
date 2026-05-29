import { motion } from 'framer-motion'
import { fadeUp, staggerContainer, staggerItem, viewportOptions } from '../../animations/variants'
import FounderSection from '../../sections/founder/FounderSection'
import CTASection from '../../sections/cta/CTASection'
import SectionLabel from '../../components/ui/SectionLabel'
import aboutHeaderBg from '../../assets/about_header_bg.png'

const values = [
  { icon: '🏛️', title: 'Systems First', desc: 'We believe every business problem has a systems solution. We engineer before we advise.' },
  { icon: '🤝', title: 'People-Centric', desc: 'Great systems are built for people. We design frameworks that human teams actually adopt.' },
  { icon: '📊', title: 'Data-Driven', desc: 'Every recommendation is grounded in measurable diagnostics, not assumptions or guesswork.' },
  { icon: '🚀', title: 'Scale-Ready', desc: 'We build for the business you are becoming, not just the one you have today.' },
]

export default function About() {
  return (
    <>
      <section className="pt-48 pb-32 px-[4%] relative overflow-hidden bg-[#0B1120] min-h-[55vh] flex items-center">
        {/* Background Image Overlay */}
        <div 
          className="absolute inset-0 z-0 pointer-events-none" 
          style={{ 
            backgroundImage: `url(${aboutHeaderBg})`, 
            backgroundSize: 'cover', 
            backgroundPosition: 'center', 
            opacity: 0.35 
          }} 
        />
        {/* Dark radial and vertical gradients for contrast */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent to-[#0B1120] opacity-80 z-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1120]/40 via-transparent to-[#0B1120] z-0" />

        {/* Section Curve Divider at Bottom */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-[0] z-10 pointer-events-none">
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="relative block w-full h-[40px] text-[#0b1120] fill-current">
            <path d="M0,0 Q720,80 1440,0 Z" className="transform scale-y-[-1] origin-center" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10 w-full">
          <motion.div variants={fadeUp} initial="hidden" animate="visible">
            <SectionLabel centered>About Us</SectionLabel>
            <h1 className="font-serif font-bold leading-tight tracking-tight mb-6" style={{ fontSize: 'clamp(2.8rem, 5vw, 4.5rem)' }}>
              We Are Organizational <em className="text-gold not-italic">Engineers</em>
            </h1>
            <p className="text-white/70 text-lg leading-relaxed max-w-3xl mx-auto font-light">
              Kriti Business Consultants is a premier strategic management firm dedicated to transforming businesses from &ldquo;hustle-driven&rdquo; operations into organized &ldquo;powerhouse&rdquo; entities. Led by Savitri Shah &amp; Varun Pershad, the firm specializes in organizational engineering. We bridge the gap between visionary goals and operational reality through robust HR frameworks, process optimization, and strategic alignment.
            </p>
          </motion.div>
        </div>
      </section>
      <section className="py-20 px-[4%]" style={{ background: 'rgba(255,255,255,0.02)' }}>
        <div className="max-w-7xl mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOptions} className="text-center mb-14">
            <SectionLabel centered>Our Values</SectionLabel>
            <h2 className="section-heading">What We Stand For</h2>
          </motion.div>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOptions} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (<motion.div key={v.title} variants={staggerItem} className="glass-card text-center"><div className="text-3xl mb-4">{v.icon}</div><h4 className="font-semibold text-white mb-2">{v.title}</h4><p className="text-white/40 text-sm leading-relaxed">{v.desc}</p></motion.div>))}
          </motion.div>
        </div>
      </section>
      <FounderSection />
      <CTASection />
    </>
  )
}
