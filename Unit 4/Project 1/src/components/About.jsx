import { useState } from 'react'

export default function About() {
  const [failed, setFailed] = useState(false)

  return (
    <section className="section" id="about">
      <div className="container">
        <div className="about-grid">
          <div className="about-media reveal">
            <div className="about-frame">
              {failed ? (
                <div className="about-visual"><span className="init">S</span></div>
              ) : (
                <img
                  src="/subasri_prof_chat.png"
                  alt="Portrait of Subasri"
                  width="480"
                  height="600"
                  loading="lazy"
                  onError={() => setFailed(true)}
                />
              )}
            </div>
          </div>
          <div className="about-copy reveal">
            <span className="eyebrow">About Me</span>
            <h2>Turning curiosity into <span className="text-gradient">clean code</span></h2>
            <p className="lead">
              I build software for real people. At <strong>ATC Travel Zone</strong> I'm a web development
              intern working on a live production travel platform — the customer-facing site and the Admin
              CMS behind it — powered by React, TypeScript, TanStack, Tailwind CSS and Supabase.
            </p>
            <p>
              In parallel, I'm pursuing my <strong>B.E. in Computer Science Engineering &amp; Cyber
              Security</strong>. It's the blend I love most — designing elegant, human-centred interfaces
              on the front end while understanding the security that keeps them safe.
            </p>
            <p>
              On my own time I'm a tinkerer: a member of my college <strong>Tinkerers' Lab</strong>, a
              district-level prize winner, and the builder of <strong>30+ projects</strong> — from the
              Rindu AI agent and a live college website to Python tools and 18 Java OOP applications.
            </p>
            <p>
              I'm fluent in <strong>Java, Python, C/C++, JavaScript, React, SQL and data science</strong>,
              and I believe great products come from clean code, sharp problem-solving and genuine care
              for the people who use them.
            </p>
            <p>
              I keep learning relentlessly — <strong>25+ certifications</strong> and daily problem-solving
              streaks keep the edge sharp. Open to internships, collaborations and opportunities to build
              meaningful software.
            </p>
            <div className="about-divider" aria-hidden="true" />
            <div className="about-tags">
              <span className="chip">B.E. CSE &amp; Cyber Security</span>
              <span className="chip">Web Development Intern — ATC Travel Zone</span>
              <span className="chip">30+ Projects · 25+ Certifications</span>
              <span className="chip">Tinkerers' Lab Member</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}