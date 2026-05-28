import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
export default function Loader() {
  const [visible, setVisible] = useState(true)
  useEffect(() => { const t = setTimeout(() => setVisible(false), 1200); return () => clearTimeout(t) }, [])
  return (
    <AnimatePresence>
      {visible && (
        <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[999] flex items-center justify-center" style={{ background: '#0B1120' }}>
          <div className="text-center">
            <p className="loader-text font-serif text-5xl font-bold tracking-widest" style={{ color: '#C8A96B' }}>Kriti</p>
            <p className="text-white/30 text-xs tracking-[3px] uppercase mt-2">Freedom Through Frameworks</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
