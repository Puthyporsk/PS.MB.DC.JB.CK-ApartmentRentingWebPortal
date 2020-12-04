import React from "react";
import {
  render,
  fireEvent,
  cleanup,
  waitForElement,
} from "@testing-library/react";
import Homepage from "./Homepage";
import ApartmentModal from "../ApartmentModal/ApartmentModal";

import { shallow, configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

describe("Parent Component", () => {
  it("The apartment modal isn't initially rendered", () => {
    const wrapper = shallow(<Homepage />);
    expect(wrapper.containsMatchingElement(<ApartmentModal />)).toEqual(false);
  });
});

test("Testing userinfo prop in Homepage", () => {
  const testUserInfo = {
    id: "1",
    name: "testName",
    email: "test@email.com",
    savedApartments: [],
    type: "test",
  };
  const wrapper = mount(<Homepage userInfo={testUserInfo} />);

  const userInfoProp = wrapper.props().userInfo;
  expect(userInfoProp).toEqual(testUserInfo);
});
