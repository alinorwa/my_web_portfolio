'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function BrainSection() {
  const cvRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    // Scroll reveal
    const els = document.querySelectorAll('#brain-section .s-label,#brain-section .s-title,#brain-section .s-body,#brain-section .s-div')
    els.forEach(el => {
      gsap.from(el, { opacity: 0, y: 40, duration: 0.8, scrollTrigger: { trigger: el, start: 'top 88%' } })
    })

    // Brain canvas
    const cv = cvRef.current!
    const ctx = cv.getContext('2d')!
    const W = 460, H = 460; cv.width = W; cv.height = H
    const cx = W / 2, cy = H / 2

    type Node = { x:number; y:number; vx:number; vy:number; r:number; phase:number; center?:boolean }
    const nodes: Node[] = Array.from({ length: 28 }, (_, i) => {
      const a = (i / 28) * Math.PI * 2, r = 80 + Math.random() * 120
      return { x: cx + Math.cos(a)*r + (Math.random()-.5)*40, y: cy + Math.sin(a)*r + (Math.random()-.5)*40, vx: (Math.random()-.5)*.4, vy: (Math.random()-.5)*.4, r: 3+Math.random()*4, phase: Math.random()*Math.PI*2 }
    })
    nodes.push({ x: cx, y: cy, vx: 0, vy: 0, r: 10, phase: 0, center: true })

    const edges: [number,number][] = []
    for (let i=0;i<nodes.length;i++) for (let j=i+1;j<nodes.length;j++) {
      const dx=nodes[i].x-nodes[j].x, dy=nodes[i].y-nodes[j].y
      if (Math.sqrt(dx*dx+dy*dy)<130) edges.push([i,j])
    }

    type Spark = { edge:[number,number]; t:number; sp:number }
    let sparks: Spark[] = []
    const iv = setInterval(() => {
      const e = edges[Math.floor(Math.random()*edges.length)]
      sparks.push({ edge: e, t: 0, sp: 0.009+Math.random()*0.012 })
    }, 200)

    let t = 0, raf: number
    const draw = () => {
      ctx.clearRect(0, 0, W, H); t += 0.012
      edges.forEach(([i,j]) => {
        const a=nodes[i],b=nodes[j]; ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y)
        ctx.strokeStyle='rgba(0,200,255,.07)'; ctx.lineWidth=.8; ctx.stroke()
      })
      sparks = sparks.filter(s=>s.t<1)
      sparks.forEach(s => {
        const [i,j]=s.edge,a=nodes[i],b=nodes[j]
        const px=a.x+(b.x-a.x)*s.t, py=a.y+(b.y-a.y)*s.t
        ctx.beginPath(); ctx.arc(px,py,2,0,Math.PI*2)
        ctx.fillStyle=`rgba(0,200,255,${1-s.t})`; ctx.fill(); s.t+=s.sp
      })
      nodes.forEach(n => {
        if (!n.center) {
          n.x+=n.vx; n.y+=n.vy
          if(n.x<30||n.x>W-30) n.vx*=-1
          if(n.y<30||n.y>H-30) n.vy*=-1
        }
        const p=.5+.5*Math.sin(t+n.phase)
        if (n.center) {
          const g=ctx.createRadialGradient(cx,cy,0,cx,cy,26)
          g.addColorStop(0,`rgba(0,200,255,${.8+.2*Math.sin(t*2)})`); g.addColorStop(1,'transparent')
          ctx.beginPath(); ctx.arc(cx,cy,26,0,Math.PI*2); ctx.fillStyle=g; ctx.fill()
          ctx.beginPath(); ctx.arc(cx,cy,10,0,Math.PI*2); ctx.fillStyle='#00c8ff'; ctx.fill()
          ctx.save(); ctx.translate(cx,cy); ctx.rotate(t*.5)
          ctx.strokeStyle='rgba(0,200,255,.4)'; ctx.lineWidth=1.5
          ctx.beginPath(); ctx.arc(0,0,22,0,Math.PI*1.5); ctx.stroke(); ctx.restore()
        } else {
          ctx.beginPath(); ctx.arc(n.x,n.y,Math.max(0.01,n.r*(.8+.3*p)),0,Math.PI*2)
          ctx.fillStyle=`rgba(0,200,255,${(.4+.6*p)*.7})`; ctx.fill()
        }
      })
      ctx.font="bold 13px 'Space Mono'"
      ctx.fillStyle=`rgba(0,200,255,${.5+.5*Math.sin(t)})`
      ctx.textAlign='center'; ctx.fillText('IDEA',cx,cy+28)
      raf = requestAnimationFrame(draw)
    }
    draw()

    return () => { clearInterval(iv); cancelAnimationFrame(raf) }
  }, [])

  return (
    <section id="brain-section" className="s-section">
      <div className="brain-grid">
        <div>
          <p className="s-label">// ACT II — THE TRAPPED IDEA</p>
          <h2 className="s-title">Your mind is full of ideas<br /><span className="ac">that deserve to live</span></h2>
          <div className="s-div" />
          <p className="s-body">
            Every day dozens of ideas pass through you — solutions to problems you see,
            tools you wish existed. But most stay imprisoned between the walls of the mind
            until forgotten.<br /><br />
            <span className="ac">An idea that is never launched, is never lived.</span>
          </p>
        </div>
        <div id="brain-wrap">
          <canvas id="brain-canvas" ref={cvRef} />
        </div>
      </div>
    </section>
  )
}
