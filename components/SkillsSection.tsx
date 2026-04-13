'use client'
import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SKILLS = [
  { icon:'⚡', title:'Problem Solving',    desc:'I turn complex challenges into clear, buildable steps.',         tag:'Problem Solving', ca:'#00c8ff' },
  { icon:'🎨', title:'Modern Interfaces',  desc:'I design user experiences that keep visitors coming back.',      tag:'UI / UX',         ca:'#7b2fff' },
  { icon:'🔧', title:'Full Stack Dev',     desc:'From database to screen — I build every layer of your project.',tag:'Full Stack',       ca:'#0066ff' },
  { icon:'🚀', title:'Rapid Launch',       desc:'From idea to testable MVP in the shortest time possible.',       tag:'MVP / Launch',    ca:'#f5c842' },
  { icon:'📊', title:'Revenue Model',      desc:'I help you define the right monetisation strategy from day one.',tag:'Monetization',    ca:'#00ff88' },
  { icon:'🌐', title:'Global Scale',       desc:'I build products that speak any user\'s language, anywhere.',   tag:'Global Scale',    ca:'#ff6b6b' },
]

export default function SkillsSection() {
  useEffect(() => {
    gsap.utils.toArray<HTMLElement>('.sk-card').forEach((el, i) => {
      gsap.from(el, { opacity: 0, y: 50, scale: .93, duration: .7, ease: 'back.out(1.4)', scrollTrigger: { trigger: el, start: 'top 88%' }, delay: i*.09 })
      el.addEventListener('mouseenter', () => gsap.to(el, { y: -6, boxShadow: '0 0 40px rgba(0,200,255,.1)', duration: .3 }))
      el.addEventListener('mouseleave', () => gsap.to(el, { y: 0, boxShadow: 'none', duration: .3 }))
    })
  }, [])

  return (
    <section id="skills-section">
      <div style={{maxWidth:'1100px',width:'100%'}}>
        <p className="s-label">// ACT V — My Toolkit</p>
        <h2 className="s-title">What do I bring<br /><span style={{color:'var(--accent3)'}}>to your project?</span></h2>
        <div className="s-div" />
        <div className="sk-grid">
          {SKILLS.map(s => (
            <div key={s.title} className="sk-card" style={{'--ca':s.ca} as React.CSSProperties}>
              <span className="ci">{s.icon}</span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <span className="sk-tag">{s.tag}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
