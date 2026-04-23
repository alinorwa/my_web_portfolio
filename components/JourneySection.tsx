'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import React from 'react'

gsap.registerPlugin(ScrollTrigger)

const BG_GLOWS = ['','rgba(245,200,66,.07)','rgba(0,200,255,.07)','rgba(0,102,255,.08)','rgba(123,47,255,.08)','rgba(0,255,136,.06)']

export default function JourneySection() {
  const burstRef = useRef<HTMLCanvasElement>(null)
  const worldOnRef = useRef(false)

  useEffect(() => {
    /* ── IDEA CANVAS ── */
    const ideaCv = document.getElementById('j-idea-canvas') as HTMLCanvasElement
    const ideaCtx = ideaCv.getContext('2d')!
    const IW=290,IH=250,icx=IW/2,icy=IH/2-14
    const pts = Array.from({length:55},(_,i)=>{const a=(i/55)*Math.PI*2;return{angle:a,r:22+Math.random()*82,sp:(Math.random()-.5)*.017,ph:Math.random()*Math.PI*2,sz:1+Math.random()*2.4}})
    let it=0, ideaRaf:number
    const drawIdea=()=>{
      ideaCtx.clearRect(0,0,IW,IH); it+=.02
      ;[95,64,40].forEach((r,i)=>{const g=ideaCtx.createRadialGradient(icx,icy,0,icx,icy,r);g.addColorStop(0,`rgba(0,200,255,${[.04,.09,.18][i]})`);g.addColorStop(1,'transparent');ideaCtx.beginPath();ideaCtx.arc(icx,icy,r,0,Math.PI*2);ideaCtx.fillStyle=g;ideaCtx.fill()})
      pts.forEach(p=>{p.angle+=p.sp;const pl=.6+.4*Math.sin(it+p.ph),x=icx+Math.cos(p.angle)*p.r,y=icy+Math.sin(p.angle)*p.r*.6;ideaCtx.beginPath();ideaCtx.arc(x,y,Math.max(0.01,p.sz*pl),0,Math.PI*2);ideaCtx.fillStyle=`rgba(0,200,255,${pl*.7})`;ideaCtx.fill()})
      for(let i=0;i<8;i++){const a=it*.3+i*(Math.PI*2/8),r2=25+8*Math.sin(it*2+i);ideaCtx.beginPath();ideaCtx.moveTo(icx+Math.cos(a)*12,icy+Math.sin(a)*12);ideaCtx.lineTo(icx+Math.cos(a)*r2,icy+Math.sin(a)*r2);ideaCtx.strokeStyle=`rgba(245,200,66,${.5+.5*Math.sin(it*3+i)})`;ideaCtx.lineWidth=1.5;ideaCtx.stroke()}
      const g2=ideaCtx.createRadialGradient(icx,icy,0,icx,icy,15);g2.addColorStop(0,'rgba(255,255,255,.95)');g2.addColorStop(.4,'rgba(0,200,255,.9)');g2.addColorStop(1,'transparent')
      ideaCtx.beginPath();ideaCtx.arc(icx,icy,15,0,Math.PI*2);ideaCtx.fillStyle=g2;ideaCtx.fill()
      ideaCtx.font="bold 11px 'Space Mono'";ideaCtx.fillStyle=`rgba(0,200,255,${.45+.45*Math.sin(it*.8)})`;ideaCtx.textAlign='center';ideaCtx.fillText('I D E A',icx,icy+42)
      ideaRaf=requestAnimationFrame(drawIdea)
    }
    drawIdea()

    /* ── WORLD CANVAS ── */
    const wCv = document.getElementById('j-world-canvas') as HTMLCanvasElement
    const wCtx = wCv.getContext('2d')!
    const WW=290,WH=270,wcx=WW/2,wcy=WH/2-8,wR=96,wN=220,golden=Math.PI*(3-Math.sqrt(5))
    const wPts=Array.from({length:wN},(_,i)=>{const y=1-(i/(wN-1))*2,r=Math.sqrt(1-y*y),th=golden*i;return{th,phi:Math.asin(y)}})
    let wRot=0; type Ping={from:number;to:number;t:number;sp:number}; let pings:Ping[]=[]
    const pingIv=setInterval(()=>pings.push({from:Math.floor(Math.random()*wN),to:Math.floor(Math.random()*wN),t:0,sp:.013+Math.random()*.01}),320)
    const wProj=(th:number,phi:number)=>{const x=Math.cos(phi)*Math.cos(th+wRot),y=Math.sin(phi),z=Math.cos(phi)*Math.sin(th+wRot);return{sx:wcx+x*wR,sy:wcy-y*wR,z}}
    let worldRaf:number
    const drawWorld=()=>{
      wCtx.clearRect(0,0,WW,WH)
      if(!worldOnRef.current){worldRaf=requestAnimationFrame(drawWorld);return}
      wRot+=.006
      const g=wCtx.createRadialGradient(wcx,wcy,wR*.5,wcx,wcy,wR*1.4);g.addColorStop(0,'rgba(0,80,200,.06)');g.addColorStop(1,'transparent');wCtx.beginPath();wCtx.arc(wcx,wcy,wR*1.4,0,Math.PI*2);wCtx.fillStyle=g;wCtx.fill()
      wCtx.beginPath();wCtx.arc(wcx,wcy,wR,0,Math.PI*2);wCtx.strokeStyle='rgba(0,200,255,.07)';wCtx.lineWidth=1;wCtx.stroke()
      ;[-0.5,0,0.5].forEach(lat=>{const r2=Math.cos(lat)*wR,pY=wcy-Math.sin(lat)*wR;if(r2>0){wCtx.beginPath();wCtx.ellipse(wcx,pY,r2,r2*.3,0,0,Math.PI*2);wCtx.strokeStyle='rgba(0,200,255,.04)';wCtx.lineWidth=.8;wCtx.stroke()}})
      const pp=wPts.map(p=>({...wProj(p.th,p.phi)}))
      pp.forEach(p=>{if(p.z<0)return;wCtx.beginPath();wCtx.arc(p.sx,p.sy,1.5,0,Math.PI*2);wCtx.fillStyle=`rgba(0,200,255,${p.z*.5})`;wCtx.fill()})
      pings=pings.filter(pk=>pk.t<1)
      pings.forEach(pk=>{const a=pp[pk.from],b=pp[pk.to];if(!a||!b)return;const px=a.sx+(b.sx-a.sx)*pk.t,py=a.sy+(b.sy-a.sy)*pk.t,al=Math.sin(pk.t*Math.PI);wCtx.beginPath();wCtx.arc(px,py,4,0,Math.PI*2);wCtx.fillStyle=`rgba(245,200,66,${al})`;wCtx.fill();wCtx.beginPath();wCtx.arc(px,py,8,0,Math.PI*2);wCtx.fillStyle=`rgba(245,200,66,${al*.2})`;wCtx.fill();pk.t+=pk.sp})
      worldRaf=requestAnimationFrame(drawWorld)
    }
    drawWorld()

    /* ── BURST CANVAS ── */
    const bC = burstRef.current!
    const bCtx = bC.getContext('2d')!
    const rzB=()=>{bC.width=bC.parentElement!.offsetWidth;bC.height=bC.parentElement!.offsetHeight}
    rzB(); window.addEventListener('resize',rzB)
    type Part={x:number;y:number;vx:number;vy:number;life:number;r:number;col:string}
    let bParts:Part[]=[]
    const burst=(x:number,y:number,col:string)=>{for(let i=0;i<30;i++){const a=Math.random()*Math.PI*2,sp=2+Math.random()*5;bParts.push({x,y,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp,life:1,r:2+Math.random()*3,col})}}
    let bRaf:number
    const drawBurst=()=>{bCtx.clearRect(0,0,bC.width,bC.height);bParts=bParts.filter(p=>p.life>0);bParts.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.vx*=.94;p.vy*=.94;p.life-=.027;if(p.life<=0)return;bCtx.beginPath();bCtx.arc(p.x,p.y,Math.max(0.01,p.r*p.life),0,Math.PI*2);bCtx.fillStyle=p.col.replace(')',`,${p.life})`).replace('rgb','rgba');bCtx.fill()});bRaf=requestAnimationFrame(drawBurst)}
    drawBurst()

    /* ── PHONE BUILD ── */
    const wrap = document.getElementById('j-phones')!
    const main = document.createElement('div')
    main.id='jp-main'; main.className='j-phone'
    main.style.cssText='width:108px;height:205px;border-radius:20px;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%) scale(0);opacity:0;'
    main.innerHTML=`<div class="jp-notch" style="width:42px;height:9px;margin-bottom:6px"></div><div style="padding:0 8px"><div class="jp-bar" style="width:70%;height:6px;background:linear-gradient(90deg,#00c8ff,#0066ff);margin-bottom:6px"></div><div class="jp-bar" style="width:88%;height:6px;background:rgba(0,200,255,.13);margin-bottom:6px"></div><div style="display:grid;grid-template-columns:1fr 1fr;gap:5px;margin-top:4px"><div class="jp-tile" style="height:28px"></div><div class="jp-tile" style="height:28px"></div><div class="jp-tile" style="height:28px"></div><div class="jp-tile" style="height:28px"></div></div></div>`
    wrap.appendChild(main)

    /* ── STEP ANIMATIONS ── */
    let activeStep = 0
    const activateStep = (s:number) => {
      if(s===activeStep) return; activeStep=s
      document.querySelectorAll('.jp-step').forEach(d=>d.classList.toggle('active',parseInt((d as HTMLElement).dataset.step!)===s))
      const bg = document.getElementById('journey-bg')!
      bg.style.background=`radial-gradient(ellipse at 50% 50%,${BG_GLOWS[s]||'transparent'} 0%,transparent 65%)`
    }

    const doStepAnim = (s:number) => {
      const cx2=bC.width/2, cy2=bC.height/2
      if(s===1) burst(cx2,cy2,'rgb(245,200,66)')
      if(s===2){
        gsap.fromTo(['#jbl1','#jbl2','#jbl3'],{width:0},{width:'100%',duration:.7,ease:'power2.out',stagger:.14})
        gsap.fromTo(['#jbb1','#jbb2'],{width:0},{width:'100%',duration:.6,ease:'power2.out',stagger:.18,delay:.3})
        burst(cx2,cy2,'rgb(0,200,255)')
      }
      if(s===3){
        const el=document.getElementById('j-url')!; el.textContent=''; let ii=0; const txt='yourapp.com'
        const iv2=setInterval(()=>{if(ii>=txt.length){clearInterval(iv2);return}el.textContent+=txt[ii++]},75)
        burst(cx2,cy2,'rgb(0,102,255)')
      }
      if(s===4){
        burst(cx2,cy2,'rgb(123,47,255)')
        gsap.to('#jp-main',{scale:1,opacity:1,duration:.7,ease:'back.out(1.7)',onComplete:()=>{
          wrap.querySelectorAll('.j-phone:not(#jp-main)').forEach(e=>e.remove())
          ;[{t:'7%',l:'4%',r:'-13deg',d:.3},{t:'7%',l:'66%',r:'13deg',d:.42},{t:'58%',l:'-2%',r:'-7deg',d:.55},{t:'58%',l:'72%',r:'7deg',d:.68}].forEach(pos=>{
            const ph=document.createElement('div'); ph.className='j-phone'
            ph.style.cssText=`width:70px;height:135px;border-radius:16px;position:absolute;top:${pos.t};left:${pos.l};transform:rotate(${pos.r}) scale(0);opacity:0;`
            ph.innerHTML=`<div class="jp-notch" style="width:28px;height:7px;margin-bottom:5px"></div><div style="padding:0 6px"><div class="jp-bar" style="width:70%;height:4px;background:linear-gradient(90deg,#00c8ff,#0066ff);margin-bottom:4px"></div><div class="jp-bar" style="width:85%;height:4px;background:rgba(0,200,255,.13);margin-bottom:6px"></div><div style="display:grid;grid-template-columns:1fr 1fr;gap:3px"><div class="jp-tile" style="height:18px"></div><div class="jp-tile" style="height:18px"></div></div></div>`
            wrap.appendChild(ph)
            gsap.to(ph,{scale:1,opacity:1,duration:.7,ease:'back.out(1.5)',delay:pos.d})
          })
        }})
      }
      if(s===5){ worldOnRef.current=true; burst(cx2,cy2,'rgb(0,255,136)'); gsap.fromTo('#j-world-canvas',{scale:.6,opacity:0},{scale:1,opacity:1,duration:.9,ease:'power3.out'}) }
    }

    /* ── GSAP SCROLL TIMELINE ── */
    const jTl = gsap.timeline({ scrollTrigger:{ trigger:'#journey-outer', start:'top top', end:'bottom bottom', scrub:1.2 } })
    ;[1,2,3,4,5].forEach((step,i)=>{
      const el = document.querySelector(`#jp${step}`)!
      jTl.fromTo(el,{opacity:0,x:90,scale:.9},{opacity:1,x:0,scale:1,duration:.35,ease:'power3.out',onStart:()=>activateStep(step),onReverseComplete:()=>activateStep(step-1||1)},i)
      jTl.to(el,{opacity:1,duration:.4},i+.35)
      if(i<4) jTl.to(el,{opacity:0,x:-90,scale:.9,duration:.25,ease:'power2.in'},i+.75)
    })

    ;[1,2,3,4,5].forEach((step,i)=>{
      ScrollTrigger.create({
        trigger:'#journey-outer',
        start:`${(i/5*100)}% top`,
        end:`${((i+.7)/5*100)}% top`,
        onEnter:()=>doStepAnim(step),
        onEnterBack:()=>doStepAnim(step),
      })
    })

    return () => {
      cancelAnimationFrame(ideaRaf); cancelAnimationFrame(worldRaf); cancelAnimationFrame(bRaf)
      clearInterval(pingIv); window.removeEventListener('resize',rzB)
    }
  }, [])

  return (
    <div id="journey-outer" >
      
      <div id="journey-sticky">
        <div id="journey-bg" />
        <canvas id="j-burst-canvas" ref={burstRef} />
        <div id="journey-header">
          <div className="j-tag">// ACT III — THE TRANSFORMATION</div>
          <h2>What happens when you launch your idea?</h2>
        </div>

        {/* Step 1 */}
        <div className="j-panel" id="jp1">
          <div className="j-visual"><canvas id="j-idea-canvas" width={290} height={250} /></div>
          <div className="j-text">
            <div className="jt-num">// PHASE 01 — IDEA</div>
            <h3>The Idea<br /><span style={{color:'var(--gold)'}}>is Born</span></h3>
            <p>A single spark — the moment observation meets imagination. This is the source. Everything great began right here.</p>
            <span className="j-badge">SPARK ✦</span>
          </div>
        </div>

        {/* Step 2 */}
        <div className="j-panel" id="jp2">
          <div className="j-visual">
            <div className="j-bp">
              <div className="jbp-head">PROJECT BLUEPRINT</div>
              <div className="jbp-row"><div className="jbp-dot" style={{background:'#00c8ff'}} /><div className="jbp-bar" id="jbl1" style={{width:0,flex:1}} /></div>
              <div className="jbp-row"><div className="jbp-dot" style={{background:'#7b2fff'}} /><div className="jbp-bar" id="jbl2" style={{width:0,flex:.75}} /></div>
              <div className="jbp-box" id="jbb1" style={{width:0}} />
              <div className="jbp-box" id="jbb2" style={{width:0}} />
              <div className="jbp-row"><div className="jbp-dot" style={{background:'#f5c842'}} /><div className="jbp-bar" id="jbl3" style={{width:0,flex:.5}} /></div>
            </div>
          </div>
          <div className="j-text">
            <div className="jt-num">// PHASE 02 — BUILD</div>
            <h3>Takes Shape<br /><span style={{color:'var(--accent)'}}>as a Project</span></h3>
            <p>The idea gets structure and a roadmap. From a vague notion to a clear plan that can be built step by step.</p>
            <span className="j-badge">ARCHITECT ◈</span>
          </div>
        </div>

        {/* Step 3 */}
        <div className="j-panel" id="jp3">
          <div className="j-visual">
            <div className="j-browser">
              <div className="jb-bar">
                <div className="jb-dot" style={{background:'#ff5f57'}} />
                <div className="jb-dot" style={{background:'#febc2e'}} />
                <div className="jb-dot" style={{background:'#28c840'}} />
                <div className="jb-url"><span id="j-url" /><span className="tcur" /></div>
              </div>
              <div className="jb-body">
                <div className="jb-hero" />
                <div className="jb-row" />
                <div className="jb-row" style={{width:'65%'}} />
                <div className="jb-cards">
                  <div className="jb-card" /><div className="jb-card" /><div className="jb-card" />
                </div>
              </div>
            </div>
          </div>
          <div className="j-text">
            <div className="jt-num">// PHASE 03 — LAUNCH</div>
            <h3>Becomes<br /><span style={{color:'var(--accent2)'}}>a Web App</span></h3>
            <p>The internet gives it an address. Anyone in the world can reach it — 24 hours, 7 days, non-stop.</p>
            <span className="j-badge">LIVE ◉</span>
          </div>
        </div>

        {/* Step 4 */}
        <div className="j-panel" id="jp4">
          <div className="j-visual"><div className="j-phones" id="j-phones" /></div>
          <div className="j-text">
            <div className="jt-num">// PHASE 04 — MOBILE</div>
            <h3>Enters<br /><span style={{color:'var(--accent3)'}}>Every Pocket</span></h3>
            <p>A mobile app makes it part of the user&apos;s daily life — in their hand the moment they need it.</p>
            <span className="j-badge">POCKET ▣</span>
          </div>
        </div>

        {/* Step 5 */}
        <div className="j-panel" id="jp5">
          <div className="j-visual"><canvas id="j-world-canvas" width={290} height={270} /></div>
          <div className="j-text">
            <div className="jt-num">// PHASE 05 — IMPACT</div>
            <h3>Spreads<br /><span style={{color:'var(--green)'}}>to the World</span></h3>
            <p>One idea now reaches millions of people. It solves problems, creates value, and makes an impact that transcends geography.</p>
            <span className="j-badge">GLOBAL 🌍</span>
          </div>
        </div>

        {/* Progress */}
        <div id="journey-progress">
          {[{l:'IDEA',c:'#f5c842'},{l:'BUILD',c:'#00c8ff'},{l:'WEB',c:'#0066ff'},{l:'MOBILE',c:'#7b2fff'},{l:'WORLD',c:'#00ff88'}].map((s,i)=>(
            <React.Fragment key={s.l} >
              {i>0 && <div key={`conn-${i}`} className="jp-conn" />}
              <div key={s.l} className={`jp-step${i===0?' active':''}`} data-step={i+1} style={{'--step-c':s.c} as React.CSSProperties}>
                <div className="jp-dot" /><div className="jp-label">{s.l}</div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  )
}
