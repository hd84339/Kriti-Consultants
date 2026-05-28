export default function SectionLabel({ children, centered = false }) {
  return <div className={`section-label ${centered ? 'justify-center' : ''}`}>{children}</div>
}
