import React, { useEffect, useState } from "react";
import axios from "axios";
import { Switch, BrowserRouter, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Icon } from "@codedrops/react-ui";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Bookmarks from "./components/posts/Bookmarks";
import Posts from "./components/posts/Posts";
import Login from "./components/Login";
import Register from "./components/Register";
import PostView from "./components/posts/PostView";
import PageNotFound from "./components/PageNotFound";
import QuickBall from "./components/QuickBall";
import Products from "./components/Products";
import Feedback from "./components/Feedback";

import { fetchTags } from "./store/posts/actions";
import { getToken, hasToken } from "./authService";
import { setSession, toggleQuickBall } from "./store/app/actions";

import "./App.scss";
import config from "./config";
import BMC from "./assets/bmc.png";
import WavesOpacity from "./assets/wavesOpacity.svg";

axios.defaults.baseURL = config.SERVER_URL;
axios.defaults.headers.common["authorization"] = getToken();
axios.defaults.headers.common["external-source"] = "CODEDROPS";

const App = ({
  fetchTags,
  tagList,
  appLoading,
  session,
  setSession,
  toggleQuickBall,
  quickBallStatus,
}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const lastVisited = localStorage.getItem("last-access");
    const now = new Date().getTime();
    if (lastVisited + 86400 < now || !lastVisited)
      localStorage.setItem("last-access", now);
  }, []);

  useEffect(() => {
    const isAccountActive = async () => {
      if (hasToken()) {
        try {
          const token = getToken();
          const { data } = await axios.post(`/auth/account-status`, {
            token,
          });
          setSession({ loggedIn: true, info: "ON_LOAD", ...data });
        } catch (err) {
          console.log("Error:", err);
        } finally {
          setTimeout(() => setLoading(false), 100);
        }
      } else setLoading(false);
    };
    isAccountActive();
  }, []);

  if (loading) return null;

  return (
    <div className="app" id="react-ui">
      <div className="content-wrapper">
        {appLoading && <div className="spinner" />}
        <BrowserRouter>
          <Header session={session} />
          <div
            className="content"
            style={{ position: "relative", zIndex: "1" }}
          >
            <Switch>
              <Route exact path="/" render={() => <Redirect to="/posts" />} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/bookmarks" component={Bookmarks} />
              <Route exact path="/posts" component={Posts} />
              <Route exact path="/feedback" component={Feedback} />
              <Route exact path="/posts/:id" component={PostView} />
              <Route exact path="/products/:id" component={Products} />
              <Route component={PageNotFound} />
            </Switch>
          </div>
          <div className="quick-ball">
            {quickBallStatus ? (
              <QuickBall toggleQuickBall={toggleQuickBall} />
            ) : (
              <Icon
                className="icon quick-ball-icon"
                type="menu"
                onClick={toggleQuickBall}
              />
            )}
          </div>
        </BrowserRouter>
      </div>
      <img alt="Bg" src={WavesOpacity} style={{ position: "absolute" }} />
      {/* <Icon className="code-icon" type="tag" /> */}

      <a
        href="https://www.buymeacoffee.com/codedropstech"
        id="buy-me-a-coffee"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={BMC} alt="Buy Me A Coffee" />
      </a>
      <Footer />
    </div>
  );
};

const mapStateToProps = ({
  posts,
  app: { appLoading, session, quickBallStatus },
}) => ({
  tagList: posts.tags,
  appLoading,
  session,
  quickBallStatus,
});

const mapDispatchToProps = {
  fetchTags,
  setSession,
  toggleQuickBall,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
