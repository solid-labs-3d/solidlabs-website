import styled from "styled-components";

/* ───────────────── FOOTER ───────────────── */

const FooterWrap = styled.footer`
  background: var(--blk);
  border-top: 1px solid var(--s2);
`;

const FooterInner = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 60px;
  padding: 80px 48px;
`;

const FootCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const FootTitle = styled.div`
  font-family: var(--ff-mono);
  font-size: 12px;
  letter-spacing: .2em;
  text-transform: uppercase;
  color:var(--wht) ;
`;

const FootLink = styled.a`
  font-family: var(--ff-cond);
  font-weight: 700;
  font-size: 10px;
  color:var(--g3);
  text-decoration: none;
  transition: .2s ease;

  &:hover {
    color: var(--or);
  }
`;

const FootBottom = styled.div`
  border-top: 1px solid var(--s2);
  padding: 22px 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Copy = styled.div`
  font-size: 11px;
  color: var(--g3);
  font-family: var(--ff-mono);
  letter-spacing: .08em;
`;

const BottomLinks = styled.div`
  display: flex;
  gap: 22px;
`;

const MiniLink = styled.a`
  font-family: var(--ff-mono);
  font-size: 10px;
  letter-spacing: .12em;
  text-transform: uppercase;
  color: var(--g4);
  text-decoration: none;

  &:hover {
    color: var(--or);
  }
`;

/* ───────────────── COMPONENT ───────────────── */

export default function Footer() {
  return (
    <FooterWrap>
      <FooterInner>

        {/* PRODUCTS */}
        <FootCol>
          <FootTitle>PRODUCTS</FootTitle>
          <FootLink href="#">SL Originals</FootLink>
          <FootLink href="#">Precision B2B</FootLink>
          <FootLink href="#">Extreme Eng</FootLink>
          <FootLink href="#">Carbonation</FootLink>
          <FootLink href="#">Green Loop</FootLink>
        </FootCol>

        {/* SUPPORT */}
        <FootCol>
          <FootTitle>SUPPORT</FootTitle>
          <FootLink href="#">LinkedIn</FootLink>
          <FootLink href="#">Instagram</FootLink>
          <FootLink href="#">WhatsApp</FootLink>
          <FootLink href="#">YouTube</FootLink>
        </FootCol>

        {/* WHAT WE DO DIFFERENTLY */}
        <FootCol>
          <FootTitle>WHAT WE DO DIFFERENTLY</FootTitle>
          <FootLink href="#">How It Works</FootLink>
          <FootLink href="#">Field Evidence</FootLink>
        </FootCol>

        {/* COMPANY */}
        <FootCol>
          <FootTitle>COMPANY</FootTitle>
          <FootLink href="#">About Us</FootLink>
          <FootLink href="#">Brand Theory</FootLink>
          <FootLink href="#">Watch Us Live</FootLink>
        </FootCol>

      </FooterInner>

      <FootBottom>
        <Copy>
          © {new Date().getFullYear()} SOLID LABS — BUILT WITHOUT COMPROMISE
        </Copy>

        <BottomLinks>
          <MiniLink href="#">Privacy</MiniLink>
          <MiniLink href="#">Terms</MiniLink>
        </BottomLinks>
      </FootBottom>
    </FooterWrap>
  );
}