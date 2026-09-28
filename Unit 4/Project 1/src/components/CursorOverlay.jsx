import { useEffect, useRef } from 'react'

export default function CursorOverlay() {
  const glowRef = useRef(null)
  const ringRef = useRef(null)
  const dotRef = useRef(null)

  useEffect(() => {
    const glow = glowRef.current
    const ring = ringRef.current
    const dot = dotRef.current

    let mX = -9999
    let mY = -9999
    let rX = -9999
    let rY = -9999
    let raf = 0

    const onMove = (e) => {
      mX = e.clientX
      mY = e.clientY
      dot.style.transform = `translate(${mX}px,${mY}px) translate(-50%,-50%)`
      glow.style.transform = `translate(${mX}px,${mY}px) translate(-50%,-50%)`
    }
    const loop = () => {
      rX += (mX - rX) * 0.16
      rY += (mY - rY) * 0.16
      ring.style.transform = `translate(${rX}px,${rY}px) translate(-50%,-50%)`
      raf = requestAnimationFrame(loop)
    }
    const onEnter = () => {
      glow.classList.add('is-on')
      ring.classList.add('is-on')
      dot.classList.add('is-on')
    }
    const onLeave = () => {
      glow.classList.remove('is-on')
      ring.classList.remove('is-on')
      dot.classList.remove('is-on')
    }
    const onOver = (e) => {
      if (e.target.closest('a, button, input, textarea')) ring.classList.add('is-hover')
      else ring.classList.remove('is-hover')
    }
    const onOut = () => ring.classList.remove('is-hover')

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseenter', onEnter)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)
    raf = requestAnimationFrame(loop)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseenter', onEnter)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div className="grain" aria-hidden="true" />
      <div className="cursor-glow" id="cursorGlow" ref={glowRef} />
      <div className="cursor-ring" id="cursorRing" ref={ringRef} />
      <div className="cursor-dot" id="cursorDot" ref={dotRef} />
    </>
  )
}