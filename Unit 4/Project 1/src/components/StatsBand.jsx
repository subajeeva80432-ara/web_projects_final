import { useEffect, useRef } from 'react'
import DATA from '../data.js'
import Icon from './Icon.jsx'

function StatNumber({ value, suffix }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined

    const duration = 1200
    let startTime = null
    let raf = 0

    const step = (ts) => {
      if (startTime === null) startTime = ts
      const p = Math.min((ts - startTime) / duration, 1)
      el.textContent = Math.floor(p * value) + suffix
      if (p < 1) raf = requestAnimationFrame(step)
    }

    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((en) => en.isIntersecting)) {
          startTime = null
          raf = requestAnimationFrame(step)
          obs.disconnect()
        }
      },
      { threshold: 0.4 }
    )
    obs.observe(el)
    return () => {
      obs.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [value, suffix])

  return (
    <span ref={ref} className="count" data-target={value} data-suffix={suffix}>
      0{suffix}
    </span>
  )
}

function Stat({ s }) {
  return (
    <div className="stat">
      <div className="icon"><Icon d={s.icon} /></div>
      <div className="num"><StatNumber value={s.num} suffix={s.suffix} /></div>
      <div className="lbl">{s.label}</div>
    </div>
  )
}

export default function StatsBand() {
  const stats = [...DATA.stats, ...DATA.stats]

  return (
    <section className="stats-band" aria-label="Highlights">
      <div className="marquee">
        <div className="marquee-track" id="statsTrack">
          {stats.map((s, i) => (
            <Stat key={`${s.label}-${i}`} s={s} />
          ))}
        </div>
      </div>
    </section>
  )
}