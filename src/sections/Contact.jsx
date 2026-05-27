import { useState } from 'react'
import { RiFileCheckFill, RiFileCloseFill } from "react-icons/ri";
import { AiFillMessage } from "react-icons/ai";
import { IoIosMail } from "react-icons/io";
import { FaTelegramPlane } from "react-icons/fa";

export default function Contact() {
  const [form,   setForm]   = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle')

  const handle = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const submit = async e => {
    e.preventDefault()
    setStatus('sending')
    // Replace with Formspree: fetch('https://formspree.io/f/YOUR_ID', { method:'POST', body: JSON.stringify(form), headers:{'Content-Type':'application/json'} })
    try{
      const res = await fetch('https://formspree.io/f/xjgzepjd',
        { method:'POST',
          headers:{'Content-Type':'application/json'},
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            message: form.message,
          }),
        })
        if ( res.ok ) {
          setStatus('sent')
          setForm({ name: '', email: '', message: '' })
        } else {
          setStatus('error')
        }
    }
    catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="pb-20 px-6 md:px-10 max-w-5xl mx-auto">
      <div className="pt-0 mb-10">
        <div className="grid md:grid-cols-2 gap-16 md:gap-19">

          {/* Left */}
          <div className="space-y-8">
            <div className="reveal reveal-delay-1">
              <h2 className="text-4xl md:text-4xl font-semibold tracking-tight leading-[1.1] text-[#1A1A1A] text-center md:text-left mx-auto md:mx-0">
                Let's Work Together
              </h2>
            </div>
            <p className="reveal reveal-delay-2 text-secondary text-lg leading-relaxed font-light text-center md:text-left mx-auto md:mx-0">
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
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-telephone-fill" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/>
                </svg>
                <div>
                <p className="label mb-0.5">Phone</p>
                <a href="tel:+959795199078" className="text-lg font-medium text-[#1A1A1A] nav-link inline-block">
                  +959 795 199 078
                </a>
              </div>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div className="reveal reveal-delay-2 bg-white shadow-md border p-8 rounded-2xl">
            {status === 'sent' ? (
              <div className="flex flex-col items-center justify-center h-full py-16 text-center space-y-3">
                <div className="w-12 h-12 flex items-center justify-center text-xl text-[#007f00] mb-2"><RiFileCheckFill size={60} /></div>
                <h3 className="text-lg font-semibold text-ink text-[#007f00]">Message sent!</h3>
                <p className="text-lg text-secondary font-light">Thanks — I'll reply within 24 hours.</p>
                <button onClick={() => setStatus('idle')} className="btn-primary mt-6 text-[16px] text-white bg-black rounded-2xl transition-all duration-300 hover:scale-110 active:scale-95">Send Another</button>
              </div>
            ) : status === 'error' ? (                           
              <div className="flex flex-col items-center justify-center h-full py-16 text-center space-y-3">
                <div className="w-12 h-12 border border-red-400 flex items-center justify-center text-xl mb-2 text-red-400"><RiFileCloseFill size={60} /></div>
                <h3 className="text-lg font-semibold text-ink">Something went wrong</h3>
                <p className="text-secondary font-light">Please try emailing directly.</p>
                <button onClick={() => setStatus('idle')} className="btn-outline mt-4 text-sm text-white bg-black rounded-full">Try again</button>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-7">
                {[
                  { id:'name',    label:'Your Name',      type:'text',  placeholder:'Jane Smith',           required:true },
                  { id:'email',   label:'Email Address',  type:'email', placeholder:'jane@example.com',     required:true },
                ].map(f => (
                  <div key={f.id} className="space-y-1">
                    <label className="label text-black inline-flex items-center" htmlFor={f.id}>{f.label} {f.required && <span className="text-red-500 text-lg ml-1 leading-none">*</span>}</label>
                    <input id={f.id} name={f.id} type={f.type} required={f.required}
                      value={form[f.id]} onChange={handle} placeholder={f.placeholder}
                      className="form-input" />
                  </div>
                ))}

                <div className="space-y-1">
                  <label className="label text-black inline-flex items-center" htmlFor="message">Message <span className="text-red-500 ml-1 leading-none text-lg">*</span></label>
                  <textarea id="message" name="message" required rows={5}
                    value={form.message} onChange={handle}
                    placeholder="Tell me about your project or opportunity..."
                    className="form-input resize-none" />
                </div>

                <button type="submit" disabled={status === 'sending'}
                  className="mx-auto block btn-primary px-6 py-3 flex items-center rounded-2xl justify-center gap-2 disabled:opacity-50 transition-all duration-300 hover:scale-110 active:scale-95">
                  {status === 'sending' ? (
                    <><span className="w-3.5 h-3.5 border border-white/40 border-t-white rounded-full animate-spin" />Sending...</>
                  ) : (
                        <div className="flex items-center gap-2 text-[16px]">
                          Send Message
                          <FaTelegramPlane  size={18}/>
                        </div>
                      )
                  }
                </button>
                {/* <p className="text-sm text-black text-center font-light">
                  Or Email directly at{' '}
                  <a href="mailto:yinnyeinhtwe24@gmail.com" className="text-black font-semibold transition-colors">
                    yinnyeinhtwe24@gmail.com
                  </a>
                </p> */}
                
              </form>
            )}
          </div>
        </div>
      </div>

      <div className="reveal reveal-delay-4 text-center mt-20">
        <h2 className="text-4xl md:text-4xl font-semibold tracking-tight leading-[1.1] text-[#1A1A1A]">
            Looking for an Immediate Answer?
        </h2>
        <p className="text-center text-medium text-[16px] mt-4">
          For the quickest support, reach out to me via Telegram or email.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-6 reveal reveal-delay-5">
        <a
          href="https://t.me/yinnyeinhtwe"
          target="_blank"
          rel="noopener noreferrer"
          className="
            w-3/4 sm:w-[300px]
            flex items-center justify-center gap-2
            px-6 py-3
            rounded-2xl
            bg-[#FFF085] text-black text-[17px] font-bold
            transition-all duration-300
          "
        >
          <AiFillMessage className="text-xl" />
          Let's Chat on Telegram
        </a>

        <a
          href="mailto:yinnyeinhtwe24@gmail.com"
          className="
            w-3/4 sm:w-[300px]
            flex items-center justify-center gap-2
            px-6 py-3
            rounded-2xl
            bg-[#74D4FF] text-black text-[17px] font-bold
            transition-all duration-300
          "
        >
          <IoIosMail className="text-xl" />
          Reach Out to My Email
        </a>
      </div>

      <div>
        <p className="text-center text-secondary text-sm mt-9">
          &copy; {new Date().getFullYear()} Yin Nyein Htwe. All rights reserved.
        </p>
      </div>
    </section>
  )
}
