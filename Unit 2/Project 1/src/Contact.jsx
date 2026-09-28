import './Contact.css'

function Contact({ heading, email, phone, location }) {
  return (
    <section className="contact-card">
      <h2 className="contact-heading">{heading}</h2>
      <div className="contact-row">
        <span className="contact-icon">✉️</span>
        <a className="contact-link" href={`mailto:${email}`}>
          {email}
        </a>
      </div>
      <div className="contact-row">
        <span className="contact-icon">📞</span>
        <a className="contact-link" href={`tel:${phone}`}>
          {phone}
        </a>
      </div>
      <div className="contact-row">
        <span className="contact-icon">📍</span>
        <span className="contact-text">{location}</span>
      </div>
    </section>
  )
}

export default Contact
