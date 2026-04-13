'use client'
import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import CinemaIntro     from '@/components/CinemaIntro'
import CustomCursor    from '@/components/CustomCursor'
import StarsCanvas     from '@/components/StarsCanvas'
import NavDots         from '@/components/NavDots'
import HeroSection     from '@/components/HeroSection'
import BrainSection    from '@/components/BrainSection'
import JourneySection  from '@/components/JourneySection'
import AboutSection    from '@/components/AboutSection'
import ProjectsSection from '@/components/ProjectsSection'
import SocialSection   from '@/components/SocialSection'
import GlobeSection    from '@/components/GlobeSection'
import SkillsSection   from '@/components/SkillsSection'
import CTASection      from '@/components/CTASection'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  useEffect(() => {
    // Intro logo entrance
    gsap.fromTo('.intro-logo', { opacity: 0, scale: .8 }, { opacity: 1, scale: 1, duration: .8, ease: 'back.out(1.6)', delay: .2 })
    gsap.fromTo('.start-btn',  { opacity: 0, y: 20 },     { opacity: 1, y: 0,    duration: .7, ease: 'power3.out',    delay: .6 })

    // Scroll progress bar
    ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: s => {
        const bar = document.getElementById('pbar')
        if (bar) bar.style.width = (s.progress * 100) + '%'
      },
    })

    // Scroll reveals for shared elements
    const revealEls = document.querySelectorAll(
      '#projects-section .s-label, #projects-section .s-title, #projects-section .s-div,' +
      '#social-section .s-label, #social-section .s-title,' +
      '#globe-section .s-label, #globe-section .s-title, #globe-section .s-body, #globe-section .s-div,' +
      '#skills-section .s-label, #skills-section .s-title, #skills-section .s-div'
    )
    revealEls.forEach(el => {
      gsap.from(el, { opacity: 0, y: 40, duration: 0.8, scrollTrigger: { trigger: el, start: 'top 88%' } })
    })
  }, [])

  return (
    <>
      <div id="pbar" />
      <StarsCanvas />
      <CustomCursor />
       {/* <CinemaIntro />  */}
      <NavDots />

      <main>
        <HeroSection />
        <BrainSection />
        <JourneySection />
        <AboutSection />
        <ProjectsSection />
        <SocialSection />
        <GlobeSection />
        <SkillsSection />
        <CTASection />
      </main>
    </>
  )
}
