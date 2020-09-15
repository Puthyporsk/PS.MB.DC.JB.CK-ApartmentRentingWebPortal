import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import Homepage from "./Homepage/Homepage";
import Login from "./Login/Login";
import "./App.css";

const App = () => {
  return (
    <div className="main-component">
      <Router>
        <Switch>
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/homepage" exact>
            <Homepage />
          </Route>
          <Redirect to="/login" />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
