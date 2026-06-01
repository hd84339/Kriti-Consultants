import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { fadeUp, viewportOptions } from '../../animations/variants'
import SectionLabel from '../../components/ui/SectionLabel'

export default function OperationalLeakageCalculator() {
  const [employees, setEmployees] = useState(25)
  const [salary, setSalary] = useState(40000)
  const [hoursLost, setHoursLost] = useState(5)
  const [leakage, setLeakage] = useState(0)

  useEffect(() => {
    const hourlyRate = salary / 160
    const annualLeakage = hourlyRate * hoursLost * 52 * employees
    setLeakage(Math.round(annualLeakage))
  }, [employees, salary, hoursLost])

  return (
    <section className="py-28 px-[4%] bg-[#0B1120] relative overflow-hidden" id="calculator">
      <div className="absolute inset-0 bg-dots-dark opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[120px] pointer-events-none z-0" />
      
      <div className="max-w-5xl mx-auto relative z-20">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOptions} className="text-center mb-16">
          <SectionLabel centered>Reality Check</SectionLabel>
          <h2 className="section-heading text-white">Calculate Your Annual<br /><span className="text-red-500">Operational Leakage</span></h2>
          <p className="text-white/60 max-w-2xl mx-auto mt-4 text-lg font-light">
            Without systems, your team wastes time waiting for approvals, searching for information, or redoing work. See what that costs you every year.
          </p>
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOptions} className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-8 md:p-12 shadow-2xl">
          <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-center">
            <div className="space-y-10">
              <div>
                <label className="block text-white/70 text-sm font-semibold mb-4 tracking-wide">Number of Employees</label>
                <input 
                  type="range" min="1" max="200" value={employees} onChange={(e) => setEmployees(Number(e.target.value))}
                  className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-gold"
                />
                <div className="flex justify-between text-white/40 text-xs mt-3">
                  <span>1</span>
                  <span className="text-white text-xl font-bold bg-white/10 px-4 py-1 rounded-md">{employees}</span>
                  <span>200</span>
                </div>
              </div>

              <div>
                <label className="block text-white/70 text-sm font-semibold mb-4 tracking-wide">Average Monthly Salary (₹)</label>
                <input 
                  type="range" min="15000" max="200000" step="5000" value={salary} onChange={(e) => setSalary(Number(e.target.value))}
                  className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-gold"
                />
                <div className="flex justify-between text-white/40 text-xs mt-3">
                  <span>₹15k</span>
                  <span className="text-white text-xl font-bold bg-white/10 px-4 py-1 rounded-md">₹{salary.toLocaleString()}</span>
                  <span>₹200k</span>
                </div>
              </div>

              <div>
                <label className="block text-white/70 text-sm font-semibold mb-4 tracking-wide">Hours Lost Weekly (Per Employee)</label>
                <input 
                  type="range" min="1" max="20" value={hoursLost} onChange={(e) => setHoursLost(Number(e.target.value))}
                  className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-red-500"
                />
                <div className="flex justify-between text-white/40 text-xs mt-3">
                  <span>1 hr</span>
                  <span className="text-red-400 text-xl font-bold bg-red-500/10 px-4 py-1 rounded-md border border-red-500/20">{hoursLost} hrs</span>
                  <span>20 hrs</span>
                </div>
              </div>
            </div>

            <div className="bg-black/60 rounded-xl p-10 border border-white/5 text-center flex flex-col justify-center h-full min-w-[320px] relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-b from-red-500/5 to-transparent pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-4 block relative z-10">Estimated Annual Loss</span>
              <div className="text-5xl md:text-7xl font-bold text-red-500 font-serif tabular-nums tracking-tighter relative z-10 mb-2">
                ₹{(leakage / 100000).toFixed(1)}<span className="text-3xl md:text-4xl">L</span>
              </div>
              <div className="text-white/60 text-sm font-mono mb-8 relative z-10">≈ ₹{leakage.toLocaleString()}</div>
              
              <div className="w-full h-px bg-white/10 mb-6 relative z-10" />
              
              <p className="text-white/40 text-xs leading-relaxed relative z-10">
                This is the invisible cost of operating without documented SOPs, clear KPIs, and robust business systems.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
