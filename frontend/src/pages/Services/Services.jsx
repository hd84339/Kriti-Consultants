import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { fadeUp, staggerContainer, staggerItem, viewportOptions } from '../../animations/variants'
import { SERVICES } from '../../constants'
import CTASection from '../../sections/cta/CTASection'
import SectionLabel from '../../components/ui/SectionLabel'
import { useContactModal } from '../../context/ContactModalContext'
import ProcessSection from '../../sections/services/ProcessSection'

export default function Services() {
  const { openModal } = useContactModal()

  return (
    <>
      <section className="pt-24 md:pt-40 pb-12 md:pb-24 px-[4%]">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div variants={fadeUp} initial="hidden" animate="visible">
            <SectionLabel centered>Our Services</SectionLabel>
            <h1 className="font-serif font-bold leading-tight tracking-tight mb-6" style={{ fontSize: 'clamp(2.8rem, 5vw, 4.5rem)' }}>
              Every Service We Offer Is<br />a <em className="text-gold not-italic">System Solution</em>
            </h1>
            <p className="text-white/55 text-lg leading-relaxed max-w-2xl mx-auto">We do not offer advice — we build operational infrastructure. Every engagement delivers tangible, documented, team-ready frameworks.</p>
          </motion.div>
        </div>
      </section>
      <section className="py-10 pb-36 px-[4%] relative overflow-hidden bg-dots-dark">
        <div className="max-w-7xl mx-auto relative z-20">
          {[
            { title: 'Business Consulting & Strategy', data: SERVICES.slice(0, 8) },
            { title: 'HR Consulting & Planning for Recruitment Strategies', data: SERVICES.slice(8) }
          ].map((section, idx) => (
            <div key={idx} className={idx === 0 ? "mb-16" : ""}>
              <div className="flex items-center gap-4 mb-8">
                <div className="h-px bg-gold/30 flex-1"></div>
                <h2 className="font-serif text-2xl md:text-3xl text-gold font-semibold text-center">{section.title}</h2>
                <div className="h-px bg-gold/30 flex-1"></div>
              </div>
              {idx === 1 ? (
                <>
                  <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOptions} className="grid grid-cols-1 md:grid-cols-3 auto-rows-[minmax(260px,auto)] gap-4 md:gap-6 mb-4 md:mb-6">
                    {section.data.slice(0, 4).map((s, i) => {
                      const gridClass = 
                        i === 0 ? "md:col-span-2 md:row-span-1" :
                        i === 1 ? "md:col-span-1 md:row-span-2" :
                        i === 2 ? "md:col-span-1 md:row-span-1" :
                        "md:col-span-1 md:row-span-1";
                      
                      const isWide = i === 0;
                      const isTall = i === 1;

                      return (
                        <motion.div key={s.slug} variants={staggerItem}
                          className={`group bg-[#F4F4F5] rounded-3xl overflow-hidden flex ${isWide ? 'flex-col md:flex-row' : 'flex-col'} ${gridClass} hover:-translate-y-1 transition-transform duration-300 shadow-lg shadow-black/10`}>
                          
                          {/* Image Section */}
                          <div className={`${isWide ? 'w-full md:w-2/5 h-48 md:h-full' : (isTall ? 'w-full h-48 md:h-56' : 'w-full h-32 md:h-40')} relative overflow-hidden bg-gray-200 shrink-0`}>
                            <img src={s.image} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                          </div>

                          {/* Text Section (Outside Image) */}
                          <div className={`p-6 md:p-8 flex flex-col ${isWide ? 'w-full md:w-3/5 justify-center' : 'w-full flex-1'}`}>
                            <div className="flex items-center gap-3 mb-4">
                              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-lg shadow-sm text-gray-900 border border-gray-100 shrink-0">{s.icon}</div>
                              <h3 className="font-serif text-xl font-bold text-gray-900 leading-snug">{s.title}</h3>
                            </div>
                            <p className={`text-gray-600 text-sm leading-relaxed mb-4 flex-1 ${isTall ? 'line-clamp-none' : 'line-clamp-3 md:line-clamp-4'}`}>{s.desc}</p>
                            <button onClick={() => openModal('', `I am interested in ${s.title}. `)} className="text-gray-900 font-semibold text-xs tracking-wide flex items-center gap-1.5 self-start hover:text-gold transition-colors mt-auto uppercase">Enquire <span className="group-hover:translate-x-1 transition-transform">→</span></button>
                          </div>
                        </motion.div>
                      )
                    })}
                  </motion.div>

                  {/* Executive Search (5th Card) - Half Height */}
                  {(() => {
                    const s = section.data[4];
                    return (
                      <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOptions}>
                        <motion.div variants={staggerItem}
                          className="group bg-[#F4F4F5] rounded-3xl overflow-hidden flex flex-col md:flex-row hover:-translate-y-1 transition-transform duration-300 shadow-lg shadow-black/10 md:h-52">
                          
                          <div className="w-full md:w-1/3 h-48 md:h-full relative overflow-hidden bg-gray-200 shrink-0">
                            <img src={s.image} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                          </div>

                          <div className="p-6 md:p-8 flex flex-col justify-center w-full md:w-2/3">
                            <div className="flex items-center gap-4 mb-3">
                              <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-xl shadow-sm text-gray-900 border border-gray-100 shrink-0">{s.icon}</div>
                              <h3 className="font-serif text-xl md:text-2xl font-bold text-gray-900 leading-snug">{s.title}</h3>
                            </div>
                            <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-4 line-clamp-3">{s.desc}</p>
                            <button onClick={() => openModal('', `I am interested in ${s.title}. `)} className="text-gray-900 font-semibold text-sm tracking-wide flex items-center gap-2 self-start hover:text-gold transition-colors mt-auto">Enquire Now <span className="group-hover:translate-x-1 transition-transform">→</span></button>
                          </div>
                        </motion.div>
                      </motion.div>
                    )
                  })()}
                </>
              ) : (
                <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOptions} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {section.data.map((s) => (
                    <motion.div key={s.slug} variants={staggerItem}
                      className="group glass-card p-0 hover:border-gold/45 hover:-translate-y-1.5 cursor-pointer relative overflow-hidden flex flex-col justify-between h-full shadow-lg shadow-black/20 hover:shadow-gold/5">
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                      
                      {/* Card Image */}
                      <div className="w-full aspect-[16/10] overflow-hidden relative border-b border-white/5 bg-[#0B1120]/50">
                        <img 
                          src={s.image} 
                          alt={s.title} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                        />
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-gold/5 to-transparent" />
                      </div>

                      {/* Card Info */}
                      <div className="p-6 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xl mb-4 border border-gold/20 bg-gold/5">{s.icon}</div>
                          <h3 className="font-serif text-xl font-semibold text-white mb-3">{s.title}</h3>
                          <p className="text-white/45 text-sm leading-relaxed mb-6">{s.desc}</p>
                        </div>
                        <button onClick={() => openModal('', `I am interested in ${s.title}. `)} className="text-gold text-sm tracking-wide flex items-center gap-2 bg-transparent border-none p-0 cursor-pointer self-start hover:text-white transition-colors">Enquire Now <span>→</span></button>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom Wave (Transition to CTA - Warm Cream #FAF8F5) */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-[0] z-10 pointer-events-none">
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="relative block w-full h-[60px] text-[#FAF8F5] fill-current">
            <path d="M0,96L120,85.3C240,75,480,53,720,53.3C960,53,1200,75,1320,85.3L1440,96L1440,120L1320,120C1200,120,960,120,720,120C480,120,240,120,120,120L0,120Z" />
          </svg>
        </div>
      </section>
      <CTASection />
      <ProcessSection />
    </>
  )
}
