import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import DATA from '../data.js'
import Icon from './Icon.jsx'

const CERT_BADGE_ICON = '<path d="M12 2 8 6 4 5l-1 4 2 3-2 3 1 4 4-1 4 4 4-4 4 1 1-4-2-3 2-3-1-4-4 1z"/>'
const CARD_WIDTH = 340
const CARD_WIDTH_SM = 280

export default function Certifications() {
  const [index, setIndex] = useState(0)
  const [query, setQuery] = useState('')
  const [featuredOnly, setFeaturedOnly] = useState(false)
  const [playing, setPlaying] = useState(true)
  const [small, setSmall] = useState(() => typeof window !== 'undefined' && window.innerWidth <= 640)

  const viewportRef = useRef(null)
  const drag = useRef({ on: false, x: 0 })
  const lengthRef = useRef(0)

  const list = useMemo(
    () =>
      DATA.certifications.filter((c) => {
        if (featuredOnly && !c.featured) return false
        const q = query.trim().toLowerCase()
        if (q && !`${c.title} ${c.issuer}`.toLowerCase().includes(q)) return false
        return true
      }),
    [featuredOnly, query]
  )
  useEffect(() => {
    lengthRef.current = list.length
  }, [list])

  const current = list.length ? Math.min(index, list.length - 1) : 0

  const go = useCallback((d) => {
    const n = lengthRef.current
    if (!n) return
    setIndex((i) => (i + d + n) % n)
  }, [])

  useEffect(() => {
    if (!playing || list.length <= 1) return undefined
    const id = setInterval(() => go(1), 4200)
    return () => clearInterval(id)
  }, [playing, list.length, go])

  useEffect(() => {
    const view = viewportRef.current
    if (!view) return undefined

    const onDown = (e) => {
      drag.current.on = true
      drag.current.x = e.clientX
      view.classList.add('dragging')
    }
    const onUp = () => {
      if (!drag.current.on) return
      drag.current.on = false
      view.classList.remove('dragging')
    }
    const onMove = (e) => {
      if (!drag.current.on) return
      const d = e.clientX - drag.current.x
      if (Math.abs(d) > 60) {
        drag.current.x = e.clientX
        go(d < 0 ? 1 : -1)
      }
    }
    const onTouchStart = (e) => {
      drag.current.on = true
      drag.current.x = e.touches[0].clientX
    }
    const onTouchMove = (e) => {
      if (!drag.current.on) return
      const d = e.touches[0].clientX - drag.current.x
      if (Math.abs(d) > 60) {
        drag.current.x = e.touches[0].clientX
        go(d < 0 ? 1 : -1)
      }
    }
    const onTouchEnd = () => {
      drag.current.on = false
    }

    view.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    view.addEventListener('mousemove', onMove)
    view.addEventListener('touchstart', onTouchStart, { passive: true })
    view.addEventListener('touchmove', onTouchMove, { passive: true })
    view.addEventListener('touchend', onTouchEnd)

    return () => {
      view.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      view.removeEventListener('mousemove', onMove)
      view.removeEventListener('touchstart', onTouchStart)
      view.removeEventListener('touchmove', onTouchMove)
      view.removeEventListener('touchend', onTouchEnd)
    }
  }, [go])

  useEffect(() => {
    const onResize = () => setSmall(window.innerWidth <= 640)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const w = small ? CARD_WIDTH_SM : CARD_WIDTH
  const slideStyle = (i) => {
    const delta = i - current
    const abs = Math.abs(delta)
    if (abs > 3) {
      return { visibility: 'hidden', opacity: 0 }
    }
    return {
      visibility: 'visible',
      zIndex: 100 - abs,
      opacity: Math.max(0.3, 1 - abs * 0.2),
      transform: `translate(-50%,-50%) translateX(${delta * (w * 0.78)}px) rotateY(${-delta * 55}deg) scale(${Math.max(0.55, 1 - abs * 0.13)})`,
    }
  }

  return (
    <section className="section section-tight" id="certifications">
      <div className="container">
        <div className="section-head center reveal">
          <span className="eyebrow">Certifications</span>
          <h2>Certifications &amp; <span className="text-gradient">courses</span></h2>
          <p>Continuous learning across programming, development, and the web.</p>
        </div>
        <div className="cert-tools reveal">
          <input
            type="search"
            className="cert-search"
            id="certSearch"
            placeholder="Search certifications…"
            aria-label="Search certifications"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setIndex(0)
            }}
          />
          <button
            className="cert-toggle"
            id="certFeaturedToggle"
            aria-pressed={featuredOnly}
            onClick={() => {
              setFeaturedOnly((o) => !o)
              setIndex(0)
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m12 2 2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.8 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8z" />
            </svg>
            Featured only
          </button>
        </div>
        <div className="cf-stage reveal">
          <div
            className="cf-viewport"
            id="certViewport"
            ref={viewportRef}
            onMouseEnter={() => setPlaying(false)}
            onMouseLeave={() => setPlaying(true)}
          >
            <div className="cf-track" id="certTrack">
              {list.length === 0 ? (
                <p style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', color: 'var(--muted)', whiteSpace: 'nowrap' }}>
                  No certifications match your search.
                </p>
              ) : (
                list.map((c, i) => (
                  <div
                    className="cf-slide"
                    role="group"
                    aria-label={`Certification ${i + 1} of ${list.length}`}
                    key={`${c.title}-${c.issuer}`}
                    style={slideStyle(i)}
                  >
                    <div className="cf-card">
                      <span className="cf-num">{String(i + 1).padStart(2, '0')}</span>
                      <div className="cf-badge"><Icon d={CERT_BADGE_ICON} /></div>
                      <div className="cf-info">
                        <h3>{c.title}</h3>
                        <div className="cf-issuer">
                          {c.issuer}
                          {c.featured && <span className="feat-star">★ Featured</span>}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        <div className="cf-nav reveal">
          <button className="cf-arrow" id="cfPrev" aria-label="Previous certification" onClick={() => go(-1)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <div className="cf-counter" id="cfCounter" aria-live="polite">{list.length ? current + 1 : 0} / {list.length}</div>
          <button className="cf-arrow" id="cfNext" aria-label="Next certification" onClick={() => go(1)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}