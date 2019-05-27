import React from "react";
import recordForm from "./recordForm";
import { shallow } from "enzyme";

function renderrecordForm(args) {
  const defaultProps = {
    depts: [],
    record: {},
    saving: false,
    errors: {},
    onSave: () => {},
    onChange: () => {}
  };

  const props = { ...defaultProps, ...args };
  return shallow(<recordForm {...props} />);
}

it("renders form and header", () => {
  const wrapper = renderrecordForm();
  // console.log(wrapper.debug());
  expect(wrapper.find("form").length).toBe(1);
  expect(wrapper.find("h2").text()).toEqual("Add record");
});

it('labels save buttons as "Save" when not saving', () => {
  const wrapper = renderrecordForm();
  expect(wrapper.find("button").text()).toBe("Save");
});

it('labels save button as "Saving..." when saving', () => {
  const wrapper = renderrecordForm({ saving: true });
  expect(wrapper.find("button").text()).toBe("Saving...");
});
