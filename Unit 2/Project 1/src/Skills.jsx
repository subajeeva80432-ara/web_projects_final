import './Skills.css'

function Skills({ heading, skills }) {
  return (
    <section className="skills-card">
      <h2 className="skills-heading">{heading}</h2>
      <ul className="skills-list">
        {skills.map((skill) => (
          <li key={skill} className="skill-item">
            {skill}
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Skills
