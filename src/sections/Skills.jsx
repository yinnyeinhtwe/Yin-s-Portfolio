import { useState, useEffect, useRef } from 'react'

const TABS = [
  { id: 'Technical',   label: 'Technical'    },
  { id: 'Data',        label: 'Data & Tools' },
  { id: 'Soft',        label: 'Soft Skills'  },
]

const CONTENT = {
  Technical: {
    intro: 'Core programming languages, frameworks, and engineering disciplines I build with.',
    items: [
      { name: 'Python Programming',        pct: 88 },
      { name: 'Django Framework',          pct: 82 },
      { name: 'Database Design (SQL / ER)',pct: 80 },
      { name: 'HTML & CSS',                pct: 78 },
      { name: 'JavaScript',                pct: 65 },
    ],
    extra: {
      heading: 'Languages Spoken',
      rows: [
        { left: 'Korean',  right: 'Conversational / Fluent' },
        { left: 'Chinese', right: 'Conversational / Fluent' },
        { left: 'English', right: 'Conversational'          },
      ],
    },
  },
  Data: {
    intro: 'Data analysis, visualization, and mining tools I use to extract and communicate insights.',
    items: [
      { name: 'Power BI',                   pct: 80 },
      { name: 'Data Mining Techniques',     pct: 75 },
      { name: 'Naïve Bayes / ML Basics',   pct: 68 },
      { name: 'MySQL',                      pct: 82 },
      { name: 'ER Diagram & Schema Design', pct: 78 },
    ],
    extra: {
      heading: 'Key Concepts',
      rows: [
        { left: 'KPI Dashboards',    right: 'Power BI' },
        { left: 'Pattern Analysis',  right: 'Naïve Bayes' },
        { left: 'Data Warehousing',  right: 'SQL / ETL'  },
      ],
    },
  },
  Soft: {
    intro: 'Interpersonal strengths I bring to every team, project, and deadline.',
    items: [
      { name: 'Communication',  pct: 90 },
      { name: 'Teamwork',       pct: 92 },
      { name: 'Problem Solving',pct: 88 },
      { name: 'Time Management',pct: 85 },
    ],
    extra: {
      heading: 'Working Style',
      rows: [
        { left: 'Collaboration',  right: 'Team-first mindset' },
        { left: 'Reliability',    right: 'Deadline-driven'   },
        { left: 'Adaptability',   right: 'Fast learner'      },
      ],
    },
  },
}

/* ── animated bar ── */
function Bar({ name, pct, visible }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-base font-medium text-[#1A1A1A]">{name}</span>
        <span className="label text-base" style={{ color: '#C2C2C2' }}>{pct}%</span>
      </div>
      <div className="h-px bg-[#E8E8E8] relative overflow-hidden">
        <div
          className="absolute inset-0 h-full bg-[#1A1A1A] origin-left"
          style={{
            transform:  visible ? 'scaleX(1)' : 'scaleX(0)',
            maxWidth:   `${pct}%`,
            transition: visible
              ? `transform ${pct * 9}ms cubic-bezier(0.4,0,0.2,1)`
              : 'none',
          }}
        />
      </div>
    </div>
  )
}

export default function Skills() {
  const [active,   setActive]   = useState('Technical')
  const [visible,  setVisible]  = useState(false)
  const [rendered, setRendered] = useState('Technical')

  // When tab changes: hide bars → swap content → show bars
  const switchTab = (id) => {
    if (id === active) return
    setVisible(false)
    setTimeout(() => {
      setRendered(id)
      setActive(id)
      setTimeout(() => setVisible(true), 60)
    }, 200)
  }

  // Initial bar reveal (triggered by scroll)
  const sectionRef = useRef(null)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const data = CONTENT[rendered]

  return (
    <section id="skills" className="py-28 px-6 md:px-10 max-w-5xl mx-auto pt-0" ref={sectionRef}>
      <div className="pt-0">

        {/* Header */}
        <div className="space-y-3 mb-10">
          <div className="reveal reveal-delay-1">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight leading-[1.1] text-[#1A1A1A] text-center">
              Skills & Capabilities
            </h2>
          </div>
        </div>

        {/* ── Tab buttons ── */}
       <div className="reveal reveal-delay-2 gap-12 flex mb-12 border border-[#C2C2C2] w-[520px] p-2 rounded-full mx-auto">
          {TABS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => switchTab(id)}
              className={`
                flex-1 text-sm font-medium tracking-wide uppercase
                py-2 rounded-full text-center
                transition-all duration-300
                ${active === id
                  ? 'bg-[#1A1A1A] text-white'
                  : 'text-[#3D3D3D] hover:bg-[#F7F7F7]'}
              `}
            >
              {label}
            </button>
          ))}
        </div>

        {/* ── Panel ── */}
        <div
          className="reveal reveal-delay-3 grid md:grid-cols-2 gap-12 md:gap-20 items-start"
          style={{
            opacity:    visible ? 1 : 0,
            transform:  visible ? 'translateY(0)' : 'translateY(12px)',
            transition: 'opacity 0.3s ease, transform 0.3s ease',
          }}
        >
          {/* Left: intro + extra rows */}
          <div className="space-y-8">
            <p className="text-lg text-[#3D3D3D] font-light leading-relaxed">
              {data.intro}
            </p>

            {/* Active tab badge */}
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-[#1A1A1A]" />
              <span className="label text-sm">{TABS.find(t => t.id === active)?.label}</span>
            </div>

            {/* Extra info rows */}
            <div className="space-y-1">
              <p className="label mb-3" style={{ color: '#C2C2C2' }}>{data.extra.heading}</p>
              {data.extra.rows.map(({ left, right }) => (
                <div
                  key={left}
                  className="flex items-center justify-between py-2.5 border-b border-[#E8E8E8]"
                >
                  <span className="font-medium text-[#1A1A1A]">{left}</span>
                  <span className="text-[#3D3D3D] font-light">{right}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: skill bars */}
          <div className="space-y-8">
            {data.items.map((skill) => (
              <Bar
                key={`${active}-${skill.name}`}
                name={skill.name}
                pct={skill.pct}
                visible={visible}
              />
            ))}
          </div>
        </div>

        {/* ── Scrolling marquee ── */}
        <div className="reveal mt-16 overflow-hidden border-t border-b border-black pt-6 pb-6">
          <div className="marquee-track flex gap-10 whitespace-nowrap">
            {[
              'Python','Django','MySQL','Power BI','HTML','CSS','JavaScript',
              'Data Mining','UML','SQL','ER Diagrams','Naïve Bayes',
              'Python','Django','MySQL','Power BI','HTML','CSS','JavaScript',
              'Data Mining','UML','SQL','ER Diagrams','Naïve Bayes',
            ].map((t, i) => (
              <span key={i} className="label" style={{ color: 'black' }}>
                {t}<span style={{ color: 'black', margin: '0 8px' }}>·</span>
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
