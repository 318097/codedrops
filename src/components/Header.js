import React from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
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
  width: 98%;
  margin: 0 auto;
`;

const Header = ({ location }) => {
  return (
    <StyledHeader>
      <Logo />
      {location.pathname === "/posts" && <Filters />}
    </StyledHeader>
  );
};

export default withRouter(Header);
