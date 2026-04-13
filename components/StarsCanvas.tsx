'use client'
import { useEffect, useRef } from 'react'

export default function StarsCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const c = ref.current!
    const ctx = c.getContext('2d')!
    type Star = { x:number; y:number; r:number; o:number; s:number; p:number }
    let S: Star[] = []

    const resize = () => {
      c.width  = window.innerWidth
      c.height = window.innerHeight
      S = Array.from({ length: 200 }, () => ({
        x: Math.random() * c.width,
        y: Math.random() * c.height,
        r: Math.random() * 1.4 + 0.3,
        o: Math.random(),
        s: Math.random() * 0.003 + 0.001,
        p: Math.random() * Math.PI * 2,
      }))
    }
    resize()
    window.addEventListener('resize', resize)

    let t = 0, raf: number
    const draw = () => {
      ctx.clearRect(0, 0, c.width, c.height)
      S.forEach(s => {
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(200,230,255,${s.o * (0.5 + 0.5 * Math.sin(t * s.s + s.p))})`
        ctx.fill()
      })
      t++
      raf = requestAnimationFrame(draw)
    }
    draw()

    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(raf) }
  }, [])

  return <canvas id="stars-canvas" ref={ref} />
}
