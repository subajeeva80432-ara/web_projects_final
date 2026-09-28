import DATA from '../data.js'
import Icon from './Icon.jsx'

export default function Education() {
  return (
    <section className="section section-tight" id="education">
      <div className="container">
        <div className="section-head center reveal">
          <span className="eyebrow">Education</span>
          <h2>Learning <span className="text-gradient">journey</span></h2>
          <p>From school to engineering — the milestones along the way.</p>
        </div>
        <div className="edu-grid" id="eduGrid">
          {DATA.education.map((e) => (
            <div className="edu-card reveal" key={e.title}>
              <span className="edu-tag">{e.tag}</span>
              <div className="edu-icon"><Icon d={e.icon} /></div>
              <h3>{e.title}</h3>
              <div className="edu-inst">{e.inst}</div>
              <div className="edu-meta">
                {e.meta.map((m) => <span className="chip" key={m}>{m}</span>)}
                {e.score && <span className="chip">{e.score}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}