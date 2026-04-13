'use client'
import { useRef } from 'react'
import { gsap } from 'gsap'

export default function CinemaIntro() {
  const introRef = useRef<HTMLDivElement>(null)

  const handleStart = () => {
    const tl = gsap.timeline()
    tl.to('.curt-l', { x: '-100%', duration: 1.6, ease: 'power3.inOut' })
      .to('.curt-r', { x: '100%', duration: 1.6, ease: 'power3.inOut' }, '<')
      .to(introRef.current, {
        opacity: 0, duration: 0.6,
        onComplete: () => { if (introRef.current) introRef.current.style.display = 'none' },
      })
  }

  return (
    <div id="cinema-intro" ref={introRef}>
      <div className="curt curt-l" />
      <div className="curt curt-r" />
      <div className="intro-logo">
        <span className="icon">🎬</span>
        <h1>IDEA → REALITY</h1>
      </div>
      <button className="start-btn" onClick={handleStart}>
        Begin the Journey
      </button>
    </div>
  )
}
