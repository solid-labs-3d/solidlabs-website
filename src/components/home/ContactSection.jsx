import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";

/* ───────────────── PROMISE BAR ───────────────── */

const CtaPromise = styled.section`
  background: var(--blk);
  border-top: 1px solid var(--s2);
  border-bottom: 1px solid var(--s2);
`;

const CtaTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 48px;
`;

const CtaTopL = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const CtaEyebrow = styled.div`
  font-family: var(--ff-mono);
  font-size: 8px;
  letter-spacing: .2em;
  text-transform: uppercase;
  color: var(--g3);
`;

const CtaPromiseText = styled.h3`
  font-family: var(--ff-cond);
  font-weight: 900;
  font-size: 54px;
  color: var(--wht);
  line-height: 1.2;
  margin: 0;
  white-space: nowrap;
`;

/* ───────────────── CTA BAND ───────────────── */

const CtaBand = styled.section`
  background: var(--s1);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 80px 48px 100px;
  gap: 24px;
  position: relative;
  overflow: hidden;
`;

const CtaH = styled.h2`
  font-family: var(--ff-cond);
  font-weight: 900;
  font-size: clamp(52px,10vw,116px);
  line-height: .87;
  em { font-style: italic; color: var(--or); }
`;

const CtaS = styled.p`
  font-size: 14px;
  color: var(--g5);
  max-width: 380px;
  line-height: 1.8;
`;

const CtaBtns = styled.div`
  display: flex;
  gap: 14px;
`;

const BtnOr = styled.button`
  font-family: var(--ff-mono);
  font-size: 10px;
  padding: 14px 28px;
  border: none;
  background: var(--or);
  color: var(--blk);
  cursor: pointer;
`;

const BtnGhost = styled.button`
  font-family: var(--ff-mono);
  font-size: 10px;
  padding: 13px 24px;
  border: 1px solid var(--s2);
  color: var(--g5);
  background: transparent;
  cursor: pointer;
`;

/* ───────────────── CONTACT SECTION ───────────────── */

const ContactSec = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: var(--s2);
  gap: 2px;
`;

const ConL = styled.div`
  background: var(--blk);
  padding: 56px;
  display: flex;
  flex-direction: column;
`;

const ConT = styled.h2`
  font-family: var(--ff-cond);
  font-weight: 900;
  font-size: clamp(52px,7vw,86px);
  line-height: .88;
  margin-bottom: 48px;
  color: var(--wht);
`;

const ConDet = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  border-bottom: 1px solid var(--s2);
  padding-bottom: 20px;
  margin-bottom: 20px;
`;

const CdL = styled.div`
  font-family: var(--ff-mono);
  font-size: 8px;
  letter-spacing: .2em;
  text-transform: uppercase;
  color: var(--g3);
`;

const CdV = styled.a`
  font-size: 15px;
  color: var(--wht);
  text-decoration: none;
`;

const CdVSpan = styled.span`
  font-size: 15px;
  color: ${({ $or }) => $or ? "var(--or)" : "var(--wht)"};
`;

const ConNote = styled.p`
  font-size: 13px;
  color: var(--g3);
  line-height: 1.75;
  margin-top: 12px;
`;

const ConR = styled.div`
  background: var(--blk);
  padding: 56px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Fl = styled.label`
  font-family: var(--ff-mono);
  font-size: 8px;
  letter-spacing: .18em;
  text-transform: uppercase;
  color: var(--g3);
`;

const inputBase = css`
  background: var(--s1);
  border: 1px solid var(--s2);
  color: var(--wht);
  padding: 13px 15px;
  font-size: 13px;
  width: 100%;
  &:focus { border-color: var(--or); }
`;

const Fi = styled.input`${inputBase}`;
const Ft = styled.textarea`${inputBase}`;

const Fsub = styled.button`
  font-family: var(--ff-mono);
  padding: 16px 32px;
  background: var(--or);
  color: var(--blk);
  border: none;
  cursor: pointer;
`;

/* ───────────────── COMPONENT ───────────────── */

export default function ContactSection() {
  const nav = useNavigate();

  const goQuote = () => {
    document.getElementById("contact-sec")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <CtaPromise>
        <CtaTop>
          <CtaTopL>
            <CtaEyebrow>OUR PROMISE</CtaEyebrow>
            <CtaPromiseText>
              Anyday, Anytime — we are here to support you, always.
            </CtaPromiseText>
          </CtaTopL>
        </CtaTop>
      </CtaPromise>

      <CtaBand>
        <CtaH>START YOUR <em>BUILD.</em></CtaH>
        <CtaS>
          Upload a file or describe what you need. We respond within 2 hours.
        </CtaS>
        <CtaBtns>
          <BtnOr onClick={goQuote}>SEND A FILE</BtnOr>
          <BtnGhost onClick={() => nav("/contact")}>[EMAIL PROTECTED]</BtnGhost>
        </CtaBtns>
      </CtaBand>

      <ContactSec id="contact-sec">
        <ConL>
          <ConT>GET IN TOUCH</ConT>
          <ConDet>
            <CdL>EMAIL</CdL>
            <CdV href="mailto:hello@solidlabs.in">hello@solidlabs.in</CdV>
          </ConDet>
          <ConDet>
            <CdL>PHONE</CdL>
            <CdV href="https://wa.me/919876543210">+91 98765 43210</CdV>
          </ConDet>
          <ConDet>
            <CdL>LOCATION</CdL>
            <CdVSpan>Bengaluru, Karnataka, India</CdVSpan>
          </ConDet>
          <ConNote>
            You'll hear from a real engineer, not a bot.
          </ConNote>
        </ConL>

        <ConR>
          <Fl>NAME</Fl>
          <Fi placeholder="Your name" />
          <Fl>EMAIL</Fl>
          <Fi placeholder="you@company.com" />
          <Fl>PROJECT BRIEF</Fl>
          <Ft placeholder="Describe your project..." />
          <Fsub>SEND MESSAGE →</Fsub>
        </ConR>
      </ContactSec>
    </>
  );
}