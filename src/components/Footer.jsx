const navLinks = [
  { label: 'About',   href: '#about'   },
  { label: 'Work',    href: '#work'    },
  { label: 'Skills',  href: '#skills'  },
  { label: 'Contact', href: '#contact' },
]
const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/yinnyeinhtwe' },
  { label: 'Email',  href: 'mailto:yinnyeinhtwe24@gmail.com' },
]

export default function Footer() {
  return (
    <footer className="border-t border-border bg-black">
      <div className="max-w-5xl mx-auto px-6 md:px-10 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <div className="flex flex-col items-center sm:items-start gap-1">
          <span className="text-lg font-semibold text-white">Yin Nyein Htwe</span>
          <span className="label text-white" style={{ fontSize: '10px' }}>
            © {new Date().getFullYear()} · Yangon, Myanmar
          </span>
        </div>

        {/* Nav links */}
        <nav className="flex items-center gap-6">
          {navLinks.map(l => (
            <a key={l.href} href={l.href} className="label text-muted text-white transition-colors">
              {l.label}
            </a>
          ))}
        </nav>

        {/* Social */}
        <div className="flex items-center gap-4">
          {socialLinks.map(s => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
              className="label text-secondary text-white transition-colors">
              {s.label} ↗
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
