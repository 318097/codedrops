/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { withRouter, Link } from "react-router-dom";
import styled from "styled-components";
import Filters from "./posts/Filters";
import Logo from "../assets/logo-v3";
import {
  UserOutlined,
  BookOutlined,
  LogoutOutlined,
  LoginOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import colors, { Icon } from "@codedrops/react-ui";
import { get } from "lodash";
import { setSession } from "../store/app/actions";
import { connect } from "react-redux";
import axios from "axios";

import QuickBall from "./QuickBall";

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
    background: ${colors.strokeOne};
    padding: 0px 12px 0 2px;
    border-radius: 2px;
    .anticon {
      padding: 5px 8px 5px 4px;
    }
  }
  @media screen and (max-width: 600px) {
    .logo {
      position: relative;
      flex-shrink: 0;
      top: 4px;
      svg {
        width: 80%;
      }
    }
    .user-info {
      display: none !important;
    }
    .filters {
      .search-input {
        width: 100px !important;
      }
      .show-count {
        display: none;
        font-size: 1.4rem;
      }
    }
  }
`;

const Header = ({
  location,
  session,
  setSession,
  toggleQuickBall,
  quickBallStatus,
}) => {
  const logout = () => {
    localStorage.clear();
    setSession(null);
    axios.defaults.headers.common["authorization"] = null;
  };

  return (
    <StyledHeader>
      <Link className="logo" to={"/posts"}>
        <Logo />
      </Link>
      {location.pathname === "/posts" && <Filters />}

      <div className="fcc">
        <Link to="/posts">
          <HomeOutlined className="ant-icon" />
        </Link>
        <div className="quick-ball">
          <Icon
            id="quick-ball-icon"
            className="ant-icon"
            type="menu"
            hover
            onClick={() => toggleQuickBall(!quickBallStatus)}
          />
          {quickBallStatus && <QuickBall toggleQuickBall={toggleQuickBall} />}
        </div>
        {session ? (
          <>
            <Link to="/bookmarks">
              <BookOutlined className="ant-icon" />
            </Link>
            <div className="user-info fcc">
              <UserOutlined className="ant-icon no-hover" />
              <span>{get(session, "name", "")}</span>
            </div>
            <LogoutOutlined onClick={logout} className="ant-icon" />
          </>
        ) : (
          <Link to="/login">
            <LoginOutlined className="ant-icon" />
          </Link>
        )}
      </div>
    </StyledHeader>
  );
};

export default connect(null, { setSession })(withRouter(Header));
