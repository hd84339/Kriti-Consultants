import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { staggerContainer, staggerItem, slideRight } from '../../animations/variants'
import DashboardVisual from './DashboardVisual'
import heroBg from '../../assets/hero-team-bg.png'
import { useContactModal } from '../../context/ContactModalContext'

export default function HeroSection() {
  const particlesRef = useRef(null)
  const { openModal } = useContactModal()

  useEffect(() => {
    const container = particlesRef.current
    if (!container) return
    for (let i = 0; i < 25; i++) {
      const p = document.createElement('div')
      p.className = 'particle'
      p.style.cssText = `left:${Math.random()*100}%;animation-duration:${8+Math.random()*12}s;animation-delay:${Math.random()*15}s;width:${1+Math.random()*2}px;height:${1+Math.random()*2}px;`
      container.appendChild(p)
    }
    return () => { container.innerHTML = '' }
  }, [])

  return (
    <section className="min-h-screen flex items-center px-[4%] relative overflow-hidden bg-[#0B1120]">
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 1
        }}
        animate={{
          scale: [1.05, 1.15, 1.05],
          x: ['-2%', '2%', '-2%'],
          y: ['-2%', '2%', '-2%']
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'linear'
        }}
      />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 60% at 60% 40%, rgba(37,99,235,0.2) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 20% 70%, rgba(200,169,107,0.15) 0%, transparent 50%), rgba(11, 17, 32, 0.55)' }} />
      <div ref={particlesRef} className="absolute inset-0 overflow-hidden pointer-events-none z-10" />
      <div className="relative z-20 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center pt-24 pb-16">
        <motion.div variants={staggerContainer} initial="hidden" animate="visible">
          <motion.div variants={staggerItem} className="inline-flex items-center gap-2 border border-gold/40 bg-gold/10 px-4 py-2 rounded-full text-gold text-xs tracking-widest uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />Strategic Consulting Excellence
          </motion.div>
          <motion.h1 variants={staggerItem} className="font-serif font-bold leading-[1.1] tracking-tight mb-6" style={{ fontSize: 'clamp(2.8rem, 5vw, 4.5rem)' }}>
            Your Business Does Not Need More Hustle. It Needs <em className="text-gold not-italic">Systems.</em>
          </motion.h1>
          <motion.p variants={staggerItem} className="text-white/60 text-lg leading-relaxed font-light mb-8 max-w-xl">
            We help founders transform operational chaos into scalable business frameworks through SOPs, KPI systems, HR engineering, and AI-powered optimization.
          </motion.p>
          <motion.div variants={staggerItem} className="flex flex-wrap gap-4 mb-12">
            <button onClick={() => openModal()} className="btn-primary">Get Free Audit</button>
            <button onClick={() => openModal()} className="btn-secondary">Book Strategy Call</button>
          </motion.div>
          <motion.div variants={staggerItem} className="flex gap-10">
            {[{val:'20+',label:'Years Expertise'},{val:'100+',label:'Businesses Guided'},{val:'98%',label:'Client Retention'}].map((s) => (
              <div key={s.label} className="text-center">
                <strong className="block font-serif text-3xl font-bold text-gold">{s.val}</strong>
                <span className="text-white/40 text-xs tracking-wider uppercase mt-1 block">{s.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
        <motion.div variants={slideRight} initial="hidden" animate="visible" className="hidden lg:block">
          <DashboardVisual />
        </motion.div>
      </div>
    </section>
  )
}
