import React from "react";
import axios from "axios";
import { Switch, BrowserRouter, Route } from "react-router-dom";
import "./App.scss";
import config from "./config";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Posts from "./components/posts/Posts";
import PostView from "./components/posts/PostView";
import { Icon } from "@codedrops/react-ui";

axios.defaults.baseURL = config.SERVER_URL;

const App = () => {
  return (
    <div className="app">
      <Header />
      {/* <div className="content"> */}
      <BrowserRouter>
        <Switch>
          <Route exact path="/home" component={Home} />
          <Route exact path="/" component={Posts} />
          <Route exact path="/:id" component={PostView} />
          {/* <Route component={PageNotFound} /> */}
        </Switch>
      </BrowserRouter>
      {/* </div> */}
      <Footer />
      <Icon className="code-icon" type="coding" />
    </div>
  );
};

export default App;
