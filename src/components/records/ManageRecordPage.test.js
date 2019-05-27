import React from "react";
import { mount } from "enzyme";
import { depts, newrecord, records } from "../../../tools/mockData";
import { ManagerecordPage } from "./ManagerecordPage";

function render(args) {
  const defaultProps = {
    depts,
    records,
    // Passed from React Router in real app, so just stubbing in for test.
    // Could also choose to use MemoryRouter as shown in Header.test.js,
    // or even wrap with React Router, depending on whether I
    // need to test React Router related behavior.
    history: {},
    saverecord: jest.fn(),
    loaddepts: jest.fn(),
    loadrecords: jest.fn(),
    record: newrecord,
    match: {}
  };

  const props = { ...defaultProps, ...args };

  return mount(<ManagerecordPage {...props} />);
}

it("sets error when attempting to save an empty title field", () => {
  const wrapper = render();
  wrapper.find("form").simulate("submit");
  const error = wrapper.find(".alert").first();
  expect(error.text()).toBe("Title is required.");
});
