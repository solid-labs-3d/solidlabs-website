import styled from "styled-components";
import { useState, useEffect } from "react";
import { cart, addToCart, increaseQty, decreaseQty, getCartItem } from "../components/Cart";

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
  height: 150px;
  border-bottom: 1px solid #141414;
  position: relative;
  overflow: hidden;
  background: #0a0a0a;
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
  color: rgba(255,255,255,.25);
`;

const StockBadge = styled.div`
  position: absolute;
  top: 10px; right: 10px;
  font-family: ${T.ffMono};
  font-size: 6.5px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  padding: 3px 8px;
  background: ${p => p.$inStock ? "rgba(34,197,94,.1)" : "rgba(230,48,24,.1)"};
  color: ${p => p.$inStock ? "#22c55e" : T.bs};
  border: 1px solid ${p => p.$inStock ? "rgba(34,197,94,.25)" : "rgba(230,48,24,.25)"};
`;

const BsBody = styled.div`padding: 20px 24px 24px;`;

const BsTop = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const BsSku = styled.span`
  font-family: ${T.ffMono};
  font-size: 6.5px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #444;
`;

const BsPrice = styled.span`
  font-family: ${T.ffCond};
  font-weight: 700;
  font-size: 18px;
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
  line-height: 1.1;
  margin-bottom: 6px;
`;

const BsMaterial = styled.div`
  font-family: ${T.ffMono};
  font-size: 7px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(230,48,24,.6);
  margin-bottom: 12px;
`;

const BsDesc = styled.p`
  font-size: 12.5px;
  color: #888;
  line-height: 1.75;
  font-weight: 300;
  margin-bottom: 14px;
`;

const BsTags = styled.div`display: flex; flex-wrap: wrap; gap: 5px;`;

const BsTag = styled.span`
  font-family: ${T.ffMono};
  font-size: 7px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #555;
  border: 1px solid #1e1e1e;
  padding: 3px 7px;
`;

const BsBadge = styled.span`
  font-family: ${T.ffMono};
  font-size: 7px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${T.bs};
  border: 1px solid rgba(230,48,24,.25);
  background: rgba(230,48,24,.06);
  padding: 3px 7px;
`;

// ─── COMPONENT ───────────────────────────────────────────────
/*
  API response fields:
    id          number   – e.g. 2
    name        string   – e.g. "Carbon Fiber Drone Frame"
    description string   – product description
    price       string   – e.g. "2499"
    image_url   string   – product image URL
    sku         string   – e.g. "SL-CARB-001"
    material    string   – e.g. "Carbon Fiber"
    category    string   – e.g. "carbonations"
    stock       number   – e.g. 15
    slug        string   – e.g. "carbon-drone-frame"
*/
export default function CarbonationCard({ product, onClick }) {
    const {
    id,
    name,
    description,
    price,
    image_url,
    sku,
    material,
    stock
  } = product;

  const [qty, setQty] = useState(0)

  useEffect(() => {

    const update = () => {
      const item = getCartItem(product.id)
      setQty(item ? item.qty : 0)
    }

    update()

    cart.listeners.push(update)

    return () => {
      cart.listeners = cart.listeners.filter(f => f !== update)
    }

  }, [product.id])

  const inStock = stock > 0;

  // Format price with commas: "2499" → "2,499"
  const formattedPrice = Number(price).toLocaleString("en-IN");

  return (
    <BsCard onClick={onClick} style={onClick ? { cursor: "pointer" } : {}}>

      {/* ── IMAGE ── */}
      <BsImg>
        {image_url ? (
          <img
            src={image_url}
            alt={name}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        ) : null}
        <BsImgLbl>{sku}</BsImgLbl>
        <StockBadge $inStock={inStock}>
          {inStock ? `In Stock · ${stock}` : "Out of Stock"}
        </StockBadge>
      </BsImg>

      {/* ── BODY ── */}
      <BsBody>
        <BsTop>
          <BsSku>{sku}</BsSku>
          <BsPrice><sup>₹</sup>{formattedPrice}</BsPrice>
        </BsTop>

        <BsTitle>{name}</BsTitle>
        <BsMaterial>{material}</BsMaterial>
        <BsDesc>{description}</BsDesc>

        <BsTags>
          <BsBadge>Cosmetic Grade</BsBadge>
          <BsTag>{material}</BsTag>
          {inStock && <BsTag>Ready to Ship</BsTag>}
        </BsTags>


        {/* CART BUTTON */}

        <div style={{ marginTop: "14px" }}>

          {qty === 0 ? (

            <button
              style={{
                width: "100%",
                padding: "10px",
                background: "#e63018",
                color: "#fff",
                border: "none",
                fontSize: "11px",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                cursor: "pointer"
              }}
              onClick={(e) => {
                e.stopPropagation()
                addToCart(product.id, product.name, product.price)
              }}
            >
              Add To Cart
            </button>

          ) : (

            <div style={{
              display: "flex",
              justifyContent: "center",
              gap: "14px",
              alignItems: "center",
              marginTop: "6px"
            }}>

              <button
                onClick={(e) => {
                  e.stopPropagation()
                  decreaseQty(product.id)
                }}
              >
                −
              </button>

              <span>{qty}</span>

              <button
                onClick={(e) => {
                  e.stopPropagation()
                  increaseQty(product.id)
                }}
              >
                +
              </button>

            </div>

          )}

        </div>
      </BsBody>

    </BsCard>
  );
}