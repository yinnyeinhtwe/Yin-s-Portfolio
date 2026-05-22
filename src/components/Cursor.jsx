import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const dot  = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    const move = (e) => {
      dot.style.left  = e.clientX + 'px'
      dot.style.top   = e.clientY + 'px'
      ring.style.left = e.clientX + 'px'
      ring.style.top  = e.clientY + 'px'
    }

    const enter = () => { dot.classList.add('hover');  ring.classList.add('hover') }
    const leave = () => { dot.classList.remove('hover'); ring.classList.remove('hover') }

    document.addEventListener('mousemove', move)
    document.querySelectorAll('a, button, [data-hover]').forEach((el) => {
      el.addEventListener('mouseenter', enter)
      el.addEventListener('mouseleave', leave)
    })

    return () => document.removeEventListener('mousemove', move)
  }, [])

  return (
    <>
      <div ref={dotRef}  className="cursor-dot  hidden md:block" />
      <div ref={ringRef} className="cursor-ring hidden md:block" />
    </>
  )
}
