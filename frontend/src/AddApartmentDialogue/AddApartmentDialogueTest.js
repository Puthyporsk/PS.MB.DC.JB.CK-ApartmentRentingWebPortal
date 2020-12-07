import { render, unmountComponentAtNode } from "react-dom";
import AddApartmentDialogue from "./AddApartmentDialogue";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

act(() => {
    render(<AddApartmentDialogue/>, container);
});

expect(container.textContent).toBe("");

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });