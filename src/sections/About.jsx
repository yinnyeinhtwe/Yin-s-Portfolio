export default function About() {
  return (
    <section id="about" className="py-5 px-6 md:px-10 max-w-5xl mx-auto mt-10">
      <div className="reveal reveal-delay-1 items-center mb-16">
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight text-ink text-center">
          About Me<br />
        </h2>
      </div>
      <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-start">
        {/* Left */}
        <div className="space-y-10 ">
          <div className="reveal reveal-delay-2 grid grid-cols-2 gap-6 border-t border-border pt-8 ">
            {[
              { label: 'Based in',    value: 'Yangon, Myanmar' },
              { label: 'University',  value: 'UCSY' },
              { label: 'Degree',      value: 'Software Engineering' },
              { label: 'Status',      value: 'Open to internship' },
            ].map(f => (
              <div key={f.label}>
                <p className="label mb-1">{f.label}</p>
                <p className="text-lg font-medium text-ink">{f.value}</p>
              </div>
            ))}
          </div>

          {/* Languages */}
          <div className="reveal reveal-delay-3 border-t border-border pt-8">
            <p className="label mb-4">Languages</p>
            <div className="space-y-3">
              {[
                { lang: 'Korean',  level: 'Conversational / Fluent', pct: 85 },
                { lang: 'Chinese', level: 'Conversational / Fluent', pct: 80 },
                { lang: 'English', level: 'Conversational',           pct: 65 },
              ].map(l => (
                <div key={l.lang} className="space-y-1">
                  <div className="flex justify-between text-lg">
                    <span className="font-medium text-ink">{l.lang}</span>
                    <span className="text-muted font-light text-sm">{l.level}</span>
                  </div>
                  <div className="h-px bg-border">
                    <div className="h-px bg-ink" style={{ width: l.pct + '%' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal reveal-delay-4">
            <a href="#contact" className="btn-primary px-6 py-3 rounded-full bg-black text-white transition-all duration-300 hover:scale-110 active:scale-95">Let's Connect</a>
          </div>
        </div>

        {/* Right */}
        <div className="space-y-8">
          <div className="reveal reveal-delay-2 space-y-4 text-secondary text-lg leading-relaxed font-light">
            <p>
              I'm a Software Engineering student at the University of Computer Studies, Yangon (UCSY), passionate about creating modern and responsive web applications. 
              I'm especially interested in frontend development using React and Tailwind CSS, where I enjoy building clean, interactive, and user-friendly interfaces.
            </p>
            <p>
              I enjoy working on the full picture — from designing ER diagrams and writing clean SQL
              to building interactive dashboards and intuitive web UIs. 
              Through every project, I focus on improving my skills, learning new technologies, and building solutions that provide real value.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
