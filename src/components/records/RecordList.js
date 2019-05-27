import React from "react";
import PropTypes from "prop-types";

const recordList = ({ records, onDeleteClick }) => (
  <table className="table">
    <thead>
      <tr>
        <th>Emp ID</th>
        <th>Name</th>
        <th>Manager</th>
        <th>Department</th>
        <th>phone Number</th>
        <th>Salary</th>
        <th>Nationality</th>
        <th>Edit</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
      {records.map(record => {
        return (
          <tr key={record.id}>
            <td>{record.id}</td>
            <td>{record.name}</td>
            <td>{record.manager}</td>
            <td>{record.deptId}</td>
            <td>{record.phno}</td>
            <td>{record.salary}</td>
            <td>{record.nationality}</td>
            <td>
              <button
                className="btn btn-outline-danger"
                onClick={() => onDeleteClick(record)}
              >
                Edit
              </button>
            </td>
            <td>
              <button
                className="btn btn-outline-danger"
                onClick={() => onDeleteClick(record)}
              >
                Delete
              </button>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);

recordList.propTypes = {
  records: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func.isRequired
};

export default recordList;
