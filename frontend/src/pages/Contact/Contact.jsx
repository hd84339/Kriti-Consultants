import { motion } from 'framer-motion'
import { fadeUp } from '../../animations/variants'
import ContactSection from '../../sections/contact/ContactSection'
import SectionLabel from '../../components/ui/SectionLabel'

export default function Contact() {
  return (
    <>
      <section className="pt-48 pb-28 px-[4%] relative overflow-hidden bg-[#0B1120] bg-dots-dark">
        {/* Glowing background blobs */}
        <div className="absolute top-12 left-1/4 w-96 h-96 bg-gold/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-12 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto text-center relative z-20">
          <motion.div variants={fadeUp} initial="hidden" animate="visible">
            <SectionLabel centered>Contact Us</SectionLabel>
            <h1 className="font-serif font-bold leading-tight tracking-tight mb-6" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
              Let Us Start Your <em className="text-gold not-italic">Transformation</em>
            </h1>
            <p className="text-white/55 text-lg leading-relaxed max-w-xl mx-auto">
              Book a free 30-minute business audit — no commitment, no sales pitch. Just a clear diagnosis of your operational gaps.
            </p>
          </motion.div>
        </div>

        {/* Bottom Wave (Transition to Contact - Warm Cream #FAF8F5) */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-[0] z-10 pointer-events-none">
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="relative block w-full h-[60px] text-[#FAF8F5] fill-current">
            <path d="M0,96L120,85.3C240,75,480,53,720,53.3C960,53,1200,75,1320,85.3L1440,96L1440,120L1320,120C1200,120,960,120,720,120C480,120,240,120,120,120L0,120Z" />
          </svg>
        </div>
      </section>
      <ContactSection />
    </>
  )
}
