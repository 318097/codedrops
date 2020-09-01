import React, { useEffect } from "react";
import axios from "axios";
import { Switch, BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import "./App.scss";

import config from "./config";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Posts from "./components/posts/Posts";
import PostView from "./components/posts/PostView";
import { Icon } from "@codedrops/react-ui";
import { fetchTags } from "./store/posts/actions";
import WavesOpacity from "./assets/wavesOpacity.svg";

axios.defaults.baseURL = config.SERVER_URL;

const App = ({ fetchTags, tagList, appLoading }) => {
  // useEffect(() => {
  //   if (!tagList.length) fetchTags();
  // }, []);

  return (
    <div className="app" id="react-ui">
      {appLoading && <div className="spinner" />}
      <Header />
      <div className="content" style={{ position: "relative", zIndex: "1" }}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Posts} />
            <Route exact path="/:id" component={PostView} />
            {/* <Route component={PageNotFound} /> */}
          </Switch>
        </BrowserRouter>
      </div>
      <Footer />
      <img alt="Bg" src={WavesOpacity} style={{ position: "absolute" }} />
      <Icon className="code-icon" type="tag" />
    </div>
  );
};

const mapStateToProps = ({ posts, app: { appLoading } }) => ({
  tagList: posts.tags,
  appLoading,
});

const mapDispatchToProps = {
  fetchTags,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
