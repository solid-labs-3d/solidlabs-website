import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { SectionHeader } from "../Shared";

/* ───────────────── SHARED SECTION PAD ───────────────── */

const SecPad = styled.section`
  padding: 72px 48px;
  background: ${({ $bg }) => $bg || "var(--blk)"};
`;

/* ───────────────── HOW IT WORKS ───────────────── */

const HowHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 48px;
`;

const BtnFullGuide = styled.button`
  background: transparent;
  border: 1px solid var(--or);
  color: var(--or);
  padding: 8px 18px;
  font-family: var(--ff-mono);
  font-size: 9px;
  letter-spacing: .14em;
  text-transform: uppercase;
  cursor: pointer;
  transition: border-color .2s, color .2s;
  white-space: nowrap;
`;

const HowSteps = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 55px;
    left: 10%;
    right: 10%;
    height: 2px;
    background: var(--or);
    z-index: 0;
  }
`;

const HowStep = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  z-index: 1;
  width: 20%;
`;

const HowIcon = styled.div`
  width: 110px;
  height: 110px;
  background: var(--s1);
  border: 1px solid var(--s2);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  transition: border-color .2s, background .2s;

  ${HowStep}:hover & {
    border-color: var(--or);
    background: var(--s3);
  }
`;

const HowStepN = styled.div`
  font-family: var(--ff-mono);
  font-size: 8px;
  letter-spacing: .2em;
  text-transform: uppercase;
  color: var(--or);
  margin-bottom: 8px;
`;

const HowStepT = styled.div`
  font-family: var(--ff-cond);
  font-weight: 800;
  font-size: 18px;
  margin-bottom: 6px;
`;

const HowStepD = styled.p`
  font-size: 11.5px;
  color: var(--g5);
  line-height: 1.65;
  max-width: 130px;
`;

/* ───────────────── ABOUT ───────────────── */

const AboutHome = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 75vh;
  border-bottom: 1px solid var(--s2);
`;

const AbL = styled.div`
  background: var(--or);
  padding: 56px 52px 52px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 32px;
`;

const AbEyebrow = styled.div`
  font-family: var(--ff-mono);
  font-size: 8px;
  letter-spacing: .2em;
  text-transform: uppercase;
  color: rgba(0,0,0,.45);
`;

const AbBig = styled.div`
  font-family: var(--ff-cond);
  font-weight: 900;
  font-size: clamp(36px,4.8vw,68px);
  line-height: .92;
  color: var(--blk);
  text-transform: uppercase;
  white-space: pre-line;
`;

const AbFounded = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const AbYear = styled.div`
  font-family: var(--ff-cond);
  font-weight: 900;
  font-size: clamp(40px,5vw,64px);
  color: var(--blk);
  line-height: 1;
`;

const AbFl = styled.div`
  font-family: var(--ff-mono);
  font-size: 8px;
  letter-spacing: .18em;
  text-transform: uppercase;
  color: rgba(0,0,0,.4);
`;

const AbR = styled.div`
  background: var(--s1);
  padding: 56px 52px 52px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const AbBody = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding-top: 8px;
`;

const AbTxt = styled.p`
  font-size: 15px;
  line-height: 1.85;
  color: var(--g5);
  margin: 0;

  strong {
    color: var(--wht);
    font-weight: 600;
  }
`;

const StatsRow = styled.div`
  display: flex;
  gap: 40px;
  border-top: 1px solid var(--s2);
  padding-top: 28px;
  margin-top: 48px;
  flex-wrap: wrap;
`;

const SiItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const SiN = styled.div`
  font-family: var(--ff-cond);
  font-weight: 900;
  font-size: 40px;
  color: var(--wht);
  line-height: 1;
`;

const SiPlus = styled.span`
  color: var(--or);
  font-size: 36px;
`;

const SiL = styled.div`
  font-family: var(--ff-mono);
  font-size: 7.5px;
  letter-spacing: .18em;
  text-transform: uppercase;
  color: var(--g3);
`;

/* ───────────────── TESTIMONIALS ───────────────── */

const RevGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3,1fr);
  gap: 24px;
`;

const RevCard = styled.div`
  background: var(--blk);
  padding: 36px 32px;
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const RevStars = styled.div`
  display: flex;
  gap: 4px;
`;

const RevStar = styled.div`
  width: 10px;
  height: 10px;
  background: var(--or);
  clip-path: polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%);
`;

const RevTxt = styled.p`
  font-size: 14px;
  color: var(--g5);
  line-height: 1.75;
  flex: 1;
`;

const RevAuth = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

const RevAvatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--or);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--ff-cond);
  font-weight: 900;
  font-size: 20px;
  color: var(--blk);
  flex-shrink: 0;
`;

const RevName = styled.div`
  font-family: var(--ff-cond);
  font-weight: 700;
  font-size: 15px;
  color: var(--wht);
`;

const RevRole = styled.div`
  font-family: var(--ff-mono);
  font-size: 8px;
  letter-spacing: .14em;
  text-transform: uppercase;
  color: var(--g3);
`;

/* ───────────────── DATA ───────────────── */

const HOW_STEPS = [
  { n:"01", t:"Upload File", d:"Send your STL, STEP, or describe what you need via WhatsApp." },
  { n:"02", t:"Get Quote", d:"We respond with price, lead time, and material options within 2 hours." },
  { n:"03", t:"We Print", d:"Your part is sliced, printed, and quality-checked against spec." },
  { n:"04", t:"QC Check", d:"Every part is measured with digital calipers." },
  { n:"05", t:"Delivered", d:"Packaged and dispatched same day if confirmed before 2pm IST." },
];

const TESTIMONIALS = [
  { quote:"SolidLabs turned our CAD into working prototypes overnight.", name:"Arjun Mehta", role:"CTO · Robotics Startup" },
  { quote:"Tolerances were bang on for our PCB enclosures.", name:"Priya Nair", role:"Hardware Lead · IoT Company" },
  { quote:"Every single one passed QC.", name:"Dr. Venkat R.", role:"Research Engineer · IISc" },
];

/* ───────────────── COMPONENT ───────────────── */

export default function InfoSection() {
  const nav = useNavigate();

  return (
    <>
      <SecPad>
        <HowHeader>
          <SectionHeader title="How It Works" />
          <BtnFullGuide onClick={() => nav("/how-it-works")}>
            FULL GUIDE →
          </BtnFullGuide>
        </HowHeader>

        <HowSteps>
          {HOW_STEPS.map((s) => (
            <HowStep className="rv" key={s.n}>
              <HowIcon />
              <HowStepN>{s.n}</HowStepN>
              <HowStepT>{s.t}</HowStepT>
              <HowStepD>{s.d}</HowStepD>
            </HowStep>
          ))}
        </HowSteps>
      </SecPad>

      <AboutHome>
        <AbL>
          <AbEyebrow>SOLIDLABS · SINCE 2024</AbEyebrow>
          <AbBig>
            EVERY SOLID OBJECT STARTED AS AN IDEA. WE CLOSE THAT GAP.
          </AbBig>
          <AbFounded>
            <AbYear>2024</AbYear>
            <AbFl>FOUNDED · BENGALURU GARAGE</AbFl>
          </AbFounded>
        </AbL>

        <AbR>
          <AbBody>
            <AbTxt>
              SolidLabs is a focused precision workshop.
              <strong> We make things — properly.</strong>
            </AbTxt>
          </AbBody>

          <StatsRow>
            {[{ n:"5",s:"+",l:"PRINTERS" },
              { n:"15",s:"+",l:"CLIENTS" },
              { n:"5",s:"+",l:"TEAM" },
              { n:"7K",s:"+",l:"PARTS" }].map((s) => (
              <SiItem key={s.l}>
                <SiN>{s.n}<SiPlus>{s.s}</SiPlus></SiN>
                <SiL>{s.l}</SiL>
              </SiItem>
            ))}
          </StatsRow>
        </AbR>
      </AboutHome>

      <SecPad $bg="var(--s1)">
        <SectionHeader title="What Clients Say" />
        <RevGrid>
          {TESTIMONIALS.map((r) => (
            <RevCard key={r.name}>
              <RevStars>{[1,2,3,4,5].map(i => <RevStar key={i} />)}</RevStars>
              <RevTxt>{r.quote}</RevTxt>
              <RevAuth>
                <RevAvatar>{r.name[0]}</RevAvatar>
                <div>
                  <RevName>{r.name}</RevName>
                  <RevRole>{r.role}</RevRole>
                </div>
              </RevAuth>
            </RevCard>
          ))}
        </RevGrid>
      </SecPad>
    </>
  );
}