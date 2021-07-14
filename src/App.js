import React, { useEffect, useState } from "react";
import axios from "axios";
import { Loading } from "@codedrops/react-ui";
import { connect } from "react-redux";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { handleError, getToken, hasToken } from "./lib";
import Routes from "./routes";

import { fetchTags } from "./store/posts/actions";
import { setSession } from "./store/app/actions";
import tracking from "./lib/mixpanel";

import "./App.scss";
import config from "./config";
import BMC from "./assets/bmc.png";
// import WavesOpacity from "./assets/wavesOpacity.svg";

axios.defaults.baseURL = config.SERVER_URL;
axios.defaults.headers.common["authorization"] = getToken();
axios.defaults.headers.common["external-source"] = "CODEDROPS";

const App = ({ fetchTags, tagList, appLoading, session, setSession }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    tracking.track("INIT", { path: window.location.pathname });
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
        } catch (error) {
          handleError(error);
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
      <Header session={session} />
      <div className="section-wrapper">
        <Routes />
      </div>
      {appLoading && <Loading />}
      {/* <img alt="Bg" src={WavesOpacity} style={{ position: "absolute" }} /> */}
      <a
        href="https://www.buymeacoffee.com/codedropstech"
        id="buy-me-a-coffee"
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => tracking.track("BUY_ME_A_COFFEE")}
      >
        <img src={BMC} alt="Buy Me A Coffee" />
      </a>
      <Footer />
    </div>
  );
};

const mapStateToProps = ({ posts, app: { appLoading, session } }) => ({
  tagList: posts.tags,
  appLoading,
  session,
});

const mapDispatchToProps = {
  fetchTags,
  setSession,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
