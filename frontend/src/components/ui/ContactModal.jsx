import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useContactModal } from '../../context/ContactModalContext'
import ContactForm from './ContactForm'

export default function ContactModal() {
  const { isOpen, prefilledType, prefilledMessage, closeModal } = useContactModal()

  useEffect(() => {
    if (!isOpen) return
    const handleEscape = (e) => {
      if (e.key === 'Escape') closeModal()
    }
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleEscape)
    return () => {
      document.body.style.overflow = 'unset'
      window.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, closeModal])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="absolute inset-0 bg-black/65 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', duration: 0.4 }}
            className="relative w-full max-w-lg bg-[#0B1120] border border-gold/30 rounded-2xl p-6 sm:p-8 shadow-2xl z-10 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Glowing accents */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-gold/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors duration-200 focus:outline-none p-1 rounded-full hover:bg-white/5"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            {/* Header */}
            <div className="text-center mb-6 pr-4">
              <h3 className="font-serif text-2xl font-bold text-white mb-2">Book Free Consultation</h3>
              <p className="text-white/50 text-sm leading-relaxed">
                Identify operational gaps and build scalable frameworks with a free 30-minute business audit.
              </p>
            </div>

            {/* Reusable Form */}
            <ContactForm theme="dark" defaultBusinessType={prefilledType} defaultMessage={prefilledMessage} />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
