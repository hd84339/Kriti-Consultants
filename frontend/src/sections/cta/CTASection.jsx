import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { fadeUp, viewportOptions } from '../../animations/variants'
import SectionLabel from '../../components/ui/SectionLabel'
import ctaSystemsImg from '../../assets/images/cta_systems.png'

export default function CTASection() {
  return (
    <section className="pt-36 pb-28 px-[4%] relative overflow-hidden bg-[#FAF8F5] bg-dots-light">
      {/* Curve Separator between Contact and CTA */}
      <div className="absolute top-0 left-0 right-0 w-full overflow-hidden leading-[0] z-10 pointer-events-none">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="relative block w-full h-[40px] text-white fill-current opacity-60">
          <path d="M0,50 C480,100 960,100 1440,50 L1440,0 L0,0 Z" />
        </svg>
      </div>

      {/* Gradient light/blob background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-gradient-to-br from-gold/10 to-blue-500/10 rounded-full blur-[100px] pointer-events-none z-0" />

      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 70% 80% at 50% 50%, rgba(200,169,107,0.08) 0%, transparent 70%)' }} />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16 items-center relative z-20">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOptions} className="text-left py-6">
          <SectionLabel>Get Started Today</SectionLabel>
          <h2 className="font-serif font-bold leading-tight tracking-tight text-navy mb-6" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.8rem)' }}>
            Stop Managing Chaos.<br />Start Building Systems.
          </h2>
          <p className="text-navy/60 text-lg leading-relaxed mb-10 max-w-xl">Your next stage of growth is not about working harder. It is about building the frameworks that work for you — even when you are not in the room.</p>
          <div className="flex flex-wrap gap-4">
            <Link to="/contact"><button className="btn-primary text-base px-8 py-4">Book Free Consultation</button></Link>
            <Link to="/contact"><button className="border border-navy/20 text-navy bg-transparent px-8 py-4 rounded text-base font-medium tracking-wide transition-all duration-300 hover:border-navy/50 hover:bg-navy/5 cursor-pointer">Get Business Audit</button></Link>
          </div>
        </motion.div>
        
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOptions} className="relative w-full aspect-[4/3] rounded-2xl border border-gold/30 overflow-hidden shadow-lg shadow-gold/5 bg-white z-10">
          <img 
            src={ctaSystemsImg} 
            alt="Business Systems Transformation" 
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" 
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-gold/5 to-transparent pointer-events-none" />
        </motion.div>
      </div>
    </section>
  )
}
