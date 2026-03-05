import styled from "styled-components";

const Card = styled.div`
  background: var(--s2);
  border: 1px solid rgba(240, 92, 30, 0.12);
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  transition: border-color 0.2s ease, transform 0.2s ease;

  &:hover {
    border-color: rgba(240, 92, 30, 0.4);
    transform: translateY(-2px);
  }
`;

const Stars = styled.div`
  display: flex;
  gap: 6px;
`;

const Star = styled.div`
  width: 10px;
  height: 10px;
  background: var(--or);
  clip-path: polygon(
    50% 0%,
    61% 35%,
    98% 35%,
    68% 57%,
    79% 91%,
    50% 70%,
    21% 91%,
    32% 57%,
    2% 35%,
    39% 35%
  );
`;

const Quote = styled.p`
  font-size: 16px;
  line-height: 1.65;
  color: #ccc;
  flex: 1;
  margin: 0;
`;

const AuthorRow = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

const Avatar = styled.div`
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

const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const AuthorName = styled.div`
  font-family: var(--ff-cond);
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 0.04em;
  color: var(--wh);
`;

const STATUS_COLORS = {
  good: { bg: "rgba(34, 197, 94, 0.12)", text: "#51e086", border: "rgba(34,197,94,0.3)" },
  bad:  { bg: "rgba(239, 68, 68, 0.12)",  text: "#ef4444", border: "rgba(239,68,68,0.3)"  },
  neutral: { bg: "rgba(240, 92, 30, 0.12)", text: "var(--or)", border: "rgba(240,92,30,0.3)" },
};

const StatusBadge = styled.span`
  display: inline-block;
  padding: 6px 10px;
  border-radius: 2px;
  font-size: 10px;
  font-family: var(--ff-cond);
  font-weight: 700;
  letter-spacing: 0.1em;
  margin-top: 10px;
  text-transform: uppercase;
  background: ${({ $status }) => (STATUS_COLORS[$status] || STATUS_COLORS.neutral).bg};
  color: ${({ $status }) => (STATUS_COLORS[$status] || STATUS_COLORS.neutral).text};
  border: 1px solid ${({ $status }) => (STATUS_COLORS[$status] || STATUS_COLORS.neutral).border};
`;

export default function ReviewCard({ quote, name, status }) {
  return (
    <Card className="rev-card rv">
      <Stars>
        {[1, 2, 3, 4, 5].map((i) => (
          <Star key={i} className="rev-star" />
        ))}
      </Stars>
      <Quote>{quote}</Quote>
      <AuthorRow>
        <Avatar>{name?.[0]?.toUpperCase()}</Avatar>
        <AuthorInfo>
          <AuthorName>{name}</AuthorName>
          {status && (
            <StatusBadge $status={status}>{status}</StatusBadge>
          )}
        </AuthorInfo>
      </AuthorRow>
    </Card>
  );
}