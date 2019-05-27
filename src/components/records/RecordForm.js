import React from "react";
import PropTypes from "prop-types";
import TextInput from "../common/TextInput";
import SelectInput from "../common/SelectInput";

const recordForm = ({
  record,
  depts,
  onSave,
  onChange,
  saving = false,
  errors = {}
}) => {
  return (
    <form onSubmit={onSave}>
      <h2>{record.id ? "Edit" : "Add"} record</h2>
      {errors.onSave && (
        <div className="alert alert-danger" role="alert">
          {errors.onSave}
        </div>
      )}
      <TextInput
        name="id"
        label="Employee Id"
        value={record.id}
        onChange={onChange}
        error={errors.title}
      />
      {/* <TextInput
        name="name"
        label="Employee Name"
        value={record.name}
        onChange={onChange}
        error={errors.title}
      />
      <TextInput
        name="manager"
        label="Manager"
        value={record.manager}
        onChange={onChange}
        error={errors.title}
      /> */}

      <SelectInput
        name="deptId"
        label="dept"
        value={record.deptId || ""}
        defaultOption="Select dept"
        options={depts.map(dept => ({
          value: dept.id,
          text: dept.name
        }))}
        onChange={onChange}
        error={errors.dept}
      />
      <TextInput
        name="phno"
        label="Phone Number"
        value={record.phno}
        onChange={onChange}
        error={errors.title}
      />
      {/* <TextInput
        name="salary"
        label="Salary"
        value={record.salary}
        onChange={onChange}
        error={errors.title}
      />
      <TextInput
        name="nationality"
        label="Nationality"
        value={record.nationality}
        onChange={onChange}
        error={errors.title}
      /> */}

      <button type="submit" disabled={saving} className="btn btn-primary">
        {saving ? "Saving..." : "Save"}
      </button>&nbsp;
      <button type="reset" className="btn btn-primary">
        Reset
      </button>
    </form>
  );
};

recordForm.propTypes = {
  depts: PropTypes.array.isRequired,
  record: PropTypes.object.isRequired,
  errors: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool
};

export default recordForm;
