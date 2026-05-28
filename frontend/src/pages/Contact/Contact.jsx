import { motion } from 'framer-motion'
import { fadeUp } from '../../animations/variants'
import ContactSection from '../../sections/contact/ContactSection'
import SectionLabel from '../../components/ui/SectionLabel'

export default function Contact() {
  return (
    <>
      <section className="pt-40 pb-10 px-[4%]">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div variants={fadeUp} initial="hidden" animate="visible">
            <SectionLabel centered>Contact Us</SectionLabel>
            <h1 className="font-serif font-bold leading-tight tracking-tight mb-6" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
              Let Us Start Your <em className="text-gold not-italic">Transformation</em>
            </h1>
            <p className="text-white/55 text-lg leading-relaxed max-w-xl mx-auto">Book a free 30-minute business audit — no commitment, no sales pitch. Just a clear diagnosis of your operational gaps.</p>
          </motion.div>
        </div>
      </section>
      <ContactSection />
    </>
  )
}
