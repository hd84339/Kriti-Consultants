import { motion } from 'framer-motion'
import { slideLeft, slideRight, viewportOptions } from '../../animations/variants'
import SectionLabel from '../../components/ui/SectionLabel'

const tags = ['Software Graduate', 'HR Strategist', 'Author & Speaker', 'AI Integration Expert', 'Organizational Engineering']

export default function FounderSection() {
  return (
    <section className="pt-36 pb-28 px-[4%] bg-[#FAF8F5] relative overflow-hidden bg-dots-light">
      {/* Top Wave (Transition from AI - #0B1120) */}
      <div className="absolute top-0 left-0 right-0 w-full overflow-hidden leading-[0] z-10 pointer-events-none">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="relative block w-full h-[60px] text-[#0B1120] fill-current">
          <path d="M0,32L120,42.7C240,53,480,75,720,74.7C960,75,1200,53,1320,42.7L1440,32L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-16 lg:gap-24 items-center relative z-20">
        <motion.div variants={slideLeft} initial="hidden" whileInView="visible" viewport={viewportOptions} className="relative max-w-sm mx-auto lg:mx-0 w-full">
          <div className="w-full aspect-[4/5] rounded-xl border flex items-center justify-center relative overflow-hidden shadow-md"
            style={{ background: 'linear-gradient(135deg, rgba(200,169,107,0.2) 0%, rgba(11,17,32,0.65) 100%)', borderColor: 'rgba(200,169,107,0.4)' }}>
            <span className="font-serif text-8xl font-bold text-gold/30 tracking-tighter select-none">SS</span>
            <div className="absolute bottom-0 left-0 right-0 h-2/5" style={{ background: 'linear-gradient(0deg, rgba(11,17,32,0.2), transparent)' }} />
          </div>
          <div className="absolute bottom-6 left-6 right-6 border rounded-xl p-4 shadow-lg" style={{ background: 'rgba(255,255,255,0.96)', borderColor: 'rgba(200,169,107,0.35)' }}>
            <h4 className="font-serif text-xl font-semibold text-navy">Savitri Shah</h4>
            <p className="text-navy/60 text-xs mt-0.5">Founder and Principal Consultant</p>
          </div>
        </motion.div>
        <motion.div variants={slideRight} initial="hidden" whileInView="visible" viewport={viewportOptions}>
          <SectionLabel>Our Founder</SectionLabel>
          <h2 className="section-heading text-navy mb-6">20+ Years of Transforming Businesses Through Systems Thinking</h2>
          <blockquote className="border-l-2 border-gold pl-6 my-8 font-serif text-xl italic text-navy/75 leading-relaxed">
            "Most businesses do not fail from lack of ambition — they collapse under the weight of disorganized ambition. Freedom comes when your framework runs the show."
          </blockquote>
          <p className="text-navy/65 text-base leading-relaxed">
            A software graduate turned HR strategist, Savitri Shah has spent over two decades at the intersection of human systems and organizational design. As the author of <em className="text-navy/85 font-medium">The Gita Code for Perfect Business</em>, she brings a unique philosophical and practical lens to every engagement.
          </p>
          <div className="flex flex-wrap gap-2.5 mt-8">
            {tags.map((t) => (<span key={t} className="text-xs px-4 py-2 rounded-full border text-navy/70 bg-white/50" style={{ borderColor: 'rgba(200,169,107,0.4)' }}>{t}</span>))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
