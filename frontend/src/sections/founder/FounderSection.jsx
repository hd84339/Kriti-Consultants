import { motion } from 'framer-motion'
import { fadeUp, staggerContainer, staggerItem, viewportOptions } from '../../animations/variants'
import SectionLabel from '../../components/ui/SectionLabel'

const leaders = [
  {
    name: 'Savitri Shah',
    title: 'Founder & Principal Consultant',
    initials: 'SS',
    bio: 'A software graduate turned HR strategist, Savitri Shah has spent over two decades at the intersection of human systems and organizational design. As the author of "The Gita Code for Perfect Business", she brings a unique philosophical and practical lens to every engagement.',
    tags: ['Software Graduate', 'HR Strategist', 'Author & Speaker', 'Systems Thinking']
  },
  {
    name: 'Varun Pershad',
    title: 'Co-founder & Operations Director',
    initials: 'VP',
    bio: 'Varun Pershad is a veteran operations consultant specializing in process optimization, workflow engineering, and strategic execution. He bridges the gap between high-level visionary goals and operational reality through robust organizational architecture and alignment.',
    tags: ['Operations Engineer', 'Process Specialist', 'Workflow Design', 'Strategic Alignment']
  }
]

export default function FounderSection() {
  return (
    <section className="pt-36 pb-28 px-[4%] bg-[#FAF8F5] relative overflow-hidden bg-dots-light">
      {/* Top Wave (Transition from AI - #0B1120) */}
      <div className="absolute top-0 left-0 right-0 w-full overflow-hidden leading-[0] z-10 pointer-events-none">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="relative block w-full h-[60px] text-[#0B1120] fill-current">
          <path d="M0,32L120,42.7C240,53,480,75,720,74.7C960,75,1200,53,1320,42.7L1440,32L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-20">
        <motion.div 
          variants={fadeUp} 
          initial="hidden" 
          whileInView="visible" 
          viewport={viewportOptions} 
          className="text-center mb-16"
        >
          <SectionLabel centered>Our Leadership</SectionLabel>
          <h2 className="section-heading text-navy">Led by Systems Thinkers & Operational Engineers</h2>
          <p className="text-navy/65 text-base leading-relaxed mt-4 max-w-2xl mx-auto font-light">
            We bridge the gap between visionary goals and operational reality through robust HR frameworks, process optimization, and strategic alignment.
          </p>
        </motion.div>

        <motion.div 
          variants={staggerContainer} 
          initial="hidden" 
          whileInView="visible" 
          viewport={viewportOptions} 
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch mt-8"
        >
          {leaders.map((leader) => (
            <motion.div 
              key={leader.name}
              variants={staggerItem}
              className="flex flex-col sm:flex-row gap-8 items-start bg-white p-8 rounded-2xl border border-gold/20 shadow-md justify-between"
            >
              {/* Initials Card */}
              <div className="relative w-full sm:w-36 flex-shrink-0 mx-auto sm:mx-0">
                <div className="w-full aspect-[4/5] rounded-xl border flex items-center justify-center relative overflow-hidden"
                  style={{ background: 'linear-gradient(135deg, rgba(200,169,107,0.2) 0%, rgba(11,17,32,0.65) 100%)', borderColor: 'rgba(200,169,107,0.4)' }}>
                  <span className="font-serif text-6xl font-bold text-gold/30 tracking-tighter select-none">{leader.initials}</span>
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 flex flex-col justify-between h-full text-center sm:text-left mt-4 sm:mt-0">
                <div>
                  <span className="text-xs text-gold font-medium uppercase tracking-wider block mb-1">{leader.title}</span>
                  <h4 className="font-serif text-2xl font-bold text-navy mb-4">{leader.name}</h4>
                  <p className="text-navy/65 text-sm leading-relaxed mb-6 font-light">{leader.bio}</p>
                </div>
                <div className="flex flex-wrap gap-1.5 justify-center sm:justify-start">
                  {leader.tags.map((t) => (
                    <span key={t} className="text-[10px] px-2.5 py-1 rounded-full border text-navy/70 bg-white/50" style={{ borderColor: 'rgba(200,169,107,0.3)' }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
