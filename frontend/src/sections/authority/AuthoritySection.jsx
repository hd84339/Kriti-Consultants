import { motion } from 'framer-motion'
import { fadeUp, viewportOptions } from '../../animations/variants'

const AUTHORITIES = [
  { name: 'The Economic Times', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/98/The_Economic_Times_logo.svg' },
  { name: 'Business Standard', logo: 'https://upload.wikimedia.org/wikipedia/commons/6/68/The_Business_Standard_logo.svg' },
  { name: 'CNBC', logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e3/CNBC_logo.svg' },
  { name: 'MSN', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/MSN_logo_2014.svg/200px-MSN_logo_2014.svg.png' },
  { name: 'India Today', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/ab/India_Today_logo.png' }
]

export default function AuthoritySection() {
  return (
    <section className="py-12 px-[4%] bg-white border-y border-gold/10 relative z-20">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          variants={fadeUp} 
          initial="hidden" 
          whileInView="visible" 
          viewport={viewportOptions} 
          className="flex flex-col md:flex-row items-center justify-between gap-8 opacity-60 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-500"
        >
          <p className="text-sm font-semibold tracking-widest uppercase text-navy/50 whitespace-nowrap">Featured In</p>
          <div className="flex flex-wrap justify-center md:justify-end gap-x-12 gap-y-6 flex-1">
            {AUTHORITIES.map((auth, i) => (
              <div key={i} className="flex items-center justify-center h-10 w-32">
                <img src={auth.logo} alt={auth.name} className="max-h-full max-w-full object-contain mix-blend-multiply" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }} />
                <span className="font-serif text-xl font-bold text-navy/80 tracking-tight select-none hidden text-center">{auth.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
