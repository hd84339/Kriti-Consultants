import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BLOGS } from '../../constants/blogs'
import { useContactModal } from '../../context/ContactModalContext'
import SectionLabel from '../../components/ui/SectionLabel'
import CTASection from '../../sections/cta/CTASection'
import { Search, X, Calendar, Clock, User, ArrowRight, CheckCircle2 } from 'lucide-react'
import { fadeUp, staggerContainer, staggerItem, scaleIn, viewportOptions } from '../../animations/variants'

export default function Blog() {
  const { openModal } = useContactModal()
  const [selectedBlog, setSelectedBlog] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  // Categories extraction
  const categories = ['All', 'Business Systems', 'HR & Team', 'AI Consulting', 'Leadership', 'Case Studies']

  // Featured Blog (Blog 13 - Operational Efficiency Case Study)
  const featuredBlog = BLOGS.find(b => b.id === 'blog-13') || BLOGS[0]

  // Filtering blogs (excluding featured blog if desired, but we can show all)
  const filteredBlogs = BLOGS.filter(blog => {
    const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          blog.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          blog.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  // Open full blog reader
  const handleReadBlog = (blog) => {
    setSelectedBlog(blog)
    document.body.style.overflow = 'hidden' // Lock background scroll
  }

  // Close reader
  const handleCloseReader = () => {
    setSelectedBlog(null)
    document.body.style.overflow = 'unset' // Unlock scroll
  }

  return (
    <>
      {/* 1. HERO SECTION (Dark theme - #0B1120) */}
      <section className="pt-24 md:pt-48 pb-16 md:pb-32 px-[4%] relative overflow-hidden bg-[#0B1120] min-h-[50vh] flex items-center bg-dots-dark">
        {/* Glowing background blobs */}
        <div className="absolute top-1/4 left-1/10 w-80 h-80 bg-gold/10 rounded-full blur-[120px] pointer-events-none z-0" />
        <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-blue-500/10 rounded-full blur-[130px] pointer-events-none z-0" />

        <div className="max-w-7xl mx-auto text-center relative z-10 w-full">
          <motion.div variants={fadeUp} initial="hidden" animate="visible">
            <SectionLabel centered>Knowledge Hub</SectionLabel>
            <h1 className="font-serif font-bold leading-tight tracking-tight mb-6 text-white" style={{ fontSize: 'clamp(2.8rem, 5vw, 4.5rem)' }}>
              Strategic <em className="text-gold not-italic">Intelligence</em>
            </h1>
            <p className="text-white/60 text-lg leading-relaxed max-w-2xl mx-auto font-light">
              Actionable playbooks, case studies, and insights on operational engineering, HR frameworks, and AI workflows.
            </p>
          </motion.div>
        </div>

        {/* Shape Transition 1: Circular Curve (Dipping to #FAF8F5) */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-[0] z-10 pointer-events-none">
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="relative block w-full h-[50px] text-[#FAF8F5] fill-current">
            <path d="M0,0 C480,80 960,80 1440,0 L1440,120 L0,120 Z" />
          </svg>
        </div>
      </section>

      {/* 2. FEATURED POST SECTION (Cream theme - #FAF8F5) */}
      <section className="py-20 px-[4%] bg-[#FAF8F5] relative z-20">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            variants={fadeUp} 
            initial="hidden" 
            whileInView="visible" 
            viewport={viewportOptions}
            className="mb-10"
          >
            <SectionLabel>Featured Story</SectionLabel>
            <h2 className="section-heading text-navy">Operational Case Study</h2>
          </motion.div>

          {featuredBlog && (
            <motion.div 
              variants={scaleIn} 
              initial="hidden" 
              whileInView="visible" 
              viewport={viewportOptions}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-white rounded-3xl overflow-hidden border border-gold/15 shadow-xl hover:shadow-gold/5 transition-shadow duration-300"
            >
              {/* Left Column: Image */}
              <div className="lg:col-span-6 relative overflow-hidden group min-h-[300px] lg:min-h-full">
                <img 
                  src={featuredBlog.image} 
                  alt={featuredBlog.title} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent" />
                <span className="absolute top-6 left-6 px-4 py-1.5 bg-gold text-navy text-xs font-semibold tracking-wider uppercase rounded-full shadow-md">
                  {featuredBlog.category}
                </span>
              </div>

              {/* Right Column: Copy */}
              <div className="lg:col-span-6 p-8 lg:p-12 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 text-navy/45 text-xs mb-4">
                    <span className="flex items-center gap-1"><Calendar size={13} /> {featuredBlog.date}</span>
                    <span className="flex items-center gap-1"><Clock size={13} /> {featuredBlog.readTime}</span>
                    <span className="flex items-center gap-1"><User size={13} /> By {featuredBlog.author}</span>
                  </div>
                  <h3 className="font-serif text-3xl lg:text-4xl font-bold text-navy mb-4 leading-tight">
                    {featuredBlog.title}
                  </h3>
                  <p className="text-navy/65 text-base leading-relaxed mb-6 font-light">
                    {featuredBlog.desc}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {featuredBlog.tags.map(t => (
                      <span key={t} className="text-[10px] px-2.5 py-1 bg-[#FAF8F5] border border-navy/10 text-navy/70 rounded-full font-medium">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
                <button 
                  onClick={() => handleReadBlog(featuredBlog)}
                  className="btn-gold py-4 px-8 text-sm flex items-center justify-center gap-2 self-start hover:gap-3 transition-all duration-300"
                >
                  Read Case Study <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          )}
        </div>

        {/* Shape Transition 2: Triangular Slant (Slanting to Dark Grid #0B1120) */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-[0] z-10 pointer-events-none">
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="relative block w-full h-[60px] text-[#0B1120] fill-current">
            <path d="M0,0 L1440,90 L1440,120 L0,120 Z" />
          </svg>
        </div>
      </section>

      {/* 3. MAIN BLOG GRID SECTION (Dark theme - #0B1120) */}
      <section className="py-24 pb-40 px-[4%] relative overflow-hidden bg-[#0B1120] bg-dots-dark">
        {/* Glow overlay */}
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-gold/5 rounded-full blur-[120px] pointer-events-none z-0" />

        <div className="max-w-7xl mx-auto relative z-20">
          
          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-6 mb-16">
            
            {/* Category tabs */}
            <div className="flex flex-wrap gap-2 max-w-full overflow-x-auto pb-2 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2.5 rounded-full text-xs font-medium tracking-wide transition-all duration-300 border ${
                    selectedCategory === cat 
                      ? 'bg-gold border-gold text-navy shadow-lg shadow-gold/10' 
                      : 'bg-white/5 border-white/10 text-white/70 hover:border-gold/30 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative min-w-[280px] lg:min-w-[360px]">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/35" size={16} />
              <input
                type="text"
                placeholder="Search articles, tags, case studies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/15 rounded-full pl-12 pr-6 py-3.5 text-sm text-white placeholder-white/35 focus:outline-none focus:border-gold/50 focus:bg-white/10 transition-all duration-300"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white">
                  <X size={15} />
                </button>
              )}
            </div>

          </div>

          {/* Blogs Grid */}
          {filteredBlogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
              <AnimatePresence mode="popLayout">
                {filteredBlogs.map((blog, idx) => (
                  <motion.div
                    layout
                    key={blog.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3, delay: Math.min(idx * 0.05, 0.15) }}
                    whileHover={{ y: -8 }}
                    className="group glass-card p-0 hover:border-gold/45 cursor-pointer relative overflow-hidden flex flex-col justify-between h-full shadow-lg shadow-black/20 hover:shadow-gold/5 transition-all duration-300"
                    onClick={() => handleReadBlog(blog)}
                  >
                    <div>
                      {/* Card Image */}
                      <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-white/5">
                        <img 
                          src={blog.image} 
                          alt={blog.title} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                        <span className="absolute bottom-4 left-4 px-3 py-1 bg-white/10 backdrop-blur-md border border-white/15 text-white/80 text-[10px] uppercase font-semibold tracking-wider rounded-md">
                          {blog.category}
                        </span>
                      </div>

                      {/* Card Body */}
                      <div className="p-6">
                        <div className="flex items-center gap-3 text-white/35 text-[10px] mb-3">
                          <span className="flex items-center gap-1"><Calendar size={11} /> {blog.date}</span>
                          <span className="flex items-center gap-1"><Clock size={11} /> {blog.readTime}</span>
                        </div>
                        <h4 className="font-serif text-xl font-bold text-white mb-3 group-hover:text-gold transition-colors duration-300 leading-snug">
                          {blog.title}
                        </h4>
                        <p className="text-white/45 text-xs leading-relaxed line-clamp-3 mb-4 font-light">
                          {blog.desc}
                        </p>
                      </div>
                    </div>

                    {/* Card Footer */}
                    <div className="p-6 pt-0 border-t border-white/5 mt-auto flex items-center justify-between text-xs text-gold group-hover:text-white transition-colors duration-300 font-medium">
                      <span>Read Full Article</span>
                      <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div 
                initial={{ opacity: 0, y: 15 }} 
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                className="text-center py-20 bg-white/[0.01] border border-white/5 rounded-2xl p-8 relative z-10"
              >
                <p className="text-white/40 text-base">No articles found matching your criteria.</p>
                <button 
                  onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }} 
                  className="text-gold text-sm underline mt-3 hover:text-white transition-colors"
                >
                  Reset filters & search
                </button>
              </motion.div>
            </AnimatePresence>
          )}

        </div>

        {/* Shape Transition 3: Wavy Curve (Transition to CTA - Warm Cream #FAF8F5) */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-[0] z-10 pointer-events-none">
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="relative block w-full h-[60px] text-[#FAF8F5] fill-current">
            <path d="M0,96L120,85.3C240,75,480,53,720,53.3C960,53,1200,75,1320,85.3L1440,96L1440,120L1320,120C1200,120,960,120,720,120C480,120,240,120,120,120L0,120Z" />
          </svg>
        </div>
      </section>

      {/* 4. CALL TO ACTION SECTION */}
      <CTASection />

      {/* 5. INTERACTIVE SLIDE-OVER READER MODAL */}
      <AnimatePresence>
        {selectedBlog && (
          <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
            
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseReader}
              className="absolute inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
            />

            {/* Slide-over panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="relative w-full max-w-3xl h-full bg-[#0B1120] border-l border-gold/20 shadow-2xl flex flex-col z-10"
            >
              
              {/* Sticky reader header */}
              <div className="sticky top-0 bg-[#0B1120]/90 backdrop-blur-md border-b border-white/10 px-6 py-4 flex items-center justify-between z-30">
                <span className="text-[10px] uppercase font-bold tracking-widest text-gold bg-gold/10 px-3 py-1 rounded border border-gold/10">
                  {selectedBlog.category}
                </span>
                <button 
                  onClick={handleCloseReader}
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/20 transition-all duration-300"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Reader scrollable body */}
              <div className="flex-1 overflow-y-auto px-6 py-8 md:p-12 space-y-8 select-text">
                
                {/* Banner illustration */}
                <div className="w-full aspect-[2/1] rounded-2xl overflow-hidden border border-white/5 relative">
                  <img 
                    src={selectedBlog.image} 
                    alt={selectedBlog.title} 
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy to-transparent opacity-60" />
                </div>

                {/* Article Header info */}
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-white/40 font-light">
                    <span className="flex items-center gap-1.5"><Calendar size={13} className="text-gold" /> {selectedBlog.date}</span>
                    <span className="flex items-center gap-1.5"><Clock size={13} className="text-gold" /> {selectedBlog.readTime}</span>
                    <span className="flex items-center gap-1.5"><User size={13} className="text-gold" /> Written by {selectedBlog.author}</span>
                  </div>
                  <h2 className="font-serif text-3xl md:text-4xl font-bold text-white leading-tight">
                    {selectedBlog.title}
                  </h2>
                </div>

                {/* Article Content */}
                <div className="space-y-6 text-white/70 text-sm md:text-base leading-relaxed font-light">
                  <p className="text-white/95 text-base md:text-lg font-normal leading-relaxed border-l-2 border-gold pl-4 italic">
                    {selectedBlog.content.intro}
                  </p>

                  {selectedBlog.content.sections.map((sec, i) => (
                    <div key={i} className="space-y-2 pt-4">
                      <h3 className="font-serif text-xl font-semibold text-white tracking-wide">
                        {sec.heading}
                      </h3>
                      <p>{sec.body}</p>
                    </div>
                  ))}

                  {/* Pull Quote Block */}
                  {selectedBlog.content.quote && (
                    <blockquote className="my-10 p-8 rounded-2xl bg-white/[0.02] border border-gold/15 relative overflow-hidden">
                      <div className="absolute top-2 left-4 text-8xl font-serif text-gold/5 select-none pointer-events-none">&ldquo;</div>
                      <p className="font-serif text-lg md:text-xl italic text-gold relative z-10 leading-relaxed text-center">
                        "{selectedBlog.content.quote}"
                      </p>
                      <cite className="block text-right text-xs text-white/40 mt-4 not-italic font-light">— {selectedBlog.author}</cite>
                    </blockquote>
                  )}

                  {/* Metrics Table (Case Studies) */}
                  {selectedBlog.content.metrics && (
                    <div className="space-y-4 pt-6">
                      <h4 className="font-serif text-lg font-semibold text-white">Diagnostic Transformation Metrics</h4>
                      <div className="overflow-x-auto rounded-xl border border-white/10 bg-white/[0.01]">
                        <table className="w-full text-left border-collapse text-xs md:text-sm">
                          <thead>
                            <tr className="border-b border-white/15 bg-white/5">
                              <th className="p-4 font-semibold text-white/80">Operational Indicator</th>
                              <th className="p-4 font-semibold text-gold/80">Before Intervention</th>
                              <th className="p-4 font-semibold text-emerald-400/80">After Systems Build</th>
                            </tr>
                          </thead>
                          <tbody>
                            {selectedBlog.content.metrics.map((row, idx) => (
                              <tr key={idx} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                                <td className="p-4 text-white/70 font-light">{row.metric}</td>
                                <td className="p-4 text-white/55 font-light line-through decoration-red-500/50">{row.before}</td>
                                <td className="p-4 text-emerald-400 font-medium">{row.after}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* Actionable Checklists */}
                  {selectedBlog.content.takeaways && (
                    <div className="space-y-4 pt-6">
                      <h4 className="font-serif text-lg font-semibold text-white">Key Strategic Takeaways</h4>
                      <ul className="space-y-3">
                        {selectedBlog.content.takeaways.map((takeaway, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <CheckCircle2 size={18} className="text-gold flex-shrink-0 mt-0.5" />
                            <span className="text-white/75 text-sm font-light">{takeaway}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                </div>

                {/* Reader Footer Call-to-action */}
                <div className="pt-10 border-t border-white/10 flex flex-col items-center text-center space-y-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xl border border-gold/20 bg-gold/5">🚀</div>
                  <h4 className="font-serif text-xl font-bold text-white">Ready to deploy these frameworks?</h4>
                  <p className="text-white/45 text-xs max-w-md leading-relaxed font-light">
                    Every strategy is only as good as its operational adoption. Let us analyze your structural loopholes and build standard systems.
                  </p>
                  <button 
                    onClick={() => {
                      handleCloseReader()
                      openModal('', `I am interested in setting up frameworks similar to the ones discussed in: ${selectedBlog.title}`)
                    }}
                    className="btn-gold py-3 px-8 text-xs font-semibold tracking-wider"
                  >
                    Schedule Free Audit
                  </button>
                </div>

              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
