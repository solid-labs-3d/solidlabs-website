import styled, { keyframes } from "styled-components";

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

// ─── STYLED COMPONENTS ───────────────────────────────────────
const BsCard = styled.div`
  background: #060606;
  position: relative;
  overflow: hidden;
  transition: background 0.2s;
  &:hover { background: rgba(230,48,24,0.02); }
  &::before {
    content: "";
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: ${T.bs};
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.28s;
  }
  &:hover::before { transform: scaleX(1); }
`;

const BsImg = styled.div`
  height: 120px;
  border-bottom: 1px solid #141414;
  position: relative;
  overflow: hidden;
  background-image:
    repeating-linear-gradient(45deg, rgba(255,255,255,.02) 0, rgba(255,255,255,.02) 1px, transparent 1px, transparent 9px),
    repeating-linear-gradient(-45deg, rgba(255,255,255,.02) 0, rgba(255,255,255,.02) 1px, transparent 1px, transparent 9px);
  background-size: 9px 9px;
`;

const BsImgLbl = styled.div`
  position: absolute;
  bottom: 9px; left: 12px;
  font-family: ${T.ffMono};
  font-size: 6.5px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(255,255,255,.12);
`;

const BsBody = styled.div`padding: 20px 24px 24px;`;

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
  color: rgba(230,48,24,.55);
  margin-bottom: 10px;
`;

const BsDesc = styled.p`
  font-size: 13px;
  color: ${T.g4};
  line-height: 1.75;
  font-weight: 300;
  margin-bottom: 11px;
`;

const BsTags = styled.div`display: flex; flex-wrap: wrap; gap: 4px;`;

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
  border: 1px solid rgba(230,48,24,.2);
  background: rgba(230,48,24,.04);
  padding: 2px 6px;
`;

// ─── IMAGE PLACEHOLDER (swap with real <img> when backend ready) ──
const BsImgContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// ─── CARBONATION CARD COMPONENT ──────────────────────────────
/**
 * CarbonationCard
 *
 * Props (all from backend/product object):
 *   id          string   – e.g. "BS-RE-001"
 *   nickname    string   – e.g. "The Himalayan Hat"
 *   title       string   – e.g. "Himalayan 450 Seat Cowl"
 *   model       string   – e.g. "RE Himalayan 450 · 2024+"
 *   price       string   – e.g. "6,990"
 *   desc        string   – product description
 *   tags        string[] – e.g. ["Bolt-On", "2×2 Twill"]
 *   badge       string   – e.g. "Cosmetic Only"
 *   imageUrl    string   – optional: product image URL from backend
 *   onClick     fn       – optional: card click handler
 */
export default function CarbonationCard({ product, onClick }) {
  const { id, nickname, title, model, price, desc, tags = [], badge, imageUrl } = product;

  return (
    <BsCard onClick={onClick} style={onClick ? { cursor: "pointer" } : {}}>
      <BsImg>
        {imageUrl ? (
          <BsImgContent>
            <img
              src={imageUrl}
              alt={title}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </BsImgContent>
        ) : null}
        <BsImgLbl>{id}</BsImgLbl>
      </BsImg>

      <BsBody>
        <BsTop>
          <BsId>{nickname}</BsId>
          <BsPrice><sup>₹</sup>{price}</BsPrice>
        </BsTop>
        <BsTitle>{title}</BsTitle>
        <BsModel>{model}</BsModel>
        <BsDesc>{desc}</BsDesc>
        <BsTags>
          {badge && <BsBadge>{badge}</BsBadge>}
          {tags.map((t, i) => <BsTag key={i}>{t}</BsTag>)}
        </BsTags>
      </BsBody>
    </BsCard>
  );
}