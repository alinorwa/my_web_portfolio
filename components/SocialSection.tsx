'use client'
import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SOCIALS } from '@/lib/data'

gsap.registerPlugin(ScrollTrigger)

export default function SocialSection() {
  useEffect(() => {
    gsap.from('.social-center', { opacity: 0, scale: .3, duration: 1, ease: 'back.out(2)', scrollTrigger: { trigger: '#social-section', start: 'top 70%' } })
    gsap.utils.toArray<HTMLElement>('.social-card').forEach((el, i) => {
      gsap.from(el, { opacity: 0, y: 50, scale: .85, rotation: i%2===0?-5:5, duration: .7, ease: 'back.out(1.5)', scrollTrigger: { trigger: '#social-section', start: 'top 60%' }, delay: .2+i*.1 })
    })
    gsap.to('.social-center', { boxShadow: '0 0 80px rgba(0,200,255,.5),0 0 150px rgba(0,100,255,.25)', duration: 2, repeat: -1, yoyo: true, ease: 'sine.inOut', scrollTrigger: { trigger: '#social-section', start: 'top 70%' } })
  }, [])

  return (
    <section id="social-section">
      <div className="social-wrap">
        <p className="s-label" style={{textAlign:'center',marginBottom:'12px'}}>// Connect With Me</p>
        <h2 className="s-title" style={{textAlign:'center',marginBottom:'40px'}}>Every platform — <span className="ac">a different gateway</span></h2>
        <div className="social-center">📡</div>
        <div className="social-grid">
          {SOCIALS.map(s => (
            <a key={s.name} href={s.link} target="_blank" rel="noreferrer" className="social-card"
              style={{'--sc-a':s.ac, background:s.color} as React.CSSProperties}>
              <div className="sc-icon">{s.icon}</div>
              <div className="sc-name">{s.name}</div>
              <div className="sc-handle">{s.handle}</div>
              <div style={{fontSize:'12px',color:'var(--dim)',marginTop:'4px'}}>{s.desc}</div>
              <div className="sc-arrow">→</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
