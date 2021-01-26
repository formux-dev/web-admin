import styled from "styled-components";

export default function Section({ title, children }) {
  return (
    <StyledSection>
      <h2>{title}</h2>
      <Scrollable>{children}</Scrollable>
    </StyledSection>
  );
}

const StyledSection = styled.section`
  margin: 64px 0;

  & > h2 {
    margin-bottom: 8px;
  }
`;

const Scrollable = styled.section`
  position: relative;
  overflow-x: auto;
`;
