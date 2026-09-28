import { useState } from 'react'
import DATA from '../data.js'
import Icon from './Icon.jsx'

const EMPTY = { name: '', email: '', subject: '', message: '' }

export default function Contact() {
  const [form, setForm] = useState(EMPTY)
  const [status, setStatus] = useState({ kind: '', text: '' })

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const onSubmit = (e) => {
    e.preventDefault()
    const name = form.name.trim()
    const email = form.email.trim()
    const subject = form.subject.trim()
    const message = form.message.trim()

    if (!name || !email || !subject || !message) {
      setStatus({ kind: 'err', text: 'Please fill in all the fields.' })
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus({ kind: 'err', text: 'Please enter a valid email address.' })
      return
    }

    const to = 'subajeeva80432@gmail.com'
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)
    window.location.href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${body}`
    setStatus({ kind: 'ok', text: 'Opening your email app to send the message...' })
    setForm(EMPTY)
  }

  return (
    <section className="section" id="contact">
      <div className="container">
        <div className="section-head center reveal">
          <span className="eyebrow">Contact</span>
          <h2>Let's <span className="text-gradient">Build Something Meaningful</span></h2>
          <p>I am open to internships, collaborative projects, and professional opportunities in software engineering and web development.</p>
        </div>
        <div className="contact-grid">
          <div className="contact-info reveal" id="contactInfo">
            <h2>Let's <span className="text-gradient">talk</span></h2>
            <p>Have a project, internship or opportunity in mind? Drop me a message — I'd love to connect.</p>
            {DATA.contacts.map((c) => (
              <div className="contact-line" key={c.label}>
                <span className="ic"><Icon d={c.icon} /></span>
                <div>
                  <div className="lbl">{c.label}</div>
                  {c.href ? (
                    <a className="val" href={c.href} target="_blank" rel="noopener">{c.val}</a>
                  ) : (
                    <span className="val">{c.val}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
          <form className="contact-form reveal" id="contactForm" onSubmit={onSubmit} noValidate>
            <div className="form-row">
              <div className="field">
                <label htmlFor="cName">Name</label>
                <input type="text" id="cName" name="name" placeholder="Your name" required autoComplete="name" value={form.name} onChange={set('name')} />
              </div>
              <div className="field">
                <label htmlFor="cEmail">Email</label>
                <input type="email" id="cEmail" name="email" placeholder="you@example.com" required autoComplete="email" value={form.email} onChange={set('email')} />
              </div>
            </div>
            <div className="field">
              <label htmlFor="cSubject">Subject</label>
              <input type="text" id="cSubject" name="subject" placeholder="What's this about?" required value={form.subject} onChange={set('subject')} />
            </div>
            <div className="field">
              <label htmlFor="cMessage">Message</label>
              <textarea id="cMessage" name="message" placeholder="Write your message…" required value={form.message} onChange={set('message')} />
            </div>
            <button type="submit" className="btn btn-primary" style={{ justifySelf: 'start' }}>
              Send Message
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m22 2-7 20-4-9-9-4z" />
                <path d="M22 2 11 13" />
              </svg>
            </button>
            <div className={`form-msg ${status.text ? 'show' : ''} ${status.kind}`} role="status">{status.text}</div>
            <p style={{ fontSize: '.8rem' }}>This form opens your email app to send the message directly to me.</p>
          </form>
        </div>
      </div>
    </section>
  )
}