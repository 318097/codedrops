import React from "react";
import styled from "styled-components";
import colors from "@bit/ml318097.mui.colors";

const StyledHeader = styled.header`
  display: flex;
  position: sticky;
  z-index: 10;
  top: 0;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  h2 {
    font-family: Font1;
    font-size: 2rem;
    color: ${colors.gray};
    .code {
      color: ${colors.slate};
      font-size: 2.4rem;
      &:after {
        bottom: 6px;
      }
    }
  }
  @media (max-width: 480px) {
    flex-direction: column;
    padding-bottom: 12px;
  }
`;

const Header = () => (
  <StyledHeader>
    <h2>
      <span className="code custom-header">Code</span>drops
    </h2>
  </StyledHeader>
);

export default Header;
