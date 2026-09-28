import ContactForm from './components/ContactForm.jsx'

export default function App() {
  return (
    <div className="page">
      <div className="bg-orb orb-1" aria-hidden="true" />
      <div className="bg-orb orb-2" aria-hidden="true" />
      <div className="bg-orb orb-3" aria-hidden="true" />

      <header className="page-head">
        <span className="brand-mark" aria-hidden="true">FV</span>
        <h1>Professional Form Validation</h1>
        <p>Unit 4 · Project 2 — a validated contact form with real-time field checks.</p>
      </header>

      <main className="page-main">
        <ContactForm />
      </main>

      <footer className="page-foot">
        <p>Built with React + Vite · Client-side validation · 10 fields</p>
      </footer>
    </div>
  )
}