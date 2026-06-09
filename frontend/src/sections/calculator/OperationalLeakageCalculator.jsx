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
    let num = val ? Number(val) : 0
    if (num > 100) num = 100
    setFriction(num)
  }

  return (
    <section className="py-24 md:py-28 px-4 md:px-[4%] bg-[#0B1120] relative overflow-hidden w-full" id="calculator">
      <div className="absolute inset-0 bg-dots-dark opacity-30 pointer-events-none" />
      
      <div className="max-w-5xl mx-auto relative z-20 w-full">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOptions} className="text-center mb-12 md:mb-16">
          <SectionLabel centered>Reality Check</SectionLabel>
          <h2 className="section-heading text-white">Operational <span className="text-red-500">Leakage Calculator</span></h2>
          <p className="text-white/60 max-w-2xl mx-auto mt-4 text-base md:text-lg font-light">
            Easily calculate how much revenue you're losing to operational friction.
          </p>
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOptions} className="bg-[#111827] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row w-full max-w-4xl mx-auto">
          
          {/* Inputs Section */}
          <div className="w-full md:w-1/2 p-8 md:p-12 border-b md:border-b-0 md:border-r border-white/10">
            <h3 className="text-2xl font-bold text-white mb-8">Enter Your Numbers</h3>
            
            <div className="space-y-8">
              <div>
                <label className="block text-sm font-semibold text-white/80 mb-3 uppercase tracking-wider">Gross Monthly Revenue (₹)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 font-bold text-xl">₹</span>
                  <input 
                    type="text"
                    inputMode="numeric"
                    value={revenue || ''}
                    onChange={handleRevenueChange}
                    className="w-full bg-white/5 border border-white/20 rounded-xl py-4 pl-12 pr-4 text-white font-bold text-2xl focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-white/80 mb-3 uppercase tracking-wider">Estimated Team Friction (%)</label>
                <div className="relative">
                  <input 
                    type="text"
                    inputMode="numeric"
                    value={friction || ''}
                    onChange={handleFrictionChange}
                    className="w-full bg-white/5 border border-white/20 rounded-xl py-4 pl-5 pr-12 text-white font-bold text-2xl focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
                  />
                  <span className="absolute right-5 top-1/2 -translate-y-1/2 text-white/50 font-bold text-xl">%</span>
                </div>
                <p className="text-white/40 text-sm mt-3">E.g., delays, mistakes, or inefficiencies.</p>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="w-full md:w-1/2 p-8 md:p-12 relative overflow-hidden bg-gradient-to-br from-[#111827] to-[#0f141f]">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full aspect-square bg-red-600/10 rounded-full blur-[80px] pointer-events-none" />
            
            <div className="relative z-10 flex flex-col justify-center h-full space-y-10">
              <div>
                <h4 className="text-white/50 text-sm font-bold uppercase tracking-widest mb-3">Monthly Capital Leak</h4>
                <div className="text-4xl md:text-5xl font-bold text-red-400">
                  {formatCurrency(monthlyLeak)}
                </div>
              </div>

              <div className="pt-8 border-t border-white/10">
                <h4 className="text-white/50 text-sm font-bold uppercase tracking-widest mb-3">Annual Capital Leakage</h4>
                <div className="text-5xl md:text-6xl font-black text-red-500 tracking-tight mb-5">
                  {formatCurrency(annualLeakage)}
                </div>
                <p className="text-white/60 text-sm md:text-base leading-relaxed">
                  This is the cost of operating without clear systems. <span className="text-white font-medium">Plug this leak today.</span>
                </p>
              </div>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  )
}
