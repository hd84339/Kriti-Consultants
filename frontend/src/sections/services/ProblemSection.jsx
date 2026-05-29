import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { fadeUp, viewportOptions } from '../../animations/variants'
import { PROBLEMS } from '../../constants'
import SectionLabel from '../../components/ui/SectionLabel'
import useWindowSize from '../../hooks/useWindowSize'

import founderDependencyImg from '../../assets/images/founder_dependency.png'
import teamConfusionImg from '../../assets/images/team_confusion.png'
import noSopsImg from '../../assets/images/no_sops.png'
import lowAccountabilityImg from '../../assets/images/low_accountability.png'
import scalingChaosImg from '../../assets/images/scaling_chaos.png'
import poorKpiImg from '../../assets/images/poor_kpi.png'

const PROBLEM_IMAGES = [
  founderDependencyImg,
  teamConfusionImg,
  noSopsImg,
  lowAccountabilityImg,
  scalingChaosImg,
  poorKpiImg
]

export default function ProblemSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const size = useWindowSize()

  const getVisibleCards = () => {
    if (size.width >= 1024) return 3
    if (size.width >= 640) return 2
    return 1
  }

  const visibleCards = getVisibleCards()
  const maxIndex = Math.max(0, PROBLEMS.length - visibleCards)

  useEffect(() => {
    setCurrentIndex((prev) => Math.min(prev, maxIndex))
  }, [maxIndex])

  // Auto-play / Auto-slide effect
  useEffect(() => {
    if (maxIndex <= 0 || isHovered) return
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
    }, 4500)
    return () => clearInterval(interval)
  }, [maxIndex, isHovered])

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1))
  }

  const getTranslateStyle = () => {
    if (visibleCards === 3) {
      return `translateX(calc(-${currentIndex} * (100% / 3 + 8px)))`
    } else if (visibleCards === 2) {
      return `translateX(calc(-${currentIndex} * (100% / 2 + 12px)))`
    } else {
      return `translateX(calc(-${currentIndex} * (100% + 24px)))`
    }
  }

  return (
    <section className="pt-36 pb-28 px-[4%] bg-[#FAF8F5] relative overflow-hidden bg-dots-light">
      {/* Top Wave (Transition from Trusted - #111726) */}
      <div className="absolute top-0 left-0 right-0 w-full overflow-hidden leading-[0] z-10 pointer-events-none">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="relative block w-full h-[65px] text-[#111726] fill-current">
          <path d="M0,0 L1440,0 L1440,50 C960,110 480,110 0,50 Z" />
        </svg>
      </div>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOptions}>
            <SectionLabel>The Core Problem</SectionLabel>
            <h2 className="section-heading text-navy">Invisible Operational Leakage<br />Is Killing Business Growth</h2>
            <p className="text-navy/65 text-base leading-relaxed font-light mt-4 max-w-xl font-light">Most founders work harder, not smarter — fighting fires daily while structural gaps quietly drain profits and energy.</p>
          </motion.div>

          {/* Navigation Controls */}
          {maxIndex > 0 && (
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOptions}
              className="flex gap-3 mt-6 md:mt-0"
            >
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-navy disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-gold transition-all duration-300 cursor-pointer focus:outline-none"
                aria-label="Previous slide"
              >
                <ArrowLeft size={18} />
              </button>
              <button
                onClick={handleNext}
                disabled={currentIndex >= maxIndex}
                className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-navy disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-gold transition-all duration-300 cursor-pointer focus:outline-none"
                aria-label="Next slide"
              >
                <ArrowRight size={18} />
              </button>
            </motion.div>
          )}
        </div>

        {/* Carousel Window */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          className="overflow-hidden w-full relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div
            className="flex gap-6 transition-transform duration-500 ease-out"
            style={{ transform: getTranslateStyle() }}
          >
            {PROBLEMS.map((p, idx) => (
              <div
                key={p.title}
                className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] flex-shrink-0 light-card p-0 group relative overflow-hidden flex flex-col"
              >
                <div className="w-full aspect-[16/10] overflow-hidden relative border-b border-gold/15 bg-slate-50">
                  <img 
                    src={PROBLEM_IMAGES[idx]} 
                    alt={p.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-gold/5 to-transparent" />
                </div>
                <div className="p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="w-11 h-11 rounded-lg flex items-center justify-center text-xl mb-5 border border-gold/30" style={{ background: 'rgba(200,169,107,0.1)' }}>{p.icon}</div>
                    <h4 className="text-base font-semibold text-navy mb-2">{p.title}</h4>
                    <p className="text-navy/60 text-sm leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Dots indicators */}
        {maxIndex > 0 && (
          <div className="flex justify-center gap-2 mt-10">
            {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === idx ? 'w-8 bg-gold' : 'w-2 bg-gold/35 hover:bg-gold/50'
                } focus:outline-none border-none cursor-pointer`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
