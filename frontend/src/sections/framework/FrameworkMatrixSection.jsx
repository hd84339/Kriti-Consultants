import { motion } from 'framer-motion'
import { fadeUp, viewportOptions } from '../../animations/variants'
import SectionLabel from '../../components/ui/SectionLabel'
import { Check } from 'lucide-react'

const FRAMEWORKS = [
  {
    title: 'Process Engineering',
    items: ['SOP Development', 'Workflow Design', 'Department Structure'],
    icon: '⚙️'
  },
  {
    title: 'Performance Architecture',
    items: ['KRA Definition', 'KPI Frameworks', 'PMS Systems'],
    icon: '📈'
  },
  {
    title: 'Strategic Scaling',
    items: ['Retainership', 'Growth Planning', 'Leadership Systems'],
    icon: '🚀'
  }
]

export default function FrameworkMatrixSection() {
  return (
    <section className="py-24 px-[4%] bg-white relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOptions}>
            <SectionLabel>Strategic Outcomes</SectionLabel>
            <h2 className="section-heading text-navy">The Framework Matrix</h2>
            <p className="text-navy/65 max-w-2xl mx-auto mt-4 text-lg">
              We don't just deliver documents. We build structural pillars that hold your business up, so you don't have to.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {FRAMEWORKS.map((framework, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOptions}
              className="bg-[#FAF8F5] border border-gold/20 p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110" />
              <div className="text-4xl mb-6 relative z-10 bg-white w-16 h-16 flex items-center justify-center rounded-full border border-gold/20 shadow-sm">{framework.icon}</div>
              <h3 className="text-2xl font-semibold text-navy mb-6 relative z-10">{framework.title}</h3>
              <ul className="space-y-4 relative z-10">
                {framework.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <Check className="text-gold w-5 h-5 shrink-0 mt-1" />
                    <span className="text-navy/80 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
