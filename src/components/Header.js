/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { withRouter, Link } from "react-router-dom";
import styled from "styled-components";
import Filters from "./posts/Filters";
import Logo from "../assets/logo-v3";
import colors, { ProfileDropdown, Icon } from "@codedrops/react-ui";
import { get } from "lodash";
import { setSession } from "../store/app/actions";
import { connect } from "react-redux";
import axios from "axios";
// import MenuDropdown from "../lib/MenuDropdown";
import tracking from "../lib/mixpanel";

const StyledHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 10;
  padding: 8px 0;
  background: ${colors.bg};
  width: 100%;
  margin-bottom: 10px;
  header {
    max-width: 1024px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 96%;
    padding: 0 2%;
    .profile-dropdown .profile-avatar {
      border-color: ${colors.steel};
      &:hover {
        border-color: ${colors.strokeThree};
      }
    }
    @media screen and (max-width: 600px) {
      .logo {
        position: relative;
        flex: 0 0 120px;
        top: 4px;
        svg {
          width: 80%;
        }
      }
      .filters {
        .search-input {
          width: 120px !important;
        }
        .show-count {
          display: none;
          font-size: 1.4rem;
        }
      }
    }
  }
`;

const Header = ({ location, session, setSession, history }) => {
  const logout = () => {
    tracking.track("LOGOUT");
    tracking.reset();
    localStorage.clear();
    setSession(null);
    axios.defaults.headers.common["authorization"] = null;
  };

  const handleItemClick = ({ value }) => {
    if (value === "logout") return logout();
    else {
      tracking.track("CLICK_ACTION", { target: value });
      return history.push(`/${value}`);
    }
  };

  return (
    <StyledHeader>
      <header>
        <Link
          className="logo"
          to={"/posts"}
          onClick={() => tracking.track("CLICK_ACTION", { target: "logo" })}
        >
          <Logo />
        </Link>
        {location.pathname === "/posts" && <Filters />}

        <div className="fcc" style={{ gap: "4px" }}>
          <Link to="/posts">
            <Icon
              type="home"
              onClick={() =>
                tracking.track("CLICK_ACTION", { target: "home icon" })
              }
            />
          </Link>
          {/* <MenuDropdown /> */}
          {session ? (
            <ProfileDropdown
              profileAvatarProps={{ size: 18 }}
              name={get(session, "name", "")}
              email={get(session, "email", "")}
              options={[
                { label: "Bookmarks", value: "bookmarks" },
                {
                  label: "Feedback",
                  value: "feedback",
                },
              ]}
              onItemClick={handleItemClick}
            />
          ) : (
            <Link to="/login">
              <Icon
                type="login"
                onClick={() =>
                  tracking.track("CLICK_ACTION", { target: "login icon" })
                }
              />
            </Link>
          )}
        </div>
      </header>
    </StyledHeader>
  );
};

export default connect(null, { setSession })(withRouter(Header));
