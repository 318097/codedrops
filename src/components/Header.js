import React from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import Filters from "./posts/Filters";
import Logo from "../assets/logo-v3";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import colors from "@codedrops/react-ui";

const StyledHeader = styled.header`
  display: flex;
  position: sticky;
  z-index: 10;
  top: 0;
  justify-content: space-between;
  align-items: center;
  padding: 4px 0 6px;
  background: ${colors.bg};
  /* background: url("../assets/background/grey.png"); */
`;

const Header = ({ location, session }) => {
  return (
    <StyledHeader>
      <Logo />
      {location.pathname === "/posts" && <Filters />}
      {session && (
        <div className="ml">
          <Avatar icon={<UserOutlined />} />
        </div>
      )}
    </StyledHeader>
  );
};

export default withRouter(Header);
