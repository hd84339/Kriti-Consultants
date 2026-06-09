import { motion } from 'framer-motion'
import { ChevronRight, ChevronLeft } from 'lucide-react'

export function Step1BusinessInfo({ data, updateData, onNext }) {
  const handleChange = (e) => {
    const { name, value } = e.target
    updateData({ ...data, [name]: value })
  }

  const handleNumericChange = (e) => {
    const { name, value } = e.target
    const val = value.replace(/[^0-9]/g, '')
    updateData({ ...data, [name]: val ? Number(val) : '' })
  }

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
      <div className="bg-[#111827] border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl max-w-3xl mx-auto">
        <h3 className="text-2xl font-bold text-white mb-2">Business Foundation</h3>
        <p className="text-white/60 mb-8">Tell us about your current operational scale to baseline the assessment.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-semibold text-white/80 mb-2 uppercase tracking-wider">Gross Monthly Revenue (₹)</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 font-bold">₹</span>
              <input
                type="text"
                name="revenue"
                inputMode="numeric"
                value={data.revenue || ''}
                onChange={handleNumericChange}
                className="w-full bg-white/5 border border-white/20 rounded-xl py-3 pl-10 pr-4 text-white font-bold focus:border-gold focus:ring-1 focus:ring-gold transition-all"
                placeholder="1500000"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-white/80 mb-2 uppercase tracking-wider">Number of Employees</label>
            <input
              type="text"
              name="employees"
              inputMode="numeric"
              value={data.employees || ''}
              onChange={handleNumericChange}
              className="w-full bg-white/5 border border-white/20 rounded-xl py-3 px-4 text-white font-bold focus:border-gold focus:ring-1 focus:ring-gold transition-all"
              placeholder="e.g., 25"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-white/80 mb-2 uppercase tracking-wider">Business Stage</label>
            <select
              name="stage"
              value={data.stage}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/20 rounded-xl py-3 px-4 text-white font-bold focus:border-gold focus:ring-1 focus:ring-gold transition-all appearance-none"
            >
              <option value="Startup" className="bg-navy-2">Startup</option>
              <option value="Growing" className="bg-navy-2">Growing</option>
              <option value="Scaling" className="bg-navy-2">Scaling</option>
              <option value="Established" className="bg-navy-2">Established</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-white/80 mb-2 uppercase tracking-wider">Industry Type</label>
            <input
              type="text"
              name="industry"
              value={data.industry || ''}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/20 rounded-xl py-3 px-4 text-white font-bold focus:border-gold focus:ring-1 focus:ring-gold transition-all"
              placeholder="e.g., Manufacturing"
            />
          </div>
        </div>

        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 mb-8">
          <label className="block text-sm font-semibold text-white mb-2 uppercase tracking-wider">Estimated Team Friction (%)</label>
          <p className="text-white/60 text-sm mb-4">What percentage of your team's potential is lost to miscommunication, delays, or lack of clear systems?</p>
          <div className="relative max-w-xs">
            <input
              type="text"
              name="friction"
              inputMode="numeric"
              value={data.friction || ''}
              onChange={(e) => {
                const val = e.target.value.replace(/[^0-9]/g, '');
                let num = val ? Number(val) : 0;
                if (num > 100) num = 100;
                updateData({ ...data, friction: num });
              }}
              className="w-full bg-white/5 border border-red-500/30 rounded-xl py-3 px-4 text-white font-bold focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 font-bold">%</span>
          </div>
        </div>

        <div className="flex justify-end mt-8 border-t border-white/10 pt-8">
          <button
            onClick={onNext}
            disabled={!data.revenue}
            className="flex items-center gap-2 bg-gold hover:bg-gold/90 text-navy-2 font-bold py-3 px-8 rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Start Assessment <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

const PILLARS = {
  strategicAlignment: {
    title: "Strategic Alignment",
    questions: [
      { id: 'vision', label: 'Vision Clarity' },
      { id: 'mission', label: 'Mission Alignment' },
      { id: 'goals', label: 'Goal Alignment Across Teams' }
    ]
  },
  marketPlanning: {
    title: "Market & Planning",
    questions: [
      { id: 'research', label: 'Market Research Process' },
      { id: 'budgeting', label: 'Budgeting Discipline' },
      { id: 'shortTerm', label: 'Short-Term Planning' },
      { id: 'longTerm', label: 'Long-Term Planning' }
    ]
  },
  talentInfrastructure: {
    title: "Talent Infrastructure",
    questions: [
      { id: 'recruitment', label: 'Structured Recruitment Process' },
      { id: 'jds', label: 'Written Job Descriptions' },
      { id: 'onboarding', label: 'Onboarding Process' },
      { id: 'roleClarity', label: 'Role Clarity' }
    ]
  },
  performanceSystems: {
    title: "Performance Systems",
    questions: [
      { id: 'kra', label: 'KRA Framework' },
      { id: 'kpi', label: 'KPI Tracking' },
      { id: 'pms', label: 'Performance Management System' },
      { id: 'feedback', label: 'Review & Feedback System' }
    ]
  }
}

export function Step2Assessment({ assessment, updateAssessment, onNext, onBack }) {
  const handleSliderChange = (pillar, questionId, value) => {
    updateAssessment({
      ...assessment,
      [pillar]: {
        ...assessment[pillar],
        [questionId]: Number(value)
      }
    })
  }

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
      <div className="bg-[#111827] border border-white/10 rounded-3xl p-6 md:p-12 shadow-2xl max-w-4xl mx-auto">
        <h3 className="text-2xl font-bold text-white mb-2">Systems Diagnosis</h3>
        <p className="text-white/60 mb-8">Rate your organization's maturity in the following areas from 0 (Non-existent) to 100 (Optimized).</p>

        <div className="space-y-12">
          {Object.entries(PILLARS).map(([pillarKey, pillarData]) => (
            <div key={pillarKey} className="bg-white/[0.02] border border-white/5 rounded-2xl p-6">
              <h4 className="text-lg font-bold text-gold mb-6 uppercase tracking-wider">{pillarData.title}</h4>
              <div className="space-y-6">
                {pillarData.questions.map((q) => (
                  <div key={q.id}>
                    <div className="flex justify-between items-end mb-2">
                      <label className="text-sm font-medium text-white/90">{q.label}</label>
                      <span className="text-xs font-bold text-white/50 bg-white/10 px-2 py-1 rounded">{assessment[pillarKey][q.id]}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={assessment[pillarKey][q.id]}
                      onChange={(e) => handleSliderChange(pillarKey, q.id, e.target.value)}
                      className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-gold"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between mt-12 border-t border-white/10 pt-8">
          <button onClick={onBack} className="flex items-center gap-2 text-white/50 hover:text-white transition-colors">
            <ChevronLeft size={18} /> Back
          </button>
          <button
            onClick={onNext}
            className="flex items-center gap-2 bg-gold hover:bg-gold/90 text-navy-2 font-bold py-3 px-8 rounded-full transition-all"
          >
            Calculate Health Score <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export function Step3LeadCapture({ leadInfo, updateLeadInfo, onSubmit, onBack, isSubmitting }) {
  const handleChange = (e) => {
    const { name, value } = e.target
    updateLeadInfo({ ...leadInfo, [name]: value })
  }

  const isValid = leadInfo.name && leadInfo.email && leadInfo.phone;

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}>
      <div className="bg-[#111827] border border-gold/20 rounded-3xl p-8 md:p-12 shadow-[0_0_50px_rgba(193,155,82,0.1)] max-w-xl mx-auto text-center">
        <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-3xl font-bold text-white mb-4">Your Report is Ready</h3>
        <p className="text-white/60 mb-8">Enter your details to unlock your Business Health Score, Operational Leakage analysis, and strategic recommendations.</p>

        <form className="space-y-4 text-left" onSubmit={(e) => { e.preventDefault(); if (isValid) onSubmit(); }}>
          <div>
            <label className="block text-xs font-semibold text-white/50 mb-1 uppercase tracking-widest">Full Name *</label>
            <input type="text" name="name" required value={leadInfo.name} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-white/50 mb-1 uppercase tracking-widest">Email Address *</label>
            <input type="email" name="email" required value={leadInfo.email} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-white/50 mb-1 uppercase tracking-widest">Phone Number *</label>
            <input type="tel" name="phone" required value={leadInfo.phone} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-white/50 mb-1 uppercase tracking-widest">Company Name</label>
            <input type="text" name="company" value={leadInfo.company} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all" />
          </div>

          <div className="pt-6">
            <button
              type="submit"
              disabled={!isValid || isSubmitting}
              className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-gold to-yellow-600 hover:from-yellow-500 hover:to-yellow-600 text-navy-2 font-bold py-4 px-8 rounded-xl shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Generating Report...' : 'Get My Audit Report'} <ChevronRight size={20} />
            </button>
          </div>
          <div className="text-center mt-4">
            <button type="button" onClick={onBack} className="text-white/40 text-sm hover:text-white transition-colors">
              Go Back
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  )
}
