import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Bookmarks from "./components/posts/Bookmarks";
import Posts from "./components/posts/Posts";
import Login from "./components/Login";
import Register from "./components/Register";
import PostView from "./components/posts/PostView";
import PageNotFound from "./lib/PageNotFound";
// import Products from "./components/Products";
import Feedback from "./components/Feedback";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" render={() => <Redirect to="/posts" />} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/bookmarks" component={Bookmarks} />
      <Route exact path="/posts" component={Posts} />
      <Route exact path="/feedback" component={Feedback} />
      <Route exact path="/posts/:id" component={PostView} />
      {/* <Route exact path="/products/:id" component={Products} /> */}
      <Route component={PageNotFound} />
    </Switch>
  );
};

export default Routes;
