import { useRef, useState, useCallback, useEffect } from 'react'

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
      { label: 'GitHub', href: 'https://github.com/yinnyeinhtwe/dailysuite' },
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
    tags: ['UML', 'System Design', 'Payment Integration'],
    links: [],
  },
  {
    number: '04',
    title: 'YBS Bus Tracking',
    subtitle: 'Bus Tracking Management System',
    category: 'Database Transactions Management',
    year: '2023',
    description:
      'Real-time bus tracking system using MySQL with ETA prediction, route management, user authentication, driver age verification, and CRUD operations for buses, routes, and stops. Includes ER diagrams, relational schema design, and SQL query support.',
    tags: ['MySQL', 'ER Diagrams', 'SQL', 'Real-time Tracking'],
    links: [],
  },
]

/* ─── layout constants ─── */
const CARD_W = 344
const CARD_H = 470
const GAP    = 24
const STEP   = CARD_W + GAP
const N      = PROJECTS.length   // 4

/*
  Infinite loop strategy — virtual index
  ───────────────────────────────────────
  We render 3 full copies of PROJECTS in the track:
    [copy A: 0-3] [copy B: 4-7] [copy C: 8-11]

  We start at virtual index 4 (first card of copy B).
  The loop runs: 4 → 5 → 6 → 7 → 4 → 5 → ...
  visibleDot = virtualIndex % N  (always 0-3)

  When virtualIndex would leave copy B:
    • going forward past 7 → silently jump back to 4 (same visual, no animation)
    • going backward past 4 → silently jump to 7+1=... wait, we clamp to copy B.

  Simpler: after every animated advance, if virtualIndex drifts outside [N, 2N-1],
  we teleport (no transition) back into the equivalent position in copy B.
*/
const START  = N          // first card of copy B (index 4)
const COPIES = 9          // we render 3×N = 12 cards total
const TRACK  = COPIES * N // 12

/* build the flat render list once */
const RENDER_LIST = Array.from({ length: TRACK }, (_, i) => PROJECTS[i % N])

export default function Work() {
  /* virtualIndex: which card in RENDER_LIST is the left-most visible card */
  const [vIdx, setVIdx]       = useState(START)   // 4
  const [dragging, setDragging] = useState(false)

  const trackRef    = useRef(null)
  const wrapperRef  = useRef(null)
  const vIdxRef     = useRef(START)   // always-current, no stale closure
  const dragStartX  = useRef(null)
  const dragDeltaX  = useRef(0)
  const panActive   = useRef(false)
  const panTotal    = useRef(0)
  const panTimer    = useRef(null)

  /* keep ref in sync */
  const syncVIdx = useCallback((v) => {
    setVIdx(v)
    vIdxRef.current = v
  }, [])

  /* ── apply transform without touching state (instant, no re-render) ── */
  const applyTransform = useCallback((v, animated = true) => {
    const el = trackRef.current
    if (!el) return
    el.style.transition = animated
      ? 'transform 0.42s cubic-bezier(0.25,0.46,0.45,0.94)'
      : 'none'
    el.style.transform = `translateX(-${v * STEP}px)`
  }, [])

  /* ── re-centre into copy B after each animated move ── */
  const recentre = useCallback((v) => {
    /* equivalent position inside copy B: N..2N-1 */
    const equivalent = N + (((v - N) % N) + N) % N
    if (equivalent !== v) {
      /* wait for the slide animation to finish, then teleport silently */
      setTimeout(() => {
        applyTransform(equivalent, false)
        syncVIdx(equivalent)
      }, 430)   /* just after 420ms transition */
    } else {
      syncVIdx(v)
    }
  }, [applyTransform, syncVIdx])

  /* ── advance by +1 or -1 ── */
  const advance = useCallback((dir) => {
    const next = vIdxRef.current + dir
    applyTransform(next, true)
    recentre(next)
  }, [applyTransform, recentre])

  /* ── jump to a specific real-project index (dots) ── */
  const goToProject = useCallback((projectIdx) => {
    /* pick the copy-B slot for this project */
    const target = N + projectIdx
    applyTransform(target, true)
    recentre(target)
  }, [applyTransform, recentre])

  /* ── initialise position on mount (no animation) ── */
  useEffect(() => {
    applyTransform(START, false)
  }, [applyTransform])

  /* ═══════════════════════════════
     MOUSE / TOUCH DRAG
  ═══════════════════════════════ */
  const startDrag = useCallback((clientX) => {
    setDragging(true)
    dragStartX.current = clientX
    dragDeltaX.current = 0
    if (trackRef.current) trackRef.current.style.transition = 'none'
  }, [])

  const moveDrag = useCallback((clientX) => {
    if (dragStartX.current === null) return
    dragDeltaX.current = clientX - dragStartX.current
    if (trackRef.current)
      trackRef.current.style.transform =
        `translateX(${-(vIdxRef.current * STEP) + dragDeltaX.current}px)`
  }, [])

  const endDrag = useCallback(() => {
    if (dragStartX.current === null) return
    setDragging(false)
    const delta = dragDeltaX.current
    dragStartX.current = null
    dragDeltaX.current = 0
    const threshold = CARD_W * 0.22
    if      (delta < -threshold) advance(+1)
    else if (delta >  threshold) advance(-1)
    else                          applyTransform(vIdxRef.current, true)
  }, [advance, applyTransform])

  /* ═══════════════════════════════
     TWO-FINGER TRACKPAD PAN
     Moves the track live pixel-by-pixel while fingers slide.
     When fingers lift (no wheel event for 80 ms) → snap.
  ═══════════════════════════════ */
  const onWheel = useCallback((e) => {
    /* skip if user is mostly scrolling vertically */
    if (Math.abs(e.deltaX) < Math.abs(e.deltaY) * 0.45) return
    e.preventDefault()

    /* begin pan */
    if (!panActive.current) {
      panActive.current = true
      panTotal.current  = 0
      if (trackRef.current) trackRef.current.style.transition = 'none'
    }

    panTotal.current += e.deltaX

    /* live track movement */
    if (trackRef.current)
      trackRef.current.style.transform =
        `translateX(${-(vIdxRef.current * STEP) - panTotal.current}px)`

    /* detect lift: no new event for 80 ms */
    clearTimeout(panTimer.current)
    panTimer.current = setTimeout(() => {
      panActive.current = false
      const total = panTotal.current
      panTotal.current = 0

      const threshold = STEP * 0.22
      if      (total >  threshold) advance(+1)
      else if (total < -threshold) advance(-1)
      else                          applyTransform(vIdxRef.current, true)
    }, 80)
  }, [advance, applyTransform])

  /* attach wheel with passive:false so preventDefault works */
  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => {
      el.removeEventListener('wheel', onWheel)
      clearTimeout(panTimer.current)
    }
  }, [onWheel])

  /* ── dot indicators: which real project is showing left + right ── */
  const dotA = ((vIdx - N) % N + N) % N          // left card
  const dotB = ((vIdx - N + 1) % N + N) % N      // right card

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
    <section id="work" className="bg-[#F7F7F7]">
      <section id="work" className="py-20 px-6 md:px-10 max-w-5xl mx-auto mt-16">
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
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-github" viewBox="0 0 16 16">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"/>
                </svg>
              </a>
            </div>
          </div>

          {/* ── Carousel ── */}
          <div
            ref={wrapperRef}
            className="reveal reveal-delay-2 overflow-hidden select-none"
            style={{ cursor: dragging ? 'grabbing' : 'grab' }}
            onMouseDown={(e)  => startDrag(e.clientX)}
            onMouseMove={(e)  => { if (dragging) moveDrag(e.clientX) }}
            onMouseUp={endDrag}
            onMouseLeave={endDrag}
            onTouchStart={(e) => startDrag(e.touches[0].clientX)}
            onTouchMove={(e)  => moveDrag(e.touches[0].clientX)}
            onTouchEnd={endDrag}
          >
            <div
              ref={trackRef}
              className="flex"
              style={{ gap: `${GAP}px`, willChange: 'transform' }}
            >
              {RENDER_LIST.map((project, i) => (
                <div
                  key={i}
                  className="shrink-0 border border-white rounded-3xl bg-white mb-6 hover:transform shadow-md p-8 flex flex-col justify-between"
                  style={{ width: CARD_W, height: CARD_H }}
                >
                  {/* Card top */}
                  <div>
                    <div className="flex items-start justify-between mb-5">
                      <span className="font-mono text-xs text-[#C2C2C2] tracking-widest">
                        {project.number}
                      </span>
                      <span className="label" style={{ color: '#C2C2C2' }}>{project.year}</span>
                    </div>
                    <p className="label mb-2">{project.category}</p>
                    <h3 className="text-xl font-semibold text-[#1A1A1A] tracking-tight leading-snug mb-1">
                      {project.title}
                    </h3>
                    <p className="text-sm text-[#3D3D3D] font-light mb-4">{project.subtitle}</p>
                    <p className="text-sm text-[#3D3D3D] font-light leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Card bottom */}
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((t) => (
                        <span key={t} className="chip border border-black rounded-full text-white font-l bg-black px-3 py-1">{t}</span>
                      ))}
                    </div>
                    {project.links.length > 0 && (
                      <div className="flex flex-wrap gap-5 pt-1">
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

          {/* ── Controls ── */}
          <div className="reveal reveal-delay-3 flex items-center justify-between mt-6">

            {/* Dots */}
            <div className="flex items-center gap-2">
              {PROJECTS.map((_, i) => {
                const active = i === dotA || i === dotB
                return (
                  <button
                    key={i}
                    onClick={() => goToProject(i)}
                    aria-label={`Go to project ${i + 1}`}
                    className="transition-all duration-300"
                    style={{
                      width:        active ? 20 : 8,
                      height:       8,
                      background:   active ? '#1A1A1A' : '#C2C2C2',
                      borderRadius: 4,
                    }}
                  />
                )
              })}
            </div>

            {/* Prev / counter / Next — never disabled, always loops */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => advance(-1)}
                aria-label="Previous project"
                className="w-10 h-10 border border-[#C2C2C2] flex items-center justify-center
                          text-white bg-black rounded-full transition-all duration-200 hover:border-[#1A1A1A]"
              >
                ←
              </button>
              
              <button
                onClick={() => advance(+1)}
                aria-label="Next project"
                className="w-10 h-10 border border-[#C2C2C2] flex items-center justify-center
                          text-white bg-black rounded-full transition-all duration-200 hover:border-[#1A1A1A]"
              >
                →
              </button>
            </div>
          </div>

        </div>
      </section>
    </section>
  )
}
