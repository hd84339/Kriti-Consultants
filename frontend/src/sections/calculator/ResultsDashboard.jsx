import { useRef } from 'react'
import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { Download, Calendar, TrendingDown } from 'lucide-react'

export default function ResultsDashboard({ data, assessment, leadInfo, onReset }) {
  const dashboardRef = useRef(null)

  // Calculations
  const calcAvg = (obj) => {
    const vals = Object.values(obj)
    return vals.reduce((a, b) => a + b, 0) / vals.length
  }

  const scores = {
    strategic: calcAvg(assessment.strategicAlignment),
    market: calcAvg(assessment.marketPlanning),
    talent: calcAvg(assessment.talentInfrastructure),
    performance: calcAvg(assessment.performanceSystems)
  }

  const overallScore = Math.round((scores.strategic + scores.market + scores.talent + scores.performance) / 4)

  const getStatus = (score) => {
    if (score < 40) return { label: 'CRITICAL DANGER ZONE', color: 'text-red-600', bg: 'bg-red-600' }
    if (score < 60) return { label: 'DANGER ZONE', color: 'text-red-500', bg: 'bg-red-500' }
    if (score < 80) return { label: 'WARNING ZONE', color: 'text-yellow-500', bg: 'bg-yellow-500' }
    return { label: 'HEALTHY ZONE', color: 'text-green-500', bg: 'bg-green-500' }
  }

  const status = getStatus(overallScore)

  // Leakage Rules
  // Job Descriptions below 50 = 4% Leakage
  // KRA/KPI below 50 = 7% Leakage
  // PMS below 50 = 5% Leakage
  // Budgeting below 50 = 4% Leakage
  let leakagePercent = 0
  if (assessment.talentInfrastructure.jds < 50) leakagePercent += 4
  if (assessment.performanceSystems.kra < 50 || assessment.performanceSystems.kpi < 50) leakagePercent += 7
  if (assessment.performanceSystems.pms < 50) leakagePercent += 5
  if (assessment.marketPlanning.budgeting < 50) leakagePercent += 4

  if (leakagePercent > 20) leakagePercent = 20

  // Optional: Also factor in the isolated Team Friction metric as an additional insight, but we keep it separate from structural leakage calculation as requested.
  const frictionLoss = Math.round(data.revenue * (data.friction / 100))

  const monthlyLeakage = Math.round(data.revenue * (leakagePercent / 100))
  const annualLeakage = monthlyLeakage * 12

  const formatCurrency = (val) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val)

  // Chart Data
  const chartData = [
    { name: 'Strategy', score: Math.round(scores.strategic) },
    { name: 'Planning', score: Math.round(scores.market) },
    { name: 'Talent', score: Math.round(scores.talent) },
    { name: 'Performance', score: Math.round(scores.performance) }
  ]

  const getRiskMessage = (score) => {
    if (score < 40) return "Your business is operating with significant structural weaknesses. Missing accountability systems, unclear roles, and weak planning processes are likely causing substantial revenue leakage and execution delays."
    if (score < 60) return "Your business has multiple operational gaps. While you are generating revenue, the lack of formalized systems is severely eating into your profit margins and heavily relying on founder intervention."
    if (score < 80) return "Your business has a solid foundation but contains operational gaps that may limit growth and profitability. Optimizing your performance and planning systems will unlock scale."
    return "Your business demonstrates strong operational maturity and alignment. You are well-positioned to scale predictably."
  }

  const getRecommendations = () => {
    const recs = []
    if (scores.strategic < 60) recs.push("Realign your leadership team around a crystal clear vision and cascade those goals down.")
    if (scores.market < 60) recs.push("Implement rigorous budgeting and short-term planning cycles to improve cash flow predictability.")
    if (scores.talent < 60) recs.push("Standardize Job Descriptions and onboarding to stop 'people leakage'.")
    if (scores.performance < 60) recs.push("Deploy a KRA/KPI framework immediately to shift from effort-based to outcome-based management.")
    if (recs.length === 0) recs.push("Continue refining your systems and begin exploring AI automation for further efficiency.")
    return recs
  }

  const handleDownloadPDF = async () => {
    if (!dashboardRef.current) return
    try {
      const canvas = await html2canvas(dashboardRef.current, { scale: 2, backgroundColor: '#0B1120' })
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF('p', 'mm', 'a4')
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
      pdf.save(`KritiBiz_Audit_${leadInfo.company || leadInfo.name.replace(' ', '_')}.pdf`)
    } catch (err) {
      console.error("Failed to generate PDF", err)
    }
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* PDF Export Wrapper */}
        <div ref={dashboardRef} className="bg-[#0B1120] text-white p-6 md:p-10 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-white/10 pb-8 mb-8 gap-6">
            <div>
              <h2 className="text-3xl font-bold mb-2">Business Health Report</h2>
              <p className="text-white/50">Prepared for: <span className="text-white font-medium">{leadInfo.name}</span> {leadInfo.company && `(${leadInfo.company})`}</p>
            </div>
            <div className="text-left md:text-right">
              <div className="text-sm text-white/50 uppercase tracking-widest font-bold mb-1">Status</div>
              <div className={`px-4 py-2 rounded-full font-bold text-sm inline-block bg-white/5 border border-white/10 ${status.color}`}>
                {status.label}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Score Card */}
            <div className="bg-[#111827] border border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center relative overflow-hidden group">
              <div className={`absolute top-0 w-full h-1 ${status.bg}`} />
              <div className="text-white/50 uppercase tracking-widest text-xs font-bold mb-4">Overall Score</div>
              <div className="relative">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/5" />
                  <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="8" fill="transparent"
                    strokeDasharray={377} strokeDashoffset={377 - (377 * overallScore) / 100}
                    className={`${status.color} transition-all duration-1000 ease-out`} />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="text-4xl font-black">{overallScore}</span>
                  <span className="text-xs text-white/40">/100</span>
                </div>
              </div>
            </div>

            {/* Financial Impact */}
            <div className="lg:col-span-2 bg-[#111827] border border-white/10 rounded-2xl p-8">
              <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wider">Structural Leakage Impact</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <div className="text-white/40 text-xs font-bold uppercase mb-1">Monthly Revenue</div>
                  <div className="text-xl font-medium">{formatCurrency(data.revenue)}</div>
                </div>
                <div>
                  <div className="text-red-400/80 text-xs font-bold uppercase mb-1">Structural Leakage</div>
                  <div className="text-xl font-bold text-red-400">{leakagePercent}%</div>
                </div>
                <div>
                  <div className="text-red-500 text-xs font-bold uppercase mb-1 flex items-center gap-1"><TrendingDown size={14} /> Annual Capital Leak</div>
                  <div className="text-3xl font-black text-red-500">{formatCurrency(annualLeakage)}</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-6">
                <div className="flex justify-between text-xs font-bold uppercase text-white/40 mb-2">
                  <span>Retained {100 - leakagePercent}%</span>
                  <span className="text-red-400">Lost {leakagePercent}%</span>
                </div>
                <div className="h-3 w-full bg-red-500/20 rounded-full overflow-hidden flex">
                  <div className="h-full bg-green-500 transition-all duration-1000" style={{ width: `${100 - leakagePercent}%` }} />
                  <div className="h-full bg-red-500 transition-all duration-1000" style={{ width: `${leakagePercent}%` }} />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Risk Analysis */}
            <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-8">
              <h3 className="text-lg font-bold text-gold mb-4 uppercase tracking-wider">Risk Analysis</h3>
              <p className="text-white/80 leading-relaxed text-sm">{getRiskMessage(overallScore)}</p>
              
              <h4 className="font-bold text-white mt-6 mb-3 text-sm">Strategic Recommendations:</h4>
              <ul className="space-y-2">
                {getRecommendations().map((rec, i) => (
                  <li key={i} className="flex gap-3 text-sm text-white/70 items-start">
                    <span className="text-gold mt-0.5">•</span> {rec}
                  </li>
                ))}
              </ul>
            </div>

            {/* Pillar Breakdown Chart */}
            <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-8">
              <h3 className="text-lg font-bold text-gold mb-6 uppercase tracking-wider">Pillar Breakdown</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} layout="vertical" margin={{ top: 0, right: 30, left: 0, bottom: 0 }}>
                    <XAxis type="number" domain={[0, 100]} hide />
                    <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }} width={80} />
                    <Tooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} contentStyle={{ backgroundColor: '#111827', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }} />
                    <Bar dataKey="score" radius={[0, 4, 4, 0]} barSize={20}>
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.score < 50 ? '#ef4444' : entry.score < 75 ? '#eab308' : '#22c55e'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Friction Insight (Isolated from structural leakage) */}
          {data.friction > 0 && (
            <div className="bg-red-500/5 border border-red-500/10 rounded-2xl p-6 text-center">
              <p className="text-white/60 text-sm">
                * Note: Based on your input, an additional <span className="text-red-400 font-bold">{formatCurrency(frictionLoss)}/mo</span> is potentially lost to team friction and poor communication outside of the structural gaps measured above.
              </p>
            </div>
          )}
        </div>

        {/* CTA Actions (Not part of PDF) */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
          <button onClick={handleDownloadPDF} className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold py-4 px-8 rounded-xl transition-all border border-white/10 w-full sm:w-auto justify-center">
            <Download size={20} /> Download PDF Report
          </button>
          <a href="/contact" className="flex items-center gap-2 bg-gold hover:bg-gold/90 text-navy-2 font-bold py-4 px-8 rounded-xl transition-all w-full sm:w-auto justify-center">
            <Calendar size={20} /> Book Strategic Audit
          </a>
        </div>
        
        <div className="text-center mt-8">
           <button onClick={onReset} className="text-white/40 text-sm hover:text-white transition-colors underline decoration-white/20 underline-offset-4">
             Start Over
           </button>
        </div>

      </div>
    </motion.div>
  )
}
