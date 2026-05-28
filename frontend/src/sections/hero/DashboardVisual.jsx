import { motion } from 'framer-motion'
const bars = [35, 50, 40, 65, 55, 80, 100]
export default function DashboardVisual() {
  return (
    <div className="relative">
      <motion.div className="float-tag-1 absolute -top-5 -right-5 z-10 flex items-center gap-2 rounded-xl px-4 py-3 text-xs border border-gold/40"
        style={{ background: 'rgba(11,17,32,0.9)' }} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}>
        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" /><span className="text-white/70">Systems Active</span>
      </motion.div>
      <motion.div className="float-tag-2 absolute -bottom-5 -left-8 z-10 flex items-center gap-2 rounded-xl px-4 py-3 text-xs border border-gold/40"
        style={{ background: 'rgba(11,17,32,0.9)' }} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5 }}>
        <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" /><span className="text-white/70">AI Optimized</span>
      </motion.div>
      <div className="rounded-2xl p-6 border border-gold/20" style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(10px)' }}>
        <div className="flex justify-between items-center mb-5">
          <span className="text-white/40 text-xs tracking-widest uppercase">Business Health</span>
          <span className="text-xs px-3 py-1 rounded-full border text-green-400" style={{ background: 'rgba(34,197,94,0.1)', borderColor: 'rgba(34,197,94,0.2)' }}>
            Up 34%
          </span>
        </div>
        <div className="font-serif text-4xl font-bold text-white mb-1">2.4 Cr</div>
        <div className="text-white/35 text-xs mb-5">Revenue — Q4 2024</div>
        <div className="flex items-end gap-1.5 h-16 mb-5">
          {bars.map((h, i) => (
            <motion.div key={i} className="flex-1 rounded-t" style={{ background: i === 6 ? '#C8A96B' : 'rgba(200,169,107,0.3)' }}
              initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{ duration: 0.6, delay: 0.8 + i * 0.07, ease: 'easeOut' }} />
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[{label:'KPI Score',val:'94/100',color:'text-gold'},{label:'SOP Compliance',val:'97%',color:'text-blue-400'},{label:'Team Efficiency',val:'+41%',color:'text-white'},{label:'Systems Built',val:'12',color:'text-gold'}].map((m) => (
            <div key={m.label} className="rounded-xl p-3 border border-gold/10" style={{ background: 'rgba(255,255,255,0.03)' }}>
              <div className="text-white/35 text-[10px] tracking-widest uppercase mb-1">{m.label}</div>
              <div className={`text-xl font-semibold ${m.color}`}>{m.val}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
