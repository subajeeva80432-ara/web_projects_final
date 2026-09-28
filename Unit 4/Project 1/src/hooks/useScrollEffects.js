import { useEffect } from 'react'

export default function useScrollEffects(onScroll = () => {}, onBackTop = () => {}) {
  useEffect(() => {
    const h = document.documentElement
    const progress = document.getElementById('progress')
    const backTop = document.getElementById('backTop')

    const handleScroll = () => {
      const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight || 1)
      if (progress) progress.style.width = `${scrolled * 100}%`
      if (backTop) {
        if (h.scrollTop > 500) backTop.classList.add('show')
        else backTop.classList.remove('show')
      }
    }

    const handleClick = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    onScroll(handleScroll)
    onBackTop(handleClick)

    window.addEventListener('scroll', handleScroll, { passive: true })
    if (backTop) backTop.addEventListener('click', handleClick)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (backTop) backTop.removeEventListener('click', handleClick)
    }
  }, [onScroll, onBackTop])
}