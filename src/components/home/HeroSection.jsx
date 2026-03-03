import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { Ticker } from "../Shared";

/* ─── Keyframes ───────────────── */

const fadeup = keyframes`
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const mfade = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

const sdrop = keyframes`
  0%   { transform: scaleY(0); transform-origin: top; opacity: 1; }
  60%  { transform: scaleY(1); transform-origin: top; opacity: 1; }
  100% { transform: scaleY(1); transform-origin: top; opacity: 0; }
`;

/* ─── STYLES (UNCHANGED) ───────────────── */

const Hero = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0 48px 68px;
  background: var(--blk);
  position: relative;
  overflow: hidden;
`;

const HeroBg = styled.div`
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 80% 60% at 65% 42%, rgba(240,92,30,.07), transparent 68%),
    radial-gradient(ellipse 40% 40% at 12% 78%, rgba(196,72,32,.04), transparent 60%);
`;

const HeroBgMark = styled.div`
  position: absolute;
  top: 50%;
  right: 3%;
  transform: translateY(-50%);
  opacity: 0;
  animation: ${mfade} 1.4s ease 1s forwards;
`;

const HeroBgText = styled.div`
  position: absolute;
  bottom: 80px;
  left: 0; right: 0;
  font-family: var(--ff-cond);
  font-weight: 900;
  font-size: clamp(11px,1.4vw,16px);
  letter-spacing: .28em;
  text-transform: uppercase;
  color: var(--wht);
  opacity: .04;
  text-align: center;
  pointer-events: none;
  white-space: nowrap;
  overflow: hidden;
`;

const HeroEye = styled.div`
  font-family: var(--ff-mono);
  font-size: 8.5px;
  letter-spacing: .26em;
  text-transform: uppercase;
  color: var(--or);
  margin-bottom: 22px;
  opacity: 0;
  animation: ${fadeup} .7s ease .1s forwards;
`;

const HeroH1 = styled.h1`
  font-family: var(--ff-cond);
  font-weight: 900;
  font-size: clamp(68px,13.5vw,150px);
  line-height: .85;
  letter-spacing: .01em;
  margin-bottom: 40px;
  opacity: 0;
  animation: ${fadeup} .9s ease .25s forwards;
  em { font-style: italic; color: var(--or); }
`;

const HeroBot = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  border-top: 1px solid var(--s2);
  padding-top: 26px;
  opacity: 0;
  animation: ${fadeup} .7s ease .55s forwards;
`;

const HeroDesc = styled.p`
  font-size: 14px;
  line-height: 1.85;
  color: var(--g5);
  max-width: 400px;
`;

const HeroBtns = styled.div`
  display: flex;
  gap: 12px;
`;

const BtnOr = styled.button`
  font-family: var(--ff-mono);
  font-size: 10px;
  letter-spacing: .16em;
  text-transform: uppercase;
  padding: 14px 28px;
  border: none;
  background: var(--or);
  color: var(--blk);
  cursor: pointer;
`;

const BtnGhost = styled.button`
  font-family: var(--ff-mono);
  font-size: 10px;
  letter-spacing: .14em;
  text-transform: uppercase;
  padding: 13px 24px;
  border: 1px solid var(--s2);
  color: var(--g5);
  background: transparent;
  cursor: pointer;
`;

const ScrollHint = styled.div`
  position: absolute;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  font-family: var(--ff-mono);
  font-size: 7.5px;
  letter-spacing: .2em;
  text-transform: uppercase;
  color: var(--g3);
  opacity: 0;
  animation: ${fadeup} .6s ease 1.2s forwards;
`;

const ScrollLine = styled.div`
  width: 1px;
  height: 36px;
  background: linear-gradient(to bottom, var(--g3), transparent);
  animation: ${sdrop} 2s ease infinite;
`;

/* ─── DATA ───────────────── */

const TICKER_ITEMS = [
  "SL Originals","D2C Products","Anyday · Anytime","Bengaluru · India",
  "24h Turnaround","PLA+ · PETG · ABS · TPU",
  "Precision B2B","Extreme Engineering","Electronics Assembly",
];

/* ─── COMPONENT ───────────────── */

export default function HeroSection() {
  const nav = useNavigate();

  return (
    <>
      <Hero id="hero">
        <HeroBg />
        <HeroBgMark>
          <svg width="520" height="480" viewBox="0 0 520 480">
            <polygon points="60,8 420,8 460,90 100,90" fill="#f05c1e"/>
            <polygon points="40,140 400,140 440,222 80,222" fill="#c44820"/>
            <polygon points="20,272 380,272 420,354 60,354" fill="#7a2e0f"/>
            <polygon points="0,400 340,400 380,472 40,472" fill="#3d1608"/>
          </svg>
        </HeroBgMark>

        <HeroBgText>
          3D PRINTING · INNOVATION · BENGALURU · INDIA
        </HeroBgText>

        <HeroEye>
          Bengaluru, India · Precision 3D Printing Since 2024
        </HeroEye>

        <HeroH1>
          SOLID<br />IDEAS.<br /><em>REAL FAST.</em>
        </HeroH1>

        <HeroBot>
          <HeroDesc>
            From CAD file to physical part in 24 hours. Consumer products shipped daily. Electronics assembled and tested. We make things — properly.
          </HeroDesc>

          <HeroBtns>
            <BtnOr onClick={() => nav("/originals")}>
              Shop Originals
            </BtnOr>
            <BtnGhost onClick={() => nav("/precision")}>
              B2B Precision →
            </BtnGhost>
          </HeroBtns>
        </HeroBot>

        <ScrollHint>
          <ScrollLine />
          Scroll
        </ScrollHint>
      </Hero>

      <Ticker items={TICKER_ITEMS} bg="var(--or)" />
    </>
  );
}