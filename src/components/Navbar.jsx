import { useState, useEffect, useRef } from 'react';
import { Menu, X } from "lucide-react";

const navItems = [
  { label: 'About',   href: '#about'   },
  { label: 'Work',    href: '#work'    },
  { label: 'Skills',  href: '#skills'  },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [active,   setActive]     = useState('');
  const navRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      const ids = ['about','work','skills','contact']
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el) {
          const r = el.getBoundingClientRect()
          if (r.top <= 100 && r.bottom >= 100) { setActive('#'+id); break }
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  //click outside to close mobile menu
  useEffect(() => {
    const handleClickOutside = (event) => { 
      if (navRef.current && !navRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  return (
    <header 
      ref={navRef}
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-1.5rem)] max-w-5xl px-6 md:px-10 rounded-full border border-black transition-all duration-300 ${
        scrolled
          ? 'bg-white/10 backdrop-blur-lg border-black shadow-lg'
          : ''
      }`}
    >
    <nav className="h-14 flex items-center justify-between">
          {/* Logo */}
          <a href="#hero" className="text-lg font-semibold tracking-wide text-ink">
            YNH.
          </a>

          {/* Desktop */}
          <ul className="hidden md:flex items-center gap-9">
            {navItems.map(item => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={`nav-link label text-black font-semibold text-sm ${active === item.href ? 'active' : ''}`}
                >{item.label}</a>
              </li>
            ))}
          </ul>

          {/* Resume link */}
          <a
            href="https://github.com/yinnyeinhtwe"
            target="_blank" rel="noreferrer"
            className="hidden md:inline-flex label text-secondary hover:text-ink transition-colors font-semibold text-sm"
          >
            GitHub
            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" class="bi bi-github" viewBox="0 0 16 16">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"/>
            </svg>
          </a>

          {/* Hamburger */}
          <button
            className="md:hidden p-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {menuOpen ? (
              <X size={24} className="text-black" />
            ) : (
              <Menu size={24} className="text-black" />
            )}
          </button>
        </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden absolute left-10 right-10 top-full mt-2 transition-all duration-300 overflow-hidden rounded-2xl border border-black/10 bg-white/95 backdrop-blur-sm shadow-lg ${
          menuOpen ? 'max-h-100 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <ul className="px-6 py-4 flex flex-col gap-3">
          {navItems.map(item => (
            <li key={item.href}>
              <a
                href={item.href}
                className="label text-sm text-black font-semibold block py-2"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
