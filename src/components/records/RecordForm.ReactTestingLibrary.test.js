import React from "react";
import { cleanup, render } from "react-testing-library";
import recordForm from "./recordForm";

afterEach(cleanup);

function renderrecordForm(args) {
  let defaultProps = {
    depts: [],
    record: {},
    saving: false,
    errors: {},
    onSave: () => {},
    onChange: () => {}
  };

  const props = { ...defaultProps, ...args };
  return render(<recordForm {...props} />);
}

it("should render Add record header", () => {
  const { getByText } = renderrecordForm();
  getByText("Add record");
});

it('should label save button as "Save" when not saving', () => {
  const { getByText } = renderrecordForm();
  getByText("Save");
});

it('should label save button as "Saving..." when saving', () => {
  const { getByText, debug } = renderrecordForm({ saving: true });
  // debug();
  getByText("Saving...");
});
