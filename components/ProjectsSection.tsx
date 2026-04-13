'use client'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PROJECTS } from '@/lib/data'

gsap.registerPlugin(ScrollTrigger)

type Project = typeof PROJECTS[number]

export default function ProjectsSection() {
  const [modal, setModal] = useState<Project | null>(null)
  const modalOpenRef = useRef(false)

  const openModal = (p: Project) => {
    if (modalOpenRef.current) return
    modalOpenRef.current = true
    setModal(p)
  }

  const closeModal = () => {
    if (!modalOpenRef.current) return
    gsap.timeline({
      onComplete: () => { modalOpenRef.current = false; setModal(null) },
    })
      .to('#modal-box',      { opacity: 0, scale: .88, y: 30, duration: .35, ease: 'power2.in' })
      .to('#modal-backdrop', { opacity: 0, duration: .3 }, '<.1')
  }

  useEffect(() => {
    if (!modal) return
    const el = document.getElementById('proj-modal')!
    el.style.pointerEvents = 'auto'
    gsap.timeline()
      .to('#modal-backdrop', { opacity: 1, duration: .4, ease: 'power2.out' })
      .to('#modal-box',      { opacity: 1, scale: 1, y: 0, duration: .5, ease: 'back.out(1.4)' }, '<.1')
    gsap.from('.modal-title',      { opacity: 0, y: 20, duration: .5, delay: .4 })
    gsap.from('.modal-desc',       { opacity: 0, y: 15, duration: .5, delay: .5 })
    gsap.from('.modal-tech span',  { opacity: 0, scale: .7, duration: .4, stagger: .05, delay: .55, ease: 'back.out(1.5)' })
    gsap.from('.modal-features li',{ opacity: 0, x: 20,  duration: .4, stagger: .06, delay: .65 })
  }, [modal])

  useEffect(() => {
    if (!modal) {
      const el = document.getElementById('proj-modal')
      if (el) el.style.pointerEvents = 'none'
    }
  }, [modal])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeModal() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    gsap.utils.toArray<HTMLElement>('.proj-card').forEach((el, i) => {
      gsap.from(el, { opacity: 0, y: 60, scale: .94, duration: .7, ease: 'back.out(1.3)', scrollTrigger: { trigger: el, start: 'top 88%' }, delay: i*.12 })
    })
  }, [])

  return (
    <>
      <section id="projects-section">
        <div style={{maxWidth:'1100px',width:'100%'}}>
          <p className="s-label">// My Projects</p>
          <h2 className="s-title">Work that <span style={{color:'var(--accent3)'}}>speaks for itself</span></h2>
          <div className="s-div" />
          <div className="projects-grid">
            {PROJECTS.map(p => (
              <div key={p.id} className="proj-card" onClick={() => openModal(p)}
                onMouseEnter={e => {
                  const shine = (e.currentTarget as HTMLElement).querySelector<HTMLElement>('.proj-shine')!
                  gsap.fromTo(shine, { left: '-60%', opacity: 1 }, { left: '160%', opacity: 1, duration: .7, ease: 'power2.out' })
                }}>
                <div className="proj-shine" />
                <div className="proj-body">
                  <div className="proj-tag">{p.tag}</div>
                  <div className="proj-title">{p.title}</div>
                  <div className="proj-desc">{p.desc}</div>
                  <div className="proj-tech">{p.tech.map(t=><span key={t}>{t}</span>)}</div>
                  <button className="proj-open-btn">View Project <span className="proj-arrow">→</span></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      <div id="proj-modal" style={{position:'fixed',inset:0,zIndex:2000,display:'flex',alignItems:'center',justifyContent:'center',pointerEvents:'none',overflow:'hidden'}}>
        <div id="modal-backdrop" style={{position:'absolute',inset:0,background:'rgba(4,12,28,.93)',backdropFilter:'blur(18px)',opacity:0}} onClick={closeModal} />
        <div id="modal-box" style={{position:'relative',width:'min(860px,92vw)',maxHeight:'88vh',background:'#0d2244',border:'1px solid rgba(46,212,255,.28)',borderRadius:'24px',overflow:'hidden',overflowY:'auto',zIndex:1,transform:'scale(.88) translateY(40px)',opacity:0}}>
          <button id="modal-close" onClick={closeModal}>✕</button>
          {modal && (
            <div>
              <div className="modal-hero-placeholder" style={{background:modal.color}}>{modal.emoji}</div>
              <div className="modal-content">
                <div className="modal-tag">{modal.tag}</div>
                <h2 className="modal-title">{modal.title}</h2>
                <p className="modal-desc">{modal.fullDesc}</p>
                <div className="modal-section-title">// Technologies Used</div>
                <div className="modal-tech">{modal.tech.map(t=><span key={t}>{t}</span>)}</div>
                <div className="modal-section-title">// Key Features</div>
                <ul className="modal-features">{modal.features.map(f=><li key={f}>{f}</li>)}</ul>
                <a href={modal.link} className="modal-cta" target="_blank" rel="noreferrer"><span>Visit Project</span><span>→</span></a>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
