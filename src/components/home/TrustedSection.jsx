import styled from "styled-components";

/* ───────────────── SECTION WRAPPER ───────────────── */

const SecPad = styled.section`
  padding: 120px 48px 100px;
  background: var(--blk);
`;

/* ───────────────── HEADER ───────────────── */

const TbHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 70px;
`;

const TbTitleWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const TbTitle = styled.h2`
  font-family: var(--ff-cond);
  font-weight: 900;
  font-size: clamp(64px,7vw,110px);
  letter-spacing: .01em;
  color: var(--wht);
  margin: 0 0 20px 0;
`;

const TbDivider = styled.div`
  width: 320px;
  height: 1px;
  background: var(--s2);
`;

const TbSub = styled.div`
  font-family: var(--ff-mono);
  font-size: 8px;
  letter-spacing: .2em;
  text-transform: uppercase;
  color: var(--g3);
  margin-top: 12px;
`;

/* ───────────────── GRID ───────────────── */

const TbGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(2, 1fr);
  border: 1px solid var(--s2);
  gap: 1px;
  background: var(--s2);
`;

const TbCell = styled.div`
  background: var(--s1);
  padding: 60px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  text-align: center;
  transition: background .2s ease;

  &:hover {
    background: #111; /* subtle darker hover like screenshot */
  }
`;

const TbName = styled.div`
  font-family: var(--ff-cond);
  font-weight: 800;
  font-size: 18px;
  letter-spacing: .04em;
  color: #8a8f99;
  text-transform: uppercase;
`;

const TbType = styled.div`
  font-family: var(--ff-mono);
  font-size: 7px;
  letter-spacing: .16em;
  text-transform: uppercase;
  color: #5e626b;
`;

/* ───────────────── FOOTER ───────────────── */

const TbFooter = styled.div`
  margin-top: 60px;
  text-align: center;
  font-family: var(--ff-mono);
  font-size: 8px;
  letter-spacing: .22em;
  text-transform: uppercase;
  color: #5e626b;
`;

/* ───────────────── DATA ───────────────── */

const TRUSTED = [
  { n: "CLIENT 01", t: "IOT STARTUP" },
  { n: "CLIENT 02", t: "AERIAL SYSTEMS CO." },
  { n: "CLIENT 03", t: "INDUSTRIAL AUTOMATION CO." },
  { n: "CLIENT 04", t: "D2C HARDWARE BRAND" },
  { n: "CLIENT 05", t: "MEDTECH STARTUP" },
  { n: "CLIENT 06", t: "ROBOTICS TEAM" },
  { n: "CLIENT 07", t: "CONSUMER GOODS CO." },
  { n: "CLIENT 08", t: "TECH COMPANY BLR" },
  { n: "CLIENT 09", t: "ENGINEERING CONSULTANCY" },
  { n: "CLIENT 10", t: "UAV SYSTEMS" },
  { n: "CLIENT 11", t: "DESIGN STUDIO" },
  { n: "CLIENT 12", t: "ROBOTICS COMPETITION" },
];

/* ───────────────── COMPONENT ───────────────── */

export default function TrustedSection() {
  return (
    <SecPad>
      <TbHeader>
        <TbTitleWrap>
          <TbTitle>Trusted By</TbTitle>
          <TbDivider />
        </TbTitleWrap>

        <TbSub>
          CLIENT PORTFOLIO · 340+ COMPANIES
        </TbSub>
      </TbHeader>

      <TbGrid>
        {TRUSTED.map((c) => (
          <TbCell key={c.n}>
            <TbName>{c.n}</TbName>
            <TbType>{c.t}</TbType>
          </TbCell>
        ))}
      </TbGrid>

      <TbFooter>
        340+ CLIENTS · STARTUPS · ENTERPRISES · RESEARCH LABS · D2C BRANDS
      </TbFooter>
    </SecPad>
  );
}