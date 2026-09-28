import { useState } from 'react'
import DATA from '../data.js'
import Icon from './Icon.jsx'

function Portrait({ src, alt, fallback }) {
  const [failed, setFailed] = useState(false)
  if (failed || !src) return fallback
  return (
    <img
      src={src}
      alt={alt}
      width="360"
      height="360"
      onError={() => setFailed(true)}
      draggable="false"
    />
  )
}

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="container">
        <div className="hero-grid">
          <div className="reveal">
            <span className="eyebrow">Classic Web Designer</span>
            <h1>Subasri<span className="text-gradient"> Aramudhu</span></h1>
            <div className="subtitle">Web Developer · CS &amp; Cyber Security Student</div>
            <p className="intro">
              I'm a web development intern shipping real features for a live travel platform at
              ATC Travel Zone — and a B.E. Computer Science &amp; Cyber Security student with 30+ projects,
              25+ certifications and a tinkerer's heart. I craft clean, responsive experiences with
              Java, Python, React, SQL and modern web tools.
            </p>
            <div className="hero-ctas">
              <a className="btn btn-primary" href="/projects.html">
                View Projects
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17 17 7M7 7h10v10" />
                </svg>
              </a>
              <a className="btn btn-outline" href="/resume.pdf" target="_blank" rel="noopener">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
                </svg>
                Resume
              </a>
            </div>
            <div className="hero-socials" id="heroSocials" aria-label="Social links">
              {DATA.socials.map((s) => (
                <a key={s.label} href={s.url} target="_blank" rel="noopener" aria-label={s.label}>
                  <Icon d={s.icon} />
                </a>
              ))}
            </div>
          </div>
          <div className="hero-visual reveal">
            <div className="spin-wrap">
              <div className="img-ring">
                <Portrait
                  src="/subasri_prof_chat.png"
                  alt="Portrait of Subasri"
                  fallback={<div className="avatar-initial">S</div>}
                />
              </div>
              <svg className="spin-ring" viewBox="0 0 200 200" aria-hidden="true">
                <defs>
                  <path id="spinPath" d="M 100,100 m -80,0 a 80,80 0 1,1 160,0 a 80,80 0 1,1 -160,0" />
                </defs>
                <text className="spin-text" textLength="502" lengthAdjust="spacingAndGlyphs">
                  <textPath href="#spinPath">SUBASRI • WEB DEVELOPER • CS &amp; CYBER SECURITY • JAVA • PYTHON • REACT • </textPath>
                </text>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}