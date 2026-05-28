import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import useNavbarScroll from '../../hooks/useNavbarScroll'
import { NAV_LINKS } from '../../constants'

export default function Navbar() {
  const scrolled = useNavbarScroll(60)
  const [open, setOpen] = useState(false)
  return (
    <>
      <motion.nav initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-[4%] transition-all duration-300 ${scrolled ? 'py-3 bg-navy/90 backdrop-blur-xl border-b border-gold/10' : 'py-5'}`}>
        <Link to="/" className="font-serif text-2xl font-bold text-white">Kriti <span className="text-gold">Consultants</span></Link>
        <ul className="hidden lg:flex items-center gap-8 list-none">
          {NAV_LINKS.map((l) => (
            <li key={l.label}>
              <NavLink to={l.href} className={({ isActive }) => `text-sm tracking-wide transition-colors duration-300 ${isActive ? 'text-gold' : 'text-white/70 hover:text-gold'}`}>{l.label}</NavLink>
            </li>
          ))}
        </ul>
        <div className="hidden lg:flex items-center gap-3">
          <Link to="/contact"><button className="btn-outline text-xs py-2 px-4">Free Audit</button></Link>
          <Link to="/contact"><button className="btn-gold text-xs py-2 px-4">Book Consultation</button></Link>
        </div>
        <button className="lg:hidden text-white/70 hover:text-gold" onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </motion.nav>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="fixed top-16 left-0 right-0 z-40 bg-navy/95 backdrop-blur-xl border-b border-gold/10 lg:hidden">
            <div className="px-6 py-6 flex flex-col gap-5">
              {NAV_LINKS.map((l) => (
                <NavLink key={l.label} to={l.href} onClick={() => setOpen(false)} className="text-white/70 hover:text-gold text-base">{l.label}</NavLink>
              ))}
              <div className="flex flex-col gap-3 pt-2 border-t border-gold/10">
                <Link to="/contact" onClick={() => setOpen(false)}><button className="btn-outline w-full text-sm">Free Audit</button></Link>
                <Link to="/contact" onClick={() => setOpen(false)}><button className="btn-gold w-full text-sm">Book Consultation</button></Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
