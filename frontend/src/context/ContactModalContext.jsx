import { createContext, useContext, useState } from 'react'

const ContactModalContext = createContext()

export function ContactModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  const [prefilledType, setPrefilledType] = useState('')
  const [prefilledMessage, setPrefilledMessage] = useState('')

  const openModal = (businessType = '', message = '') => {
    setPrefilledType(businessType)
    setPrefilledMessage(message)
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
    setPrefilledType('')
    setPrefilledMessage('')
  }

  return (
    <ContactModalContext.Provider value={{ isOpen, prefilledType, prefilledMessage, openModal, closeModal }}>
      {children}
    </ContactModalContext.Provider>
  )
}

export function useContactModal() {
  const context = useContext(ContactModalContext)
  if (context === undefined) {
    throw new Error('useContactModal must be used within a ContactModalProvider')
  }
  return context
}
