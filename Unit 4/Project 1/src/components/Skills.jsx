import DATA from '../data.js'
import Icon from './Icon.jsx'

export default function Skills() {
  return (
    <section className="section" id="skills">
      <div className="container">
        <div className="section-head center reveal">
          <span className="eyebrow">Skills</span>
          <h2>My <span className="text-gradient">toolbox</span></h2>
          <p>The technologies I use to design, build, and ship.</p>
        </div>
        <div className="skills-grid" id="skillsGrid">
          {DATA.skills.map((s) => (
            <div className="skill-card reveal" key={s.title}>
              <div className="skill-head">
                <div className="icon"><Icon d={s.icon} /></div>
                <h3>{s.title}</h3>
              </div>
              <div className="skill-badges">
                {s.items.map((i) => <span className="chip" key={i}>{i}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}