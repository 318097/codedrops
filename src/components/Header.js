/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import Filters from "./posts/Filters";
import Logo from "../assets/logo-v3";
import {
  UserOutlined,
  BookOutlined,
  LogoutOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import colors from "@codedrops/react-ui";
import _ from "lodash";
import { setSession } from "../store/app/actions";
import { connect } from "react-redux";

const StyledHeader = styled.header`
  display: flex;
  position: sticky;
  z-index: 10;
  top: 0;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  background: ${colors.bg};
  /* background: url("../assets/background/grey.png"); */
  .user-info {
    margin: 0 4px;
    background: ${colors.strokeTwo};
    padding: 0px 12px 0 2px;
    border-radius: 20px;
  }
`;

const Header = ({ location, session, history, setSession }) => {
  const logout = () => {
    localStorage.clear();
    setSession(null);
  };

  return (
    <StyledHeader>
      <a onClick={() => history.push("/posts")}>
        <Logo />
      </a>
      {location.pathname === "/posts" && <Filters />}
      {session ? (
        <div className="ml fcc">
          <BookOutlined
            onClick={() => history.push("/bookmarks")}
            className="icon icon-bg icon-md"
          />
          <div className="user-info fcc">
            <UserOutlined className="icon icon-md" />
            <span>{_.get(session, "name", "")}</span>
          </div>
          <LogoutOutlined onClick={logout} className="icon icon-bg icon-md" />
        </div>
      ) : (
        <LoginOutlined
          className="icon icon-bg icon-md"
          onClick={() => history.push("/login")}
        />
      )}
    </StyledHeader>
  );
};

export default connect(null, { setSession })(withRouter(Header));
