import HeroSection from '../../sections/hero/HeroSection'
import TrustedSection from '../../sections/trusted/TrustedSection'
import ProblemSection from '../../sections/services/ProblemSection'
import ServicesSection from '../../sections/services/ServicesSection'
import GrowthSection from '../../sections/growth/GrowthSection'
import AISection from '../../sections/ai/AISection'
import FounderSection from '../../sections/founder/FounderSection'
import SystemsSection from '../../sections/systems/SystemsSection'
import TestimonialsSection from '../../sections/testimonials/TestimonialsSection'
import FAQSection from '../../sections/faq/FAQSection'
import ContactSection from '../../sections/contact/ContactSection'
import CTASection from '../../sections/cta/CTASection'

export default function Home() {
  return (
    <>
      <HeroSection />
      <TrustedSection />
      <ProblemSection />
      <ServicesSection />
      <GrowthSection />
      <AISection />
      <FounderSection />
      <SystemsSection />
      <TestimonialsSection />
      <FAQSection />
      <ContactSection />
      <CTASection />
    </>
  )
}
