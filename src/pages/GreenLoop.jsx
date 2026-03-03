import { useRef } from 'react'
import styled, { keyframes, createGlobalStyle } from 'styled-components'

// ─── TOKENS ──────────────────────────────────────────────────────────────────
const T = {
  gl:  '#3aaa4a', glm: '#2a7a3a', gld: '#1a4a24',
  gl2: '#4fd860', glg: '#a8e6b0',
  blk: '#060606', s0: '#0e0e0e', s1: '#141414', s2: '#1e1e1e',
  g3: '#555', g4: '#777', g5: '#999',
  wht: '#f0ede6',
  ffCond: "'Barlow Condensed', sans-serif",
  ffBody: "'Barlow', sans-serif",
  ffMono: "'DM Mono', monospace",
}

// ─── KEYFRAMES ───────────────────────────────────────────────────────────────
const glPulse  = keyframes`0%,100%{opacity:1}50%{opacity:.15}`
const glScan   = keyframes`from{top:0}to{top:100%}`
const tickAnim = keyframes`from{transform:translateX(0)}to{transform:translateX(-50%)}`
const fadeUp   = keyframes`from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}`
const spinLoop = keyframes`from{transform:rotate(0deg)}to{transform:rotate(360deg)}`
const dashFlow = keyframes`to{stroke-dashoffset:0}`

// ─── GLOBAL FONTS ─────────────────────────────────────────────────────────────
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,400;0,600;0,700;0,800;0,900;1,700;1,900&family=Barlow:wght@300;400;500&family=DM+Mono:wght@300;400;500&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  html{scroll-behavior:smooth;}
  body{background:${T.blk};color:${T.wht};font-family:${T.ffBody};font-weight:300;}
`

// ─── SHARED ───────────────────────────────────────────────────────────────────
const Page = styled.div`background:#060606;`

const Section = styled.section`
  border-bottom:1px solid ${p => p.$border || '#001408'};
  position:relative;overflow:hidden;
`

const Pad = styled.div`padding:${p => p.$sm ? '60px 48px' : '88px 48px'};`

const Eyebrow = styled.div`
  font-family:${T.ffMono};font-size:8.5px;letter-spacing:.22em;text-transform:uppercase;
  color:${T.glm};
  display:flex;align-items:center;gap:12px;margin-bottom:14px;
  &::before{content:'';width:18px;height:1px;background:${T.gl};flex-shrink:0;}
`

const Mono = styled.span`
  font-family:${T.ffMono};font-size:${p => p.$size || '8px'};
  letter-spacing:${p => p.$ls || '.14em'};text-transform:uppercase;
  color:${p => p.$color || T.g4};
`

const CondHead = styled.h2`
  font-family:${T.ffCond};font-weight:900;
  font-size:${p => p.$size || 'clamp(32px,4vw,52px)'};
  letter-spacing:.02em;color:${p => p.$color || T.wht};line-height:.9;
  em{font-style:italic;color:${p => p.$em || T.gl};}
`

const BtnGL = styled.button`
  font-family:${T.ffMono};font-size:8.5px;letter-spacing:.18em;text-transform:uppercase;
  padding:13px 26px;background:${T.gl};color:#000;border:none;cursor:pointer;
  transition:background .2s;display:inline-flex;align-items:center;gap:8px;
  &:hover{background:${T.wht};}
`

const BtnGhost = styled.button`
  font-family:${T.ffMono};font-size:8.5px;letter-spacing:.18em;text-transform:uppercase;
  padding:12px 26px;background:transparent;color:${T.wht};
  border:1px solid #282828;cursor:pointer;transition:border-color .2s;
  &:hover{border-color:${T.wht};}
`

// ─── DIVBAR ──────────────────────────────────────────────────────────────────
const DivBar = styled.div`
  height:34px;background:#0a0a0a;border-bottom:1px solid #141414;
  ${p => p.$borderTop ? 'border-top:1px solid '+p.$borderTop+';' : ''}
  padding:0 48px;display:flex;align-items:center;gap:14px;
`
const DivBarLabel = styled.span`
  font-family:${T.ffMono};font-size:7.5px;letter-spacing:.24em;text-transform:uppercase;
  color:${p => p.$color || '#222'};white-space:nowrap;
`
const DivBarRule = styled.div`
  flex:1;height:1px;background:${p => p.$bg || 'linear-gradient(90deg,#1a1a1a,transparent)'};
`
const DivBarId = styled.span`
  font-family:${T.ffMono};font-size:7.5px;letter-spacing:.14em;text-transform:uppercase;
  color:${p => p.$color || '#222'};white-space:nowrap;
`

// ─── TICKER ──────────────────────────────────────────────────────────────────
const TickerWrap = styled.div`overflow:hidden;padding:9px 0;background:${T.gl};`
const TickerTrack = styled.div`
  display:flex;white-space:nowrap;animation:${tickAnim} 32s linear infinite;
`
const TickItem = styled.span`
  font-family:${T.ffCond};font-weight:800;font-size:13px;letter-spacing:.12em;
  text-transform:uppercase;padding:0 22px;flex-shrink:0;color:#000;
`
const TickDot = styled.span`opacity:.3;margin:0 8px;`

const GL_TICKER_ITEMS = [
  'Prepreg Offcuts Reclaimed','Vendor Collection · Bengaluru','CF Fibre to Pellet',
  'Closed-Loop Feedstock','Zero Landfill Mandate','3R: Reduce Reuse Recycle',
  'Waste Traceability','ISO 14001 Pathway','Short-Fibre Compounding',
  'Circular by Design','Made in India','SolidLabs GreenLoop',
]

function Ticker({ items }) {
  const doubled = [...items, ...items]
  return (
    <TickerWrap>
      <TickerTrack>
        {doubled.map((t, i) => (
          <TickItem key={i}>{t}<TickDot>·</TickDot></TickItem>
        ))}
      </TickerTrack>
    </TickerWrap>
  )
}

// ─── LOGO MARK ───────────────────────────────────────────────────────────────
function LogoMark({ size = 60, colors = ['#3aaa4a','#2a7a3a','#1a4a24'] }) {
  const s = size, h = Math.round(size * 0.917)
  return (
    <svg width={s} height={h} viewBox="0 0 56 52" fill="none">
      <polygon points="8,1 46,1 52,14 14,14"  fill={colors[0]}/>
      <polygon points="5,20 43,20 49,33 11,33" fill={colors[1]}/>
      <polygon points="2,39 40,39 46,52 8,52"  fill={colors[2]}/>
    </svg>
  )
}

// ─── SECTION HEAD ────────────────────────────────────────────────────────────
const SectionHead = styled.div`
  display:flex;justify-content:space-between;align-items:baseline;
  border-bottom:1px solid #141414;padding-bottom:18px;margin-bottom:52px;
`

// ─── HERO ────────────────────────────────────────────────────────────────────
const HeroGrid = styled.div`
  min-height:92vh;display:grid;grid-template-columns:1fr 1fr;
  position:relative;overflow:hidden;border-bottom:1px solid #001408;background:#060606;
  @media(max-width:768px){grid-template-columns:1fr;}
`
const HeroGlow = styled.div`
  position:absolute;inset:0;
  background:radial-gradient(ellipse 80% 60% at 55% 40%,rgba(58,170,74,.05),transparent 65%);
  pointer-events:none;
`
const HeroScan = styled.div`
  position:absolute;left:0;right:0;height:1px;z-index:2;
  background:linear-gradient(90deg,transparent,${T.gl} 40%,${T.gl} 60%,transparent);
  opacity:.05;animation:${glScan} 12s linear infinite;pointer-events:none;
`
const HeroLeft = styled.div`
  position:relative;z-index:3;padding:130px 48px 72px;
  display:flex;flex-direction:column;justify-content:flex-end;
  border-right:1px solid rgba(58,170,74,.06);
  @media(max-width:768px){padding:130px 20px 60px;border-right:none;}
`
const HeroRight = styled.div`
  position:relative;z-index:3;
  display:flex;align-items:center;justify-content:center;padding:40px;
  @media(max-width:768px){display:none;}
`
const Reg = styled.div`
  position:absolute;width:14px;height:14px;
  ${p => p.$tl ? 'top:16px;left:16px;border-top:1px solid rgba(58,170,74,.3);border-left:1px solid rgba(58,170,74,.3);' : ''}
  ${p => p.$tr ? 'top:16px;right:16px;border-top:1px solid rgba(58,170,74,.3);border-right:1px solid rgba(58,170,74,.3);' : ''}
  ${p => p.$bl ? 'bottom:16px;left:16px;border-bottom:1px solid rgba(58,170,74,.3);border-left:1px solid rgba(58,170,74,.3);' : ''}
  ${p => p.$br ? 'bottom:16px;right:16px;border-bottom:1px solid rgba(58,170,74,.3);border-right:1px solid rgba(58,170,74,.3);' : ''}
`
const HeroH1 = styled.h1`
  font-family:${T.ffCond};font-weight:900;
  font-size:clamp(60px,10vw,140px);line-height:.84;letter-spacing:.01em;margin-bottom:28px;
  animation:${fadeUp} .9s ease .25s both;
  em{font-style:italic;color:${T.gl};}
`
const HeroStats = styled.div`
  display:flex;border-top:1px solid #141414;padding-top:20px;gap:0;
`
const StatItem = styled.div`
  flex:1;
  &+&{padding-left:16px;border-left:1px solid #141414;}
`
const StatNum = styled.div`
  font-family:${T.ffCond};font-weight:900;font-size:26px;line-height:1;color:${T.wht};
  span{color:${T.gl};font-size:15px;margin-left:2px;}
`
const StatLabel = styled.div`
  font-family:${T.ffMono};font-size:7px;letter-spacing:.14em;text-transform:uppercase;
  color:#444;margin-top:5px;line-height:1.6;
`

// ─── STATUS CARD ─────────────────────────────────────────────────────────────
const StatusDot = styled.div`
  width:6px;height:6px;border-radius:50%;background:${T.gl};
  animation:${glPulse} 2.4s ease-in-out infinite;
`
const StatusCard = styled.div`
  width:100%;max-width:300px;background:rgba(6,6,6,.96);border:1px solid #1e2e1e;
`
const StatusHead = styled.div`
  background:#0a0e0a;border-bottom:1px solid #1a2a1a;
  padding:10px 14px;display:flex;align-items:center;justify-content:space-between;
`
const StatusLbl = styled.span`font-family:${T.ffMono};font-size:7.5px;letter-spacing:.2em;text-transform:uppercase;color:${T.gl};`
const StatusRow = styled.div`
  display:flex;justify-content:space-between;align-items:baseline;
  padding:9px 14px;border-bottom:1px solid #141414;
  &:last-child{border-bottom:none;}
`
const StatusKey = styled.span`font-family:${T.ffMono};font-size:7.5px;letter-spacing:.1em;text-transform:uppercase;color:#333;`
const StatusVal = styled.span`
  font-family:${T.ffCond};font-weight:700;font-size:15px;letter-spacing:.03em;color:${T.wht};
  sup{font-family:${T.ffMono};font-weight:300;font-size:7px;color:${T.gl};margin-left:2px;}
`

// ─── CIRCULAR LOOP VISUAL ────────────────────────────────────────────────────
function CircularLoopVisual({ size = 220 }) {
  const cx = size / 2
  const r = size * 0.38
  const stages = [
    { label: 'COLLECT',   icon: '↑', angle: -90 },
    { label: 'SORT',      icon: '◈', angle: -18 },
    { label: 'PROCESS',   icon: '⚙', angle: 54  },
    { label: 'COMPOUND',  icon: '◉', angle: 126 },
    { label: 'SUPPLY',    icon: '→', angle: 198 },
  ]
  const toRad = deg => (deg * Math.PI) / 180
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* Outer ring */}
      <circle cx={cx} cy={cx} r={r} stroke={T.gld} strokeWidth="1" fill="none" strokeDasharray="4 8" />
      {/* Inner glow ring */}
      <circle cx={cx} cy={cx} r={r * 0.6} stroke={`rgba(58,170,74,.08)`} strokeWidth="1" fill="none" />
      {/* Center logomark-ish */}
      <text x={cx} y={cx - 8} textAnchor="middle" fontFamily={T.ffCond} fontSize="22" fontWeight="900" fill={T.gl} letterSpacing="2">GL</text>
      <text x={cx} y={cx + 8} textAnchor="middle" fontFamily={T.ffMono} fontSize="6" fill={T.glm} letterSpacing="3">GREENLOOP</text>
      {/* Stage nodes */}
      {stages.map(({ label, icon, angle }) => {
        const rad = toRad(angle)
        const nx = cx + r * Math.cos(rad)
        const ny = cx + r * Math.sin(rad)
        const lx = cx + (r + 26) * Math.cos(rad)
        const ly = cx + (r + 26) * Math.sin(rad)
        return (
          <g key={label}>
            <circle cx={nx} cy={ny} r={12} fill="#0a0a0a" stroke={T.gl} strokeWidth="1" />
            <text x={nx} y={ny + 4} textAnchor="middle" fontSize="10" fill={T.gl}>{icon}</text>
            <text x={lx} y={ly + 3} textAnchor="middle" fontFamily={T.ffMono} fontSize="5.5" fill={T.glm} letterSpacing="1">{label}</text>
          </g>
        )
      })}
      {/* Connecting arrows between nodes */}
      {stages.map(({ angle }, i) => {
        const nextAngle = stages[(i + 1) % stages.length].angle
        const midAngle = (angle + nextAngle) / 2
        const rad = toRad(midAngle)
        const ax = cx + (r + 3) * Math.cos(rad)
        const ay = cx + (r + 3) * Math.sin(rad)
        return (
          <text key={`arr-${i}`} x={ax} y={ay + 3} textAnchor="middle" fontSize="7" fill={`rgba(58,170,74,.4)`}>›</text>
        )
      })}
    </svg>
  )
}

// ─── LOOP STAGE CARDS ────────────────────────────────────────────────────────
const StageGrid = styled.div`
  display:grid;grid-template-columns:repeat(5,1fr);gap:2px;background:#001408;
  @media(max-width:900px){grid-template-columns:1fr 1fr;}
  @media(max-width:500px){grid-template-columns:1fr;}
`
const StageCard = styled.div`
  background:#060606;padding:44px 32px;position:relative;overflow:hidden;
  transition:background .2s;
  &:hover{background:#060e06;}
  &::after{content:'';position:absolute;bottom:0;left:0;right:0;height:2px;
    background:${T.gl};transform:scaleX(0);transform-origin:left;
    transition:transform .35s ease;}
  &:hover::after{transform:scaleX(1);}
`
const StageNum = styled.div`
  font-family:${T.ffCond};font-weight:900;font-size:52px;color:#0d1a0d;
  line-height:1;margin-bottom:20px;
`
const StageIcon = styled.div`
  width:36px;height:36px;border:1px solid ${T.gld};display:flex;
  align-items:center;justify-content:center;margin-bottom:16px;
  font-size:16px;color:${T.gl};
`
const StageTitle = styled.div`
  font-family:${T.ffCond};font-weight:900;font-size:22px;letter-spacing:.03em;
  color:${T.wht};line-height:1;margin-bottom:6px;
`
const StageTag = styled.div`
  font-family:${T.ffMono};font-size:7px;letter-spacing:.16em;text-transform:uppercase;
  color:${T.glm};margin-bottom:12px;
`
const StageDesc = styled.p`
  font-size:13px;color:${T.g4};line-height:1.8;font-weight:300;margin-bottom:16px;
`
const StageSpecs = styled.ul`list-style:none;display:flex;flex-direction:column;gap:5px;`
const StageSpecItem = styled.li`
  font-family:${T.ffMono};font-size:7px;letter-spacing:.1em;color:#333;
  display:flex;align-items:baseline;gap:6px;
  &::before{content:'·';color:${T.gl};font-size:10px;line-height:1;}
`

const LOOP_STAGES = [
  {
    n:'01', icon:'↑', title:'Collect', tag:'Vendor · Workshop · Site',
    desc:'Scheduled vendor pickup from fabrication workshops, motorsport teams, and drone manufacturers in Bengaluru. Prepreg offcuts, cured scrap, dry fibre waste — all accepted.',
    specs:['Minimum 500g per collection','Scheduled fortnightly runs','Traceability tag issued on pickup'],
  },
  {
    n:'02', icon:'◈', title:'Sort', tag:'Cured · Uncured · Dry Fibre',
    desc:'Incoming waste is classified by state — cured laminate, uncured prepreg, dry woven fabric, and contaminated scrap. Each stream follows a different processing route.',
    specs:['Cured: shredded to short-fibre','Uncured: re-cure then process','Contaminated: pyrolysis pathway'],
  },
  {
    n:'03', icon:'⚙', title:'Process', tag:'Shred · Mill · Pellet',
    desc:'Cured CF scrap is granulated and milled into short-fibre feedstock. Fibre length 0.2–6mm. Contamination measured by LOI. Rejected lots are returned to the pyrolysis stream.',
    specs:['Fibre length 0.2–6mm','LOI < 1% target','Batch traceability retained'],
  },
  {
    n:'04', icon:'◉', title:'Compound', tag:'CF + PA6 · CF + PP · CF + ABS',
    desc:'Short CF fibre is compounded with engineering thermoplastic carriers — PA6, PP, ABS. The result is a pelletised CF-reinforced compound for injection moulding applications.',
    specs:['CF loading 15–40% by weight','Tensile strength 2–4× base polymer','Custom formulations available'],
  },
  {
    n:'05', icon:'→', title:'Supply', tag:'Pellet · Sheet · Compound',
    desc:'Compounded pellets are supplied back into manufacturing. Closed loop: SolidLabs uses returned compound in non-structural brackets, housings, and jigs. Surplus sold to moulders.',
    specs:['Standard 25kg sacks','Custom blend on 100kg+ order','Certificate of recycled content'],
  },
]

// ─── MATERIAL ACCEPTANCE ─────────────────────────────────────────────────────
const AcceptGrid = styled.div`display:grid;grid-template-columns:repeat(3,1fr);gap:2px;background:#001408;@media(max-width:768px){grid-template-columns:1fr 1fr;}`
const AcceptCard = styled.div`
  background:#060606;padding:32px 28px;
  border-left:2px solid ${p => p.$ok ? T.gl : '#2a1a1a'};
`
const AcceptMark = styled.div`
  width:22px;height:22px;border-radius:50%;
  background:${p => p.$ok ? 'rgba(58,170,74,.12)' : 'rgba(80,20,20,.12)'};
  border:1px solid ${p => p.$ok ? T.gl : '#4a2020'};
  display:flex;align-items:center;justify-content:center;
  font-size:10px;color:${p => p.$ok ? T.gl : '#4a2020'};
  margin-bottom:12px;
`
const AcceptTitle = styled.div`font-family:${T.ffCond};font-weight:900;font-size:18px;color:${T.wht};margin-bottom:4px;`
const AcceptTag = styled.div`font-family:${T.ffMono};font-size:7px;letter-spacing:.16em;text-transform:uppercase;color:${p => p.$ok ? T.glm : '#4a2020'};margin-bottom:8px;`
const AcceptDesc = styled.p`font-size:12.5px;color:${T.g4};line-height:1.75;font-weight:300;`

const ACCEPT_ITEMS = [
  { ok:true,  title:'Prepreg Offcuts',    tag:'Uncured · Any fibre system', desc:'Dry offcuts and trimmings from the cutting table. Minimum 200g per bag. Label with resin system if known.' },
  { ok:true,  title:'Cured Scrap',        tag:'Laminates · Tubes · Sheets',  desc:'Cured panels, broken tooling, rejected parts. All fibre systems accepted. Contamination assessed on arrival.' },
  { ok:true,  title:'Dry Fibre Waste',    tag:'Woven · UD · Hybrid',         desc:'Unimpregnated fabric offcuts, fraying, and short lengths. Bagged separately from prepreg — fibre integrity better retained.' },
  { ok:true,  title:'CF/Kevlar Hybrid',   tag:'Mixed weave · Separated OK',  desc:'Hybrid weaves accepted. Note: Kevlar fibres are separated and composted / landfill-diverted. CF content recovered.' },
  { ok:false, title:'Contaminated Scrap', tag:'Oil · Solvent · Paint',       desc:'Heavily contaminated CF not suitable for short-fibre recovery. Directed to pyrolysis partners. Still collected — just slower stream.' },
  { ok:false, title:'Glass Fibre / GFRP', tag:'Not accepted · CFRP only',    desc:'GreenLoop is a CFRP-only circuit. Glass fibre contamination degrades CF compound quality. Please separate before submission.' },
]

// ─── VENDOR SECTION ──────────────────────────────────────────────────────────
const VendorPanel = styled.div`
  display:grid;grid-template-columns:1fr 1fr;gap:2px;background:#001408;
  @media(max-width:768px){grid-template-columns:1fr;}
`
const VendorCard = styled.div`
  background:#060606;padding:52px 44px;
`
const VendorBig = styled.div`
  font-family:${T.ffCond};font-weight:900;font-size:clamp(44px,6vw,80px);
  line-height:.86;letter-spacing:.01em;color:${T.wht};margin-bottom:16px;
  em{font-style:italic;color:${T.gl};}
`
const VendorForm = styled.div`display:flex;flex-direction:column;gap:12px;max-width:380px;`
const VendorInput = styled.div`
  border:1px solid #1e1e1e;background:#0a0a0a;
  padding:11px 14px;font-family:${T.ffMono};font-size:8px;letter-spacing:.14em;
  text-transform:uppercase;color:#333;display:flex;justify-content:space-between;
  align-items:center;cursor:text;
  &:hover{border-color:#2a2a2a;}
`
const VendorRow = styled.div`display:grid;grid-template-columns:1fr 1fr;gap:12px;`

// ─── IMPACT STATS ────────────────────────────────────────────────────────────
const ImpactBand = styled.div`
  display:grid;grid-template-columns:repeat(4,1fr);gap:2px;background:#001408;
  @media(max-width:768px){grid-template-columns:1fr 1fr;}
`
const ImpactCard = styled.div`
  background:#060606;padding:44px 32px;text-align:center;
  position:relative;overflow:hidden;
  &::before{content:'';position:absolute;bottom:0;left:50%;transform:translateX(-50%);
    width:40px;height:80px;
    background:radial-gradient(ellipse at 50% 100%,rgba(58,170,74,.06),transparent 70%);
    pointer-events:none;}
`
const ImpactNum = styled.div`
  font-family:${T.ffCond};font-weight:900;font-size:clamp(36px,4vw,56px);
  line-height:1;color:${T.gl};letter-spacing:.02em;margin-bottom:6px;
  span{font-size:.5em;color:${T.glm};}
`
const ImpactLabel = styled.div`
  font-family:${T.ffMono};font-size:7px;letter-spacing:.18em;text-transform:uppercase;
  color:#333;line-height:1.7;
`

// ─── ROADMAP ─────────────────────────────────────────────────────────────────
const RoadmapWrap = styled.div`
  position:relative;padding:0 48px;
  &::before{content:'';position:absolute;left:48px;top:0;bottom:0;width:1px;background:linear-gradient(${T.gld},transparent);}
`
const RoadStep = styled.div`
  display:grid;grid-template-columns:200px 1fr;gap:40px;
  padding:40px 0 40px 32px;border-bottom:1px solid #0d0d0d;position:relative;
  &:last-child{border-bottom:none;}
  @media(max-width:768px){grid-template-columns:1fr;padding-left:20px;}
`
const RoadDot = styled.div`
  position:absolute;left:-5px;top:48px;width:10px;height:10px;
  border-radius:50%;background:${p => p.$active ? T.gl : '#1e2e1e'};
  border:1px solid ${p => p.$active ? T.gl : T.gld};
  box-shadow:${p => p.$active ? `0 0 10px rgba(58,170,74,.4)` : 'none'};
`
const RoadDate = styled.div`
  font-family:${T.ffMono};font-size:8px;letter-spacing:.2em;text-transform:uppercase;
  color:${p => p.$active ? T.gl : '#333'};padding-top:6px;
`
const RoadTitle = styled.div`
  font-family:${T.ffCond};font-weight:900;font-size:22px;color:${T.wht};margin-bottom:6px;
`
const RoadDesc = styled.p`font-size:13.5px;color:${T.g4};line-height:1.8;font-weight:300;`
const RoadTag = styled.span`
  font-family:${T.ffMono};font-size:6.5px;letter-spacing:.16em;text-transform:uppercase;
  color:${p => p.$active ? '#000' : T.glm};background:${p => p.$active ? T.gl : 'transparent'};
  border:1px solid ${p => p.$active ? T.gl : T.gld};padding:2px 8px;display:inline-block;margin-bottom:12px;
`

const ROADMAP = [
  {
    date:'Q1 2024 · Live', title:'Bengaluru Pilot', tag:'Active', active:true,
    desc:'Scheduled collection from 12 workshops in Electronic City and Peenya industrial areas. 800kg CF scrap diverted from landfill in the first quarter.',
  },
  {
    date:'Q3 2024 · Complete', title:'Short-Fibre Compound Line', tag:'Complete', active:true,
    desc:'Shredder and twin-screw extruder commissioned. First CF/PA6 compound batch produced. Tensile strength 2.4× base PA6 at 25% CF loading.',
  },
  {
    date:'Q2 2025 · In Progress', title:'Vendor Portal Launch', tag:'In Progress', active:true,
    desc:'Self-serve vendor registration, collection scheduling, and waste certificate download. Currently in closed beta with 8 partner fabricators.',
  },
  {
    date:'Q4 2025 · Planned', title:'Pan-India Collection Network', tag:'Planned', active:false,
    desc:'Partner logistics nodes in Mumbai, Chennai, Hyderabad, and Pune. Target: 5 tonnes CF scrap per month across all nodes.',
  },
  {
    date:'2026 · Roadmap', title:'Pyrolysis Stream', tag:'Roadmap', active:false,
    desc:'Partnership with pyrolysis facility for contaminated CF recovery. Targets fibre lengths 10–50mm with surface treatment for structural reuse.',
  },
]

// ─── CTA ─────────────────────────────────────────────────────────────────────
const CtaSection = styled.section`
  padding:100px 48px;text-align:center;position:relative;overflow:hidden;
  display:flex;flex-direction:column;align-items:center;
  background:#060606;border-top:1px solid #141414;
  &::before{content:'';position:absolute;bottom:0;left:50%;transform:translateX(-50%);
    width:60%;height:220px;
    background:radial-gradient(ellipse at 50% 100%,rgba(58,170,74,.06),transparent 70%);
    pointer-events:none;}
`

const Footer = styled.footer`background:${T.blk};border-top:1px solid #141414;`
const FooterInner = styled.div`
  padding:36px 48px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px;
`
const FooterLogo = styled.div`display:flex;align-items:center;gap:10px;`
const FooterName = styled.span`font-family:${T.ffCond};font-weight:900;font-size:15px;letter-spacing:.06em;`
const FooterCopy = styled.span`font-family:${T.ffMono};font-size:8px;letter-spacing:.14em;color:#222;`

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function GreenLoop() {
  const loopRef = useRef(null)
  const vendorRef = useRef(null)

  return (
    <>
      <GlobalStyle />
      <Page>

        {/* ── HERO ── */}
        <HeroGrid>
          <HeroGlow />
          <HeroScan />
          <HeroLeft>
            <div style={{ display:'flex', alignItems:'center', gap:18, marginBottom:32 }}>
              <LogoMark size={60} />
              <div>
                <div style={{ fontFamily:T.ffCond, fontWeight:900, fontSize:24, letterSpacing:'.08em', lineHeight:1, color:T.wht }}>
                  GREEN<span style={{ color:T.gl }}>LOOP</span>
                </div>
                <div style={{ fontFamily:T.ffMono, fontSize:7, letterSpacing:'.22em', textTransform:'uppercase', color:T.glm, marginTop:4 }}>
                  Circular CF · SolidLabs
                </div>
              </div>
            </div>

            <Eyebrow>GL Initiative · Circular Manufacturing · Bengaluru</Eyebrow>

            <HeroH1>
              WASTE<br/>BACK TO<br/><em>WORK.</em>
            </HeroH1>

            <p style={{ fontSize:14, lineHeight:1.85, color:T.g5, maxWidth:420, fontWeight:300, marginBottom:32 }}>
              Carbon fibre is too valuable to end up in a bin. GreenLoop collects CF scrap from fabricators across Bengaluru, processes it into short-fibre compound, and closes the loop back into manufacturing.
            </p>

            <div style={{ display:'flex', gap:10, flexWrap:'wrap', marginBottom:40 }}>
              <BtnGL onClick={() => loopRef.current?.scrollIntoView({ behavior:'smooth' })}>The Loop →</BtnGL>
              <BtnGhost onClick={() => vendorRef.current?.scrollIntoView({ behavior:'smooth' })}>Register as Vendor →</BtnGhost>
            </div>

            <HeroStats>
              <StatItem>
                <StatNum>800<span>kg</span></StatNum>
                <StatLabel>CF diverted<br/>first quarter</StatLabel>
              </StatItem>
              <StatItem>
                <StatNum>2.4<span>×</span></StatNum>
                <StatLabel>Tensile vs<br/>base polymer</StatLabel>
              </StatItem>
              <StatItem>
                <StatNum>5<span>t/mo</span></StatNum>
                <StatLabel>Target capacity<br/>pan-India</StatLabel>
              </StatItem>
            </HeroStats>
          </HeroLeft>

          <HeroRight>
            <Reg $tl /><Reg $tr /><Reg $bl /><Reg $br />
            <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:32, width:'100%', maxWidth:320 }}>
              <CircularLoopVisual size={240} />
              <StatusCard>
                <StatusHead>
                  <StatusLbl>Loop Status · GL-BLR-01</StatusLbl>
                  <StatusDot />
                </StatusHead>
                {[
                  ['Collection','Fortnightly','BLR'],
                  ['Vendors','12 active',null],
                  ['Processed','800 kg','Q1'],
                  ['Compound','CF/PA6 25%',null],
                  ['Status',<span style={{ color:T.gl }}>◉ ACTIVE</span>,null],
                ].map(([k, v, sup], i) => (
                  <StatusRow key={i}>
                    <StatusKey>{k}</StatusKey>
                    <StatusVal>{v}{sup && <sup>{sup}</sup>}</StatusVal>
                  </StatusRow>
                ))}
              </StatusCard>
            </div>
          </HeroRight>
        </HeroGrid>

        {/* ── TICKER ── */}
        <Ticker items={GL_TICKER_ITEMS} />

        {/* ── LOOP DIVBAR ── */}
        <DivBar ref={loopRef} id="gl-loop">
          <DivBarLabel $color={`rgba(58,170,74,.4)`}>The 5-Stage Loop</DivBarLabel>
          <DivBarRule $bg={`linear-gradient(90deg,rgba(58,170,74,.2),transparent)`} />
          <DivBarId $color={`rgba(58,170,74,.3)`}>COLLECT → SUPPLY</DivBarId>
        </DivBar>

        {/* ── LOOP STAGES ── */}
        <Section $border="#141414">
          <Pad>
            <SectionHead>
              <CondHead $size="clamp(32px,4vw,52px)">Closed loop.<br/>No excuses.</CondHead>
              <Mono $color="#333">Process</Mono>
            </SectionHead>
            <p style={{ fontSize:13.5, color:T.g5, lineHeight:1.85, fontWeight:300, maxWidth:640, marginTop:12, marginBottom:52 }}>
              Every kilogram that enters GreenLoop is traced from collection point to final compound batch. Nothing leaves the system unaccounted for.
            </p>
          </Pad>
          <StageGrid>
            {LOOP_STAGES.map(s => (
              <StageCard key={s.n}>
                <StageNum>{s.n}</StageNum>
                <StageIcon>{s.icon}</StageIcon>
                <StageTitle>{s.title}</StageTitle>
                <StageTag>{s.tag}</StageTag>
                <StageDesc>{s.desc}</StageDesc>
                <StageSpecs>{s.specs.map((sp, i) => <StageSpecItem key={i}>{sp}</StageSpecItem>)}</StageSpecs>
              </StageCard>
            ))}
          </StageGrid>
        </Section>

        {/* ── IMPACT BAND ── */}
        <DivBar>
          <DivBarLabel>Impact Numbers</DivBarLabel>
          <DivBarRule />
          <DivBarId>CURRENT · BLR PILOT</DivBarId>
        </DivBar>
        <ImpactBand>
          {[
            { n:'800', unit:'kg',  label:'CF scrap diverted\nfirst quarter' },
            { n:'12',  unit:'+',   label:'Active vendor\npartners' },
            { n:'25',  unit:'%',   label:'CF loading in\nstandard compound' },
            { n:'0',   unit:'%',   label:'Landfill target\nfor cured CF' },
          ].map(({ n, unit, label }) => (
            <ImpactCard key={n+unit}>
              <ImpactNum>{n}<span>{unit}</span></ImpactNum>
              <ImpactLabel>{label}</ImpactLabel>
            </ImpactCard>
          ))}
        </ImpactBand>

        {/* ── MATERIAL ACCEPTANCE ── */}
        <DivBar $borderTop="#141414">
          <DivBarLabel>What We Accept</DivBarLabel>
          <DivBarRule />
          <DivBarId>CFRP ONLY</DivBarId>
        </DivBar>
        <Section $border="#141414">
          <Pad>
            <SectionHead>
              <CondHead $size="clamp(32px,4vw,52px)">Know your waste.<br/>We handle the rest.</CondHead>
              <Mono $color="#333">Acceptance</Mono>
            </SectionHead>
            <p style={{ fontSize:13.5, color:T.g5, lineHeight:1.85, fontWeight:300, maxWidth:640, marginTop:12 }}>
              CF scrap from any resin system, any fibre grade. Separate your CF from glass and you're good to go.
            </p>
          </Pad>
          <AcceptGrid>
            {ACCEPT_ITEMS.map(a => (
              <AcceptCard key={a.title} $ok={a.ok}>
                <AcceptMark $ok={a.ok}>{a.ok ? '✓' : '✕'}</AcceptMark>
                <AcceptTitle>{a.title}</AcceptTitle>
                <AcceptTag $ok={a.ok}>{a.tag}</AcceptTag>
                <AcceptDesc>{a.desc}</AcceptDesc>
              </AcceptCard>
            ))}
          </AcceptGrid>
        </Section>

        {/* ── VENDOR REGISTRATION ── */}
        <DivBar ref={vendorRef} id="gl-vendor" $borderTop={`rgba(58,170,74,.12)`}>
          <DivBarLabel $color={`rgba(58,170,74,.4)`}>Vendor Registration</DivBarLabel>
          <DivBarRule $bg={`linear-gradient(90deg,rgba(58,170,74,.2),transparent)`} />
          <DivBarId $color={`rgba(58,170,74,.3)`}>JOIN THE LOOP</DivBarId>
        </DivBar>
        <VendorPanel>
          <VendorCard>
            <Eyebrow>Become a GreenLoop Vendor</Eyebrow>
            <VendorBig>
              Your scrap<br/>is our <em>feedstock.</em>
            </VendorBig>
            <p style={{ fontSize:13.5, color:T.g5, lineHeight:1.85, fontWeight:300, maxWidth:440, marginBottom:28 }}>
              Register your workshop for scheduled CF collection. You get a waste certificate, we get the feedstock. No charges. No paperwork beyond the form.
            </p>
            <div style={{ display:'flex', flexDirection:'column', gap:10, marginBottom:20 }}>
              {[
                '✓ Scheduled fortnightly pickup',
                '✓ Waste diversion certificate issued',
                '✓ Batch traceability on request',
                '✓ No minimum quantity',
              ].map(item => (
                <div key={item} style={{ fontFamily:T.ffMono, fontSize:'8px', letterSpacing:'.12em', textTransform:'uppercase', color:T.glm }}>{item}</div>
              ))}
            </div>
          </VendorCard>

          <VendorCard style={{ background:'#080e08', borderLeft:`1px solid #0a1a0a` }}>
            <Mono $size="7px" $color={T.glm} style={{ letterSpacing:'.22em', display:'block', marginBottom:20 }}>Vendor Registration Form</Mono>
            <VendorForm>
              <VendorRow>
                <VendorInput>Company Name <span style={{ color:'#1a2a1a' }}>___</span></VendorInput>
                <VendorInput>City / Zone <span style={{ color:'#1a2a1a' }}>___</span></VendorInput>
              </VendorRow>
              <VendorInput>Contact Name <span style={{ color:'#1a2a1a' }}>___</span></VendorInput>
              <VendorInput>Email / Phone <span style={{ color:'#1a2a1a' }}>___</span></VendorInput>
              <VendorRow>
                <VendorInput>Avg. Monthly CF Waste <span style={{ color:'#1a2a1a' }}>___</span></VendorInput>
                <VendorInput>Primary Fibre System <span style={{ color:'#1a2a1a' }}>___</span></VendorInput>
              </VendorRow>
              <VendorInput>Workshop Address <span style={{ color:'#1a2a1a' }}>___</span></VendorInput>
              <BtnGL style={{ width:'100%', justifyContent:'center', marginTop:4 }}>
                Register for Collection →
              </BtnGL>
              <Mono $size="7px" $color="#1e2e1e" style={{ letterSpacing:'.12em', display:'block', textAlign:'center', marginTop:4 }}>
                We respond within 48h · Bengaluru first · Pan-India by Q4 2025
              </Mono>
            </VendorForm>
          </VendorCard>
        </VendorPanel>

        {/* ── ROADMAP ── */}
        <DivBar $borderTop="#141414">
          <DivBarLabel>Roadmap</DivBarLabel>
          <DivBarRule />
          <DivBarId>2024–2026</DivBarId>
        </DivBar>
        <Section $border="#141414">
          <Pad>
            <SectionHead>
              <CondHead $size="clamp(32px,4vw,52px)">Where we are.<br/>Where we're going.</CondHead>
              <Mono $color="#333">Timeline</Mono>
            </SectionHead>
          </Pad>
          <RoadmapWrap>
            {ROADMAP.map(r => (
              <RoadStep key={r.date}>
                <RoadDot $active={r.active} />
                <div>
                  <RoadDate $active={r.active}>{r.date}</RoadDate>
                </div>
                <div>
                  <RoadTag $active={r.active}>{r.tag}</RoadTag>
                  <RoadTitle>{r.title}</RoadTitle>
                  <RoadDesc>{r.desc}</RoadDesc>
                </div>
              </RoadStep>
            ))}
          </RoadmapWrap>
        </Section>

        {/* ── CTA ── */}
        <CtaSection>
          <Eyebrow style={{ justifyContent:'center', marginBottom:14 }}>Close the Loop</Eyebrow>
          <CondHead $size="clamp(44px,7vw,96px)" style={{ marginBottom:16, lineHeight:.86 }}>
            CF scrap waiting<br/>in your <em>bin?</em>
          </CondHead>
          <p style={{ fontSize:14, color:T.g5, maxWidth:420, lineHeight:1.85, fontWeight:300, marginBottom:32 }}>
            Register as a GreenLoop vendor, schedule a collection, and get your waste diversion certificate. No charges. No minimum quantity. Just close the loop.
          </p>
          <div style={{ display:'flex', gap:10, flexWrap:'wrap', justifyContent:'center' }}>
            <BtnGL onClick={() => vendorRef.current?.scrollIntoView({ behavior:'smooth' })}>Register as Vendor →</BtnGL>
            <BtnGhost>Download Info Pack</BtnGhost>
          </div>
          <Mono $size="7.5px" $color="#222" style={{ marginTop:18, letterSpacing:'.14em', display:'block' }}>
            Bengaluru pilot active · Pan-India Q4 2025 · SolidLabs GreenLoop Initiative
          </Mono>
        </CtaSection>

        {/* ── FOOTER ── */}
        <Footer>
          <FooterInner>
            <FooterLogo>
              <LogoMark size={22} />
              <FooterName>GREEN<span style={{ color:T.gl }}>LOOP</span></FooterName>
            </FooterLogo>
            <FooterCopy>© 2025 SolidLabs Technologies · GreenLoop Initiative · Bengaluru</FooterCopy>
          </FooterInner>
        </Footer>

      </Page>
    </>
  )
}