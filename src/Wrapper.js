import styled from "styled-components";

export default function Wrapper({ children, wide }) {
  return (
    <WrapperBackground>
      <WrapperContent wide={wide}>{children}</WrapperContent>
    </WrapperBackground>
  );
}

const WrapperBackground = styled.div`
  min-height: 100vh;
`;

const WrapperContent = styled.main`
  margin: 0 auto;
  max-width: ${props => (props.wide ? "1200px" : "800px")};
  padding: 64px 32px;

  @media (max-width: 500px) {
    max-width: unset;
    width: 100%;
    padding: 24px 16px;
  }
`;
