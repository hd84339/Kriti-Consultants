import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Step1BusinessInfo, Step2Assessment, Step3LeadCapture } from './AssessmentSteps'
import ResultsDashboard from './ResultsDashboard'
import { submitAssessmentLead } from '../../services/api'
import SectionLabel from '../../components/ui/SectionLabel'
import { fadeUp, viewportOptions } from '../../animations/variants'

export default function BusinessHealthAssessment() {
  const [step, setStep] = useState(1)
  
  const [businessInfo, setBusinessInfo] = useState({ 
    revenue: 1500000, 
    employees: '', 
    stage: 'Growing', 
    industry: '', 
    friction: 45 
  })

  const [assessment, setAssessment] = useState({
    strategicAlignment: { vision: 50, mission: 50, goals: 50 },
    marketPlanning: { research: 50, budgeting: 50, shortTerm: 50, longTerm: 50 },
    talentInfrastructure: { recruitment: 50, jds: 50, onboarding: 50, roleClarity: 50 },
    performanceSystems: { kra: 50, kpi: 50, pms: 50, feedback: 50 },
  })

  const [leadInfo, setLeadInfo] = useState({ name: '', email: '', phone: '', company: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleNext = () => setStep(s => s + 1)
  const handleBack = () => setStep(s => s - 1)
  const handleReset = () => {
    setStep(1)
    setLeadInfo({ name: '', email: '', phone: '', company: '' })
  }

  const handleLeadSubmit = async () => {
    setIsSubmitting(true)

    // Calculate metrics
    const calcAvg = (obj) => Object.values(obj).reduce((a, b) => a + b, 0) / Object.values(obj).length
    const scores = {
      strategic: calcAvg(assessment.strategicAlignment),
      market: calcAvg(assessment.marketPlanning),
      talent: calcAvg(assessment.talentInfrastructure),
      performance: calcAvg(assessment.performanceSystems)
    }
    const overallScore = Math.round((scores.strategic + scores.market + scores.talent + scores.performance) / 4)

    let leakagePercent = 0
    if (assessment.talentInfrastructure.jds < 50) leakagePercent += 4
    if (assessment.performanceSystems.kra < 50 || assessment.performanceSystems.kpi < 50) leakagePercent += 7
    if (assessment.performanceSystems.pms < 50) leakagePercent += 5
    if (assessment.marketPlanning.budgeting < 50) leakagePercent += 4
    if (leakagePercent > 20) leakagePercent = 20

    const annualLeakage = Math.round(businessInfo.revenue * (leakagePercent / 100)) * 12

    const payload = {
      name: leadInfo.name,
      email: leadInfo.email,
      phone: leadInfo.phone,
      company: leadInfo.company,
      revenue: businessInfo.revenue,
      employees: businessInfo.employees || 0,
      stage: businessInfo.stage,
      industry: businessInfo.industry,
      overallScore,
      leakagePercentage: leakagePercent,
      annualLeakage
    }

    try {
      await submitAssessmentLead(payload)
    } catch (err) {
      console.error("Failed to submit lead", err)
    } finally {
      setIsSubmitting(false)
      handleNext()
    }
  }

  // Preload scroll to top on step change
  useEffect(() => {
    if (step > 1) {
      document.getElementById('assessment-anchor')?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [step])

  return (
    <section className="py-24 md:py-32 px-4 md:px-[4%] bg-[#0B1120] relative overflow-hidden w-full" id="calculator">
      <div id="assessment-anchor" className="absolute top-0" />
      <div className="absolute inset-0 bg-dots-dark opacity-30 pointer-events-none" />
      
      {/* Background glow behind dashboard */}
      {step === 4 && <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] aspect-square bg-gold/5 rounded-full blur-[150px] pointer-events-none z-0" />}

      <div className="max-w-7xl mx-auto relative z-20 w-full">
        {step < 4 && (
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOptions} className="text-center mb-12 md:mb-16">
            <SectionLabel centered>Free Diagnostic</SectionLabel>
            <h2 className="section-heading text-white max-w-4xl mx-auto leading-tight">
              Business Health & <span className="text-red-500">Operational Leakage</span> Assessment
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto mt-6 text-base md:text-lg font-light leading-relaxed">
              Most businesses focus on revenue while ignoring the systems that create sustainable growth. This assessment evaluates the health of your business across strategy, planning, people, and performance frameworks.
            </p>
          </motion.div>
        )}

        {/* Progress Bar */}
        {step < 4 && (
          <div className="max-w-md mx-auto mb-12 flex items-center justify-between relative">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-white/10 -translate-y-1/2 rounded-full" />
            <div className="absolute top-1/2 left-0 h-1 bg-gold -translate-y-1/2 rounded-full transition-all duration-500" style={{ width: `${((step - 1) / 2) * 100}%` }} />
            
            {[1, 2, 3].map(i => (
              <div key={i} className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-500 ${step >= i ? 'bg-gold text-navy-2' : 'bg-[#111827] text-white/40 border border-white/20'}`}>
                {i}
              </div>
            ))}
          </div>
        )}

        <AnimatePresence mode="wait">
          {step === 1 && (
            <Step1BusinessInfo key="step1" data={businessInfo} updateData={setBusinessInfo} onNext={handleNext} />
          )}
          {step === 2 && (
            <Step2Assessment key="step2" assessment={assessment} updateAssessment={setAssessment} onNext={handleNext} onBack={handleBack} />
          )}
          {step === 3 && (
            <Step3LeadCapture key="step3" leadInfo={leadInfo} updateLeadInfo={setLeadInfo} onSubmit={handleLeadSubmit} onBack={handleBack} isSubmitting={isSubmitting} />
          )}
          {step === 4 && (
            <ResultsDashboard key="step4" data={businessInfo} assessment={assessment} leadInfo={leadInfo} onReset={handleReset} />
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
