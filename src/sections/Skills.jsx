import { useState, useEffect, useRef } from 'react'
import {
  FaPython,
  FaGitAlt,
  FaHtml5,
  FaUsers,
  FaClock,
  FaLightbulb,
  FaCommentDots,
  FaReact,
  FaProjectDiagram,
} from 'react-icons/fa'

import {
  SiDjango,
  SiJavascript,
  SiTailwindcss,
  SiMysql,
} from 'react-icons/si'

import { VscVscode } from 'react-icons/vsc'

const TABS = [
  { id: 'Technical',   label: 'Technical'    },
  { id: 'Data',        label: 'Tools' },
  { id: 'Soft',        label: 'Soft Skills'  },
]

const CONTENT = {
  Technical: {
    intro: 'Core programming languages, frameworks, and engineering disciplines I build with.',
    items: [
      { name: 'HTML & CSS',   Icon: FaHtml5,       pct: 78 },
      { name: 'JavaScript',   Icon: SiJavascript,  pct: 65 },
      { name: 'React',   Icon: FaReact,  pct: 65 },
      { name: 'Tailwind CSS', Icon: SiTailwindcss, pct: 60 },
      { name: 'Python',       Icon: FaPython,      pct: 65 },
      { name: 'Django',       Icon: SiDjango,      pct: 65 },
    ],
    extra: {
      heading: 'Languages Spoken',
      rows: [
        { left: 'Korean',  right: 'Conversational / Fluent' },
        { left: 'Chinese', right: 'Conversational / Fluent' },
        { left: 'English', right: 'Conversational' },
      ],
    },
  },

  Data: {
    intro: 'Data analysis, visualization, and mining tools I use to extract and communicate insights.',
    items: [
      { name: 'Visual Studio Code',    Icon: VscVscode,   pct: 90 },
      { name: 'Git & GitHub', Icon: FaGitAlt, pct: 75 },
      {name: 'Draw.io', Icon: FaProjectDiagram, pct: 80},
    ],
    extra: {
      heading: 'Key Concepts',
      rows: [
        { left: 'KPI Dashboards',   right: 'Power BI' },
        { left: 'Pattern Analysis', right: 'Naïve Bayes' },
        { left: 'Data Warehousing', right: 'SQL / ETL' },
      ],
    },
  },

  Soft: {
    intro: 'Interpersonal strengths I bring to every team, project, and deadline.',
    items: [
      { name: 'Communication',   Icon: FaCommentDots,  pct: 90 },
      { name: 'Teamwork',        Icon: FaUsers,     pct: 92 },
      { name: 'Problem Solving', Icon: FaLightbulb, pct: 88 },
      { name: 'Time Management', Icon: FaClock,     pct: 85 },
    ],
    extra: {
      heading: 'Working Style',
      rows: [
        { left: 'Collaboration', right: 'Team-first mindset' },
        { left: 'Reliability',   right: 'Deadline-driven' },
        { left: 'Adaptability',  right: 'Fast learner' },
      ],
    },
  },
}

/* ── animated bar ── */
function Bar({ Icon, name, pct, visible }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon size={18} color="#1A1A1A" />

          <span className="text-base font-medium text-[#1A1A1A]">
            {name}
          </span>
        </div>
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

  const data = CONTENT[rendered];

  return (
    <section id="skills" className="mt-16 py-28 px-6 md:px-10 max-w-5xl mx-auto pt-0" ref={sectionRef}>
      <div className="pt-0">

        {/* Header */}
        <div className="space-y-3 mb-10">
          <div className="reveal reveal-delay-1">
            <h2 className="text-4xl md:text-4xl font-semibold tracking-tight leading-[1.1] text-[#1A1A1A] text-center">
              Skills & Capabilities
            </h2>
          </div>
        </div>

        {/* ── Tab buttons ── */}
        <div className="reveal reveal-delay-2 flex gap-4 sm:gap-10 mb-12 border border-[#C2C2C2] w-full max-w-[520px] p-2 rounded-full sm:rounded-full mx-auto">
            {TABS.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => switchTab(id)}
                className={`
                  flex-1 text-sm font-medium tracking-wide uppercase
                  py-2 rounded-full
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
        <p className="text-lg text-[#3D3D3D] font-medium leading-relaxed max-w-4xl text-center text-xl text-bold mx-auto mb-10 reveal reveal-delay-2">
           {data.intro}
        </p>
        <div
          className="reveal reveal-delay-3 grid md:grid-cols-2 gap-12 md:gap-20 items-start mt-16"
          style={{
            opacity:    visible ? 1 : 0,
            transform:  visible ? 'translateY(0)' : 'translateY(12px)',
            transition: 'opacity 0.3s ease, transform 0.3s ease',
          }}
        >
          {/* Left: intro + extra rows */}
          <div className="space-y-8">
            

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
                Icon={skill.Icon}
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
              'Python','Django','React JS','HTML','CSS','JavaScript',
              'Tailwind CSS','UML','ER Diagrams','React JS','HTML','CSS','JavaScript',
              'Python','Django','MySQL','React JS','HTML','CSS','JavaScript',
              'Tailwind CSS','UML','SQL','ER Diagrams',
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
