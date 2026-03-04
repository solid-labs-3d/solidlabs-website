import { useEffect, useRef } from "react";
import styled, { keyframes, createGlobalStyle } from "styled-components";

// ─── TOKENS ──────────────────────────────────────────────────
const T = {
  cn: "#c8e600",
  cnm: "#9ab200",
  cnd: "#5a6800",
  bs: "#e63018",
  bsm: "#b02812",
  bsd: "#6e1808",
  blk: "#060606",
  s0: "#0e0e0e",
  s1: "#141414",
  s2: "#1e1e1e",
  g3: "#555",
  g4: "#777",
  g5: "#999",
  wht: "#f0ede6",
  ffCond: "'Barlow Condensed', sans-serif",
  ffBody: "'Barlow', sans-serif",
  ffMono: "'DM Mono', monospace",
};

// ─── KEYFRAMES ───────────────────────────────────────────────
const cnScan = keyframes`from{top:0}to{top:100%}`;
const cnBlink = keyframes`0%,100%{opacity:1}50%{opacity:.15}`;
const tickAnim = keyframes`from{transform:translateX(0)}to{transform:translateX(-50%)}`;
const fadeUp = keyframes`from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}`;
const ldot = keyframes`0%,100%{opacity:1}50%{opacity:.1}`;

// ─── GLOBAL FONTS ─────────────────────────────────────────────
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,400;0,600;0,700;0,800;0,900;1,700;1,900&family=Barlow:wght@300;400;500&family=DM+Mono:wght@300;400;500&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  html{scroll-behavior:smooth;}
  body{background:${T.blk};color:${T.wht};font-family:${T.ffBody};font-weight:300;}
`;

// ─── SHARED STYLED COMPONENTS ─────────────────────────────────
const Page = styled.div`
  background: #060606;
`;

const Section = styled.section`
  border-bottom: 1px solid ${(p) => p.$border || "#0d1400"};
  position: relative;
  overflow: hidden;
`;

const Pad = styled.div`
  padding: ${(p) => (p.$sm ? "60px 48px" : "88px 48px")};
`;

const Eyebrow = styled.div`
  font-family: ${T.ffMono};
  font-size: 8.5px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: ${(p) => (p.$bs ? "rgba(230,48,24,.7)" : T.cnm)};
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 14px;
  &::before {
    content: "";
    width: 18px;
    height: 1px;
    background: ${(p) => (p.$bs ? T.bs : T.cn)};
    flex-shrink: 0;
  }
`;

const Mono = styled.span`
  font-family: ${T.ffMono};
  font-size: ${(p) => p.$size || "8px"};
  letter-spacing: ${(p) => p.$ls || ".14em"};
  text-transform: uppercase;
  color: ${(p) => p.$color || T.g4};
`;

const CondHead = styled.h2`
  font-family: ${T.ffCond};
  font-weight: 900;
  font-size: ${(p) => p.$size || "clamp(32px,4vw,52px)"};
  letter-spacing: 0.02em;
  color: ${(p) => p.$color || T.wht};
  line-height: 0.9;
  em {
    font-style: italic;
    color: ${(p) => p.$em || T.cn};
  }
`;

const BtnCN = styled.button`
  font-family: ${T.ffMono};
  font-size: 8.5px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  padding: 13px 26px;
  background: ${T.cn};
  color: #000;
  border: none;
  cursor: pointer;
  transition: background 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  &:hover {
    background: ${T.wht};
  }
`;

const BtnBS = styled.button`
  font-family: ${T.ffMono};
  font-size: 8.5px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  padding: 13px 26px;
  background: ${T.bs};
  color: #fff;
  border: none;
  cursor: pointer;
  transition: background 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  &:hover {
    background: ${T.bsm};
  }
`;

const BtnGhost = styled.button`
  font-family: ${T.ffMono};
  font-size: 8.5px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  padding: 12px 26px;
  background: transparent;
  color: ${T.wht};
  border: 1px solid #282828;
  cursor: pointer;
  transition: border-color 0.2s;
  &:hover {
    border-color: ${T.wht};
  }
`;

// ─── TICKER ──────────────────────────────────────────────────
const TickerWrap = styled.div`
  overflow: hidden;
  padding: 9px 0;
  background: ${(p) => p.$bg || T.cn};
`;
const TickerTrack = styled.div`
  display: flex;
  white-space: nowrap;
  animation: ${tickAnim} 28s linear infinite;
`;
const TickItem = styled.span`
  font-family: ${T.ffCond};
  font-weight: 800;
  font-size: 13px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 0 22px;
  flex-shrink: 0;
  color: ${(p) => (p.$dark ? "#000" : "rgba(255,255,255,.9)")};
`;
const TickDot = styled.span`
  opacity: 0.22;
  margin: 0 8px;
`;

const CN_TICKER_ITEMS = [
  "Toray T700 12K UD Prepreg",
  "OOA Epoxy Cure",
  "±0.1mm Tolerance",
  "Aerofoil Skins",
  "Drone Airframes",
  "Motorsport Panels",
  "Filament Winding",
  "ISO 9001:2015",
  "First-Article Inspection",
  "CF / Kevlar Hybrid",
  "350 bar COPVs",
];
const BS_TICKER_ITEMS = [
  "The Himalayan Hat",
  "The Knuckle Duster",
  "The Briefcase",
  "The Monolith",
  "The Mudslinger",
  "The Presenter",
  "The Pipe Dream",
  "Real 2×2 Twill",
  "Zero Performance Claims",
  "Genuine T700 Stock",
  "Made in Bengaluru",
];

function Ticker({ items, dark }) {
  const doubled = [...items, ...items];
  return (
    <TickerWrap $bg={dark ? T.bs : T.cn}>
      <TickerTrack>
        {doubled.map((t, i) => (
          <TickItem key={i} $dark={!dark}>
            {t}
            <TickDot>·</TickDot>
          </TickItem>
        ))}
      </TickerTrack>
    </TickerWrap>
  );
}

// ─── DIVBAR ──────────────────────────────────────────────────
const DivBar = styled.div`
  height: 34px;
  background: #0a0a0a;
  border-bottom: 1px solid #141414;
  ${(p) => (p.$borderTop ? "border-top:1px solid " + p.$borderTop + ";" : "")}
  padding:0 48px;
  display: flex;
  align-items: center;
  gap: 14px;
`;
const DivBarLabel = styled.span`
  font-family: ${T.ffMono};
  font-size: 7.5px;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: ${(p) => p.$color || "#222"};
  white-space: nowrap;
`;
const DivBarRule = styled.div`
  flex: 1;
  height: 1px;
  background: ${(p) => p.$bg || "linear-gradient(90deg,#1a1a1a,transparent)"};
`;
const DivBarId = styled.span`
  font-family: ${T.ffMono};
  font-size: 7.5px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${(p) => p.$color || "#222"};
  white-space: nowrap;
`;

// ─── SPEC CARD ───────────────────────────────────────────────
const SpecDot = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${T.cn};
  animation: ${cnBlink} 2.2s ease-in-out infinite;
`;
const SpecCard = styled.div`
  width: 100%;
  max-width: 300px;
  background: rgba(6, 6, 6, 0.96);
  border: 1px solid #1e1e1e;
`;
const SpecHead = styled.div`
  background: #0d0d0d;
  border-bottom: 1px solid #1a1a1a;
  padding: 10px 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const SpecLbl = styled.span`
  font-family: ${T.ffMono};
  font-size: 7.5px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${T.cn};
`;
const SpecRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 9px 14px;
  border-bottom: 1px solid #141414;
  &:last-child {
    border-bottom: none;
  }
`;
const SpecKey = styled.span`
  font-family: ${T.ffMono};
  font-size: 7.5px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #333;
`;
const SpecVal = styled.span`
  font-family: ${T.ffCond};
  font-weight: 700;
  font-size: 15px;
  letter-spacing: 0.03em;
  color: ${T.wht};
  sup {
    font-family: ${T.ffMono};
    font-weight: 300;
    font-size: 7px;
    color: ${T.cn};
    margin-left: 2px;
  }
`;

// ─── HERO ────────────────────────────────────────────────────
const HeroGrid = styled.div`
  min-height: 92vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  position: relative;
  overflow: hidden;
  border-bottom: 1px solid #0d1400;
  background: #060606;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;
const HeroGlow = styled.div`
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse 80% 60% at 55% 40%,
    rgba(200, 230, 0, 0.055),
    transparent 65%
  );
  pointer-events: none;
`;
const HeroScan = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  height: 1px;
  z-index: 2;
  background: linear-gradient(
    90deg,
    transparent,
    ${T.cn} 40%,
    ${T.cn} 60%,
    transparent
  );
  opacity: 0.06;
  animation: ${cnScan} 10s linear infinite;
  pointer-events: none;
`;
const HeroLeft = styled.div`
  position: relative;
  z-index: 3;
  padding: 130px 48px 72px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  border-right: 1px solid rgba(200, 230, 0, 0.06);
  @media (max-width: 768px) {
    padding: 130px 20px 60px;
    border-right: none;
  }
`;
const HeroRight = styled.div`
  position: relative;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  @media (max-width: 768px) {
    display: none;
  }
`;

// Registration marks
const Reg = styled.div`
  position: absolute;
  width: 14px;
  height: 14px;
  ${(p) =>
    p.$tl
      ? "top:16px;left:16px;border-top:1px solid rgba(200,230,0,.3);border-left:1px solid rgba(200,230,0,.3);"
      : ""}
  ${(p) =>
    p.$tr
      ? "top:16px;right:16px;border-top:1px solid rgba(200,230,0,.3);border-right:1px solid rgba(200,230,0,.3);"
      : ""}
  ${(p) =>
    p.$bl
      ? "bottom:16px;left:16px;border-bottom:1px solid rgba(200,230,0,.3);border-left:1px solid rgba(200,230,0,.3);"
      : ""}
  ${(p) =>
    p.$br
      ? "bottom:16px;right:16px;border-bottom:1px solid rgba(200,230,0,.3);border-right:1px solid rgba(200,230,0,.3);"
      : ""}
`;

const HeroH1 = styled.h1`
  font-family: ${T.ffCond};
  font-weight: 900;
  font-size: clamp(60px, 10vw, 140px);
  line-height: 0.84;
  letter-spacing: 0.01em;
  margin-bottom: 28px;
  animation: ${fadeUp} 0.9s ease 0.25s both;
  em {
    font-style: italic;
    color: ${T.cn};
  }
`;

const HeroStats = styled.div`
  display: flex;
  border-top: 1px solid #141414;
  padding-top: 20px;
  gap: 0;
`;
const StatItem = styled.div`
  flex: 1;
  & + & {
    padding-left: 16px;
    border-left: 1px solid #141414;
  }
`;
const StatNum = styled.div`
  font-family: ${T.ffCond};
  font-weight: 900;
  font-size: 26px;
  line-height: 1;
  color: ${T.wht};
  span {
    color: ${T.cn};
    font-size: 15px;
    margin-left: 2px;
  }
`;
const StatLabel = styled.div`
  font-family: ${T.ffMono};
  font-size: 7px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #444;
  margin-top: 5px;
  line-height: 1.6;
`;

// LogoMark inline SVG component
function LogoMark({ size = 60, colors = ["#c8e600", "#9ab200", "#5a6800"] }) {
  const s = size,
    h = Math.round(size * 0.917);
  return (
    <svg width={s} height={h} viewBox="0 0 56 52" fill="none">
      <polygon points="8,1 46,1 52,14 14,14" fill={colors[0]} />
      <polygon points="5,20 43,20 49,33 11,33" fill={colors[1]} />
      <polygon points="2,39 40,39 46,52 8,52" fill={colors[2]} />
    </svg>
  );
}

// ─── SECTION HEADING ─────────────────────────────────────────
const SectionHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  border-bottom: 1px solid #141414;
  padding-bottom: 18px;
  margin-bottom: 52px;
`;

// ─── ENGINEERING PRODUCT CARD ─────────────────────────────────
const EngGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2px;
  background: #0d1400;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;
const EngCard = styled.div`
  background: #060606;
  padding: 44px 36px;
  position: relative;
  overflow: hidden;
  transition: background 0.2s;
  &:hover {
    background: #0a0d00;
  }
`;
const EngBar = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 2px;
  background: ${T.cn};
  transform: scaleY(0);
  transform-origin: bottom;
  transition: transform 0.35s ease;
  ${EngCard}:hover & {
    transform: scaleY(1);
  }
`;
const EngId = styled.div`
  font-family: ${T.ffMono};
  font-size: 7.5px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #2a2a2a;
  margin-bottom: 16px;
`;
const EngTitle = styled.div`
  font-family: ${T.ffCond};
  font-weight: 900;
  font-size: 22px;
  letter-spacing: 0.03em;
  color: ${T.wht};
  line-height: 1;
  margin-bottom: 4px;
`;
const EngTag = styled.div`
  font-family: ${T.ffMono};
  font-size: 7px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: ${T.cnm};
  margin-bottom: 12px;
`;
const EngDesc = styled.p`
  font-size: 13px;
  color: ${T.g4};
  line-height: 1.75;
  font-weight: 300;
  margin-bottom: 14px;
`;
const EngSpecs = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
const EngSpecItem = styled.li`
  font-family: ${T.ffMono};
  font-size: 7px;
  letter-spacing: 0.1em;
  color: #333;
  display: flex;
  align-items: baseline;
  gap: 6px;
  &::before {
    content: "·";
    color: ${T.cn};
    font-size: 10px;
    line-height: 1;
  }
`;

const ENG_PRODUCTS = [
  {
    id: "CN-AFS · 01",
    title: "Aerofoil Sections",
    tag: "UAV · Fixed Wing · Motorsport",
    desc: "Root-to-tip skins, ribs and spars. Single-piece span to 1.8m, Nomex/foam/balsa core options, gelcoat or exposed weave finish.",
    specs: [
      "Span to 1.8m single-piece",
      "Nomex / foam / balsa core",
      "NDT on request",
    ],
  },
  {
    id: "CN-DRN · 02",
    title: "Drone Airframes",
    tag: "Multirotor · Fixed Wing · VTOL",
    desc: "Integrated CF monocoques, arms and motor mounts tuned for vibration damping and RF transparency. From 80g.",
    specs: [
      "Frame weight from 80g",
      "Brass inserts moulded in-situ",
      "Custom geometry from STEP",
    ],
  },
  {
    id: "CN-AUT · 03",
    title: "Auto Components",
    tag: "Motorsport · OEM Supply",
    desc: "Bonnets, splitters, diffusers, A-pillars, floor panels. FEA-matched ply schedules available.",
    specs: [
      "2×2 twill, UD and hybrid",
      "Gloss, matte, or exposed weave",
      "FIA documentation available",
    ],
  },
  {
    id: "CN-STR · 04",
    title: "Tubes & Rods",
    tag: "Pull-Wound · Roll-Wrapped",
    desc: "Round, square and rectangular CF sections. OD from 3mm, wall from 0.3mm. Modulus 70–300 GPa.",
    specs: [
      "OD from 3mm · ±0.05mm",
      "70–300 GPa modulus range",
      "Threaded ends available",
    ],
  },
  {
    id: "CN-PRB · 05",
    title: "Pressure Vessels",
    tag: "Aerospace · Industrial · Medical",
    desc: "Filament-wound COPV liners. Helium leak-tested. Burst factor 3× per ASME.",
    specs: [
      "Dia. 40–400mm · to 350 bar",
      "Al, HDPE or Ti liner options",
      "Hydrostatic proof test standard",
    ],
  },
  {
    id: "CN-BLD · 06",
    title: "Blade Assemblies",
    tag: "Prop · Turbine · Marine · Wind",
    desc: "Rotor blades, propeller blanks, marine hydrofoils. ISO 1940 G0.4 balance. Radius to 800mm.",
    specs: [
      "Radius to 800mm",
      "ISO 1940 G0.4 balance",
      "Lightning strike mesh optional",
    ],
  },
];

// ─── MATERIALS BAND ──────────────────────────────────────────
const MatBand = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2px;
  background: #0d1400;
  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;
const MatCard = styled.div`
  background: #080808;
  padding: 32px 28px;
  position: relative;
  overflow: hidden;
  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, ${T.cn}, transparent);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.4s ease;
  }
  &:hover::after {
    transform: scaleX(1);
  }
`;
const MatLbl = styled.div`
  font-family: ${T.ffMono};
  font-size: 7px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #222;
  margin-bottom: 8px;
`;
const MatName = styled.div`
  font-family: ${T.ffCond};
  font-weight: 900;
  font-size: 24px;
  letter-spacing: 0.04em;
  color: ${T.wht};
  margin-bottom: 4px;
`;
const MatSpec = styled.div`
  font-family: ${T.ffMono};
  font-size: 7px;
  letter-spacing: 0.1em;
  color: ${T.cn};
  margin-bottom: 8px;
`;
const MatDesc = styled.p`
  font-size: 12.5px;
  color: ${T.g4};
  line-height: 1.75;
  font-weight: 300;
`;

const MATERIALS = [
  {
    lbl: "System 01",
    name: "Toray T700",
    spec: "230 GPa · 4900 MPa UTS · 3K–12K",
    desc: "Standard modulus, high strength. Aerospace workhorse. Plain weave and 2×2 twill stocked.",
  },
  {
    lbl: "System 02",
    name: "Toray T800",
    spec: "294 GPa · 5490 MPa UTS · IM class",
    desc: "Intermediate modulus for stiffness-critical structures. OOA and autoclave qualified.",
  },
  {
    lbl: "System 03",
    name: "Toray M35J",
    spec: "343 GPa · HM class · near-zero CTE",
    desc: "High-modulus for satellite booms and dimensionally stable assemblies.",
  },
  {
    lbl: "System 04",
    name: "CF / Kevlar",
    spec: "Hybrid weave · Impact & ballistic",
    desc: "CF warp, Kevlar 29 weft for impact and fragment resistance. Drone frames and enclosures.",
  },
];

// ─── PROCESS STEPS ───────────────────────────────────────────
const ProcessStep = styled.div`
  display: grid;
  grid-template-columns: 40px 2px 1fr 1fr; /* ← added 2px divider column */
  gap: 0;
  background: #0d1400;
  & + & {
    margin-top: 2px;
  }
  @media (max-width: 768px) {
    grid-template-columns: 32px 2px 1fr;
  }
`;

const PsNum = styled.div`
  background: #060606;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${T.ffMono};
  font-weight: 400;
  font-size: 9px;
  letter-spacing: 0.1em;
  color: #2a2a2a;
  padding: 20px 0;
  writing-mode: horizontal-tb;
  transform: none;
`;
const PsContent = styled.div`
  background: #060606;
  padding: 40px 32px;
  border-right: 1px solid #0d1400;
  @media (max-width: 768px) {
    padding: 28px 20px;
  }
`;
const PsVisual = styled.div`
  background: #080808;
  padding: 40px 32px;
  display: flex;
  align-items: flex-start;
  gap: 8px;
  flex-direction: column;
  @media (max-width: 768px) {
    display: none;
  }
`;
const PsTitle = styled.div`
  font-family: ${T.ffCond};
  font-weight: 900;
  font-size: 22px;
  color: ${T.wht};
  margin-bottom: 10px;
`;
const PsDesc = styled.p`
  font-size: 13.5px;
  color: ${T.g4};
  line-height: 1.8;
  font-weight: 300;
`;

// Ply Stack visual component
function PlyStackVisual() {
  const layers = [
    { w: "95%", c: T.cn, o: 0.9, lbl: "0° UD" },
    { w: "90%", c: T.cnm, o: 0.75, lbl: "90° UD" },
    { w: "82%", c: T.cn, o: 0.82, lbl: "±45 woven" },
    { w: "55%", c: "#6a5800", o: 0.55, lbl: "CORE" },
    { w: "82%", c: T.cn, o: 0.82, lbl: "±45 woven" },
    { w: "90%", c: T.cnm, o: 0.75, lbl: "90° UD" },
    { w: "95%", c: T.cn, o: 0.9, lbl: "0° UD" },
  ];
  return (
    <div style={{ width: "100%" }}>
      <Mono
        $size="7px"
        $color="#222"
        style={{ marginBottom: 10, letterSpacing: ".14em", display: "block" }}
      >
        Vacuum bag stack
      </Mono>
      {layers.map((l, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 3,
          }}
        >
          <div style={{ height: 7, flex: 1, background: l.c, opacity: l.o }} />
          <span
            style={{
              fontFamily: T.ffMono,
              fontSize: "6.5px",
              color: "#333",
              whiteSpace: "nowrap",
              width: 80,
            }}
          >
            {l.lbl}
          </span>
        </div>
      ))}
      <Mono
        $size="6.5px"
        $color="#333"
        style={{ marginTop: 8, display: "block", letterSpacing: ".1em" }}
      >
        8-ply quasi-isotropic schedule
      </Mono>
    </div>
  );
}

// QC Checklist visual
function QCVisual() {
  const items = [
    "Tap test · delamination",
    "CMM dimensional",
    "Surface visual",
    "Test coupon data",
    "Photo documentation",
  ];
  return (
    <div>
      <Mono
        $size="7px"
        $color="#222"
        style={{ marginBottom: 10, letterSpacing: ".14em", display: "block" }}
      >
        QC checklist
      </Mono>
      {items.map((item, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 5,
          }}
        >
          <div
            style={{
              width: 13,
              height: 13,
              border: `1px solid ${T.cn}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 7,
              color: T.cn,
              flexShrink: 0,
            }}
          >
            ✓
          </div>
          <span
            style={{ fontFamily: T.ffMono, fontSize: "7.5px", color: "#333" }}
          >
            {item}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── BS PRODUCT CARD ─────────────────────────────────────────
const BsGrid3 = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2px;
  background: #1a0a06;
  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;
const BsGrid2 = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2px;
  background: #1a0a06;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;
const BsGrid4 = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2px;
  background: #1a0a06;
  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const BsCard = styled.div`
  background: #060606;
  position: relative;
  overflow: hidden;
  transition: background 0.2s;
  &:hover {
    background: rgba(230, 48, 24, 0.02);
  }
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: ${T.bs};
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.28s;
  }
  &:hover::before {
    transform: scaleX(1);
  }
`;
const BsImg = styled.div`
  height: 120px;
  border-bottom: 1px solid #141414;
  position: relative;
  overflow: hidden;
  background-image:
    repeating-linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.02) 0,
      rgba(255, 255, 255, 0.02) 1px,
      transparent 1px,
      transparent 9px
    ),
    repeating-linear-gradient(
      -45deg,
      rgba(255, 255, 255, 0.02) 0,
      rgba(255, 255, 255, 0.02) 1px,
      transparent 1px,
      transparent 9px
    );
  background-size: 9px 9px;
`;
const BsImgLbl = styled.div`
  position: absolute;
  bottom: 9px;
  left: 12px;
  font-family: ${T.ffMono};
  font-size: 6.5px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.12);
`;
const BsBody = styled.div`
  padding: 20px 24px 24px;
`;
const BsTop = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 5px;
`;
const BsId = styled.span`
  font-family: ${T.ffMono};
  font-size: 6.5px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #222;
`;
const BsPrice = styled.span`
  font-family: ${T.ffCond};
  font-weight: 700;
  font-size: 16px;
  color: ${T.wht};
  letter-spacing: 0.04em;
  sup {
    font-family: ${T.ffMono};
    font-weight: 300;
    font-size: 8px;
    color: ${T.bs};
    margin-right: 1px;
  }
`;
const BsTitle = styled.div`
  font-family: ${T.ffCond};
  font-weight: 900;
  font-size: 20px;
  letter-spacing: 0.03em;
  color: ${T.wht};
  line-height: 1;
  margin-bottom: 3px;
`;
const BsModel = styled.div`
  font-family: ${T.ffMono};
  font-size: 7px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(230, 48, 24, 0.55);
  margin-bottom: 10px;
`;
const BsDesc = styled.p`
  font-size: 13px;
  color: ${T.g4};
  line-height: 1.75;
  font-weight: 300;
  margin-bottom: 11px;
`;
const BsTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`;
const BsTag = styled.span`
  font-family: ${T.ffMono};
  font-size: 7px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #333;
  border: 1px solid #1e1e1e;
  padding: 2px 6px;
`;
const BsBadge = styled.span`
  font-family: ${T.ffMono};
  font-size: 7px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${T.bs};
  border: 1px solid rgba(230, 48, 24, 0.2);
  background: rgba(230, 48, 24, 0.04);
  padding: 2px 6px;
`;

// ─── FINISHES ────────────────────────────────────────────────
const FinBand = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2px;
  background: #1a0a06;
  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;
const FinCard = styled.div`
  background: #060606;
  padding: 28px 24px;
`;
const FinSwatch = styled.div`
  width: 100%;
  height: 36px;
  margin-bottom: 12px;
  ${(p) => p.$css || ""}
`;
const FinName = styled.div`
  font-family: ${T.ffCond};
  font-weight: 900;
  font-size: 17px;
  letter-spacing: 0.04em;
  color: ${T.wht};
  margin-bottom: 3px;
`;
const FinTag = styled.div`
  font-family: ${T.ffMono};
  font-size: 7px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: ${T.bs};
  margin-bottom: 8px;
`;
const FinDesc = styled.p`
  font-size: 12.5px;
  color: ${T.g4};
  line-height: 1.75;
  font-weight: 300;
`;

const FINISHES = [
  {
    name: "Plain Weave",
    tag: "1×1 · Matte or Gloss",
    desc: "Equal warp and weft. Tighter, uniform surface. Great base for high-gloss clear coat.",
    swatchCss: `background:#0e0e0e;background-image:repeating-linear-gradient(90deg,rgba(255,255,255,.05) 0,rgba(255,255,255,.05) 1px,transparent 1px,transparent 8px),repeating-linear-gradient(0deg,rgba(255,255,255,.05) 0,rgba(255,255,255,.05) 1px,transparent 1px,transparent 8px);background-size:8px 8px;`,
  },
  {
    name: "2×2 Twill",
    tag: "Diagonal · High Gloss · Standard",
    desc: "The classic herringbone CF pattern. Most visually dramatic. Standard on all BS Series parts.",
    swatchCss: `background:#0e0e0e;background-image:repeating-linear-gradient(45deg,rgba(255,255,255,.06) 0,rgba(255,255,255,.06) 1px,transparent 1px,transparent 9px),repeating-linear-gradient(-45deg,rgba(255,255,255,.06) 0,rgba(255,255,255,.06) 1px,transparent 1px,transparent 9px);background-size:9px 9px;`,
  },
  {
    name: "Forged CF",
    tag: "Random · High Gloss · +₹800",
    desc: "Chopped fibre compression moulded. Random cloudy pattern. Lamborghini made it famous.",
    swatchCss: `background:radial-gradient(ellipse at 35% 40%,#191919,#080808);background-image:repeating-linear-gradient(22deg,rgba(255,255,255,.035) 0,rgba(255,255,255,.035) 1px,transparent 1px,transparent 12px),repeating-linear-gradient(-22deg,rgba(255,255,255,.035) 0,rgba(255,255,255,.035) 1px,transparent 1px,transparent 12px);`,
  },
  {
    name: "Honeycomb Print",
    tag: "CF Substrate · UV Print · Free",
    desc: "CF twill with UV-print hex overlay. Technical aesthetic. No surcharge on tank pads and EDC.",
    swatchCss: `background:#0e0e0e;background-image:radial-gradient(circle,rgba(200,230,0,.05) 1px,transparent 1px);background-size:8px 9px;`,
  },
];

// ─── BS BREAK ────────────────────────────────────────────────
const BsBreak = styled.div`
  padding: 80px 48px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
  background: #0a0806;
  position: relative;
  overflow: hidden;
  border-top: 1px solid rgba(230, 48, 24, 0.12);
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    background-image: repeating-linear-gradient(
      -58deg,
      transparent 0,
      transparent 28px,
      rgba(230, 48, 24, 0.025) 28px,
      rgba(230, 48, 24, 0.025) 30px
    );
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 56px 20px;
  }
`;
const BsFlag = styled.div`
  display: inline-flex;
  align-items: center;
  background: ${T.bs};
  font-family: ${T.ffMono};
  font-size: 7.5px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #fff;
  padding: 5px 20px 5px 12px;
  clip-path: polygon(
    0 0,
    calc(100% - 10px) 0,
    100% 50%,
    calc(100% - 10px) 100%,
    0 100%
  );
  margin-bottom: 18px;
`;
const BsHonest = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 14px;
  background: rgba(230, 48, 24, 0.05);
  border: 1px solid rgba(230, 48, 24, 0.18);
  border-left: 3px solid ${T.bs};
  padding: 14px 16px;
  margin-top: 18px;
`;
const BsWordmark = styled.div`
  font-family: ${T.ffCond};
  font-weight: 900;
  font-size: 18px;
  letter-spacing: 0.08em;
  color: ${T.wht};
`;
const BsPill = styled.span`
  font-family: ${T.ffMono};
  font-size: 6.5px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${T.bs};
  padding: 2px 7px;
  border: 1px solid rgba(230, 48, 24, 0.4);
  background: rgba(230, 48, 24, 0.06);
`;

// ─── CTA SECTION ─────────────────────────────────────────────
const CtaSection = styled.section`
  padding: 100px 48px;
  text-align: center;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #060606;
  border-top: 1px solid #141414;
  &::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 60%;
    height: 220px;
    background: ${(p) =>
      p.$bs
        ? "radial-gradient(ellipse at 50% 100%,rgba(230,48,24,.07),transparent 70%)"
        : "radial-gradient(ellipse at 50% 100%,rgba(200,230,0,.06),transparent 70%)"};
    pointer-events: none;
  }
`;

const BSSecHead = styled.div`
  padding: 56px 48px 40px;
  border-bottom: 1px solid #141414;
  background: #110806;
  @media (max-width: 768px) {
    padding: 44px 20px 32px;
  }
`;

// BS product data
const BS_RE = [
  {
    id: "BS-RE-001",
    nickname: "The Himalayan Hat",
    title: "Himalayan 450 Seat Cowl",
    model: "RE Himalayan 450 · 2024+",
    price: "6,990",
    desc: "OEM-fit cowl in 2×2 twill. ABS backer for exact panel gaps. Turns the backside from practical to sculptural. No drilling.",
    tags: ["Bolt-On", "2×2 Twill"],
    badge: "Cosmetic Only",
  },
  {
    id: "BS-RE-002",
    nickname: "The Knee Whisperers",
    title: "Himalayan Tank Knee Pads",
    model: "RE Himalayan 450 / Scram 411",
    price: "4,490",
    desc: "Contoured 3M-backed CF tank pads. Pair. Protects your jeans from the zip. Looks like it was always there.",
    tags: ["3M PSA", "Pair"],
    badge: "Cosmetic Only",
  },
  {
    id: "BS-RE-003",
    nickname: "The Heel Guardians",
    title: "Interceptor 650 Heel Guards",
    model: "RE Interceptor 650 / GT 650",
    price: "3,490",
    desc: "Matte CF heel guard plates, SS hardware. Drop-in replacement. You'll notice them every time you pull on your boots.",
    tags: ["Matte", "Drop-In"],
    badge: "Cosmetic Only",
  },
  {
    id: "BS-RE-004",
    nickname: "The Flank Steaks",
    title: "Scram 411 Side Panels",
    model: "Royal Enfield Scram 411",
    price: "5,490",
    desc: "Left and right pair in 2×2 twill. OEM clip positions. Transforms the Scram from plastic to purposeful in ten minutes.",
    tags: ["Pair", "OEM Clips"],
    badge: "Cosmetic Only",
  },
  {
    id: "BS-RE-005",
    nickname: "The Snooty Snout",
    title: "Classic 350 Mudguard Tip",
    model: "RE Classic 350 · 2021+",
    price: "2,990",
    desc: "Front mudguard tip in CF. Bolts to existing holes. One of those things people ask about at every petrol pump stop.",
    tags: ["Bolt-On"],
    badge: "Cosmetic Only",
  },
  {
    id: "BS-RE-006",
    nickname: "The Pipe Dream",
    title: "Exhaust Heat Shield",
    model: "Universal · RE Interceptor / GT / Himalayan",
    price: "1,990",
    desc: "CF panel over the mid-pipe. SS clamps. Mostly aesthetic. Slightly stops your jeans from scorching. Honest.",
    tags: ["Universal", "SS Clamps"],
    badge: "Cosmetic Only",
  },
];

const BS_TR = [
  {
    id: "BS-TR-001",
    nickname: "The Knuckle Duster",
    title: "Scrambler 400X Knuckle Guards",
    model: "Triumph Scrambler 400X · 2023+",
    price: "4,490",
    desc: "ABS-backed CF shells on OEM handlebar mounts. No modification. Matte finish. Looks like it shipped from Hinckley. It didn't.",
    tags: ["OEM Fit", "Matte"],
    badge: "Cosmetic Only",
  },
  {
    id: "BS-TR-002",
    nickname: "The Wind Deflector",
    title: "Scrambler 400X Flyscreen",
    model: "Triumph Scrambler 400X / Speed 400",
    price: "6,490",
    desc: "Stubby CF flyscreen on OEM brackets. Adds nothing to wind protection. Named optimistically. Adds everything to the look.",
    tags: ["OEM Brackets"],
    badge: "Cosmetic Only",
  },
  {
    id: "BS-TR-003",
    nickname: "The Mudslinger",
    title: "Speed 400 Rear Hugger",
    model: "Triumph Speed 400 · 2023+",
    price: "3,990",
    desc: "CF rear hugger on swingarm pivot. Keeps muck off the shock. Looks dead right against the Speed 400's silhouette.",
    tags: ["Swingarm Mount"],
    badge: "Cosmetic Only",
  },
  {
    id: "BS-TR-004",
    nickname: "The Tank Tattoos",
    title: "Scrambler 400X Tank Pads",
    model: "Triumph Scrambler 400X / Speed 400",
    price: "2,490",
    desc: "2×2 twill tank pad pair. 3M VHB adhesive. Paper template included. Ten minutes. Stays forever.",
    tags: ["3M VHB"],
    badge: "Cosmetic Only",
  },
];

const BS_TECH = [
  {
    id: "BS-TECH-001",
    nickname: "The Briefcase",
    title: "Laptop Skin",
    model: '13" / 14" / 15" / 16"',
    price: "2,490",
    desc: "Genuine 2×2 twill at 0.6mm. Repositionable 3M PSA. Adds 18g. Makes every meeting room yours.",
    tags: ["4 Sizes"],
    badge: "Cosmetic Only",
  },
  {
    id: "BS-TECH-002",
    nickname: "The Shell Game",
    title: "Phone Case",
    model: "iPhone 14/15/16 · Samsung S24/S25",
    price: "3,490",
    desc: "CF shell with PC liner. 1.2mm panel. Announces your personality without requiring you to say anything.",
    tags: ["PC Liner"],
    badge: "Cosmetic Only",
  },
  {
    id: "BS-TECH-003",
    nickname: "The Eye Rings",
    title: "Camera Lens Rings",
    model: "iPhone 15/16 Pro · S25 Ultra",
    price: "1,490",
    desc: "CF lens ring overlays, 0.4mm, PSA-backed. Purely decorative. Entirely satisfying every single time you notice them.",
    tags: [],
    badge: "Cosmetic Only",
  },
  {
    id: "BS-EDC-001",
    nickname: "The Monolith",
    title: "Slim Wallet",
    model: "Machined CF · 4 Card + Cash",
    price: "3,990",
    desc: "Machined from 3mm CF plate. 72g. Impractical to sit on. The thing everyone picks up and asks about.",
    tags: ["3mm Plate"],
    badge: "Cosmetic Only",
  },
  {
    id: "BS-EDC-002",
    nickname: "The Key Witness",
    title: "Key Fob",
    model: "40mm · Stainless D-Ring",
    price: "1,490",
    desc: "CF disc fob with SS D-ring. Matte finish. Something people notice on your keys before they notice you.",
    tags: [],
    badge: "Cosmetic Only",
  },
  {
    id: "BS-EDC-003",
    nickname: "The Presenter",
    title: "Business Card Case",
    model: "15 Cards · SS Hinge",
    price: "2,990",
    desc: "Clamshell CF from 4mm plate, SS hinge. Makes handing over your card feel like a deliberate act of confidence.",
    tags: ["SS Hinge"],
    badge: "Cosmetic Only",
  },
  {
    id: "BS-EDC-004",
    nickname: "The Barrel Rider",
    title: "Pen Clip",
    model: "Universal 10–14mm barrel",
    price: "890",
    desc: "CF barrel clip with silicone liner. Absurdly cheap for what it is. Unreasonably satisfying to hold.",
    tags: [],
    badge: "Cosmetic Only",
  },
];

function BsProductCard({ product }) {
  return (
    <BsCard>
      <BsImg>
        <BsImgLbl>{product.id}</BsImgLbl>
      </BsImg>
      <BsBody>
        <BsTop>
          <BsId>{product.nickname}</BsId>
          <BsPrice>
            <sup>₹</sup>
            {product.price}
          </BsPrice>
        </BsTop>
        <BsTitle>{product.title}</BsTitle>
        <BsModel>{product.model}</BsModel>
        <BsDesc>{product.desc}</BsDesc>
        <BsTags>
          {product.badge && <BsBadge>{product.badge}</BsBadge>}
          {product.tags.map((t, i) => (
            <BsTag key={i}>{t}</BsTag>
          ))}
        </BsTags>
      </BsBody>
    </BsCard>
  );
}

const Footer = styled.footer`
  background: ${T.blk};
  border-top: 1px solid #141414;
`;
const FooterInner = styled.div`
  padding: 36px 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
`;
const FooterLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const FooterName = styled.span`
  font-family: ${T.ffCond};
  font-weight: 900;
  font-size: 15px;
  letter-spacing: 0.06em;
`;
const FooterCopy = styled.span`
  font-family: ${T.ffMono};
  font-size: 8px;
  letter-spacing: 0.14em;
  color: #222;
`;

// ─── MAIN COMPONENT ──────────────────────────────────────────
export default function CarboNation() {
  const engRef = useRef(null);
  const bsRef = useRef(null);

  return (
    <>
      <GlobalStyle />
      <Page>
        {/* ── HERO ── */}
        <HeroGrid>
          <HeroGlow />
          <HeroScan />
          <HeroLeft>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 18,
                marginBottom: 32,
              }}
            >
              <LogoMark size={60} />
              <div>
                <div
                  style={{
                    fontFamily: T.ffCond,
                    fontWeight: 900,
                    fontSize: 29,
                    letterSpacing: ".08em",
                    lineHeight: 1,
                    color: T.wht,
                  }}
                >
                  CARBO<span style={{ color: T.cn }}>NATION</span>
                </div>
                <div
                  style={{
                    fontFamily: T.ffMono,
                    fontSize: 7,
                    fontWeight: 200,
                    letterSpacing: ".22em",
                    textTransform: "uppercase",
                    color: T.cnm,
                    marginTop: 4,
                  }}
                >
                  Carbon Fibre Division · SolidLabs
                </div>
              </div>
            </div>

            <Eyebrow>
              CN Division · Structural CF Engineering · Bengaluru
            </Eyebrow>

            <HeroH1>
              LAID UP
              <br />
              FOR THE
              <br />
              <em>CRITICAL.</em>
            </HeroH1>

            <p
              style={{
                fontSize: 14,
                lineHeight: 1.85,
                color: T.g5,
                maxWidth: 420,
                fontWeight: 300,
                marginBottom: 32,
              }}
            >
              Structural carbon fibre engineering for aerofoils, drone
              airframes, automotive assemblies, pressure vessels. Full layup to
              finish under one roof. And yes — also the most honest CF consumer
              goods you'll ever buy.
            </p>

            <div
              style={{
                display: "flex",
                gap: 10,
                flexWrap: "wrap",
                marginBottom: 40,
              }}
            >
              <BtnCN
                onClick={() =>
                  engRef.current?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Engineering →
              </BtnCN>
              <BtnGhost
                onClick={() =>
                  bsRef.current?.scrollIntoView({ behavior: "smooth" })
                }
              >
                BS Consumer →
              </BtnGhost>
            </div>

            <HeroStats>
              <StatItem>
                <StatNum>
                  1.8<span>T/m²</span>
                </StatNum>
                <StatLabel>
                  Tensile
                  <br />
                  prepreg UD
                </StatLabel>
              </StatItem>
              <StatItem>
                <StatNum>
                  ±0.1<span>mm</span>
                </StatNum>
                <StatLabel>
                  Dimensional
                  <br />
                  tolerance
                </StatLabel>
              </StatItem>
              <StatItem>
                <StatNum>3K–12K</StatNum>
                <StatLabel>
                  Tow counts
                  <br />
                  stocked
                </StatLabel>
              </StatItem>
            </HeroStats>
          </HeroLeft>

          <HeroRight>
            <Reg $tl />
            <Reg $tr />
            <Reg $bl />
            <Reg $br />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 32,
                width: "100%",
                maxWidth: 320,
              }}
            >
              <LogoMark size={128} />
              <div
                style={{
                  fontFamily: T.ffMono,
                  fontSize: "8px",
                  letterSpacing: ".28em",
                  textTransform: "uppercase",
                  color: T.cnm,
                  marginTop: -16,
                  textAlign: "center",
                }}
              >
                CARBO·NATION
              </div>
              <SpecCard>
                <SpecHead>
                  <SpecLbl>Active Layup · CN-AFS-240T</SpecLbl>
                  <SpecDot />
                </SpecHead>
                {[
                  ["Fibre", "T700S 12K", "UD"],
                  ["Resin", "Epoxy 120°C", "OOA"],
                  ["Fibre vol.", "58–62", "%Vf"],
                  ["Ply count", "8", "plies"],
                  ["Cure", "3h @ 120°C", null],
                  [
                    "Status",
                    <span style={{ color: T.cn }}>● RUNNING</span>,
                    null,
                  ],
                ].map(([k, v, sup], i) => (
                  <SpecRow key={i}>
                    <SpecKey>{k}</SpecKey>
                    <SpecVal>
                      {v}
                      {sup && <sup>{sup}</sup>}
                    </SpecVal>
                  </SpecRow>
                ))}
              </SpecCard>
            </div>
          </HeroRight>
        </HeroGrid>

        {/* ── CN TICKER ── */}
        <Ticker items={CN_TICKER_ITEMS} dark={false} />

        {/* ── DIVBAR: How it's made ── */}
        <DivBar ref={engRef} id="cn-engineering">
          <DivBarLabel>How It's Made</DivBarLabel>
          <DivBarRule />
          <DivBarId>5-STAGE PROCESS</DivBarId>
        </DivBar>

        {/* ── PROCESS ── */}
        <Section $border="#141414">
          <Pad>
            <SectionHead>
              <CondHead $size="clamp(32px,4vw,52px)">
                From tow to part.
                <br />
                No shortcuts.
              </CondHead>
              <Mono $color="#333">Process</Mono>
            </SectionHead>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                background: "#0d1400",
                marginTop: 40,
              }}
            >
              {[
                {
                  n: "01",
                  tag: "Design & Ply Schedule",
                  title: "The Blueprint",
                  desc: "Before a single fibre is cut, the ply schedule is locked. Fibre orientation, ply count, resin system, and core spec are set by the load case — from your FEA data or our in-house analysis. Nothing is guessed.",
                  visual: <PlyStackVisual />,
                },
                {
                  n: "02",
                  tag: "Tooling",
                  title: "The Mould",
                  desc: "Male or female tooling in aluminium, steel, or CFRP. CNC-machined to ±0.05mm. Release agent oven-cured before first use — not sprayed and rushed. The quality of the mould determines the quality of every part.",
                  visual: (
                    <div style={{ textAlign: "center" }}>
                      <div
                        style={{
                          fontFamily: T.ffCond,
                          fontWeight: 900,
                          fontSize: 42,
                          color: T.cn,
                          lineHeight: 1,
                        }}
                      >
                        ±0.05
                      </div>
                      <Mono
                        $size="7px"
                        $color="#333"
                        style={{
                          display: "block",
                          marginTop: 4,
                          letterSpacing: ".14em",
                        }}
                      >
                        mm CNC tolerance
                      </Mono>
                      <Mono
                        $size="7px"
                        $color="#1e1e1e"
                        style={{
                          display: "block",
                          marginTop: 3,
                          letterSpacing: ".12em",
                        }}
                      >
                        all tooling surfaces
                      </Mono>
                    </div>
                  ),
                },
                {
                  n: "03",
                  tag: "Layup",
                  title: "The Hands Part",
                  desc: "Each ply is cut on orientation, wet out, debulked, and placed by hand. Every ply is logged — fibre direction, material lot, and who laid it. Then bagging: release film, breather, vacuum bag, edge seal. No shortcuts in the stack-up.",
                  visual: (() => {
                    const vacLayers = [
                      ["Vacuum bag", "#555", 0.9, "60%"],
                      ["Breather cloth", "#444", 0.7, "72%"],
                      ["Release film", "#333", 0.6, "84%"],
                      ["CF plies", T.cn, 0.85, "100%"],
                      ["Core (if req.)", "#6a5800", 0.5, "92%"],
                      ["CF plies", T.cn, 0.85, "100%"],
                      ["Release film", "#333", 0.6, "84%"],
                      ["Tool surface", "#111", 0.9, "72%"],
                    ];
                    return (
                      <div style={{ width: "100%" }}>
                        <Mono
                          $size="7px"
                          $color="#222"
                          style={{
                            marginBottom: 10,
                            letterSpacing: ".14em",
                            display: "block",
                          }}
                        >
                          Vacuum bag stack
                        </Mono>
                        {vacLayers.map(([l, c, o, w], i) => (
                          <div
                            key={i}
                            style={{ marginBottom: 5, position: "relative" }}
                          >
                            <div
                              style={{
                                height: 10,
                                width: "90%",
                                background: c,
                                opacity: o,
                                position: "relative",
                              }}
                            >
                              <span
                                style={{
                                  position: "absolute",
                                  right: 10,
                                  top: "50%",
                                  transform: "translateY(-50%)",
                                  fontFamily: T.ffMono,
                                  fontSize: "6px",
                                  color: "rgba(255,255,255,0.25)",
                                  letterSpacing: ".1em",
                                  textTransform: "uppercase",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {l}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    );
                  })(),
                },
                {
                  n: "04",
                  tag: "Cure",
                  title: "The Oven",
                  desc: "Autoclave, OOA oven, or heated press — the resin system decides the cycle, not convenience. Temperature ramp, hold time, and cool-down are all controlled and logged. The thermocouple trace ships with every engineering order.",
                  visual: (
                    <div style={{ textAlign: "center" }}>
                      <div
                        style={{
                          fontFamily: T.ffCond,
                          fontWeight: 900,
                          fontSize: 52,
                          color: T.cn,
                          lineHeight: 1,
                        }}
                      >
                        120°C
                      </div>
                      <Mono
                        $size="7px"
                        $color="#333"
                        style={{
                          display: "block",
                          marginTop: 4,
                          letterSpacing: ".14em",
                        }}
                      >
                        Standard cure temp
                      </Mono>
                      <Mono
                        $size="7px"
                        $color="#222"
                        style={{
                          display: "block",
                          marginTop: 3,
                          letterSpacing: ".12em",
                        }}
                      >
                        3h dwell · trace logged
                      </Mono>
                    </div>
                  ),
                },
                {
                  n: "05",
                  tag: "Inspect & Trim",
                  title: "The Check",
                  desc: "Tap test across the entire surface. CMM dimensional check. Photographic documentation. For engineering orders: test coupon from the same batch is tensile-tested, data ships with the part. Doesn't pass → remade. No negotiations.",
                  visual: <QCVisual />,
                },
              ].map(({ n, tag, title, desc, visual }) => (
                <ProcessStep key={n}>
                  <PsNum>{n}</PsNum>
                  <div style={{ background: "#141414", width: "1px" }} />
                  <PsContent>
                    <Mono
                      $size="7.5px"
                      $color={T.cnm}
                      style={{
                        letterSpacing: ".2em",
                        display: "block",
                        marginBottom: 8,
                      }}
                    >
                      {tag}
                    </Mono>
                    <PsTitle>{title}</PsTitle>
                    <PsDesc>{desc}</PsDesc>
                  </PsContent>
                  <PsVisual>{visual}</PsVisual>
                </ProcessStep>
              ))}
            </div>
          </Pad>
        </Section>

        {/* ── ENG PRODUCTS ── */}
        <DivBar style={{ borderTop: `1px solid #141414` }}>
          <DivBarLabel>Engineering Product Lines</DivBarLabel>
          <DivBarRule />
          <DivBarId>CN-ENG · 6 LINES</DivBarId>
        </DivBar>

        <Section $border="#141414">
          <Pad>
            <SectionHead>
              <CondHead $size="clamp(32px,4vw,52px)">
                Load-bearing parts
                <br />
                for hard problems.
              </CondHead>
              <Mono $color="#333">Engineering</Mono>
            </SectionHead>
            <p
              style={{
                fontSize: 13.5,
                color: T.g5,
                lineHeight: 1.85,
                fontWeight: 300,
                maxWidth: 640,
                marginTop: 12,
              }}
            >
              Every order ships with material traceability, first-article
              inspection, and test coupon data from the same cure batch.
            </p>
          </Pad>
          <EngGrid>
            {ENG_PRODUCTS.map((p) => (
              <EngCard key={p.id}>
                <EngBar />
                <EngId>{p.id}</EngId>
                <EngTitle>{p.title}</EngTitle>
                <EngTag>{p.tag}</EngTag>
                <EngDesc>{p.desc}</EngDesc>
                <EngSpecs>
                  {p.specs.map((s, i) => (
                    <EngSpecItem key={i}>{s}</EngSpecItem>
                  ))}
                </EngSpecs>
              </EngCard>
            ))}
          </EngGrid>
        </Section>

        {/* ── MATERIALS ── */}
        <DivBar>
          <DivBarLabel>Material Systems</DivBarLabel>
          <DivBarRule />
          <DivBarId>T700 · T800 · M35J · CF/KEV</DivBarId>
        </DivBar>
        <MatBand>
          {MATERIALS.map((m) => (
            <MatCard key={m.name}>
              <MatLbl>{m.lbl}</MatLbl>
              <MatName>{m.name}</MatName>
              <MatSpec>{m.spec}</MatSpec>
              <MatDesc>{m.desc}</MatDesc>
            </MatCard>
          ))}
        </MatBand>

        {/* ── CN CTA ── */}
        <CtaSection>
          <Eyebrow style={{ justifyContent: "center", marginBottom: 14 }}>
            Ready to Build
          </Eyebrow>
          <CondHead
            $size="clamp(44px,7vw,96px)"
            style={{ marginBottom: 16, lineHeight: 0.86 }}
          >
            Send us your
            <br />
            hardest <em>brief.</em>
          </CondHead>
          <p
            style={{
              fontSize: 14,
              color: T.g5,
              maxWidth: 400,
              lineHeight: 1.85,
              fontWeight: 300,
              marginBottom: 32,
            }}
          >
            Engineering drawings, load specs, or a napkin sketch. We respond
            with a layup proposal and lead time within 48 hours.
          </p>
          <div
            style={{
              display: "flex",
              gap: 10,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <BtnCN>Send Engineering Brief →</BtnCN>
            <BtnGhost>Download Capabilities PDF</BtnGhost>
          </div>
        </CtaSection>

        {/* ═══════════════ BS SERIES ═══════════════ */}
        <DivBar $borderTop="rgba(230,48,24,.14)" ref={bsRef} id="cn-bs">
          <DivBarLabel $color="rgba(230,48,24,.4)">
            BS Series · Consumer Carbon
          </DivBarLabel>
          <DivBarRule $bg="linear-gradient(90deg,rgba(230,48,24,.2),transparent)" />
          <DivBarId $color="rgba(230,48,24,.35)">COSMETIC GRADE</DivBarId>
        </DivBar>

        <BsBreak>
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 16,
              }}
            >
              <LogoMark size={18} colors={[T.bs, T.bsm, T.bsd]} />
              <BsWordmark>
                Carbo
                <em style={{ fontStyle: "normal", color: T.bs }}>Nation</em>
              </BsWordmark>
              <BsPill>BS</BsPill>
            </div>
            <BsFlag>BS Series — Cosmetic Grade</BsFlag>
            <CondHead
              $size="clamp(40px,5vw,68px)"
              $em={T.bs}
              style={{ lineHeight: 0.88, position: "relative", zIndex: 1 }}
            >
              Real Carbon.
              <br />
              <span
                style={{
                  color: "rgba(240,237,230,.16)",
                  fontSize: ".72em",
                  fontStyle: "italic",
                }}
              >
                Zero excuses.
              </span>
            </CondHead>
            <p
              style={{
                fontSize: 13.5,
                color: T.g5,
                lineHeight: 1.85,
                fontWeight: 300,
                position: "relative",
                zIndex: 1,
                marginTop: 12,
              }}
            >
              Everything in the BS Series is made from the same T700 stock as
              our aerospace parts. The difference is the application — and we
              will never, ever pretend a seat cowl makes your Himalayan faster.
            </p>
            <BsHonest>
              <div>
                <span
                  style={{
                    fontFamily: T.ffMono,
                    fontSize: "7.5px",
                    letterSpacing: ".14em",
                    textTransform: "uppercase",
                    color: T.bs,
                    display: "block",
                    marginBottom: 5,
                  }}
                >
                  ⚠ Honest Statement
                </span>
                <span
                  style={{
                    fontSize: 13,
                    color: T.g4,
                    lineHeight: 1.75,
                    fontWeight: 300,
                  }}
                >
                  BS Series parts do not improve performance, reduce lap times,
                  or save meaningful weight. Genuine carbon fibre, applied
                  cosmetically. We make them to the same standard as our
                  engineering line because we physically cannot do it any other
                  way.
                </span>
              </div>
            </BsHonest>
            <div
              style={{
                display: "flex",
                gap: 10,
                flexWrap: "wrap",
                marginTop: 24,
                position: "relative",
                zIndex: 1,
              }}
            >
              <BtnBS>Browse Products →</BtnBS>
            </div>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 1,
              background: "#1a0a06",
            }}
          >
            {[
              {
                id: "RE · 450",
                title: "The Himalayan Hat",
                tag: "Seat Cowl · ₹6,990",
                desc: "Turns the 450's backside from sensible to sculptural.",
              },
              {
                id: "Triumph",
                title: "The Knuckle Duster",
                tag: "Scrambler Guards · ₹4,490",
                desc: "CF shells for your hands. Looks like Hinckley. Didn't.",
              },
              {
                id: "Tech",
                title: "The Briefcase",
                tag: "Laptop Skin · ₹2,490",
                desc: "Genuine 2×2 twill. Makes every meeting room yours.",
              },
              {
                id: "EDC",
                title: "The Monolith",
                tag: "Slim Wallet · ₹3,990",
                desc: "Machined CF plate. Impractical to sit on. Perfect.",
              },
            ].map((p) => (
              <div
                key={p.id}
                style={{
                  background: "#060606",
                  padding: "22px 24px",
                  transition: "background .2s",
                  position: "relative",
                  overflow: "hidden",
                  borderTop: `2px solid transparent`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(230,48,24,.03)";
                  e.currentTarget.style.borderTopColor = T.bs;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#060606";
                  e.currentTarget.style.borderTopColor = "transparent";
                }}
              >
                <div
                  style={{
                    fontFamily: T.ffMono,
                    fontSize: "7px",
                    letterSpacing: ".18em",
                    textTransform: "uppercase",
                    color: "#222",
                    marginBottom: 7,
                  }}
                >
                  {p.id}
                </div>
                <div
                  style={{
                    fontFamily: T.ffCond,
                    fontWeight: 900,
                    fontSize: 17,
                    color: T.wht,
                    lineHeight: 1,
                    marginBottom: 4,
                  }}
                >
                  {p.title}
                </div>
                <div
                  style={{
                    fontFamily: T.ffMono,
                    fontSize: "7px",
                    letterSpacing: ".14em",
                    textTransform: "uppercase",
                    color: `rgba(230,48,24,.5)`,
                    marginBottom: 8,
                  }}
                >
                  {p.tag}
                </div>
                <p
                  style={{
                    fontSize: "12.5px",
                    color: T.g4,
                    lineHeight: 1.72,
                    fontWeight: 300,
                  }}
                >
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </BsBreak>

        {/* BS TICKER */}
        <Ticker items={BS_TICKER_ITEMS} dark={true} />

        {/* RE PRODUCTS */}
        <DivBar $borderTop="rgba(230,48,24,.1)">
          <DivBarLabel $color="rgba(230,48,24,.4)">
            Royal Enfield Range
          </DivBarLabel>
          <DivBarRule $bg="linear-gradient(90deg,rgba(230,48,24,.2),transparent)" />
          <DivBarId $color="rgba(230,48,24,.3)">BS-RE · 6 PARTS</DivBarId>
        </DivBar>
        <BSSecHead>
          <Eyebrow $bs>Moto — RE Line</Eyebrow>
          <CondHead
            $size="clamp(32px,4vw,52px)"
            $em={T.bs}
            style={{ marginBottom: 10 }}
          >
            Built for Bulletheads. By engineers who respect the machine.
          </CondHead>
          <p
            style={{
              fontSize: 13.5,
              color: T.g5,
              lineHeight: 1.85,
              fontWeight: 300,
              maxWidth: 580,
            }}
          >
            Bolt-on, OEM-fit. Factory holes line up because we measured actual
            bikes, not spec sheets.
          </p>
        </BSSecHead>
        <BsGrid3>
          {BS_RE.map((p) => (
            <BsProductCard key={p.id} product={p} />
          ))}
        </BsGrid3>

        {/* TRIUMPH PRODUCTS */}
        <DivBar $borderTop="rgba(230,48,24,.08)">
          <DivBarLabel $color="rgba(230,48,24,.4)">Triumph Range</DivBarLabel>
          <DivBarRule $bg="linear-gradient(90deg,rgba(230,48,24,.2),transparent)" />
          <DivBarId $color="rgba(230,48,24,.3)">BS-TR · 4 PARTS</DivBarId>
        </DivBar>
        <BSSecHead>
          <Eyebrow $bs>Moto — Triumph Line</Eyebrow>
          <CondHead
            $size="clamp(32px,4vw,52px)"
            $em={T.bs}
            style={{ marginBottom: 10 }}
          >
            For riders who paid the premium and want the rest to match.
          </CondHead>
          <p
            style={{
              fontSize: 13.5,
              color: T.g5,
              lineHeight: 1.85,
              fontWeight: 300,
              maxWidth: 580,
            }}
          >
            Scrambler 400X and Speed 400. Designed to complement the factory
            aesthetic, not fight it.
          </p>
        </BSSecHead>
        <BsGrid2>
          {BS_TR.map((p) => (
            <BsProductCard key={p.id} product={p} />
          ))}
        </BsGrid2>

        {/* TECH + EDC */}
        <DivBar $borderTop="rgba(230,48,24,.08)">
          <DivBarLabel $color="rgba(230,48,24,.4)">Tech & EDC</DivBarLabel>
          <DivBarRule $bg="linear-gradient(90deg,rgba(230,48,24,.2),transparent)" />
          <DivBarId $color="rgba(230,48,24,.3)">
            BS-TECH / BS-EDC · 7 ITEMS
          </DivBarId>
        </DivBar>
        <BsGrid4>
          {BS_TECH.map((p) => (
            <BsProductCard key={p.id} product={p} />
          ))}
        </BsGrid4>

        {/* FINISHES */}
        <DivBar>
          <DivBarLabel>Available Finishes</DivBarLabel>
          <DivBarRule />
          <DivBarId>4 WEAVE OPTIONS</DivBarId>
        </DivBar>
        <FinBand>
          {FINISHES.map((f) => (
            <FinCard key={f.name}>
              <FinSwatch $css={f.swatchCss} />
              <FinName>{f.name}</FinName>
              <FinTag>{f.tag}</FinTag>
              <FinDesc>{f.desc}</FinDesc>
            </FinCard>
          ))}
        </FinBand>

        {/* BS CTA */}
        <CtaSection $bs>
          <Eyebrow $bs style={{ justifyContent: "center", marginBottom: 14 }}>
            Order
          </Eyebrow>
          <CondHead
            $size="clamp(44px,7vw,96px)"
            $em={T.bs}
            style={{ marginBottom: 16, lineHeight: 0.86 }}
          >
            Carbon for the
            <br />
            rest of <em>us.</em>
          </CondHead>
          <p
            style={{
              fontSize: 14,
              color: T.g5,
              maxWidth: 380,
              lineHeight: 1.85,
              fontWeight: 300,
              marginBottom: 32,
            }}
          >
            Choose your part, your model year, your finish. We confirm fit and
            dispatch within the week. All-India shipping above ₹2,499.
          </p>
          <div
            style={{
              display: "flex",
              gap: 10,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <BtnBS>Order Now →</BtnBS>
            <BtnGhost
              onClick={() =>
                engRef.current?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Engineering ↑
            </BtnGhost>
          </div>
          <Mono
            $size="7.5px"
            $color="#222"
            style={{ marginTop: 18, letterSpacing: ".14em", display: "block" }}
          >
            All-India shipping · 30-day fit guarantee · Made in Bengaluru
          </Mono>
        </CtaSection>

        {/* FOOTER */}
        <Footer>
          <FooterInner>
            <FooterLogo>
              <LogoMark size={22} />
              <FooterName>
                CARBO<span style={{ color: T.cn }}>NATION</span>
              </FooterName>
            </FooterLogo>
            <FooterCopy>
              © 2025 SolidLabs Technologies · CarboNation Division · Bengaluru
            </FooterCopy>
          </FooterInner>
        </Footer>
      </Page>
    </>
  );
}
