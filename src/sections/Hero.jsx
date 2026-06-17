import { useEffect, useState } from 'react'

const roles = ['Software Engineering Student']

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [text,      setText]      = useState('')
  const [deleting,  setDeleting]  = useState(false)
  const [charIdx,   setCharIdx]   = useState(0)

  useEffect(() => {
    const current = roles[roleIndex]
    const speed   = deleting ? 55 : 105
    const pause   = 1800

    if (!deleting && charIdx === current.length) {
      const t = setTimeout(() => setDeleting(true), pause)
      return () => clearTimeout(t)
    }
    if (deleting && charIdx === 0) {
      setDeleting(false)
      setRoleIndex(i => (i + 1) % roles.length)
      return
    }
    const t = setTimeout(() => {
      setText(current.slice(0, deleting ? charIdx - 1 : charIdx + 1))
      setCharIdx(i => i + (deleting ? -1 : 1))
    }, speed)
    return () => clearTimeout(t)
  }, [charIdx, deleting, roleIndex])

  return (
    <section id="hero" className="mt-24 flex flex-col justify-center px-6 md:px-10 max-w-5xl mx-auto relative">
      {/* Top label */}
      <div className="flex top-24 left-6 md:left-10 reveal mt-6">
        <span className="label">Software Engineering · UCSY · Yangon</span>
      </div>

      <div className="grid md:grid-cols-[2fr_1fr] gap-2 md:gap-20 mt-3 items-start">
        <div className="space-y-3 mt-6">
          <div className="reveal">
            <span className="label">Hello, I'm 👋</span>
          </div>

          <div className="reveal reveal-delay-1 mt-6">
            <h2 className="text-5xl md:text-5xl font-semibold tracking-tight leading-none text-[#74D4FF]">
              Yin Nyein Htwe
            </h2>
            <h2 className="text-4xl md:text-4xl text-[#FDD430] font-light tracking-tight leading-none mt-6">
              {text}
              <span className="border-r-2 border-ink ml-0.5 animate-[cursorBlink_1s_step-end_infinite]" />
            </h2>
          </div>

          <div className="reveal reveal-delay-2 flex flex-col sm:flex-row items-start sm:items-center gap-5 pt-2">
            <p className="text-secondary text-lg leading-relaxed max-w-sm font-light">
              Motivated IT student seeking to apply programming, database, and analytical skills
              while gaining real-world experience in software development and data-driven systems.
            </p>
            
          </div>
          <div className="flex items-center gap-5">
            <a href="#work" className="btn-primary px-6 py-3 mt-4 rounded-full bg-[#FFF085] text-black font-bold transition-all duration-300 hover:scale-110 active:scale-95">View Work</a>
            <a href="/YinNyeinHtweCV.pdf" download className="btn-primary px-6 py-3 mt-4 rounded-full bg-[#74D4FF] text-black font-bold transition-all duration-300 hover:scale-110 active:scale-95">Download CV</a>
          </div>
        </div>

        <div className="mt-1 reveal reveal-delay-3 w-[330px] bg-transparent">
          <img
            src="/shinchan1.png"
            alt="Profile"
            className="w-full object-contain hover:scale-105 transition-all duration-300 bg-transparent"
          />
        </div>
      </div>
      
    </section>
  )
}
