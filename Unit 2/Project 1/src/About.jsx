import './About.css'

function About({ heading, text }) {
  return (
    <section className="about-card">
      <h2 className="about-heading">{heading}</h2>
      <p className="about-text">{text}</p>
    </section>
  )
}

export default About
