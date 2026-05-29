import sopImg from '../assets/images/sop_development.png'
import kraImg from '../assets/images/kra_kpi.png'
import pmsImg from '../assets/images/pms_implementation.png'
import auditImg from '../assets/images/business_audit.png'
import aiImg from '../assets/images/ai_workflow.png'
import retainershipImg from '../assets/images/retainership_consulting.png'
import visionImg from '../assets/images/vision_mission.png'
import vastuImg from '../assets/images/vastu_brand.png'

export const BRAND = {
  name: 'Kriti Business Consultants',
  shortName: 'Kriti Consultants',
  tagline: 'Freedom Through Frameworks',
  email: 'hello@kriticonsultants.in',
  phone: '+91 98XXX XXXXX',
  whatsapp: '919800000000',
  locations: ['Virar, Maharashtra', 'Hyderabad, Telangana'],
  social: { linkedin: 'https://linkedin.com', twitter: 'https://twitter.com', instagram: 'https://instagram.com' },
}

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Contact', href: '/contact' },
]

export const SERVICES = [
  { icon: '📋', title: 'SOP Development', desc: 'Comprehensive process documentation that empowers teams to operate independently at peak efficiency.', slug: 'sop-development', image: sopImg },
  { icon: '🎯', title: 'KRA / KPI Frameworks', desc: 'Crystal-clear accountability matrices linking individual performance to business-wide strategic outcomes.', slug: 'kra-kpi', image: kraImg },
  { icon: '📊', title: 'PMS Implementation', desc: 'Performance management systems that transform annual reviews into continuous growth conversations.', slug: 'pms', image: pmsImg },
  { icon: '🔍', title: 'Business Health Audits', desc: 'Deep diagnostic assessment of your operations, culture, systems, and strategic positioning.', slug: 'business-audit', image: auditImg },
  { icon: '🤖', title: 'AI Workflow Optimization', desc: 'Intelligent automation of repetitive processes, freeing your team for high-value strategic work.', slug: 'ai-workflow', image: aiImg },
  { icon: '🤝', title: 'Retainership Consulting', desc: 'Ongoing strategic advisory support as an embedded thought partner for your leadership team.', slug: 'retainership', image: retainershipImg },
  { icon: '🧭', title: 'Vision & Mission Alignment', desc: 'Crystallize your organizational north star and align every person, process, and policy toward it.', slug: 'vision-mission', image: visionImg },
  { icon: '🏛️', title: 'Vastu & Brand Alignment', desc: 'Harmonize your physical workspace and brand identity to amplify energy, focus, and team culture.', slug: 'vastu-brand', image: vastuImg },
]

export const PROCESS_STEPS = [
  { num: '01', title: 'Business Audit', desc: 'Deep diagnostic scan of your operations, culture, and systems landscape' },
  { num: '02', title: 'Strategy Design', desc: 'Custom transformation roadmap aligned to your vision and growth stage' },
  { num: '03', title: 'System Build', desc: 'SOPs, KPIs, frameworks and documentation engineered for your context' },
  { num: '04', title: 'Team Alignment', desc: "Training, adoption, and embedding systems into your team's daily rhythm" },
  { num: '05', title: 'Scale & Optimize', desc: 'Continuous improvement cycles to evolve your systems as you grow' },
]

export const TESTIMONIALS = [
  { name: 'Rajesh Kumar', role: 'Founder, TechVentures Pvt Ltd', location: 'Mumbai', initials: 'RK', text: 'Kriti Consultants completely rebuilt how our HR department operates. SOPs for every process, a KPI framework the team actually uses. Revenue up 40% in 8 months.', rating: 5 },
  { name: 'Priya Mehta', role: 'CEO, Meridian Retail Group', location: 'Hyderabad', initials: 'PM', text: "The business audit opened our eyes to inefficiencies we'd been blind to. Savitri's approach is methodical, empathetic, and remarkably effective.", rating: 5 },
  { name: 'Arjun Sharma', role: 'MD, Apex Manufacturing', location: 'Virar', initials: 'AS', text: 'We hired for scale and got transformation. The AI workflow integration alone saved us 20 hours a week. If you are serious about building a real business, Kriti is the only call to make.', rating: 5 },
]

export const FAQS = [
  { q: 'Why do businesses need SOPs?', a: 'SOPs are the operational DNA of a scalable business. They remove founder dependency, enable consistent quality, accelerate onboarding, and allow your business to run reliably without your constant presence.' },
  { q: 'How do KPI systems actually improve growth?', a: 'KPI frameworks turn vague goals into measurable targets. When every team member knows exactly what success looks like, accountability rises, performance improves, and decisions become data-driven.' },
  { q: 'What industries do you work with?', a: 'We work across manufacturing, retail, professional services, technology, education, healthcare, and real estate. Our methodology is industry-agnostic — we adapt to your sector.' },
  { q: 'How does AI consulting differ from traditional consulting?', a: 'Our AI-augmented approach compresses research timelines, automates reporting, enables real-time performance monitoring, and scales advisory capacity — delivering deeper insights faster.' },
  { q: 'What is organizational engineering?', a: 'Organizational engineering applies engineering principles to human systems — designing workflows, structures, roles, and incentive mechanisms with the same precision as a product blueprint.' },
]

export const PROBLEMS = [
  { icon: '🔗', title: 'Founder Dependency', desc: 'Every decision flows through you. The business stops when you stop — a ticking time bomb for scale.' },
  { icon: '🌀', title: 'Team Confusion', desc: 'Roles blur, accountability vanishes, and your best people repeat the same mistakes without systems.' },
  { icon: '📄', title: 'No SOPs Documented', desc: 'Tribal knowledge walks out the door with every resignation, resetting your operations from zero.' },
  { icon: '📉', title: 'Low Accountability', desc: 'Without measurable KPIs, performance reviews feel subjective and improvement stalls.' },
  { icon: '⚡', title: 'Scaling Chaos', desc: 'Growth exposes every gap — more people, more confusion, more cost with diminishing returns.' },
  { icon: '🎯', title: 'Poor KPI Tracking', desc: "You're flying blind on numbers that matter. Gut feeling replaces data-driven decisions at every level." },
]

export const AI_FEATURES = [
  { icon: '🔬', title: 'AI Research Systems', desc: 'Deep competitive intelligence and market analysis delivered in hours, not weeks.', tag: 'Automated' },
  { icon: '📈', title: 'Automated Reporting', desc: 'Real-time performance dashboards built to surface insights without manual data crunching.', tag: 'Live Data' },
  { icon: '📱', title: 'Social Media Workflows', desc: 'Content systems and scheduling workflows that keep your brand visible without draining bandwidth.', tag: 'AI-Driven' },
  { icon: '🕵️', title: 'Competitive Intelligence', desc: 'Continuous monitoring of competitor activity, pricing, and positioning to keep you ahead.', tag: 'Real-Time' },
  { icon: '⚙️', title: 'Operational Analytics', desc: 'Process bottleneck detection and efficiency gap analysis powered by intelligent workflow mapping.', tag: 'Predictive' },
  { icon: '🧠', title: 'AI Strategy Advisory', desc: 'Strategic planning sessions augmented with AI-generated scenario modeling and risk analysis.', tag: 'Advanced' },
]

export const BUSINESS_TYPES = ['Manufacturing', 'Retail', 'Technology / IT', 'Healthcare', 'Education', 'Real Estate', 'Professional Services', 'E-Commerce', 'Finance / BFSI', 'Other']
