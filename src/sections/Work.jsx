import { useRef, useState, useCallback, useEffect } from 'react';


const PROJECTS = [
  {
    number: '01',
    title: 'DailySuite',
    subtitle: 'Productivity Web App',
    category: 'Web Development · Python',
    year: '2024',
    description:
      'A task management and productivity system featuring a full-featured dashboard, dynamic search and filtering, and responsive UI components built with Python.',
    tags: ['Python', 'Django', 'HTML', 'CSS', 'JavaScript'],
    links: [
      { label: 'Live Demo', href: 'https://dailysuite.onrender.com' },
      { label: 'GitHub',   href: 'https://github.com/yinnyeinhtwe/dailysuite' },
    ],
  },
  {
    number: '02',
    title: 'Cafe Sales Analytics',
    subtitle: 'Unlocking Cafe Sales with Data Visualization',
    category: 'Data Mining & Warehousing',
    year: '2024',
    description:
      'Analyzed transaction records to uncover sales trends and customer behavior. Built interactive dashboards with charts, graphs, and KPIs. Applied Naïve Bayes classification for pattern analysis and insight generation.',
    tags: ['Power BI', 'Data Mining', 'Naïve Bayes', 'KPI Dashboards'],
    links: [],
  },
  {
    number: '03',
    title: 'Tour & Travel Booking',
    subtitle: 'Travel Booking Management System',
    category: 'Design & Architecture of UML',
    year: '2023',
    description:
      'UML-designed platform for booking tours, flights, hotels, and transportation. Integrated secure payments, automated notifications, and travel agency package management. Supports local tours, guides, and additional travel services.',
    tags: ['UML', 'System Design', 'Payment Integration', 'Booking System'],
    links: [],
  },
  {
    number: '04',
    title: 'YBS Bus Tracking',
    subtitle: 'Bus Tracking Management System',
    category: 'Database Transactions Management',
    year: '2023',
    description:
      'MySQL-based system to track buses in real time with estimated arrival times and route details. Implemented full user management including add/update/delete, password change, and driver age verification. Includes ER diagrams, relational tables, and query support for buses, routes, and upcoming stops.',
    tags: ['MySQL', 'ER Diagrams', 'SQL', 'Real-time Tracking'],
    links: [],
  },
]

export default function Work() {
  const trackRef   = useRef(null)
  const wrapperRef = useRef(null)
  const [current, setCurrent]   = useState(0)
  const [isDragging, setDragging] = useState(false)
  const dragStart  = useRef(null)
  const dragDelta  = useRef(0)
  const total = PROJECTS.length

  /* ── compute card width ── */
  const cardWidth = useCallback(() => {
    if (!wrapperRef.current) return 0
    const w = wrapperRef.current.offsetWidth
    // 1 card visible on mobile, peek on desktop
    return w < 768 ? w : Math.min(w * 0.72, 640)
  }, [])

  const gap = 24

  /* ── move carousel to index ── */
  const goTo = useCallback((idx) => {
    const clamped = Math.max(0, Math.min(idx, total - 1))
    setCurrent(clamped)
  }, [total])

  /* ── apply transform ── */
  useEffect(() => {
    if (!trackRef.current) return
    const offset = current * (cardWidth() + gap)
    trackRef.current.style.transform = `translateX(-${offset}px)`
  }, [current, cardWidth])

  /* ── Pointer drag (trackpad / mouse / touch) ── */
  const onPointerDown = (e) => {
    setDragging(true)
    dragStart.current = e.clientX ?? e.touches?.[0]?.clientX
    dragDelta.current = 0
    if (trackRef.current) trackRef.current.style.transition = 'none'
  }

  const onPointerMove = (e) => {
    if (!isDragging || dragStart.current === null) return
    const x = e.clientX ?? e.touches?.[0]?.clientX
    dragDelta.current = x - dragStart.current
    const base = current * (cardWidth() + gap)
    if (trackRef.current)
      trackRef.current.style.transform = `translateX(${-base + dragDelta.current}px)`
  }

  const onPointerUp = () => {
    if (!isDragging) return
    setDragging(false)
    if (trackRef.current) trackRef.current.style.transition = ''
    const threshold = cardWidth() * 0.25
    if (dragDelta.current < -threshold) goTo(current + 1)
    else if (dragDelta.current > threshold) goTo(current - 1)
    else goTo(current) // snap back
    dragStart.current = null
  }

  /* ── Wheel / trackpad horizontal scroll ── */
  const wheelTimeout = useRef(null)
  const onWheel = (e) => {
    if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) return // vertical scroll → skip
    e.preventDefault()
    clearTimeout(wheelTimeout.current)
    wheelTimeout.current = setTimeout(() => {
      if (e.deltaX > 30)       goTo(current + 1)
      else if (e.deltaX < -30) goTo(current - 1)
    }, 50)
  }

  const getLinkIcon = (label) => {
  if (label.trim().toLowerCase().includes("github")) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        fill="currentColor"
        viewBox="0 0 16 16"
      >
        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.5.4.07.55-.17.55-.38
        0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13
        -.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66
        .07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95
        0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12
        0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 2-.27c.68 0 1.36.09 2 .27
        1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12
        .51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95
        .29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2
        0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
      </svg>
    )
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      fill="currentColor"
      viewBox="0 0 16 16"
    >
      <path d="M10.5 3a.5.5 0 0 0 0 1h1.793L6.146 10.146a.5.5 0 1 0 .708.708L13 4.707V6.5a.5.5 0 0 0 1 0v-3a.5.5 0 0 0-.5-.5h-3z"/>
      <path d="M13.5 13.5h-11v-11H8a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5V8a.5.5 0 0 0-1 0v5.5z"/>
    </svg>
  )
}

 

  return (
    <section id="work" className="py-28 px-6 md:px-10 max-w-5xl mx-auto">
      <div className="pt-0">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="reveal reveal-delay-1">
              <h2 className="text-4xl md:text-5xl font-semibold tracking-tight leading-[1.1] text-[#1A1A1A]">
                Projects I've built
              </h2>
            </div>
          </div>
          <div className="reveal reveal-delay-2">
            <a href="https://github.com/yinnyeinhtwe" target="_blank" rel="noreferrer"
               className="inline-flex items-center gap-2 text-sm font-medium tracking-wider uppercase border border-black rounded-full px-5 py-2.5 text-white bg-black transition-all duration-300 hover:scale-110 active:scale-95">
              GitHub
            </a>
          </div>
        </div>

        {/* Carousel wrapper */}
        <div
          ref={wrapperRef}
          className="reveal reveal-delay-2 overflow-hidden select-none"
          onMouseDown={onPointerDown}
          onMouseMove={onPointerMove}
          onMouseUp={onPointerUp}
          onMouseLeave={onPointerUp}
          onTouchStart={onPointerDown}
          onTouchMove={onPointerMove}
          onTouchEnd={onPointerUp}
          onWheel={onWheel}
          style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        >
          <div
            ref={trackRef}
            className="carousel-track"
            style={{ gap: `${gap}px` }}
          >
            {PROJECTS.map((project) => (
           <div
              key={project.number}
              className="shrink-0 p-6 border border-black/10 bg-white shadow-md rounded-3xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
              style={{
                width: `min(72vw, 640px)`,
                minHeight: 380,
              }}
            >
                {/* Top row */}
                <div>
                  <div className="flex items-start justify-between mb-6">
                    <span className="font-mono text-sm text-[#C2C2C2] tracking-widest">{project.number}</span>
                    <span className="label" style={{ color: '#C2C2C2' }}>{project.year}</span>
                  </div>

                  <p className="label mb-2">{project.category}</p>
                  <h3 className="text-2xl md:text-3xl font-semibold text-[#1A1A1A] tracking-tight leading-tight mb-1">
                    {project.title}
                  </h3>
                  <p className="text-lg text-black font-light mb-5">{project.subtitle}</p>
                  <p className="text-sm text-black font-bold leading-relaxed mb-6">
                    {project.description}
                  </p>
                </div>

                {/* Bottom row */}
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((t) => (
                      <span key={t} className="chip border border-black rounded-full text-white font-l bg-black px-3 py-1 ">{t}</span>
                    ))}
                  </div>
                  {project.links.length > 0 && (
                    <div className="flex flex-wrap gap-8 pt-1">
                      {project.links.map(({ label, href }) => (
                        <a
                          key={label}
                          href={href}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex mt-2
                           items-center gap-1 text-sm font-medium tracking-wider uppercase text-[#1A1A1A] nav-link">
                          {getLinkIcon(label)}
                          <span>{label}</span>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="reveal reveal-delay-3 flex items-center justify-between mt-7">
          {/* Dots */}
          <div className="flex items-center gap-2">
            {PROJECTS.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`transition-all duration-300 rounded-full ${
                  i === current
                    ? 'w-6 h-1.5 bg-[#1A1A1A]'
                    : 'w-1.5 h-1.5 bg-[#C2C2C2] hover:bg-[#3D3D3D]'
                }`}
                aria-label={`Go to project ${i + 1}`}
              />
            ))}
          </div>

          {/* Prev / Next buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => goTo(current - 1)}
              // disabled={current === 0}
              className="w-10 h-10 border border-black flex items-center justify-center text-[#1A1A1A] text-lg text-white bg-black rounded-full
                         transition-all duration-200 hover:border-[#1A1A1A] disabled:opacity-25 disabled:cursor-not-allowed"
              aria-label="Previous"
            >
              ←
            </button>
            <span className="label" style={{ minWidth: 48, textAlign: 'center' }}>
              {current + 1} / {total}
            </span>
            <button
              onClick={() => goTo(current + 1)}
              // disabled={current === total - 1}
              className="w-10 h-10 border border-black flex items-center justify-center text-[#1A1A1A] text-lg text-white bg-black rounded-full
                         transition-all duration-200 hover:border-[#1A1A1A] disabled:opacity-25 disabled:cursor-not-allowed"
              aria-label="Next"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
