import React from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import colors from "@codedrops/react-ui";

import Filters from "./posts/Filters";
import Logo from "../assets/logo-v3";

const StyledHeader = styled.header`
  display: flex;
  position: sticky;
  z-index: 10;
  top: 0;
  justify-content: space-around;
  align-items: center;
  padding: 4px 0 6px;
  /* background: white; */
  width: 98%;
  margin: 0 auto;
  /* h2 {
    font-size: 2rem;
    color: ${colors.slate};
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
    h2 {
      margin-right: 0px;
    }
  } */
`;

const Header = ({ location }) => {
  return (
    <StyledHeader>
      <Logo />
      {/* <span className="code custom-header">Code</span>drops */}

      {location.pathname === "/posts" && <Filters />}
    </StyledHeader>
  );
};

export default withRouter(Header);
