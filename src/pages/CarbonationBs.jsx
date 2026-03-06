import { useState, useEffect } from "react";
import styled, { keyframes, createGlobalStyle } from "styled-components";
import CarbonationCard from "../components/CarbonationCard";
import { getProductsByCategoryName } from "../api/apiClient";

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
const tickAnim = keyframes`from{transform:translateX(0)}to{transform:translateX(-50%)}`;
const fadeUp = keyframes`from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}`;
const bsScan = keyframes`from{top:0}to{top:100%}`;

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,400;0,600;0,700;0,800;0,900;1,700;1,900&family=Barlow:wght@300;400;500&family=DM+Mono:wght@300;400;500&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  html{scroll-behavior:smooth;}
  body{background:${T.blk};color:${T.wht};font-family:${T.ffBody};font-weight:300;}
`;

// ─── SHARED ───────────────────────────────────────────────────
const Page = styled.div`
  background: #060606;
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

// ─── HERO ─────────────────────────────────────────────────────
const BsHeroWrap = styled.div`
  min-height: 72vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  position: relative;
  overflow: hidden;
  border-bottom: 1px solid rgba(230, 48, 24, 0.1);
  background: #060606;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;
const BsHeroGlow = styled.div`
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse 80% 60% at 55% 40%,
    rgba(230, 48, 24, 0.05),
    transparent 65%
  );
  pointer-events: none;
`;
const BsHeroScan = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  height: 1px;
  z-index: 2;
  background: linear-gradient(
    90deg,
    transparent,
    ${T.bs} 40%,
    ${T.bs} 60%,
    transparent
  );
  opacity: 0.05;
  animation: ${bsScan} 12s linear infinite;
  pointer-events: none;
`;
const BsHeroLeft = styled.div`
  position: relative;
  z-index: 3;
  padding: 100px 48px 72px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  border-right: 1px solid rgba(230, 48, 24, 0.06);
  @media (max-width: 768px) {
    padding: 100px 20px 60px;
    border-right: none;
  }
`;
const BsHeroRight = styled.div`
  position: relative;
  z-index: 3;
  padding: 100px 48px 72px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  @media (max-width: 768px) {
    padding: 40px 20px;
  }
`;
const BsH1 = styled.h1`
  font-family: ${T.ffCond};
  font-weight: 900;
  font-size: clamp(56px, 9vw, 120px);
  line-height: 0.84;
  letter-spacing: 0.01em;
  margin-bottom: 28px;
  animation: ${fadeUp} 0.9s ease 0.25s both;
  em {
    font-style: italic;
    color: ${T.bs};
  }
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
const BsFlag = styled.div`
  display: inline-flex;
    width: 200px;
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

// ─── PRODUCT GRID ─────────────────────────────────────────────
const BsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2px;
  background: #1a0a06;
  @media (max-width: 900px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

// ─── LOADING / ERROR ─────────────────────────────────────────
const StateMsg = styled.div`
  padding: 40px 48px;
  font-family: ${T.ffMono};
  font-size: 8.5px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${(p) => (p.$error ? T.bs : T.g4)};
  background: #060606;
  grid-column: 1 / -1;
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

// ─── CTA ──────────────────────────────────────────────────────
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
    background: radial-gradient(
      ellipse at 50% 100%,
      rgba(230, 48, 24, 0.07),
      transparent 70%
    );
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

// ─── NAV ─────────────────────────────────────────────────────
const NavBar = styled.div`
  position: sticky;
  top: 0;
  z-index: 100;
  height: 44px;
  background: rgba(6, 6, 6, 0.96);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid rgba(230, 48, 24, 0.1);
  padding: 0 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const NavBack = styled.button`
  font-family: ${T.ffMono};
  font-size: 7.5px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  background: transparent;
  color: #444;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: color 0.2s;
  &:hover {
    color: ${T.wht};
  }
`;
const NavTitle = styled.div`
  font-family: ${T.ffCond};
  font-weight: 900;
  font-size: 14px;
  letter-spacing: 0.1em;
  color: ${T.wht};
  display: flex;
  align-items: center;
  gap: 8px;
`;
const NavPill = styled.span`
  font-family: ${T.ffMono};
  font-size: 6.5px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${T.bs};
  padding: 2px 7px;
  border: 1px solid rgba(230, 48, 24, 0.4);
  background: rgba(230, 48, 24, 0.06);
`;

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

const HERO_PREVIEWS = [
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
];

// ─── MAIN ─────────────────────────────────────────────────────
export default function CarbonationBS() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getProductsByCategoryName("carbonations");
        console.log("Carbonation products:", res);
        setProducts(res);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const goToEngineering = () => {
    window.location.href = "/carbonation";
  };

  return (
    <>
      <GlobalStyle />
      <Page>
        {/* ── HERO ── */}
        <BsHeroWrap>
          <BsHeroGlow />
          <BsHeroScan />
          <BsHeroLeft>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 20,
              }}
            >
              <LogoMark size={30} colors={[T.bs, T.bsm, T.bsd]} />
              <span
                style={{
                  fontFamily: T.ffCond,
                  fontWeight: 900,
                  fontSize: 30,
                  letterSpacing: ".08em",
                  color: T.wht,
                }}
              >
                CARBO
                <em style={{ fontStyle: "normal", color: T.bs }}>NATION</em>
              </span>
              <span
                style={{
                  fontFamily: T.ffMono,
                  fontSize: "10Px",
                  letterSpacing: ".2em",
                  textTransform: "uppercase",
                  color: T.bs,
                  padding: "2px 7px",
                  border: "1px solid rgba(230,48,24,.4)",
                  background: "rgba(230,48,24,.06)",
                }}
              >
                BS
              </span>
            </div>
            <BsFlag>BS Series — Cosmetic Grade</BsFlag>
            <BsH1>
              REAL
              <br />
              CARBON.
              <br />
              <em>Zero excuses.</em>
            </BsH1>
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
              Everything in the BS Series is made from the same T700 stock as
              our aerospace parts. The difference is the application — and we
              will never, ever pretend a seat cowl makes your Himalayan faster.
            </p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <BtnBS>Browse Products →</BtnBS>
              <BtnGhost onClick={goToEngineering}>Engineering ↑</BtnGhost>
            </div>
          </BsHeroLeft>

          <BsHeroRight>
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
                marginTop: 32,
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 1,
                background: "#1a0a06",
              }}
            >
              {HERO_PREVIEWS.map((p) => (
                <div
                  key={p.id}
                  style={{
                    background: "#060606",
                    padding: "22px 24px",
                    transition: "background .2s, border-top-color .2s",
                    position: "relative",
                    overflow: "hidden",
                    borderTop: "2px solid transparent",
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
                      color: "rgba(230,48,24,.5)",
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
          </BsHeroRight>
        </BsHeroWrap>

        <Ticker items={BS_TICKER_ITEMS} dark={true} />

        {/* ── PRODUCTS ── */}
        <DivBar $borderTop="rgba(230,48,24,.1)">
          <DivBarLabel $color="rgba(230,48,24,.4)">
            Carbonation — BS Series
          </DivBarLabel>
          <DivBarRule $bg="linear-gradient(90deg,rgba(230,48,24,.2),transparent)" />
          <DivBarId $color="rgba(230,48,24,.3)">
            {loading ? "LOADING…" : `${products.length} PARTS`}
          </DivBarId>
        </DivBar>

        <BSSecHead>
          <Eyebrow $bs>BS Series — Full Range</Eyebrow>
          <CondHead
            $size="clamp(32px,4vw,52px)"
            $em={T.bs}
            style={{ marginBottom: 10 }}
          >
            Real carbon. Built for the rest of <em>us.</em>
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
            Every part — moto, tech, EDC — fetched from the same honest
            catalogue. Genuine T700. Made in Bengaluru. Zero performance claims.
          </p>
        </BSSecHead>

        <BsGrid>
          {loading && <StateMsg>Loading parts…</StateMsg>}
          {error && <StateMsg $error>Error: {error}</StateMsg>}
          {!loading && !error && products.length === 0 && (
            <StateMsg>No products found in this category.</StateMsg>
          )}
          {!loading &&
            !error &&
            products.map((p) => <CarbonationCard key={p.id} product={p} />)}
        </BsGrid>

        {/* ── FINISHES ── */}
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

        {/* ── CTA ── */}
        <CtaSection>
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
            <BtnGhost onClick={goToEngineering}>Engineering ↑</BtnGhost>
          </div>
          <Mono
            $size="7.5px"
            $color="#222"
            style={{ marginTop: 18, letterSpacing: ".14em", display: "block" }}
          >
            All-India shipping · 30-day fit guarantee · Made in Bengaluru
          </Mono>
        </CtaSection>

        {/* ── FOOTER ── */}
        <Footer>
          <FooterInner>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <LogoMark size={22} colors={[T.bs, T.bsm, T.bsd]} />
              <FooterName>
                CARBO<span style={{ color: T.bs }}>NATION</span>{" "}
                <span style={{ color: "#333", fontSize: 12 }}>BS</span>
              </FooterName>
            </div>
            <FooterCopy>
              © 2026 SolidLabs Technologies · CarboNation Division · Bengaluru
            </FooterCopy>
          </FooterInner>
        </Footer>
      </Page>
    </>
  );
}
