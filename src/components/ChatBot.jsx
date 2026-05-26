import { useState, useRef, useEffect } from 'react'

const SYSTEM_PROMPT = `You are a helpful assistant on Yin Nyein Htwe's portfolio website. 
Answer questions about her professionally and concisely. Here is everything about her:

NAME: Yin Nyein Htwe
LOCATION: Yangon, Myanmar (Hlaing Township)
CONTACT: yinnyeinhtwe24@gmail.com | +959 795 199 078
GITHUB: https://github.com/yinnyeinhtwe

PROFILE: Motivated Software Engineering student seeking an internship to apply programming, database, and analytical skills while gaining real-world experience in software development and data-driven systems.

EDUCATION:
- University of Computer Studies, Yangon (UCSY) — Software Engineering, 2022–Present
- No.4 Basic Education High School Taunggyi — 2009–2020

TECHNICAL SKILLS: Python, Django, HTML, CSS, JavaScript, Database Design (ER Diagrams, SQL)

TOOLS: MySQL, Power BI, VS Code, Git & GitHub, Draw.io

SOFT SKILLS: Communication, Teamwork, Problem Solving, Time Management

LANGUAGES: Korean (Conversational/Fluent), Chinese (Conversational/Fluent), English (Conversational)

PROJECTS:
1. DailySuite (Productivity Web App) — Python/Django web app with task management dashboard, search, filtering, dynamic UI. Live: https://dailysuite.onrender.com | GitHub: https://github.com/yinnyeinhtwe/dailysuite
2. Cafe Sales Analytics — Analyzed transaction records with Power BI, applied Naïve Bayes for pattern analysis, created KPI dashboards
3. Tour & Travel Booking Management System — UML-based platform for booking tours/flights/hotels, secure payments, automated notifications
4. YBS Bus Tracking Management System — MySQL real-time bus tracking, user management, ER diagrams, route queries

Only answer questions related to Yin Nyein Htwe's professional background. If asked something unrelated, politely redirect to her work and skills. Keep answers short and friendly.`

const SUGGESTIONS = [
  "What projects has she built?",
  "What are her technical skills?",
  "Is she open to internships?",
  "How can I contact her?",
]

export default function ChatBot() {
  const [open,     setOpen]     = useState(false)
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm Yin's AI assistant. Ask me anything about her skills, projects, or experience! 👋",
    },
  ])
  const [input,   setInput]   = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)
  const inputRef  = useRef(null)

  // Auto-scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  // Focus input when opened
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300)
  }, [open])

  const sendMessage = async (text) => {
    const userText = text || input.trim()
    if (!userText || loading) return
    setInput('')

    const newMessages = [...messages, { role: 'user', content: userText }]
    setMessages(newMessages)
    setLoading(true)

    try {
      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'llama-3.1-8b-instant',
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            ...newMessages.map(m => ({ role: m.role, content: m.content }))
          ],
          max_tokens: 300,
          temperature: 0.7,
        }),
      })

      const data = await res.json();
      console.log('Groq API Response:', data);
      const reply = data.choices?.[0]?.message?.content || "Sorry, I couldn't get a response. Please try again."
      setMessages(prev => [...prev, { role: 'assistant', content: reply }])
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "Sorry, something went wrong. You can reach Yin directly at yinnyeinhtwe24@gmail.com",
      }])
    } finally {
      setLoading(false)
    }
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <>
      {/* ── Chat window ── */}
      <div
        className={`fixed bottom-24 right-6 z-50 w-[340px] bg-white border border-[#C2C2C2] rounded-2xl shadow-2xl flex flex-col transition-all duration-300 origin-bottom-right ${
          open ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'
        }`}
        style={{ height: 480 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#E8E8E8] rounded-t-2xl bg-[#9F0712]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white flex items-center justify-center text-sm font-bold text-[#1A1A1A]">
              YN
            </div>
            <div>
              <p className="text-sm font-medium text-white">Yin's Assistant</p>
              <p className="text-xs text-white/50">Ask me anything</p>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="text-white/50 hover:text-white transition-colors text-lg leading-none"
          >
            ✕
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[80%] text-sm font-light leading-relaxed px-4 py-2.5 ${
                  msg.role === 'user'
                    ? 'bg-[#1A1A1A] text-white'
                    : 'bg-[#F7F7F7] text-[#1A1A1A] border border-[#E8E8E8]'
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-[#F7F7F7] border border-[#E8E8E8] px-4 py-3 flex gap-1 items-center">
                {[0, 1, 2].map(i => (
                  <span
                    key={i}
                    className="w-1.5 h-1.5 bg-[#C2C2C2] rounded-full animate-bounce"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Suggestions (only on first message) */}
        {messages.length === 1 && (
          <div className="px-4 pb-2 flex flex-wrap gap-1.5">
            {SUGGESTIONS.map(s => (
              <button
                key={s}
                onClick={() => sendMessage(s)}
                className="text-xs border border-[#C2C2C2] px-3 py-1.5 text-[#3D3D3D] hover:border-[#1A1A1A] hover:text-[#1A1A1A] transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="px-4 py-3 border-t border-[#E8E8E8] flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Ask about Yin..."
            disabled={loading}
            className="flex-1 text-sm font-light bg-transparent outline-none text-[#1A1A1A] placeholder-[#C2C2C2] disabled:opacity-50"
          />
          <button
            onClick={() => sendMessage()}
            disabled={!input.trim() || loading}
            className="w-8 h-8 bg-[#1A1A1A] text-white flex items-center justify-center text-sm disabled:opacity-30 hover:bg-black transition-colors shrink-0"
          >
            ↑
          </button>
        </div>
      </div>

      {/* ── Toggle button ── */}
      <button
        onClick={() => setOpen(prev => !prev)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#1A1A1A] text-white flex items-center justify-center shadow-lg hover:bg-black transition-all duration-300 ${open ? 'rotate-0' : ''}`}
        aria-label="Toggle chat"
      >
        {open ? (
          <span className="text-lg">✕</span>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
        )}
      </button>
    </>
  )
}