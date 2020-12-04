import React, { useState } from "react";
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
  const [userInfo, setUserInfo] = useState(null);

  const getUserInfo = (userInfo) => {
    console.log(userInfo);
    setUserInfo(userInfo);
  };

  return (
    <div className="main-component">
      <Router>
        <Switch>
          <Route path="/login" exact>
            <Login getUserInfo={getUserInfo} />
          </Route>
          <Route path="/homepage" exact>
            <Homepage userInfo={userInfo} />
          </Route>
          <Redirect to="/login" />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
