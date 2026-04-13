'use client'
import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SECTIONS = ['hero','brain-section','journey-outer','about-section','projects-section','social-section','cta-section']

export default function NavDots() {
  useEffect(() => {
    SECTIONS.forEach((id, i) => {
      ScrollTrigger.create({
        trigger: `#${id}`,
        start: 'top center',
        end: 'bottom center',
        onToggle: s => {
          if (s.isActive)
            document.querySelectorAll('.nd').forEach((d, j) => d.classList.toggle('on', i === j))
        },
      })
    })

    const dots = document.querySelectorAll('.nd')
    dots.forEach(d => {
      d.addEventListener('click', () => {
        document.getElementById((d as HTMLElement).dataset.t!)?.scrollIntoView({ behavior: 'smooth' })
      })
    })
  }, [])

  return (
    <div id="navd">
      {SECTIONS.map((id, i) => (
        <div key={id} className={`nd${i === 0 ? ' on' : ''}`} data-t={id} />
      ))}
    </div>
  )
}
