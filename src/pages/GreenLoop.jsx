import { useEffect, useRef } from "react";
import styled, { createGlobalStyle, keyframes } from "styled-components";

/* ─── TOKENS ─── */
const gl = "#3aaa4a";
const glm = "#2a7a3a";
const gld = "#1a4a24";
const glo = "#4dcf61";
const blk = "#080808";
const s0 = "#0e0e0e";
const s1 = "#141414";
const s2 = "#1e1e1e";
const s3 = "#282828";
const g3 = "#555";
const g4 = "#777";
const g5 = "#999";
const wht = "#f0ede6";
const ffCond = "'Barlow Condensed', sans-serif";
const ffBody = "'Barlow', sans-serif";
const ffMono = "'DM Mono', monospace";

/* ─── KEYFRAMES ─── */
const fadeUp = keyframes`from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}`;
const glTravel = keyframes`from{stroke-dashoffset:1000}to{stroke-dashoffset:0}`;
const glSpin = keyframes`from{transform:rotate(0deg)}to{transform:rotate(360deg)}`;
const scanLine = keyframes`from{top:0}to{top:100%}`;
const pulse = keyframes`0%,100%{opacity:1}50%{opacity:.15}`;

/* ─── GLOBAL ─── */
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,400;0,600;0,700;0,800;0,900;1,700;1,800;1,900&family=Barlow:wght@300;400;500&family=DM+Mono:wght@300;400;500&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: ${blk}; color: ${wht}; font-family: ${ffBody}; font-weight: 300; overflow-x: hidden; }
`;

/* ═══════════════════════════════════════════
   HERO SECTION
═══════════════════════════════════════════ */
const HeroSection = styled.section`
  min-height: 88vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  padding: 0 48px;
  gap: 40px;
  position: relative;
  overflow: hidden;
  background: #060f07;
  border-bottom: 1px solid #1a2e1b;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 0 20px;
  }
`;

const HeroRadialBg = styled.div`
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse 60% 50% at 65% 45%,
    rgba(58, 170, 74, 0.07),
    transparent 65%
  );
  pointer-events: none;
`;

const HeroGrid = styled.div`
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(58, 170, 74, 0.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(58, 170, 74, 0.025) 1px, transparent 1px);
  background-size: 48px 48px;
  pointer-events: none;
`;

const HeroLeft = styled.div`
  padding-top: 120px;
  padding-bottom: 80px;
  position: relative;
  z-index: 1;
`;

const LogoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 28px;
  opacity: 0;
  animation: ${fadeUp} 0.7s ease 0.1s forwards;
`;

const LogoText = styled.div`
  .name {
    font-family: ${ffCond};
    font-weight: 900;
    font-size: 22px;
    letter-spacing: 0.06em;
    color: ${gl};
    line-height: 1;
    .bright {
      color: ${glo};
    }
  }
  .sub {
    font-family: ${ffMono};
    font-size: 7px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(58, 170, 74, 0.4);
    margin-top: 3px;
  }
`;

const Eyebrow = styled.div`
  font-family: ${ffMono};
  font-size: 8.5px;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: ${gl};
  margin-bottom: 18px;
  display: flex;
  align-items: center;
  gap: 10px;
  opacity: 0;
  animation: ${fadeUp} 0.7s ease 0.2s forwards;
  &::before {
    content: "";
    width: 18px;
    height: 1px;
    background: ${gl};
    display: inline-block;
    flex-shrink: 0;
  }
`;

const H1 = styled.h1`
  font-family: ${ffCond};
  font-weight: 900;
  font-size: clamp(60px, 9vw, 120px);
  line-height: 0.86;
  color: ${wht};
  margin-bottom: 24px;
  opacity: 0;
  animation: ${fadeUp} 0.9s ease 0.3s forwards;
  .green {
    color: ${gl};
  }
`;

const HeroDesc = styled.p`
  font-size: 14px;
  line-height: 1.85;
  color: ${g5};
  max-width: 460px;
  font-weight: 300;
  margin-bottom: 36px;
  opacity: 0;
  animation: ${fadeUp} 0.7s ease 0.45s forwards;
`;

const HeroStats = styled.div`
  display: flex;
  gap: 0;
  margin-bottom: 36px;
  opacity: 0;
  animation: ${fadeUp} 0.7s ease 0.5s forwards;
`;

const HeroStat = styled.div`
  flex: 1;
  ${({ border }) =>
    border && `padding-left: 16px; border-left: 1px solid #1a2e1b;`}
  .n {
    font-family: ${ffCond};
    font-weight: 900;
    font-size: 26px;
    line-height: 1;
    color: ${gl};
  }
  .l {
    font-family: ${ffMono};
    font-size: 7px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(58, 170, 74, 0.35);
    margin-top: 5px;
    line-height: 1.8;
  }
`;

const HeroBtns = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  opacity: 0;
  animation: ${fadeUp} 0.7s ease 0.6s forwards;
`;

const BtnGreen = styled.button`
  font-family: ${ffMono};
  font-size: 8.5px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  padding: 13px 24px;
  background: ${gl};
  color: #000;
  border: none;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: ${wht};
  }
`;

const BtnGhost = styled.button`
  font-family: ${ffMono};
  font-size: 8.5px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  padding: 12px 24px;
  background: transparent;
  color: ${wht};
  border: 1px solid ${s3};
  cursor: pointer;
  transition: border-color 0.2s;
  &:hover {
    border-color: ${wht};
  }
`;

const HeroRight = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 80px 0;
  opacity: 0;
  animation: ${fadeUp} 0.9s ease 0.35s forwards;
  @media (max-width: 768px) {
    display: none;
  }
`;

const DiagramWrap = styled.div`
  position: relative;
  width: 360px;
  height: 360px;
`;

const SpinRing = styled.div`
  position: absolute;
  inset: -14px;
  border: 1px dashed rgba(58, 170, 74, 0.07);
  border-radius: 50%;
  animation: ${glSpin} 60s linear infinite;
`;

/* ═══════════════════════════════════════════
   STAT BAND
═══════════════════════════════════════════ */
const StatBand = styled.div`
  background: #0d160e;
  border-bottom: 1px solid #1a2e1b;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const StatBandItem = styled.div`
  padding: 32px 28px;
  border-right: 1px solid #1a2e1b;
  background: ${({ highlight }) =>
    highlight ? "rgba(26,74,36,.25)" : "transparent"};
  &:last-child {
    border-right: none;
  }
  .n {
    font-family: ${ffCond};
    font-weight: 900;
    font-size: 44px;
    line-height: 0.9;
    color: ${({ red }) => (red ? "#e05030" : gl)};
    margin-bottom: 6px;
  }
  .l {
    font-family: ${ffMono};
    font-size: 7.5px;
    letter-spacing: 0.13em;
    text-transform: uppercase;
    color: rgba(58, 170, 74, 0.3);
    line-height: 1.8;
  }
`;

/* ═══════════════════════════════════════════
   SECTION SHARED
═══════════════════════════════════════════ */
const SecPad = styled.section`
  padding: 88px 48px;
  background: ${({ bg }) => bg || "#060f07"};
  border-bottom: 1px solid #1a2e1b;
  @media (max-width: 768px) {
    padding: 56px 20px;
  }
`;

const SecHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  border-bottom: 1px solid #1a2e1b;
  padding-bottom: 16px;
  margin-bottom: 48px;
  h2 {
    font-family: ${ffCond};
    font-weight: 900;
    font-size: clamp(32px, 4vw, 52px);
    color: ${wht};
  }
  span {
    font-family: ${ffMono};
    font-size: 8px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(58, 170, 74, 0.25);
  }
`;

/* ═══════════════════════════════════════════
   5 STAGES GRID
═══════════════════════════════════════════ */
const StagesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1px;
  background: #1a2e1b;
  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const StageCard = styled.div`
  background: #060f07;
  padding: 32px 22px;
  position: relative;
  transition: background 0.2s;
  &:hover {
    background: #0a140a;
  }
  .big-num {
    font-family: ${ffCond};
    font-weight: 900;
    font-size: 48px;
    color: rgba(58, 170, 74, 0.05);
    line-height: 1;
    position: absolute;
    top: 12px;
    right: 14px;
  }
  .icon {
    width: 34px;
    height: 34px;
    border: 1px solid ${({ iconBorder }) => iconBorder || "rgba(58,170,74,.25)"};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 15px;
    margin-bottom: 16px;
  }
  .title {
    font-family: ${ffCond};
    font-weight: 900;
    font-size: 18px;
    color: ${wht};
    margin-bottom: 7px;
  }
  .desc {
    font-size: 12.5px;
    line-height: 1.8;
    color: ${g5};
    font-weight: 300;
  }
  .tag {
    font-family: ${ffMono};
    font-size: 7px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: ${gl};
    margin-top: 12px;
    border-top: 1px solid rgba(58, 170, 74, 0.08);
    padding-top: 10px;
  }
`;

/* ═══════════════════════════════════════════
   MATERIALS SECTION
═══════════════════════════════════════════ */
const MaterialsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 72px;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

const BarLabel = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: ${ffMono};
  font-size: 8px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${g5};
  margin-bottom: 5px;
  span {
    color: ${({ red }) =>
      red ? "#e05030" : ({ yellow }) => (yellow ? "#d4e830" : gl)};
  }
`;

const BarTrack = styled.div`
  height: 6px;
  background: rgba(58, 170, 74, 0.08);
`;

const BarFill = styled.div`
  height: 100%;
  background: ${({ pattern }) =>
    pattern
      ? "repeating-linear-gradient(90deg,rgba(58,170,74,.3) 0px,rgba(58,170,74,.3) 8px,transparent 8px,transparent 14px)"
      : ({ red }) =>
          red ? "rgba(224,80,48,.3)" : ({ dim }) => (dim ? glm : gl)};
  width: ${({ width }) => width || "0%"};
`;

const ValueBox = styled.div`
  padding: 20px 22px;
  border: 1px solid rgba(58, 170, 74, 0.15);
  background: rgba(26, 74, 36, 0.2);
  margin-bottom: 16px;
`;

const ValueChips = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 14px;
`;

const Chip = styled.span`
  font-family: ${ffMono};
  font-size: 8px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${gl};
  padding: 6px 12px;
  border: 1px solid rgba(58, 170, 74, 0.25);
`;

const WarningBox = styled.div`
  padding: 20px 22px;
  border: 1px solid rgba(224, 80, 48, 0.2);
  background: rgba(224, 80, 48, 0.04);
  .title {
    font-family: ${ffMono};
    font-size: 8px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #e05030;
    margin-bottom: 8px;
  }
  p {
    font-size: 13px;
    line-height: 1.8;
    color: ${g5};
    font-weight: 300;
  }
`;

const MatSubLabel = styled.div`
  font-family: ${ffMono};
  font-size: 8px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(58, 170, 74, 0.4);
  margin-bottom: 20px;
`;

/* ═══════════════════════════════════════════
   ROADMAP
═══════════════════════════════════════════ */
const RoadmapWrap = styled.div`
  position: relative;
  &::before {
    content: "";
    position: absolute;
    top: 6px;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      to right,
      ${gl},
      ${gl} 60%,
      rgba(58, 170, 74, 0.15)
    );
  }
`;

const RoadmapGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0;
  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }
`;

const RoadNode = styled.div`
  padding: 0 18px 0 0;
  position: relative;
  .dot {
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background: ${({ done }) => (done ? gl : "#121c13")};
    border: ${({ done }) =>
      done
        ? "none"
        : `1px solid rgba(58,170,74,${({ faint }) => (faint ? ".12" : ".2")})`};
    margin-bottom: 18px;
    position: relative;
    z-index: 1;
    ${({ done, glow }) =>
      done &&
      glow &&
      `box-shadow: 0 0 0 3px rgba(58,170,74,.15), 0 0 14px rgba(58,170,74,.3);`}
  }
  .date {
    font-family: ${ffMono};
    font-size: 8px;
    letter-spacing: 0.13em;
    text-transform: uppercase;
    color: ${({ done }) => (done ? gl : "rgba(58,170,74,.25)")};
    margin-bottom: 6px;
  }
  .title {
    font-family: ${ffCond};
    font-weight: 900;
    font-size: 16px;
    color: ${({ done }) => (done ? wht : g4)};
    margin-bottom: 5px;
  }
  p {
    font-size: 11.5px;
    line-height: 1.8;
    color: ${({ done }) =>
      done ? "rgba(90,122,92,.55)" : "rgba(58,74,59,.6)"};
    font-weight: 300;
  }
`;

/* ═══════════════════════════════════════════
   CTA
═══════════════════════════════════════════ */
const CtaSection = styled.section`
  padding: 100px 48px;
  text-align: center;
  position: relative;
  background: #060f07;
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(
      ellipse 70% 60% at 50% 50%,
      rgba(26, 74, 36, 0.4),
      transparent 70%
    );
    pointer-events: none;
  }
  @media (max-width: 768px) {
    padding: 72px 20px;
  }
`;

const CtaH = styled.h2`
  font-family: ${ffCond};
  font-weight: 900;
  font-size: clamp(52px, 9vw, 110px);
  line-height: 0.86;
  color: ${wht};
  margin-bottom: 16px;
  position: relative;
  .green {
    color: ${gl};
  }
`;

const CtaDesc = styled.p`
  font-size: 14px;
  color: ${g5};
  max-width: 420px;
  line-height: 1.85;
  font-weight: 300;
  margin: 0 auto 32px;
  position: relative;
`;

const CtaBtns = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
  position: relative;
  flex-wrap: wrap;
`;

/* ═══════════════════════════════════════════
   FOOTER
═══════════════════════════════════════════ */
const Footer = styled.footer`
  background: #060f07;
  border-top: 1px solid #1a2e1b;
  padding: 28px 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  @media (max-width: 768px) {
    padding: 28px 20px;
    flex-direction: column;
    align-items: flex-start;
  }
`;

const FooterLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  .name {
    font-family: ${ffCond};
    font-weight: 900;
    font-size: 15px;
    letter-spacing: 0.06em;
    color: ${gl};
    .bright {
      color: ${glo};
    }
  }
  .by {
    font-family: ${ffMono};
    font-size: 7px;
    letter-spacing: 0.1em;
    color: rgba(58, 170, 74, 0.3);
    margin-left: 6px;
  }
`;

const FooterCopy = styled.div`
  font-family: ${ffMono};
  font-size: 8px;
  letter-spacing: 0.14em;
  color: rgba(58, 170, 74, 0.3);
`;

/* ═══════════════════════════════════════════
   SVG LOGO
═══════════════════════════════════════════ */
const SolidLabsMark = ({ size = 52 }) => (
  <svg
    width={size}
    height={Math.round(size * 0.93)}
    viewBox="0 0 56 52"
    fill="none"
  >
    <polygon points="8,1 46,1 52,14 14,14" fill={gl} />
    <polygon points="5,20 43,20 49,33 11,33" fill={glm} />
    <polygon points="2,39 40,39 46,52 8,52" fill={gld} />
  </svg>
);

/* ═══════════════════════════════════════════
   CIRCULAR DIAGRAM SVG
═══════════════════════════════════════════ */
const CircularDiagram = () => (
  <svg
    viewBox="0 0 400 400"
    fill="none"
    style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}
  >
    <defs>
      <radialGradient id="glCentre" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#1a4a24" stopOpacity="0.9" />
        <stop offset="100%" stopColor="#060f07" stopOpacity="0.98" />
      </radialGradient>
    </defs>

    {/* orbit track */}
    <circle
      cx="200"
      cy="200"
      r="140"
      stroke="rgba(58,170,74,.1)"
      strokeWidth="1.5"
      strokeDasharray="4 6"
    />

    {/* travelling dots */}
    {[0, 1.33, 2.66].map((delay, i) => (
      <circle
        key={i}
        cx="200"
        cy="200"
        r="5"
        fill={i === 1 ? gl : glo}
        style={{
          transformOrigin: "200px 200px",
          animation: `glOrbit 4s linear ${delay}s infinite`,
        }}
      />
    ))}

    {/* 5 nodes */}
    {[
      {
        cx: 200,
        cy: 60,
        label: "1",
        text: "COLLECT",
        sub: "vendor pickup",
        tx: 200,
        ty: 88,
        lx: 152,
        ly: 76,
        lw: 96,
      },
      {
        cx: 333,
        cy: 145,
        label: "2",
        text: "SORT",
        sub: "by type",
        tx: 371,
        ty: 136,
        lx: 346,
        ly: 124,
        lw: 50,
      },
      {
        cx: 281,
        cy: 308,
        label: "3",
        text: "SHRED",
        sub: "extrude",
        tx: 317,
        ty: 300,
        lx: 292,
        ly: 288,
        lw: 50,
      },
      {
        cx: 119,
        cy: 308,
        label: "4",
        text: "MAKE",
        sub: "new parts",
        tx: 83,
        ty: 300,
        lx: 58,
        ly: 288,
        lw: 50,
      },
      {
        cx: 67,
        cy: 145,
        label: "5",
        text: "RETURN",
        sub: "value",
        tx: 30,
        ty: 136,
        lx: 4,
        ly: 124,
        lw: 52,
      },
    ].map((n) => (
      <g key={n.label}>
        <circle
          cx={n.cx}
          cy={n.cy}
          r="14"
          fill="#0d160e"
          stroke={gl}
          strokeWidth="1.5"
        />
        <text
          x={n.cx}
          y={n.cy + 5}
          textAnchor="middle"
          fontFamily="Barlow Condensed,sans-serif"
          fontWeight="900"
          fontSize="12"
          fill={gl}
        >
          {n.label}
        </text>
        <rect
          x={n.lx}
          y={n.ly}
          width={n.lw}
          height="28"
          rx="1"
          fill="rgba(6,15,7,.94)"
          stroke="rgba(58,170,74,.2)"
          strokeWidth="1"
        />
        <text
          x={n.tx}
          y={n.ty}
          textAnchor="middle"
          fontFamily="DM Mono,monospace"
          fontSize="7"
          letterSpacing="1.5"
          fill={gl}
        >
          {n.text}
        </text>
        <text
          x={n.tx}
          y={n.ty + 10}
          textAnchor="middle"
          fontFamily="Barlow,sans-serif"
          fontSize="8.5"
          fill="rgba(58,170,74,.45)"
        >
          {n.sub}
        </text>
      </g>
    ))}

    {/* centre mark */}
    <circle
      cx="200"
      cy="200"
      r="52"
      fill="url(#glCentre)"
      stroke="rgba(58,170,74,.12)"
      strokeWidth="1"
    />
    <polygon points="184,191 216,191 221,202 189,202" fill={gl} />
    <polygon points="182,206 214,206 219,217 187,217" fill={glm} />
    <polygon points="180,221 212,221 217,232 185,232" fill={gld} />
    <text
      x="200"
      y="184"
      textAnchor="middle"
      fontFamily="Barlow Condensed,sans-serif"
      fontWeight="900"
      fontSize="8"
      letterSpacing="2"
      fill="rgba(58,170,74,.5)"
    >
      GREENLOOP
    </text>
  </svg>
);

/* ═══════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════ */
export default function GreenLoop() {
  const materialsRef = useRef(null);
  const roadmapRef = useRef(null);

  useEffect(() => {
    /* Inject orbit keyframe for SVG circles dynamically */
    const style = document.createElement("style");
    style.textContent = `
      @keyframes glOrbit {
       from { transform: rotate(0deg) translateY(-140px) rotate(0deg); }
       to   { transform: rotate(360deg) translateY(-140px) rotate(-360deg); }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <GlobalStyle />

      {/* ── HERO ── */}
      <HeroSection>
        <HeroRadialBg />
        <HeroGrid />

        <HeroLeft>
          <LogoRow>
            <SolidLabsMark size={52} />
            <LogoText>
              <div className="name">
                GREEN<span className="bright">LOOP</span>
              </div>
              <div className="sub">Circular Manufacturing · SolidLabs</div>
            </LogoText>
          </LogoRow>

          <Eyebrow>Circular Manufacturing Initiative</Eyebrow>

          <H1>
            WASTE
            <br />
            IN.
            <br />
            <span className="green">VALUE</span>
            <br />
            OUT.
          </H1>

          <HeroDesc>
            GreenLoop is SolidLabs' commitment to closing the material loop —
            collecting plastic waste from local manufacturers, processing it,
            and turning it into new products. Not landfill. Not a PR claim. A
            manufacturing system.
          </HeroDesc>

          <HeroStats>
            <HeroStat>
              <div className="n">0 kg</div>
              <div className="l">
                Waste Processed
                <br />
                Starting 2026
              </div>
            </HeroStat>
            <HeroStat border>
              <div className="n">₹0</div>
              <div className="l">
                Paid to Vendors
                <br />
                Building Now
              </div>
            </HeroStat>
            <HeroStat border>
              <div className="n">100%</div>
              <div className="l">
                Honest Intention
                <br />
                No Greenwashing
              </div>
            </HeroStat>
          </HeroStats>

          <HeroBtns>
            <BtnGreen onClick={() => scrollTo("gl-contact")}>
              Send Waste Our Way →
            </BtnGreen>
            <BtnGhost onClick={() => scrollTo("gl-roadmap")}>
              View Roadmap
            </BtnGhost>
          </HeroBtns>
        </HeroLeft>

        <HeroRight>
          <DiagramWrap>
            <SpinRing />
            <CircularDiagram />
          </DiagramWrap>
        </HeroRight>
      </HeroSection>

      {/* ── STAT BAND ── */}
      <StatBand>
        <StatBandItem red>
          <div className="n">8M+</div>
          <div className="l">
            Tonnes plastic
            <br />
            to landfill p/a India
          </div>
        </StatBandItem>
        <StatBandItem highlight>
          <div className="n">~60%</div>
          <div className="l">
            Industrial scrap
            <br />
            technically recyclable
          </div>
        </StatBandItem>
        <StatBandItem highlight>
          <div className="n">₹0</div>
          <div className="l">
            Most vendors receive
            <br />
            for plastic offcuts
          </div>
        </StatBandItem>
        <StatBandItem>
          <div className="n">2026</div>
          <div className="l">
            GreenLoop
            <br />
            collections begin
          </div>
        </StatBandItem>
      </StatBand>

      {/* ── 5 STAGES ── */}
      <SecPad bg="#060f07">
        <SecHead>
          <h2>Five stages. Honest about every one.</h2>
          <span>Process</span>
        </SecHead>
        <StagesGrid>
          {[
            {
              num: "01",
              icon: "♻",
              iconBorder: "rgba(58,170,74,.25)",
              title: "Collect",
              desc: "Pick up plastic purge material, offcuts, and failed prints. No sorting required on your end. Free in Yelahanka.",
              tag: "Free · Yelahanka area",
            },
            {
              num: "02",
              icon: "⬡",
              iconBorder: "rgba(58,170,74,.2)",
              title: "Sort & Grade",
              desc: "Separated by polymer — PLA, PETG, ABS, Nylon. Contaminated material to certified disposal, not the back door.",
              tag: "PLA · PETG · ABS · Nylon",
            },
            {
              num: "03",
              icon: "⚙",
              iconBorder: "rgba(58,170,74,.3)",
              title: "Shred & Extrude",
              desc: "Clean sorted material is shredded and re-extruded into usable filament. Target: 68% yield per kg in. We publish the actual number.",
              tag: "In-house processing · 2027",
            },
            {
              num: "04",
              icon: "◈",
              iconBorder: "rgba(58,170,74,.2)",
              title: "Make",
              desc: "Reclaimed filament goes into SL Originals products. Every recycled item is labelled with its material origin. No hidden blends.",
              tag: "SL Originals · Recycled Range",
            },
            {
              num: "05",
              icon: "↗",
              iconBorder: "rgba(58,170,74,.2)",
              title: "Return Value",
              desc: "Vendors receive payment, product credit, or discounts on Precision B2B orders. Your waste has real value. We make that concrete.",
              tag: "Credit · Discount · Cash",
            },
          ].map((s) => (
            <StageCard key={s.num} iconBorder={s.iconBorder}>
              <div className="big-num">{s.num}</div>
              <div className="icon">{s.icon}</div>
              <div className="title">{s.title}</div>
              <p className="desc">{s.desc}</p>
              <div className="tag">{s.tag}</div>
            </StageCard>
          ))}
        </StagesGrid>
      </SecPad>

      {/* ── MATERIALS ── */}
      <SecPad bg="#0d160e">
        <SecHead>
          <h2>Know your plastic. We do.</h2>
        </SecHead>
        <MaterialsGrid>
          {/* Left: acceptance bars */}
          <div>
            <MatSubLabel>Acceptance Rate by Polymer</MatSubLabel>
            <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
              {[
                { label: "PLA", val: "95% accepted", width: "95%", dim: false },
                {
                  label: "PETG",
                  val: "90% accepted",
                  width: "90%",
                  dim: false,
                },
                { label: "ABS", val: "80% accepted", width: "80%", dim: false },
                {
                  label: "Nylon PA6 / PA12",
                  val: "75% accepted",
                  width: "75%",
                  dim: true,
                },
                {
                  label: "TPU / Flex",
                  val: "Building · 2026",
                  width: "40%",
                  pattern: true,
                  yellow: true,
                },
                {
                  label: "Contaminated / Mixed",
                  val: "Certified Disposal",
                  width: "100%",
                  red: true,
                },
              ].map((b) => (
                <div key={b.label}>
                  <BarLabel red={b.red} yellow={b.yellow}>
                    <span style={{ color: g5 }}>{b.label}</span>
                    <span
                      style={{
                        color: b.red ? "#e05030" : b.yellow ? "#d4e830" : gl,
                      }}
                    >
                      {b.val}
                    </span>
                  </BarLabel>
                  <BarTrack>
                    <BarFill
                      width={b.width}
                      pattern={b.pattern}
                      red={b.red}
                      dim={b.dim}
                    />
                  </BarTrack>
                </div>
              ))}
            </div>
          </div>

          {/* Right: value back + warning */}
          <div>
            <MatSubLabel>What You Get Back</MatSubLabel>
            <ValueBox>
              <ValueChips>
                <Chip>Cash Payment</Chip>
                <Chip>Product Credit</Chip>
                <Chip>B2B Discounts</Chip>
              </ValueChips>
              <p
                style={{
                  fontSize: 13,
                  color: g5,
                  lineHeight: 1.8,
                  fontWeight: 300,
                }}
              >
                No minimum volumes. No paperwork overhead. If you're in
                Yelahanka or nearby, we'll come to you. If you're elsewhere,
                drop off at our facility.
              </p>
            </ValueBox>
            <WarningBox>
              <div className="title">What We Can't Take</div>
              <p>
                Food-contaminated plastic, painted/coated parts, composite
                materials with resin matrix, PVC, PS foam. We'll tell you
                directly and help find certified disposal.
              </p>
            </WarningBox>
          </div>
        </MaterialsGrid>
      </SecPad>

      {/* ── ROADMAP ── */}
      <SecPad bg="#060f07" id="gl-roadmap">
        <SecHead>
          <h2>Plans, not promises.</h2>
          <span>Every item has a date</span>
        </SecHead>
        <RoadmapWrap>
          <RoadmapGrid>
            {[
              {
                done: true,
                glow: true,
                date: "Q1 2026",
                title: "Material Tracking",
                desc: "Log every spool by supplier, job, and waste output. Build the honest baseline.",
              },
              {
                done: true,
                date: "Q2 2026",
                title: "Vendor Collections",
                desc: "Structured pickup from Yelahanka manufacturers. Start small, prove the model.",
              },
              {
                done: true,
                date: "Q3–Q4 2026",
                title: "First Recycled Products",
                desc: "SL Originals products from reclaimed material. Clearly labelled. Honestly described.",
              },
              {
                done: false,
                date: "2027",
                title: "In-House Processing",
                desc: "Shredder and filament extruder on-site. Close the loop. No third-party dependency.",
              },
              {
                done: false,
                faint: true,
                date: "2028",
                title: "Emissions Report",
                desc: "Scope 1 and 2 measured and published. Good number or bad — it goes out there.",
              },
            ].map((r, i) => (
              <RoadNode key={i} done={r.done} glow={r.glow} faint={r.faint}>
                <div className="dot" />
                <div className="date">{r.date}</div>
                <div className="title">{r.title}</div>
                <p>{r.desc}</p>
              </RoadNode>
            ))}
          </RoadmapGrid>
        </RoadmapWrap>
      </SecPad>

      {/* ── CTA ── */}
      <CtaSection id="gl-contact">
        <CtaH>
          CLOSE
          <br />
          THE
          <br />
          <span className="green">LOOP.</span>
        </CtaH>
        <CtaDesc>
          GreenLoop isn't a sustainability pledge. It's a manufacturing system
          we're building, one vendor at a time. No minimum volumes. If you're in
          Yelahanka, we'll come to you.
        </CtaDesc>
        <CtaBtns>
          <BtnGreen>Send Waste Our Way →</BtnGreen>
          <BtnGhost onClick={() => scrollTo("gl-roadmap")}>
            Ask a Question
          </BtnGhost>
        </CtaBtns>
      </CtaSection>

      {/* ── FOOTER ── */}
      <Footer>
        <FooterLogo>
          <SolidLabsMark size={22} />
          <span className="name">
            GREEN<span className="bright">LOOP</span>
          </span>
          <span className="by">by SolidLabs</span>
        </FooterLogo>
        <FooterCopy>
          © 2026 SolidLabs Technologies · GreenLoop Initiative · Yelahanka,
          Bengaluru
        </FooterCopy>
      </Footer>
    </>
  );
}
