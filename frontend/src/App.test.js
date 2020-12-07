import React from "react";
import { render, renderHook, act } from "@testing-library/react";
import App from "./App";
import { MemoryRouter } from "react-router";
import Homepage from "./Homepage/Homepage";
import Login from "./Login/Login";

import { shallow, configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

test("Unkown path should redirect to login", () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={["/testRoute"]}>
      <App />
    </MemoryRouter>
  );
  expect(wrapper.find(Login)).toHaveLength(1);
  expect(wrapper.find(Homepage)).toHaveLength(0);
});
