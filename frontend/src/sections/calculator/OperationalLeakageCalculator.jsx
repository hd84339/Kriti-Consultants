import { useState } from 'react'
import { motion } from 'framer-motion'
import { fadeUp, viewportOptions } from '../../animations/variants'
import SectionLabel from '../../components/ui/SectionLabel'

export default function OperationalLeakageCalculator() {
  const [revenue, setRevenue] = useState(1500000)
  const [friction, setFriction] = useState(45)

  const monthlyLeak = Math.round(revenue * (friction / 100))
  const annualLeakage = monthlyLeak * 12

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value)
  }

  const handleRevenueChange = (e) => {
    const val = e.target.value.replace(/[^0-9]/g, '')
    setRevenue(val ? Number(val) : 0)
  }

  const handleFrictionChange = (e) => {
    const val = e.target.value.replace(/[^0-9]/g, '')
    setFriction(val ? Number(val) : 0)
  }

  return (
    <section className="py-24 md:py-28 px-4 md:px-[4%] bg-[#0B1120] relative overflow-hidden w-full" id="calculator">
      <div className="absolute inset-0 bg-dots-dark opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[600px] aspect-square bg-red-600/10 rounded-full blur-[100px] pointer-events-none z-0" />
      
      <div className="max-w-5xl mx-auto relative z-20 w-full">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOptions} className="text-center mb-12 md:mb-16">
          <SectionLabel centered>Reality Check</SectionLabel>
          <h2 className="section-heading text-white">Operational <span className="text-red-500">Leakage Calculator</span></h2>
          <p className="text-white/60 max-w-2xl mx-auto mt-4 text-base md:text-lg font-light">
            Calculate the invisible cost of operating without documented SOPs, clear KPIs, and robust business systems.
          </p>
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOptions} className="bg-[#111827]/80 border border-white/10 backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl w-full">
          <div className="flex flex-col w-full">
            
            {/* Desktop Header */}
            <div className="hidden md:flex items-center border-b border-white/10 bg-white/[0.02] w-full">
              <div className="w-[35%] py-5 px-8 text-white/70 font-semibold text-sm tracking-wide">Financial Performance Component</div>
              <div className="w-[30%] py-5 px-8 text-white/70 font-semibold text-sm tracking-wide">Impact Amount</div>
              <div className="w-[35%] py-5 px-8 text-white/70 font-semibold text-sm tracking-wide">Contextual Analysis</div>
            </div>

            {/* Row 1: Gross Monthly Revenue */}
            <div className="flex flex-col md:flex-row md:items-center border-b border-white/5 py-6 px-5 md:px-8 hover:bg-white/[0.02] transition-colors group gap-3 md:gap-0 w-full">
              <div className="w-full md:w-[35%]">
                <div className="md:hidden text-white/40 text-[10px] font-bold mb-1 uppercase tracking-widest">Component</div>
                <div className="text-white/90 font-medium text-lg md:text-base">Gross Monthly Revenue</div>
              </div>
              <div className="w-full md:w-[30%]">
                <div className="md:hidden text-white/40 text-[10px] font-bold mb-1 uppercase tracking-widest">Impact Amount</div>
                <div className="relative flex items-center md:max-w-[200px] w-full">
                  <span className="absolute left-4 text-white/50 font-medium">₹</span>
                  <input 
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={revenue || ''}
                    onChange={handleRevenueChange}
                    className="w-full bg-white/5 group-hover:bg-white/10 border border-white/10 rounded-lg py-3 md:py-2.5 pl-9 pr-4 text-white font-medium focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 transition-all text-lg md:text-base"
                  />
                </div>
              </div>
              <div className="w-full md:w-[35%]">
                <div className="md:hidden text-white/40 text-[10px] font-bold mb-1 uppercase tracking-widest">Analysis</div>
                <div className="text-white/50 text-sm md:pr-4">Baseline operational income</div>
              </div>
            </div>

            {/* Row 2: Estimated Team Friction */}
            <div className="flex flex-col md:flex-row md:items-center border-b border-white/5 py-6 px-5 md:px-8 hover:bg-white/[0.02] transition-colors group gap-3 md:gap-0 w-full">
              <div className="w-full md:w-[35%]">
                <div className="md:hidden text-white/40 text-[10px] font-bold mb-1 uppercase tracking-widest">Component</div>
                <div className="text-white/90 font-medium text-lg md:text-base">Estimated Team Friction</div>
              </div>
              <div className="w-full md:w-[30%]">
                <div className="md:hidden text-white/40 text-[10px] font-bold mb-1 uppercase tracking-widest">Impact Amount</div>
                <div className="relative flex items-center md:max-w-[200px] w-full">
                  <input 
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={friction || ''}
                    onChange={handleFrictionChange}
                    className="w-full bg-white/5 group-hover:bg-white/10 border border-white/10 rounded-lg py-3 md:py-2.5 pl-4 pr-10 text-white font-medium focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 transition-all text-lg md:text-base"
                  />
                  <span className="absolute right-4 text-white/50 font-medium">%</span>
                </div>
              </div>
              <div className="w-full md:w-[35%]">
                <div className="md:hidden text-white/40 text-[10px] font-bold mb-1 uppercase tracking-widest">Analysis</div>
                <div className="text-white/50 text-sm md:pr-4">Invisible output gap</div>
              </div>
            </div>

            {/* Row 3: Monthly Capital Leak */}
            <div className="flex flex-col md:flex-row md:items-center border-b border-white/5 py-6 px-5 md:px-8 hover:bg-white/[0.02] transition-colors bg-white/[0.01] gap-2 md:gap-0 w-full">
              <div className="w-full md:w-[35%]">
                <div className="md:hidden text-white/40 text-[10px] font-bold mb-1 uppercase tracking-widest">Component</div>
                <div className="text-white/90 font-medium text-lg md:text-base">Monthly Capital Leak</div>
              </div>
              <div className="w-full md:w-[30%]">
                <div className="text-red-400 font-semibold text-xl md:text-lg tracking-wide">{formatCurrency(monthlyLeak)}</div>
              </div>
              <div className="w-full md:w-[35%] mt-1 md:mt-0">
                <div className="text-white/50 text-sm md:pr-4">Direct profit erosion</div>
              </div>
            </div>

            {/* Row 4: Annual Capital Leakage */}
            <div className="flex flex-col md:flex-row md:items-center bg-gradient-to-r from-red-500/10 to-transparent border-y border-red-500/20 py-8 px-5 md:px-8 gap-3 md:gap-0 w-full">
              <div className="w-full md:w-[35%]">
                <div className="text-white font-bold text-xl md:text-lg tracking-wider">ANNUAL CAPITAL LEAKAGE</div>
              </div>
              <div className="w-full md:w-[30%]">
                <div className="text-red-500 font-bold text-3xl md:text-2xl tracking-wide">{formatCurrency(annualLeakage)}</div>
              </div>
              <div className="w-full md:w-[35%] mt-2 md:mt-0">
                <div className="text-white/80 text-sm md:pr-4">Total strategic opportunity cost</div>
              </div>
            </div>

            {/* Row 5: Strategic Action */}
            <div className="flex flex-col md:flex-row md:items-center bg-[#0B1120]/50 py-6 px-5 md:px-8 gap-3 md:gap-0 w-full">
              <div className="w-full md:w-[35%]">
                <div className="md:hidden text-white/40 text-[10px] font-bold mb-1 uppercase tracking-widest">Action</div>
                <div className="text-white/90 font-medium text-lg md:text-base">Strategic Action</div>
              </div>
              <div className="w-full md:w-[30%]">
                <div className="text-[#C19B52] font-semibold tracking-wide uppercase text-sm">Required</div>
              </div>
              <div className="w-full md:w-[35%] mt-2 md:mt-0">
                <div className="text-white/60 text-sm italic leading-relaxed md:pr-4">
                  This leak can be permanently plugged with structured SOPs & KPIs.<br className="hidden md:block"/>
                  <span className="md:hidden"> </span>Secure your strategic audit below.
                </div>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  )
}
