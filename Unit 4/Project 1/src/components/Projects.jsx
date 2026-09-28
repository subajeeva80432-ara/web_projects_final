import DATA from '../data.js'
import Icon from './Icon.jsx'

const LINK_ICON = '<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>'
const CODE_ICON = '<path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"/>'

export default function Projects() {
  return (
    <section className="section" id="projects">
      <div className="container">
        <div className="section-head center reveal">
          <span className="eyebrow">Featured Projects</span>
          <h2>Things I've <span className="text-gradient">designed &amp; built</span></h2>
          <p>A selection of my favourite work — live sites and personal projects.</p>
        </div>
        <div className="projects-grid" id="featuredGrid">
          {DATA.projects.map((p) => (
            <div className="project-card reveal" key={p.title}>
              <div className="pc-top">
                <div className="pc-icon"><Icon d={p.icon} /></div>
                {p.badge && <span className="pc-badge">{p.badge}</span>}
              </div>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
              <div className="tech-row">
                {p.tech.map((t) => <span className="chip" key={t}>{t}</span>)}
              </div>
              <div className="pc-links">
                {p.links.demo && (
                  <a href={p.links.demo} target="_blank" rel="noopener">
                    <Icon d={LINK_ICON} />Demo
                  </a>
                )}
                {p.links.code && (
                  <a href={p.links.code} target="_blank" rel="noopener">
                    <Icon d={CODE_ICON} />Code
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 34 }}>
          <a className="btn btn-outline" href="/projects.html">
            View All Projects
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17 17 7M7 7h10v10" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}