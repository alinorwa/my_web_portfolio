'use client'
import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function CTASection() {
  useEffect(() => {
    gsap.from('.cta-h', { opacity: 0, y: 50, duration: .9, ease: 'power3.out', scrollTrigger: { trigger: '#cta-section', start: 'top 75%' } })
    gsap.from('.cta-sub', { opacity: 0, y: 30, duration: .7, ease: 'power3.out', scrollTrigger: { trigger: '#cta-section', start: 'top 75%' }, delay: .2 })
    gsap.from('.cta-btn', { opacity: 0, y: 20, scale: .9, duration: .7, ease: 'back.out(1.5)', scrollTrigger: { trigger: '#cta-section', start: 'top 75%' }, delay: .4 })
    const btn = document.querySelector('.cta-btn')
    btn?.addEventListener('mouseenter', () => gsap.to('.cta-btn', { scale: 1.06, y: -3, duration: .3 }))
    btn?.addEventListener('mouseleave', () => gsap.to('.cta-btn', { scale: 1, y: 0, duration: .3 }))
  }, [])

  return (
    <section id="cta-section">
      <div style={{ textAlign: 'center' }}>
        <p className="s-label" style={{ textAlign: 'center' }}>// The Time is Now</p>
        <h2 className="cta-h">
          Your idea deserves<br />
          <span style={{ background: 'linear-gradient(135deg,var(--gold),var(--accent))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            to be seen by the world
          </span>
        </h2>
        <p className="cta-sub" style={{ margin: '0 auto 48px' }}>Don&apos;t wait for the perfect moment — it&apos;s now.</p>
        <a href="" className="cta-btn">
          <span>Let's Build Together</span><span>→</span>
        </a>
      </div>
    </section>
  )
}
