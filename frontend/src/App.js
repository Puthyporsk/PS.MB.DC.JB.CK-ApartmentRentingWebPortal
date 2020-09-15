import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import Homepage from "./Homepage/Homepage";
import Login from "./Login/Login";

const App = () => {
  return (
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
  );
};

export default App;
