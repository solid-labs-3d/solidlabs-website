import styled, { createGlobalStyle } from "styled-components"
import { FaInstagram, FaYoutube, FaWhatsapp, FaLinkedin } from "react-icons/fa"

/* ───────────────── FOOTER ───────────────── */

const FooterWrap = styled.footer`
  background: var(--blk);
  border-top: 1px solid var(--s2);
`

const FooterInner = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 60px;
  padding: 80px 48px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 40px;
    padding: 60px 32px;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 28px;
    padding: 44px 20px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 24px;
    padding: 36px 16px;
  }
`

const FootCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`

const FootTitle = styled.div`
  font-family: var(--ff-mono);
  font-size: 12px;
  letter-spacing: .2em;
  text-transform: uppercase;
  color: var(--wht);
`

const FootLink = styled.a`
  font-family: var(--ff-cond);
  font-weight: 700;
  font-size: 10px;
  color: var(--g3);
  text-decoration: none;
  transition: .2s ease;

  &:hover {
    color: var(--or);
  }
`

const FootBottom = styled.div`
  border-top: 1px solid var(--s2);
  padding: 22px 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 1024px) {
    padding: 20px 32px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    padding: 20px 20px;
  }

  @media (max-width: 480px) {
    padding: 18px 16px;
    gap: 14px;
  }
`

const Copy = styled.div`
  font-size: 11px;
  color: var(--g3);
  font-family: var(--ff-mono);
  letter-spacing: .08em;

  @media (max-width: 480px) {
    font-size: 10px;
    white-space: normal;
    line-height: 1.6;
  }
`

const BottomRight = styled.div`
  display: flex;
  align-items: center;
  gap: 28px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 14px;
    width: 100%;
  }
`

const BottomLinks = styled.div`
  display: flex;
  gap: 22px;

  @media (max-width: 480px) {
    flex-wrap: wrap;
    gap: 12px;
  }
`

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
`

/* ───────────────── SOCIAL ICONS ───────────────── */

const SocialIcons = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;

  @media (max-width: 480px) {
    gap: 20px;
  }
`

const IconLink = styled.a`
  color: var(--or);
  font-size: 16px;
  opacity: .7;
  transition: all .2s ease;

  &:hover {
    opacity: 1;
    transform: translateY(-2px);
  }
`

/* ───────────────── COMPONENT ───────────────── */

export default function Footer() {
  return (
    <FooterWrap>
      <FooterInner>

        {/* PRODUCTS */}
        <FootCol>
          <FootTitle>PRODUCTS</FootTitle>
          <FootLink href="/originals">SL Originals</FootLink>
          <FootLink href="/precision">Precision B2B</FootLink>
          <FootLink href="/extreme">Extreme Eng</FootLink>
          <FootLink href="/carbonation">Carbonation</FootLink>
          <FootLink href="/greenloop">Green Loop</FootLink>
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
          <FootLink href="/how-it-works">How It Works</FootLink>
          <FootLink href="/evidence">Field Evidence</FootLink>
        </FootCol>

        {/* COMPANY */}
        <FootCol>
          <FootTitle>COMPANY</FootTitle>
          <FootLink href="/about">About Us</FootLink>
          <FootLink href="#">Brand Theory</FootLink>
          <FootLink href="/stream">Watch Us Live</FootLink>
        </FootCol>

      </FooterInner>

      <FootBottom>
        <Copy>
          © {new Date().getFullYear()} SOLID LABS — BUILT WITHOUT COMPROMISE
        </Copy>

        <BottomRight>
          <SocialIcons>
            <IconLink href="#" target="_blank">
              <FaInstagram />
            </IconLink>
            <IconLink href="#" target="_blank">
              <FaLinkedin />
            </IconLink>
            <IconLink href="#" target="_blank">
              <FaYoutube />
            </IconLink>
            <IconLink href="#" target="_blank">
              <FaWhatsapp />
            </IconLink>
          </SocialIcons>
          <BottomLinks>
            <MiniLink href="#">Privacy</MiniLink>
            <MiniLink href="#">Terms</MiniLink>
          </BottomLinks>
        </BottomRight>
      </FootBottom>
    </FooterWrap>
  )
}