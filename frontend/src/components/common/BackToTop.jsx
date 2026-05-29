import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronUp } from 'lucide-react'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setVisible(true)
      } else {
        setVisible(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={scrollToTop}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-28 right-8 z-50 w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-md bg-[#0B1120]/65 border border-gold/30 text-gold hover:bg-gold hover:text-navy hover:border-gold shadow-lg shadow-black/35 cursor-pointer transition-colors duration-300"
          title="Back to Top"
        >
          <ChevronUp size={24} className="animate-bounce mt-0.5" style={{ animationDuration: '2s' }} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
