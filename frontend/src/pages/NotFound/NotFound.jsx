import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { fadeUp } from '../../animations/variants'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-[4%]" style={{ background: '#0B1120' }}>
      <motion.div variants={fadeUp} initial="hidden" animate="visible" className="text-center">
        <p className="font-serif font-bold leading-none text-gold/20" style={{ fontSize: '9rem' }}>404</p>
        <h1 className="font-serif text-3xl font-bold text-white mb-4 -mt-4">Page Not Found</h1>
        <p className="text-white/45 text-base mb-8">This page does not exist — but your business systems can.</p>
        <Link to="/"><button className="btn-gold">Back to Home</button></Link>
      </motion.div>
    </div>
  )
}
