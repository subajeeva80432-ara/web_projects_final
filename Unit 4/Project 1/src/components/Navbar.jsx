import { useState } from 'react'

const LINKS = [
  ['#home', 'Home'],
  ['#about', 'About'],
  ['#experience', 'Experience'],
  ['#projects', 'Projects'],
  ['#skills', 'Skills'],
  ['#education', 'Education'],
  ['#certifications', 'Certifications'],
  ['#contact', 'Contact'],
]

export default function Navbar({ onToggleTheme }) {
  const [open, setOpen] = useState(false)

  return (
    <header className="site-header">
      <div className="container nav">
        <a href="#home" className="brand-logo" aria-label="Subasri home">
          <span>S</span><span>A</span>
        </a>
        <nav aria-label="Primary">
          <ul className={open ? 'nav-links open' : 'nav-links'} id="navLinks">
            {LINKS.map(([href, label]) => (
              <li key={href}>
                <a href={href} onClick={() => setOpen(false)}>{label}</a>
              </li>
            ))}
            <li>
              <a href="/resume.pdf" target="_blank" rel="noopener">Resume</a>
            </li>
          </ul>
        </nav>
        <div className="nav-actions">
          <button
            className="theme-toggle"
            id="themeToggle"
            onClick={onToggleTheme}
            aria-label="Toggle dark or light theme"
          >
            <svg className="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
            </svg>
            <svg className="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
            </svg>
          </button>
          <button
            className="nav-toggle"
            id="navToggle"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="navLinks"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}