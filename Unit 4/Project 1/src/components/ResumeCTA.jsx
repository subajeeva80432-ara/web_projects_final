export default function ResumeCTA() {
  return (
    <section className="section section-tight">
      <div className="container">
        <div className="cta-band reveal">
          <span className="eyebrow" style={{ justifyContent: 'center' }}>The Résumé</span>
          <h2>Hire-ready &amp; <span className="text-gradient">documented</span></h2>
          <p>One click. One PDF — every project, certification and milestone I've earned, ready for your review.</p>
          <a className="btn btn-primary" href="/resume.pdf" target="_blank" rel="noopener">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
            </svg>
            Download Résumé
          </a>
        </div>
      </div>
    </section>
  )
}