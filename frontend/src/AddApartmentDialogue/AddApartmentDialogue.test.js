import React from "react";
import AddApartmentDialogue from "./AddApartmentDialogue";

import { shallow, configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

describe("Parent Component", () => {
    test("The Add Apartment Dialogue should show when rendered", () => {
        const wrapper = shallow(<AddApartmentDialogue />);
        expect(wrapper.containsMatchingElement(<AddApartmentDialogue />)).toEqual(true);
    });
});

