# Portfolio — React + Vite + Tailwind CSS

A clean, minimal black & white portfolio with scroll animations, custom cursor, and a "Get in Touch" contact form.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Folder Structure

```
portfolio/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Cursor.jsx        # Custom animated cursor
│   │   ├── Navbar.jsx        # Sticky navigation bar
│   │   └── Footer.jsx        # Footer with CTA + links
│   ├── sections/
│   │   ├── Hero.jsx          # Landing hero with typewriter
│   │   ├── About.jsx         # About me section
│   │   ├── Work.jsx          # Projects showcase
│   │   ├── Skills.jsx        # Animated skill bars + marquee
│   │   └── Contact.jsx       # Get in Touch form
│   ├── hooks/
│   │   ├── useScrollReveal.js  # Intersection Observer for pop-up animations
│   │   └── useScrollProgress.js # Scroll progress bar
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css             # Global styles + Tailwind
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

## ✏️ Personalising

1. **Your Name** — search & replace `Your Name` / `YN` with your initials/name
2. **Hero** — `src/sections/Hero.jsx` → update roles, subtitle text
3. **About** — `src/sections/About.jsx` → update bio, city, facts
4. **Work** — `src/sections/Work.jsx` → replace the `projects` array with your real projects
5. **Skills** — `src/sections/Skills.jsx` → update skill groups and levels
6. **Contact** — `src/sections/Contact.jsx` → hook up to Formspree / EmailJS / your own API
7. **Footer** — `src/components/Footer.jsx` → update social links and email
8. **Photo** — Add your photo in `About.jsx` (replace the placeholder div with `<img>`)

## 🎨 Theme

- **Colors**: Black (`#0a0a0a`) & Off-white (`#f5f5f0`) — tweak in `tailwind.config.js`
- **Fonts**: Playfair Display (display) + DM Sans (body) + JetBrains Mono (labels)
- **Animations**: CSS scroll-reveal via IntersectionObserver, custom cursor, typewriter effect, skill bar fills

## 📬 Contact Form

The form currently simulates a submit. Replace the `setTimeout` mock in `Contact.jsx` with:
- **Formspree**: `fetch('https://formspree.io/f/YOUR_ID', { method: 'POST', ... })`
- **EmailJS**: `emailjs.sendForm(serviceId, templateId, form)`
- **Your own backend**: any POST endpoint
