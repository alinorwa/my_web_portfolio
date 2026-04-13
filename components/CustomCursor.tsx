'use client'
import { useEffect } from 'react'
import { gsap } from 'gsap'

export default function CustomCursor() {
  useEffect(() => {
    const $cur = document.getElementById('cursor')!
    const $tr  = document.getElementById('trail')!

    // Show only on first mouse move
    const showCursor = () => {
      $cur.style.opacity = '1'
      $tr.style.opacity  = '1'
    }
    document.addEventListener('mousemove', showCursor, { once: true })

    const onMove = (e: MouseEvent) => {
      gsap.to($cur, { left: e.clientX, top: e.clientY, duration: 0.04, overwrite: true })
      gsap.to($tr,  { left: e.clientX, top: e.clientY, duration: 0.14, overwrite: true })
    }
    document.addEventListener('mousemove', onMove)

    const onOver = (e: MouseEvent) => {
      const t = e.target as Element
      if (t.closest('button,a,.proj-card,.social-card,.nd,#modal-close')) {
        gsap.to($cur, { width: 22, height: 22, background: '#fff', duration: 0.22 })
      } else {
        gsap.to($cur, { width: 12, height: 12, background: '#00c8ff', duration: 0.22 })
      }
    }
    document.addEventListener('mouseover', onOver)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
    }
  }, [])

  return (
    <>
      <div id="cursor" />
      <div id="trail" />
    </>
  )
}
