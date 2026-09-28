import DATA from '../data.js'
import Icon from './Icon.jsx'

export default function Achievements() {
  return (
    <section className="section section-tight" id="achievements">
      <div className="container">
        <div className="section-head center reveal">
          <span className="eyebrow">Achievements</span>
          <h2>Highlights &amp; <span className="text-gradient">honours</span></h2>
          <p>Milestones I'm proud of — in academics and beyond.</p>
        </div>
        <div className="ach-grid" id="achGrid">
          {DATA.achievements.map((a) => (
            <div className="ach-card reveal" key={a.title}>
              <div className="ach-icon"><Icon d={a.icon} /></div>
              <div>
                <h3>{a.title}</h3>
                <p>{a.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}