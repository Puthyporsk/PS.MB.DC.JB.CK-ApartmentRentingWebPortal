import Reach from "react";
import {create} from "react-test-renderer";

import { render, unmountComponentAtNode } from "react-dom";
import ApartmentModal from "./ApartmentModal";
const login = require('./ApartmentModal');

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

act(() => {
    render(<ApartmentModal/>, container);
});

expect(container.textContent).toBe("");

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });