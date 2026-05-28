import { Link } from 'react-router-dom'
import { MapPin, Mail, Phone } from 'lucide-react'
import { BRAND, SERVICES } from '../../constants'

export default function Footer() {
  return (
    <footer className="bg-navy-2 border-t border-gold/10">
      <div className="max-w-7xl mx-auto px-[4%] pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <Link to="/" className="font-serif text-2xl font-bold text-white">Kriti <span className="text-gold">Consultants</span></Link>
            <p className="text-gold text-xs tracking-widest mt-2 mb-4">{BRAND.tagline}</p>
            <p className="text-white/40 text-sm leading-relaxed">Strategic consulting and organizational engineering for founders who want to scale without chaos.</p>
          </div>
          <div>
            <h5 className="text-white/40 text-xs tracking-widest uppercase mb-5">Quick Links</h5>
            <ul className="space-y-3">
              {[{label:'Home',to:'/'},{label:'About',to:'/about'},{label:'Services',to:'/services'},{label:'Contact',to:'/contact'}].map((l) => (
                <li key={l.label}><Link to={l.to} className="text-white/50 hover:text-gold text-sm transition-colors">{l.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="text-white/40 text-xs tracking-widest uppercase mb-5">Services</h5>
            <ul className="space-y-3">
              {SERVICES.slice(0, 5).map((s) => (
                <li key={s.slug}><Link to="/services" className="text-white/50 hover:text-gold text-sm transition-colors">{s.title}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="text-white/40 text-xs tracking-widest uppercase mb-5">Contact</h5>
            <div className="space-y-4">
              {BRAND.locations.map((loc) => (
                <div key={loc} className="flex items-start gap-2.5">
                  <MapPin size={14} className="text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-white/50 text-sm">{loc}</span>
                </div>
              ))}
              <div className="flex items-center gap-2.5">
                <Mail size={14} className="text-gold flex-shrink-0" />
                <a href={`mailto:${BRAND.email}`} className="text-white/50 hover:text-gold text-sm transition-colors">{BRAND.email}</a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone size={14} className="text-gold flex-shrink-0" />
                <a href={`tel:${BRAND.phone}`} className="text-white/50 hover:text-gold text-sm transition-colors">{BRAND.phone}</a>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-gold/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/25 text-xs">© {new Date().getFullYear()} Kriti Business Consultants. All rights reserved.</p>
          <p className="text-white/25 text-xs">Crafted with strategic precision.</p>
        </div>
      </div>
    </footer>
  )
}
