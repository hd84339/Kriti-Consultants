import { useEffect, useRef } from 'react'
export default function CustomCursor() {
  const ref = useRef(null)
  useEffect(() => {
    const move = (e) => { if (ref.current) { ref.current.style.left = e.clientX - 6 + 'px'; ref.current.style.top = e.clientY - 6 + 'px' } }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])
  return <div ref={ref} className="custom-cursor hidden lg:block" />
}
