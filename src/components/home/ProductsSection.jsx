import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { SectionHeader } from "../Shared";

/* ───────────────── STATS BAR ───────────────── */

const StatsBar = styled.div`
  background: var(--s1);
  display: grid;
  grid-template-columns: repeat(4,1fr);
  border-bottom: 1px solid var(--s2);
`;

const SbItem = styled.div`
  padding: 36px 32px;
  border-right: 1px solid var(--s2);
  display: flex;
  flex-direction: column;
  gap: 6px;
  &:last-child { border-right: none; }
`;

const SbN = styled.div`
  font-family: var(--ff-cond);
  font-weight: 900;
  font-size: 48px;
  line-height: 1;
  color: var(--wht);
  span { color: var(--or); }
`;

const SbL = styled.div`
  font-family: var(--ff-mono);
  font-size: 8px;
  letter-spacing: .18em;
  text-transform: uppercase;
  color: var(--g3);
`;

const SbD = styled.div`
  font-size: 12px;
  color: var(--g5);
  margin-top: 2px;
`;

/* ───────────────── PRODUCT GRID ───────────────── */

const SecPad = styled.section`
  padding: 72px 48px;
  background: var(--blk);
`;

const ProdGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3,1fr);
  gap: 2px;
  background: var(--s2);
`;

const ProdCard = styled.div`
  background: var(--s1);
  padding: 48px 36px 40px;
  display: flex;
  flex-direction: column;
  min-height: 420px;
  cursor: pointer;
  transition: background .2s;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    opacity: 0;
    transition: opacity .3s;
    background: ${({ $variant }) =>
      $variant === "or" ? "linear-gradient(135deg,rgba(240,92,30,.06),transparent 60%)" :
      $variant === "yw" ? "linear-gradient(135deg,rgba(240,192,32,.06),transparent 60%)" :
      "linear-gradient(135deg,rgba(30,122,255,.06),transparent 60%)"};
  }

  &:hover { background: var(--s2); }
  &:hover::before { opacity: 1; }
`;

const PcNum = styled.div`
  font-family: var(--ff-mono);
  font-size: 8px;
  letter-spacing: .2em;
  text-transform: uppercase;
  color: var(--g3);
  margin-bottom: 40px;
`;

const PcMark = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  margin-bottom: 28px;
`;

const PcName = styled.div`
  font-family: var(--ff-cond);
  font-weight: 800;
  font-size: 30px;
  letter-spacing: .02em;
  margin-bottom: 10px;
`;

const PcDesc = styled.p`
  font-size: 13px;
  color: var(--g5);
  line-height: 1.7;
  margin-bottom: 22px;
`;

const PcSpecs = styled.div`
  display: flex;
  gap: 18px;
  flex-wrap: wrap;
  border-top: 1px solid var(--s2);
  padding-top: 14px;
`;

const PcSpecItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
`;

const PcSpecLabel = styled.span`
  font-family: var(--ff-mono);
  font-size: 7px;
  letter-spacing: .14em;
  text-transform: uppercase;
  color: var(--g3);
`;

const PcSpecValue = styled.span`
  font-family: var(--ff-mono);
  font-size: 9px;
  letter-spacing: .12em;
  text-transform: uppercase;
  color: ${({ $color }) => $color};
`;

const PcBtn = styled.button`
  display: inline-flex;
  margin-top: 25px;
  align-items: center;
  justify-content: center;
  padding: 14px 28px;
  font-family: var(--ff-mono);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: .14em;
  text-transform: uppercase;
  border: none;
  cursor: pointer;
  width: fit-content;
  transition: opacity .2s;
  background: ${({ $bg }) => $bg};
  color: var(--blk);
  &:hover { opacity: .85; }
`;

/* ───────────────── DATA ───────────────── */

const CARDS = [
  {
    variant: "or", n: "01 — D2C", name: "SL Originals", page: "/originals", accent: "var(--or)", btnLabel: "SHOP NOW →",
    desc: "Designed products — keychains, desk organisers, hardware accessories, phone stands, cable managers, and more. Ready to ship in 2–3 days.",
    specs: [{ label: "SHIPS IN", value: "2-3 DAYS" },{ label: "COLOURS", value: "14+" },{ label: "MATERIAL", value: "PLA+/PETG" }],
  },
  {
    variant: "yw", n: "02 — B2B", name: "Precision Print", page: "/precision", accent: "var(--yw)", btnLabel: "GET QUOTE →",
    desc: "Functional prototypes and production runs for engineers, startups, and product teams. Tight tolerances, multiple materials, fast delivery.",
    specs: [{ label: "TOLERANCE", value: "±0.2MM" },{ label: "BATCH", value: "1–500" },{ label: "LEAD TIME", value: "24H–7D" }],
  },
  {
    variant: "bl", n: "03 — EXTREME", name: "Extreme Eng.", page: "/extreme", accent: "var(--bl)", btnLabel: "EXPLORE →",
    desc: "Electronics sourcing, PCB enclosures, full assembly, IoT integration, jigs and fixtures. For engineers who need more than a print.",
    specs: [{ label: "ELECTRONICS", value: "SOURCED" },{ label: "FIRMWARE", value: "FLASHED" },{ label: "ASSEMBLY", value: "TESTED" }],
  },
];

/* ───────────────── COMPONENT ───────────────── */

export default function ProductSection() {
  const nav = useNavigate();

  return (
    <>
      <StatsBar>
        {[
          { n: "12", s: "K+", l: "Parts Shipped", d: "Across India since launch" },
          { n: "98", s: "%", l: "First-Pass Accuracy", d: "Parts pass QC on first print" },
          { n: "24", s: "h", l: "Turnaround", d: "File to physical part" },
          { n: "7", s: "+", l: "Years R&D", d: "Precision 3D printing" },
        ].map((s, i) => (
          <SbItem className={`rv d${i + 1}`} key={s.l}>
            <SbN>{s.n}<span>{s.s}</span></SbN>
            <SbL>{s.l}</SbL>
            <SbD>{s.d}</SbD>
          </SbItem>
        ))}
      </StatsBar>

      <SecPad>
        <SectionHeader title="What We Build" sub="03 — Three Lines" />
        <ProdGrid>
          {CARDS.map((c) => (
            <ProdCard $variant={c.variant} className="rv" key={c.name} onClick={() => nav(c.page)}>
              <PcNum>{c.n}</PcNum>
              <PcMark>
                <svg width="80" height="72" viewBox="0 0 80 72" fill="none">
                  <polygon points="10,2 68,2 76,20 18,20" fill={c.accent} opacity=".9"/>
                  <polygon points="6,28 64,28 72,46 14,46" fill={c.accent} opacity=".6"/>
                  <polygon points="2,54 60,54 68,72 10,72" fill={c.accent} opacity=".35"/>
                </svg>
              </PcMark>
              <PcName>{c.name}</PcName>
              <PcDesc>{c.desc}</PcDesc>
              <PcSpecs>
                {c.specs.map((sp) => (
                  <PcSpecItem key={sp.label}>
                    <PcSpecLabel>{sp.label}</PcSpecLabel>
                    <PcSpecValue $color={c.accent}>{sp.value}</PcSpecValue>
                  </PcSpecItem>
                ))}
              </PcSpecs>
              <PcBtn $bg={c.accent} onClick={(e) => { e.stopPropagation(); nav(c.page); }}>
                {c.btnLabel}
              </PcBtn>
            </ProdCard>
          ))}
        </ProdGrid>
      </SecPad>
    </>
  );
}