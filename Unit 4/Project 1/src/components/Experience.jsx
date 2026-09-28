import DATA from '../data.js'

export default function Experience() {
  return (
    <section className="section section-tight" id="experience">
      <div className="container">
        <div className="section-head center reveal">
          <span className="eyebrow">Experience</span>
          <h2>Where I've <span className="text-gradient">been building</span></h2>
          <p>A snapshot of the work that shaped how I approach the web.</p>
        </div>
        <div className="timeline" id="timeline">
          {DATA.experience.map((e) => (
            <div className="tl-item reveal" key={e.role}>
              <span className="tl-dot" aria-hidden="true" />
              <div className="tl-card">
                <div className="tl-top">
                  <span className="tl-role">{e.role}</span>
                  <span className="tl-date">{e.date}</span>
                </div>
                <div className="tl-org">{e.org}</div>
                <p>{e.desc}</p>
                <ul className="tl-list">
                  {e.points.map((p) => <li key={p}>{p}</li>)}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}