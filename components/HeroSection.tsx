'use client'
import { useEffect } from 'react'
import { gsap } from 'gsap'

export default function HeroSection() {
  useEffect(() => {
    gsap.to('.orbit',             { rotation: 360,  duration: 35, repeat: -1, ease: 'none', transformOrigin: 'center center' })
    gsap.to('.orbit-r:nth-child(2)', { rotation: -360, duration: 22, repeat: -1, ease: 'none', transformOrigin: 'center center' })

    const tl = gsap.timeline({ delay: 0.3 })
    tl.to('.h-eye',      { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' })
      .to('.h-hl',       { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, '<.2')
      .to('.h-sub',      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '<.2')
      .to('.scroll-hint',{ opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '<.3')

    gsap.to('.scroll-line', { scaleY: 0.4, opacity: 0.3, duration: 1.8, repeat: -1, yoyo: true, ease: 'sine.inOut' })
  }, [])

  return (
    <section id="hero">
      <div className="orbit">
        <div className="orbit-r" /><div className="orbit-r" /><div className="orbit-r" />
      </div>
      <p className="h-eye">// ACT I — THE FIRST SPARK</p>
      <h1 className="h-hl">
        <span className="l1">Don&apos;t let your idea</span>
        <span className="l2">die in silence</span>
      </h1>
      <p className="h-sub">
        Every invention, every platform, everything that changed the world — started with
        a single idea in a single mind. The only difference? They decided to launch it.
      </p>
      <div className="scroll-hint">
        <span>Discover the story</span>
        <div className="scroll-line" />
      </div>
    </section>
  )
}
