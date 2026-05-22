import { useState } from 'react'

export default function Contact() {
  const [form,   setForm]   = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle')

  const handle = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const submit = async e => {
    e.preventDefault()
    setStatus('sending')
    // Replace with Formspree: fetch('https://formspree.io/f/YOUR_ID', { method:'POST', body: JSON.stringify(form), headers:{'Content-Type':'application/json'} })
    await new Promise(r => setTimeout(r, 1400))
    setStatus('sent')
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <section id="contact" className="pb-20 px-6 md:px-10 max-w-5xl mx-auto">
      <div className="pt-0">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24">

          {/* Left */}
          <div className="space-y-8">
            <div className="reveal reveal-delay-1">
              <h2 className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight text-ink">
                Let's work<br />
                <span className="text-muted font-light">together</span>
              </h2>
            </div>
            <p className="reveal reveal-delay-2 text-secondary text-lg leading-relaxed font-light max-w-xs">
              I'm currently open to internship opportunities. Whether you have a question or just want to say hi — feel free to reach out.
            </p>

            {/* Direct links */}
            <div className="reveal reveal-delay-3 space-y-5 pt-0">
              <a href="mailto:yinnyeinhtwe24@gmail.com"
                className="flex items-start gap-4 group">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope-fill" viewBox="0 0 16 16">
                  <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z"/>
                </svg>
                <div>
                  <p className="label mb-0.5">Email</p>
                  <p className="text-lg font-medium text-ink nav-link inline-block">
                    yinnyeinhtwe24@gmail.com
                  </p>
                </div>
              </a>
              <a href="https://github.com/yinnyeinhtwe" target="_blank" rel="noreferrer"
                className="flex items-start gap-3 group">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-github" viewBox="0 0 16 16">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"/>
                </svg>
                <div>
                  <p className="label mb-0.5">GitHub</p>
                  <p className="text-lg font-medium text-ink nav-link inline-block">
                    github.com/yinnyeinhtwe
                  </p>
                </div>
              </a>
              <div className="flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                  <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
                </svg>
                <div>
                  <p className="label mb-0.5">Location</p>
                  <p className="text-lg font-medium text-secondary">Yangon, Myanmar</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                </svg>
                <div>
                  <p className="label mb-0.5">Status</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <p className="text-lg font-medium text-secondary">Open to internship</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div className="reveal reveal-delay-2 bg-[#F7F7F7] border border-[#E8E8E8] p-8 rounded-2xl">
            {status === 'sent' ? (
              <div className="flex flex-col items-center justify-center h-full py-16 text-center space-y-3">
                <div className="w-12 h-12 border border-ink flex items-center justify-center text-xl mb-2">✓</div>
                <h3 className="text-lg font-semibold text-ink">Message sent!</h3>
                <p className="text-lg text-secondary font-light">Thanks — I'll reply within 24 hours.</p>
                <button onClick={() => setStatus('idle')} className="btn-outline mt-4 text-sm text-white bg-black rounded-full transition-all duration-300 hover:scale-110 active:scale-95">Send another</button>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-7">
                {[
                  { id:'name',    label:'Your Name',      type:'text',  placeholder:'Jane Smith',           required:true },
                  { id:'email',   label:'Email Address',  type:'email', placeholder:'jane@example.com',     required:true },
                ].map(f => (
                  <div key={f.id} className="space-y-1">
                    <label className="label text-black" htmlFor={f.id}>{f.label} {f.required && '*'}</label>
                    <input id={f.id} name={f.id} type={f.type} required={f.required}
                      value={form[f.id]} onChange={handle} placeholder={f.placeholder}
                      className="form-input" />
                  </div>
                ))}

                <div className="space-y-1">
                  <label className="label text-black" htmlFor="message">Message *</label>
                  <textarea id="message" name="message" required rows={5}
                    value={form.message} onChange={handle}
                    placeholder="Tell me about your project or opportunity..."
                    className="form-input resize-none" />
                </div>

                <button type="submit" disabled={status === 'sending'}
                  className="mx-auto block btn-primary px-6 py-3 flex items-center rounded-full justify-center gap-2 disabled:opacity-50 transition-all duration-300 hover:scale-110 active:scale-95">
                  {status === 'sending' ? (
                    <><span className="w-3.5 h-3.5 border border-white/40 border-t-white rounded-full animate-spin" />Sending...</>
                  ) : (
                        <>
                          Send Message
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="shrink-0"
                            viewBox="0 0 16 16"
                          >
                            <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z" />
                          </svg>
                        </>
                      )
                  }
                </button>
                
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
