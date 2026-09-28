import useTheme from './hooks/useTheme.js'
import useReveal from './hooks/useReveal.js'
import useScrollEffects from './hooks/useScrollEffects.js'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import StatsBand from './components/StatsBand.jsx'
import About from './components/About.jsx'
import Experience from './components/Experience.jsx'
import Projects from './components/Projects.jsx'
import Skills from './components/Skills.jsx'
import Education from './components/Education.jsx'
import Achievements from './components/Achievements.jsx'
import Certifications from './components/Certifications.jsx'
import ResumeCTA from './components/ResumeCTA.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import CursorOverlay from './components/CursorOverlay.jsx'

export default function App() {
  const [, setTheme] = useTheme()
  useReveal()
  useScrollEffects()

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <div id="progress" aria-hidden="true" />
      <Navbar onToggleTheme={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))} />
      <main id="main">
        <Hero />
        <StatsBand />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Achievements />
        <Certifications />
        <ResumeCTA />
        <Contact />
      </main>
      <Footer />
      <button className="back-top" id="backTop" aria-label="Back to top">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </button>
      <CursorOverlay />
    </>
  )
}