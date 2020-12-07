import React from "react";
import { create } from "react-test-renderer";
import { act } from "react-test-renderer";

import { unmountComponentAtNode } from "react-dom";
const Login = require("./Login");

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

act(() => {
  const getUserInfo = (userInfo) => {
    console.log(userInfo);
    setUserInfo(userInfo);
  };

  <Login getUserInfo />;
});

//if no props are passed into our login React component then we'll see this error displayed as the text
expect(container.textContent).toBe("Something went wrong, please try again");

act(() => {
  const getUserInfo = (userInfo) => {
    console.log(userInfo);
    setUserInfo(userInfo);
  };

  <Login getUserInfo={getUserInfo} />;
});

expect(container.Login);

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});
