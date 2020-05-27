import React from "react";
import styled from "styled-components";
import colors from "@codedrops/react-ui";
import Filters from "./posts/Filters";
import Logo from "../assets/code-drops";

const StyledHeader = styled.header`
  display: flex;
  position: sticky;
  z-index: 10;
  top: 0;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  max-width: 1110px;
  width: 98%;
  margin: 0 auto;
  h2 {
    font-family: Font1;
    font-size: 2rem;
    color: ${colors.slate};
    margin-right: 60px;
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
    h2 {
      margin-right: 0px;
    }
  }
`;

const Header = () => (
  <StyledHeader>
    <Logo />
    {/* <span className="code custom-header">Code</span>drops */}

    <Filters />
  </StyledHeader>
);

export default Header;
