'use client'
import { useEffect, useRef } from 'react'

export default function GlobeSection() {
  const cvRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const cv = cvRef.current!
    const ctx = cv.getContext('2d')!
    const S=500; cv.width=S; cv.height=S
    const cx=S/2,cy=S/2,R=180,N=280,golden=Math.PI*(3-Math.sqrt(5))
    const dots=Array.from({length:N},(_,i)=>{const y=1-(i/(N-1))*2,r=Math.sqrt(1-y*y),theta=golden*i;return{theta,phi:Math.asin(y),ba:.3+Math.random()*.5}})
    type Packet={from:number;to:number;t:number;sp:number}
    let packets:Packet[]=[],rotY=0
    const iv=setInterval(()=>{const f=Math.floor(Math.random()*N);packets.push({from:f,to:Math.floor(Math.random()*N),t:0,sp:.01+Math.random()*.015})},280)
    const proj=(theta:number,phi:number)=>{const x=Math.cos(phi)*Math.cos(theta+rotY),y=Math.sin(phi),z=Math.cos(phi)*Math.sin(theta+rotY);return{sx:cx+x*R,sy:cy-y*R,z}}
    let raf:number
    const draw=()=>{
      ctx.clearRect(0,0,S,S); rotY+=.004
      const g=ctx.createRadialGradient(cx,cy,R*.6,cx,cy,Math.max(R*.61,R*1.3));g.addColorStop(0,'rgba(255, 196, 0, 0.04)');g.addColorStop(1,'transparent');ctx.beginPath();ctx.arc(cx,cy,R*1.3,0,Math.PI*2);ctx.fillStyle=g;ctx.fill()
      ctx.beginPath();ctx.arc(cx,cy,R,0,Math.PI*2);ctx.strokeStyle='rgba(0,200,255,.06)';ctx.lineWidth=1;ctx.stroke()
      ;[-0.5,0,0.5].forEach(lat=>{const r2=Math.cos(lat)*R,pY=cy-Math.sin(lat)*R;if(r2>0){ctx.beginPath();ctx.ellipse(cx,pY,r2,r2*.3,0,0,Math.PI*2);ctx.strokeStyle='rgba(0,200,255,.04)';ctx.lineWidth=.8;ctx.stroke()}})
      const pr=dots.map(d=>({...proj(d.theta,d.phi),ba:d.ba}))
      pr.forEach(p=>{if(p.z<0)return;ctx.beginPath();ctx.arc(p.sx,p.sy,1.8,0,Math.PI*2);ctx.fillStyle=`rgba(0,200,255,${p.z*p.ba})`;ctx.fill()})
      packets=packets.filter(pk=>pk.t<1)
      packets.forEach(pk=>{const a=pr[pk.from],b=pr[pk.to];if(!a||!b)return;const px=a.sx+(b.sx-a.sx)*pk.t,py=a.sy+(b.sy-a.sy)*pk.t,al=Math.sin(pk.t*Math.PI);ctx.beginPath();ctx.arc(px,py,3,0,Math.PI*2);ctx.fillStyle=`rgba(245,200,66,${al})`;ctx.fill();ctx.beginPath();ctx.arc(px,py,6,0,Math.PI*2);ctx.fillStyle=`rgba(245,200,66,${al*.3})`;ctx.fill();pk.t+=pk.sp})
      raf=requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); clearInterval(iv) }
  }, [])

  return (
    <section id="globe-section">
      <div style={{maxWidth:'1000px',width:'100%',textAlign:'center'}}>
        <p className="s-label" style={{textAlign:'center'}}>// ACT IV — THE REACH</p>
        <h2 className="s-title" style={{textAlign:'center'}}>The Internet erases all borders</h2>
        <div className="s-div" style={{margin:'26px auto'}} />
        <p className="s-body" style={{textAlign:'center',margin:'0 auto'}}>
          When an idea becomes a web app, it reaches <span className="go">5 billion people</span> connected to the internet.
          It works while you sleep, no borders, no permission.
        </p>
        <div id="globe-wrap"><canvas id="globe-canvas" ref={cvRef} /></div>
      </div>
    </section>
  )
}
