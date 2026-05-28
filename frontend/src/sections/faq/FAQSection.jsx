import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import { fadeUp, viewportOptions } from '../../animations/variants'
import { FAQS } from '../../constants'
import SectionLabel from '../../components/ui/SectionLabel'

function FAQItem({ q, a, open, onToggle }) {
  return (
    <div className="border-b border-gold/10">
      <button className="w-full flex justify-between items-center py-6 text-left gap-4" onClick={onToggle}>
        <span className="text-base font-medium text-white">{q}</span>
        <span className="text-gold flex-shrink-0">{open ? <Minus size={16} /> : <Plus size={16} />}</span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div key="a" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
            <p className="text-white/50 text-sm leading-relaxed pb-6">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null)
  return (
    <section className="py-36 px-[4%] relative overflow-hidden bg-[#0B1120] bg-dots-dark" id="faq">
      {/* Top Wave (Transition from Testimonials - White) */}
      <div className="absolute top-0 left-0 right-0 w-full overflow-hidden leading-[0] z-10 pointer-events-none">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="relative block w-full h-[60px] text-white fill-current">
          <path d="M0,40 C480,90 960,90 1440,40 L1440,0 L0,0 Z" />
        </svg>
      </div>

      {/* Glowing background blobs */}
      <div className="absolute top-12 left-1/4 w-96 h-96 bg-gold/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-12 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-20 my-6">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOptions} className="text-center mb-14">
          <SectionLabel centered>Common Questions</SectionLabel>
          <h2 className="section-heading text-white">Everything You Need to Know</h2>
        </motion.div>
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOptions} className="max-w-3xl mx-auto">
          {FAQS.map((faq, i) => (
            <FAQItem key={i} q={faq.q} a={faq.a} open={openIndex === i} onToggle={() => setOpenIndex(openIndex === i ? null : i)} />
          ))}
        </motion.div>
      </div>

      {/* Bottom Wave (Transition to Contact - Warm Cream #FAF8F5) */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-[0] z-10 pointer-events-none">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="relative block w-full h-[60px] text-[#FAF8F5] fill-current">
          <path d="M0,96L120,85.3C240,75,480,53,720,53.3C960,53,1200,75,1320,85.3L1440,96L1440,120L1320,120C1200,120,960,120,720,120C480,120,240,120,120,120L0,120Z" />
        </svg>
      </div>
    </section>
  )
}
