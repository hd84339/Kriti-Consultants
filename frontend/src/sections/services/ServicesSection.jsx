import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { staggerContainer, staggerItem, fadeUp, viewportOptions } from '../../animations/variants'
import { SERVICES } from '../../constants'
import SectionLabel from '../../components/ui/SectionLabel'

export default function ServicesSection() {
  return (
    <section className="pt-36 pb-28 px-[4%] relative overflow-hidden bg-dots-dark" id="services" style={{ background: 'rgba(255,255,255,0.02)' }}>
      {/* Top Slant (Transition from Problem - #FAF8F5) */}
      <div className="absolute top-0 left-0 right-0 w-full overflow-hidden leading-[0] z-10 pointer-events-none">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="relative block w-full h-[60px] text-[#FAF8F5] fill-current">
          <path d="M0,0 L1440,0 L1440,80 Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-20">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOptions} className="mb-14">
          <SectionLabel>Tactical Implementations</SectionLabel>
          <h2 className="section-heading">What We Implement</h2>
          <p className="section-sub max-w-xl">The precise tools, systems, and frameworks we deploy to engineer your business for scale.</p>
        </motion.div>
        {[
          { title: 'Business Consulting & Strategy', data: SERVICES.slice(0, 8) },
          { title: 'HR Consulting & Planning for Recruitment Strategies', data: SERVICES.slice(8) }
        ].map((section, idx) => (
          <div key={idx} className={idx === 0 ? "mb-16" : ""}>
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px bg-gold/30 flex-1"></div>
              <h3 className="font-serif text-xl md:text-2xl text-gold font-semibold text-center">{section.title}</h3>
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
                        <div className={`relative overflow-hidden bg-gray-200 shrink-0 ${isWide ? 'w-full md:w-2/5 aspect-[16/10] md:aspect-auto md:h-full' : (isTall ? 'w-full aspect-[16/10] md:aspect-auto md:h-56' : 'w-full aspect-[16/10] md:aspect-auto md:h-40')}`}>
                          <img src={s.image} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        </div>

                        {/* Text Section (Outside Image) */}
                        <div className={`p-6 md:p-8 flex flex-col ${isWide ? 'w-full md:w-3/5 justify-center' : 'w-full flex-1'}`}>
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-lg shadow-sm text-gray-900 border border-gray-100 shrink-0">{s.icon}</div>
                            <h4 className="font-serif text-xl font-bold text-gray-900 leading-snug">{s.title}</h4>
                          </div>
                          <p className={`text-gray-600 text-sm leading-relaxed mb-4 flex-1 ${isTall ? 'line-clamp-none' : 'line-clamp-none md:line-clamp-4'}`}>{s.desc}</p>
                          <Link to="/services" className="text-gray-900 font-semibold text-xs tracking-wide flex items-center gap-1.5 self-start hover:text-gold transition-colors mt-auto uppercase">Explore Service <span className="group-hover:translate-x-1 transition-transform">→</span></Link>
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
                        
                        <div className="w-full md:w-1/3 aspect-[16/10] md:aspect-auto md:h-full relative overflow-hidden bg-gray-200 shrink-0">
                          <img src={s.image} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        </div>

                        <div className="p-6 md:p-8 flex flex-col justify-center w-full md:w-2/3">
                          <div className="flex items-center gap-4 mb-3">
                            <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-xl shadow-sm text-gray-900 border border-gray-100 shrink-0">{s.icon}</div>
                            <h4 className="font-serif text-xl md:text-2xl font-bold text-gray-900 leading-snug">{s.title}</h4>
                          </div>
                          <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-4 line-clamp-none md:line-clamp-3">{s.desc}</p>
                          <Link to="/services" className="text-gray-900 font-semibold text-sm tracking-wide flex items-center gap-2 self-start hover:text-gold transition-colors mt-auto">Explore Service <span className="group-hover:translate-x-1 transition-transform">→</span></Link>
                        </div>
                      </motion.div>
                    </motion.div>
                  )
                })()}
              </>
            ) : (
              <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOptions} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {section.data.map((s) => (
                  <motion.div key={s.slug} variants={staggerItem}
                    className="group relative backdrop-blur-md bg-white/[0.02] border border-white/10 rounded-xl p-0 transition-all duration-300 cursor-pointer hover:bg-white/[0.06] hover:border-gold/45 hover:-translate-y-1.5 overflow-hidden flex flex-col justify-between h-full shadow-lg shadow-black/20 hover:shadow-gold/5">
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
                        <h4 className="font-serif text-base font-semibold text-white mb-2">{s.title}</h4>
                        <p className="text-white/45 text-xs leading-relaxed mb-5 line-clamp-3">{s.desc}</p>
                      </div>
                      <Link to="/services" className="text-gold text-xs tracking-wide flex items-center gap-1.5 hover:text-white transition-colors mt-auto">Explore Service <span>→</span></Link>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
