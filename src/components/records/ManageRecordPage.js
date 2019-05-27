import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadrecords, saverecord } from "../../redux/actions/recordActions";
import { loaddepts } from "../../redux/actions/deptActions";
import PropTypes from "prop-types";
import RecordForm from "./RecordForm";
import { newrecord } from "../../../tools/mockData";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

function ManagerecordPage({
  records,
  depts,
  loaddepts,
  loadrecords,
  saverecord,
  history,
  ...props
}) {
  const [record, setrecord] = useState({ ...props.record });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (records.length === 0) {
      loadrecords().catch(error => {
        alert("Loading records failed" + error);
      });
    } else {
      setrecord({ ...props.record });
    }

    if (depts.length === 0) {
      loaddepts().catch(error => {
        alert("Loading depts failed" + error);
      });
    }
  }, [props.record]);

  function handleChange(event) {
    const { name, value } = event.target;
    setrecord(prevrecord => ({
      ...prevrecord,
      [name]: name === "deptId" ? parseInt(value, 10) : value
    }));
  }

  function formIsValid() {
    const { id } = record;
    const errors = {};

    if (!id) errors.id = "Id is required.";


    setErrors(errors);
    // Form is valid if the errors object still has no properties
    return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    saverecord(record)
      .then(() => {
        toast.success("record saved.");
        history.push("/records");
      })
      .catch(error => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  }

  return depts.length === 0 || records.length === 0 ? (
    <Spinner />
  ) : (
    <RecordForm
      record={record}
      errors={errors}
      depts={depts}
      onChange={handleChange}
      onSave={handleSave}
      saving={saving}
    />
  );
}

ManagerecordPage.propTypes = {
  record: PropTypes.object.isRequired,
  depts: PropTypes.array.isRequired,
  records: PropTypes.array.isRequired,
  loadrecords: PropTypes.func.isRequired,
  loaddepts: PropTypes.func.isRequired,
  saverecord: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

export function getrecordBySlug(records, slug) {
  return records.find(record => record.slug === slug) || null;
}

function mapStateToProps(state, ownProps) {
  const slug = ownProps.match.params.slug;
  const record =
    slug && state.records.length > 0
      ? getrecordBySlug(state.records, slug)
      : newrecord;
  return {
    record,
    records: state.records,
    depts: state.depts
  };
}

const mapDispatchToProps = {
  loadrecords,
  loaddepts,
  saverecord
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManagerecordPage);
