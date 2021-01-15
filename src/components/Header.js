import React from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import Filters from "./posts/Filters";
import Logo from "../assets/logo-v3";
import { UserOutlined, BookOutlined } from "@ant-design/icons";
import colors from "@codedrops/react-ui";
import _ from "lodash";

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
  .user-info {
    margin: 0 4px;
    background: ${colors.strokeTwo};
    padding: 0px 12px 0 2px;
    border-radius: 20px;
  }
`;

const Header = ({ location, session }) => {
  return (
    <StyledHeader>
      <Logo />
      {location.pathname === "/posts" && <Filters />}
      {session && (
        <div className="ml fcc">
          <BookOutlined className="icon icon-bg icon-md" />
          <div className="user-info fcc">
            <UserOutlined className="icon icon-md" />
            <span>{_.get(session, "name", "")}</span>
          </div>
        </div>
      )}
    </StyledHeader>
  );
};

export default withRouter(Header);
