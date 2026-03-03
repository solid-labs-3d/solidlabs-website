import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";

/* ───────────────── ROTATION ANIMATION ───────────────── */

const rotate1 = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const rotate2 = keyframes`
  from { transform: rotate(90deg); }
  to { transform: rotate(450deg); }
`;

/* ───────────────── WRAPPER ───────────────── */

const Support = styled.section`
  padding: 120px 48px 0;
  background: var(--blk);
  display: flex;
  flex-direction: column;
`;

/* ───────────────── TOP AREA ───────────────── */

const SupportTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 80px;
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
`;

const Eyebrow = styled.div`
  font-family: var(--ff-mono);
  font-size: 8px;
  letter-spacing: .2em;
  text-transform: uppercase;
  color: var(--or);
  margin-bottom: 20px;
`;

const BigText = styled.h2`
  font-family: var(--ff-cond);
  font-weight: 900;
  font-size: clamp(80px,10vw,150px);
  line-height: .88;
  letter-spacing: .01em;
  margin: 0;

  span.orange {
    color: var(--or);
    font-style: italic;
  }
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 30px;
  max-width: 320px;
`;

const SupportBtn = styled.button`
  border: 1px solid var(--or);
  background: transparent;
  color: var(--or);
  padding: 10px 22px;
  font-family: var(--ff-mono);
  font-size: 9px;
  letter-spacing: .14em;
  text-transform: uppercase;
  cursor: pointer;
`;

const ClockWrap = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
`;

const ClockCircle = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 4px solid var(--or);
  position: relative;
`;

const Hand1 = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 40px;
  height: 3px;
  background: #f0ede6;
  transform-origin: left center;
  animation: ${rotate1} 6s linear infinite;
`;

const Hand2 = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 60px;
  height: 2px;
  background: #f0ede6;
  transform-origin: left center;
  animation: ${rotate2} 6s linear infinite;
`;

const CenterDot = styled.div`
  position: absolute;
  width: 8px;
  height: 8px;
  background: var(--or);
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Desc = styled.p`
  font-size: 12px;
  color: var(--g3);
  line-height: 1.7;
  text-align: right;
`;

/* ───────────────── GRID ───────────────── */

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4,1fr);
  gap: 1px;
  background: var(--s2);
`;

const Card = styled.div`
  background: var(--s1);
  padding: 48px 36px;
  display: flex;
  flex-direction: column;
`;

const CardTitle = styled.div`
  font-family: var(--ff-cond);
  font-weight: 800;
  font-size: 20px;
  color: var(--wht);
  margin-bottom: 10px;
`;

const CardDesc = styled.div`
  font-size: 13px;
  color: var(--g5);
  line-height: 1.7;
  flex: 1;
  margin-bottom: 30px;
`;

const CardFooter = styled.div`
  font-family: var(--ff-mono);
  font-size: 9px;
  letter-spacing: .14em;
  color: var(--or);
  border-top: 1px solid var(--s2);
  padding-top: 15px;
`;

/* ───────────────── COMPONENT ───────────────── */

export default function SupportSection() {
  const nav = useNavigate();

  return (
    <Support>

      <SupportTop>
        <Left>
          <Eyebrow>ALWAYS ON · SUPPORT</Eyebrow>
          <BigText>
            ANYDAY,<br />
            <span className="orange">ANYTIME</span><br />
            WE ARE<br />
            HERE.
          </BigText>
        </Left>

        <Right>
          <SupportBtn onClick={() => nav("/learn")}>
            EXTENDED SUPPORT →
          </SupportBtn>

          <ClockWrap>
            <ClockCircle>
              <Hand1 />
              <Hand2 />
              <CenterDot />
            </ClockCircle>
          </ClockWrap>

          <Desc>
            We don't clock out. When you need us — before a launch,
            after midnight, over the weekend — we're here.
          </Desc>
        </Right>
      </SupportTop>

      <Grid>
        <Card>
          <CardTitle>Extended Hours</CardTitle>
          <CardDesc>
            Far beyond standard business hours. We're available throughout your project at every stage.
          </CardDesc>
          <CardFooter>Mon–Sat · 8am – 10pm IST</CardFooter>
        </Card>

        <Card>
          <CardTitle>Direct Response</CardTitle>
          <CardDesc>
            No ticketing hell. A real engineer who knows your project responds within the hour.
          </CardDesc>
          <CardFooter>Avg response · &lt;60 min</CardFooter>
        </Card>

        <Card>
          <CardTitle>Free Revisions</CardTitle>
          <CardDesc>
            If a print doesn't meet spec, we reprint it. No questions, no extra charges.
          </CardDesc>
          <CardFooter>Reprints within · 12 hours</CardFooter>
        </Card>

        <Card>
          <CardTitle>Pan-India Reach</CardTitle>
          <CardDesc>
            Shipping to every pin code. Same-day dispatch for orders confirmed before 2pm IST.
          </CardDesc>
          <CardFooter>Same day dispatch · Before 2pm</CardFooter>
        </Card>
      </Grid>

    </Support>
  );
}