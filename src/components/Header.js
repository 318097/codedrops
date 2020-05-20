import React from "react";
import styled from "styled-components";
import colors from "@ml318097/react-ui";
import Filters from "./posts/Filters";

const StyledHeader = styled.header`
  display: flex;
  position: sticky;
  z-index: 10;
  top: 0;
  justify-content: space-around;
  align-items: center;
  padding: 8px 16px;
  h2 {
    font-family: Font1;
    font-size: 2rem;
    color: ${colors.slate};
    font-weight: bold;
    .code {
      font-weight: bold;
      font-family: inherit;
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
    align-items: center;
    justify-content: center;
  }
`;

const Header = () => (
  <StyledHeader>
    <h2>
      <span className="code custom-header">Code</span>drops
    </h2>
    <Filters />
  </StyledHeader>
);

export default Header;
