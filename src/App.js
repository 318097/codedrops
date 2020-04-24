import React from "react";
import { Switch, BrowserRouter, Route } from "react-router-dom";
import Home from "./components/Home";
import "./App.scss";

const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <Switch>
          <Route exact path="/home" component={Home} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
