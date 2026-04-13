'use client'
import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// const STATS = [
//   { target: 12, label: 'Projects Delivered' },
//   { target: 5,  label: 'Years Experience' },
//   { target: 8,  label: 'Happy Clients' },
//   { target: 3,  label: 'Core Technologies' },
// ]

export default function AboutSection() {
  useEffect(() => {
    gsap.to('.avatar-ring:nth-child(1)', { rotation: 360,  duration: 20, repeat: -1, ease: 'none', transformOrigin: 'center center' })
    gsap.to('.avatar-ring:nth-child(2)', { rotation: -360, duration: 14, repeat: -1, ease: 'none', transformOrigin: 'center center' })

    gsap.utils.toArray<HTMLElement>('.float-pill').forEach((el, i) => {
      gsap.fromTo(el, { y: 0 }, { y: -12, duration: 2.2+i*.4, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: i*.5 })
      gsap.from(el, { opacity: 0, scale: .5, duration: .6, ease: 'back.out(1.8)', scrollTrigger: { trigger: '#about-section', start: 'top 70%' }, delay: .3+i*.1 })
    })

    gsap.from('.avatar-ring-outer', { opacity: 0, scale: .6, duration: 1, ease: 'back.out(1.4)', scrollTrigger: { trigger: '#about-section', start: 'top 70%' } })
    gsap.from('.avatar-img',         { opacity: 0, scale: .5, duration: .8, ease: 'back.out(2)',   scrollTrigger: { trigger: '#about-section', start: 'top 70%' }, delay: .2 })

    document.querySelectorAll('.about-text .s-label,.about-text .s-title,.about-text .s-div,.about-text .s-body').forEach((el, i) => {
      gsap.from(el, { opacity: 0, x: 40, duration: .7, ease: 'power3.out', scrollTrigger: { trigger: '#about-section', start: 'top 70%' }, delay: i*.1 })
    })

    // document.querySelectorAll<HTMLElement>('.about-stat .num').forEach(el => {
    //   const target = +el.dataset.target!
    //   ScrollTrigger.create({ trigger: el, start: 'top 85%', once: true, onEnter: () => {
    //     gsap.fromTo({ v: 0 }, { v: target }, { v: target, duration: 1.8, ease: 'power2.out', onUpdate(this: gsap.core.Tween) { el.textContent = Math.round((this.targets()[0] as {v:number}).v) + '+' } })
    //   }})
    // })

    // gsap.utils.toArray<HTMLElement>('.about-stat').forEach((el, i) => {
    //   gsap.from(el, { opacity: 0, y: 30, scale: .9, duration: .6, ease: 'back.out(1.5)', scrollTrigger: { trigger: el, start: 'top 88%' }, delay: i*.1 })
    // })
  }, [])

  return (
    <section id="about-section" className="s-section">
      <div className="about-wrap">
        <div className="about-avatar-wrap">
          <div className="avatar-ring-outer">
            <div className="avatar-ring" /><div className="avatar-ring" /><div className="avatar-ring" />
            <div className="avatar-img">👨‍💻</div>
          </div>
          <div className="float-pill" style={{top:'10%',right:'-20px'}}>Full Stack</div>
          <div className="float-pill" style={{bottom:'18%',right:'-30px'}}>UI / UX</div>
          <div className="float-pill" style={{top:'40%',left:'-30px'}}>Problem Solver</div>
          <div className="float-pill" style={{bottom:'5%',left:'10px'}}>Web Dev</div>
        </div>

        <div className="about-text">
          <p className="s-label">// Who I Am</p>
          <h2 className="s-title">A developer who turns<br /><span className="ac">ideas into reality</span></h2>
          <div className="s-div" />
          <p className="s-body">
            I&apos;m a passionate Full Stack developer focused on crafting digital experiences that leave a mark.
            I believe any idea — no matter how small — can become a real product that serves people and creates genuine value.<br /><br />
            I build from the database all the way to the interface, caring about every detail from performance and design to user experience.
          </p>
          {/* <div className="about-stats">
            {STATS.map(s => (
              <div key={s.label} className="about-stat">
                <div className="num" data-target={s.target}>0</div>
                <div className="lbl">{s.label}</div>
              </div>
            ))}
          </div> */}

        </div>
      </div>
    </section>
  )
}
