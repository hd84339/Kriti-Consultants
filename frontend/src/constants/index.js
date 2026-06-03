import sopImg from '../assets/images/sop_development.png'
import kraImg from '../assets/images/kra_kpi.png'
import pmsImg from '../assets/images/pms_implementation.png'
import auditImg from '../assets/images/business_audit.png'
import aiImg from '../assets/images/ai_workflow.png'
import retainershipImg from '../assets/images/retainership_consulting.png'
import visionImg from '../assets/images/vision_mission.png'
import vastuImg from '../assets/images/vastu_brand.png'
import contractStaffingImg from '../assets/images/contract_staffing.png'
import backgroundVerificationImg from '../assets/images/background_verification.png'
import hrOutsourcingImg from '../assets/images/hr_outsourcing.png'
import campusRecruitmentImg from '../assets/images/campus_recruitment.png'
import executiveSearchImg from '../assets/images/executive_search.png'

export const BRAND = {
  name: 'Kriti Biz',
  shortName: 'Kriti Biz',
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
  { label: 'Blog', href: '/blog' },
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
  { icon: '📝', title: 'Contract Staffing Services', desc: 'Scalable workforce solutions designed for total business agility. In today’s fast-paced market, rigid organizational structures often hinder growth and responsiveness. We provide highly skilled, thoroughly vetted professionals on a contract basis, allowing your organization to rapidly scale up for critical projects or effortlessly manage seasonal surges. By leveraging our contract staffing expertise, you maintain seamless operational continuity while significantly reducing long-term overhead costs, statutory burdens, and permanent employment liabilities. We handle the recruitment, onboarding, and payroll, empowering your core team to remain strictly focused on driving high-level strategic objectives.', slug: 'contract-staffing', image: contractStaffingImg },
  { icon: '✅', title: 'Background Verification Services', desc: 'Comprehensive, risk-mitigating candidate screening designed for absolute peace of mind. Hiring the wrong candidate can cost your business significantly in both capital and culture. Our rigorous, multi-tiered verification process dives deep beyond the resume. We conduct exhaustive employment history checks, validate educational credentials directly with institutions, perform thorough physical and digital address verifications, and conduct strict criminal record screenings. By partnering with us for background checks, you proactively eliminate recruitment risks, protect your company\'s intellectual property, and ensure that every new hire contributes to a safe, trustworthy, and fully compliant workplace ecosystem.', slug: 'background-verification', image: backgroundVerificationImg },
  { icon: '🤝', title: 'HR Outsourcing Services', desc: 'End-to-end human resource management so you can focus on core business growth. We handle the entire employee lifecycle—from seamless onboarding and payroll administration to compliance tracking and daily HR operations.', slug: 'hr-outsourcing', image: hrOutsourcingImg },
  { icon: '🎓', title: 'Campus Recruitment Services', desc: 'Strategic early-talent acquisition programs. We partner with top-tier educational institutions to design and execute high-impact campus recruitment drives, securing the brightest fresh talent to build your future leadership pipeline.', slug: 'campus-recruitment', image: campusRecruitmentImg },
  { icon: '👔', title: 'Executive Search Services', desc: 'Targeted acquisition of visionary leadership. We leverage deep industry networks and behavioral science to identify, engage, and secure C-suite executives and senior leaders who align perfectly with your organizational DNA and strategic goals.', slug: 'executive-search', image: executiveSearchImg },
]

export const PROCESS_STEPS = [
  { num: '01', title: 'Business Health Audit', desc: 'Deep diagnostic scan of your operations, culture, and systems landscape' },
  { num: '02', title: 'Process Mapping', desc: 'Custom transformation roadmap aligned to your vision and growth stage' },
  { num: '03', title: 'Systems Implementation', desc: 'SOPs, KPIs, frameworks and documentation engineered for your context' },
  { num: '04', title: 'Performance Alignment', desc: "Training, adoption, and embedding systems into your team's daily rhythm" },
  { num: '05', title: 'Scale & Sustain', desc: 'Continuous improvement cycles to evolve your systems as you grow' },
]

export const TESTIMONIALS = [
  { name: 'Rajesh Kumar', role: 'Founder, TechVentures Pvt Ltd', location: 'Mumbai', initials: 'RK', text: 'Kriti Biz completely rebuilt how our HR department operates. SOPs for every process, a KPI framework the team actually uses. Revenue up 40% in 8 months.', rating: 5, industry: 'Technology', timeline: '8 Months', result: '40% Revenue Growth' },
  { name: 'Priya Mehta', role: 'CEO, Meridian Retail Group', location: 'Hyderabad', initials: 'PM', text: "The business audit opened our eyes to inefficiencies we'd been blind to. Savitri's approach is methodical, empathetic, and remarkably effective.", rating: 5, industry: 'Retail', timeline: '60 Days', result: '25% Efficiency Gain' },
  { name: 'Arjun Sharma', role: 'MD, Apex Manufacturing', location: 'Virar', initials: 'AS', text: 'We hired for scale and got transformation. The AI workflow integration alone saved us 20 hours a week. If you are serious about building a real business, Kriti Biz is the only call to make.', rating: 5, industry: 'Manufacturing', timeline: '45 Days', result: '35% Operational Improvement' },
]

export const FAQS = [
  { q: 'Why do businesses need SOPs?', a: 'SOPs are the operational DNA of a scalable business. They remove founder dependency, enable consistent quality, accelerate onboarding, and allow your business to run reliably without your constant presence.' },
  { q: 'How do KPI systems actually improve growth?', a: 'KPI frameworks turn vague goals into measurable targets. When every team member knows exactly what success looks like, accountability rises, performance improves, and decisions become data-driven.' },
  { q: 'What industries do you work with?', a: 'We work across manufacturing, retail, professional services, technology, education, healthcare, and real estate. Our methodology is industry-agnostic — we adapt to your sector.' },
  { q: 'How does AI consulting differ from traditional consulting?', a: 'Our AI-augmented approach compresses research timelines, automates reporting, enables real-time performance monitoring, and scales advisory capacity — delivering deeper insights faster.' },
  { q: 'What is organizational engineering?', a: 'Organizational engineering applies engineering principles to human systems — designing workflows, structures, roles, and incentive mechanisms with the same precision as a product blueprint.' },
]

export const PROBLEMS = [
  { icon: '👥', title: 'People Leakage', desc: 'Teams constantly wait for founder approval.' },
  { icon: '⚙️', title: 'Process Leakage', desc: "Work gets delayed because systems don't exist." },
  { icon: '💸', title: 'Profit Leakage', desc: 'Founders spend time solving problems instead of scaling.' },
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
