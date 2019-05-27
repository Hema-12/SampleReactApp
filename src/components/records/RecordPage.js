import React from "react";
import { connect } from "react-redux";
import * as recordActions from "../../redux/actions/recordActions";
import * as deptActions from "../../redux/actions/deptActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { Redirect } from "react-router-dom";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";
import RecordList from "./RecordList"

class RecordsPage extends React.Component {
  state = {
    redirectToAddrecordPage: false
  };

  componentDidMount() {
    const { records, depts, actions } = this.props;

    if (records.length === 0) {
      actions.loadrecords().catch(error => {
        alert("Loading records failed" + error);
      });
    }

    if (depts.length === 0) {
      actions.loaddepts().catch(error => {
        alert("Loading depts failed" + error);
      });
    }
  }

  handleDeleterecord = async record => {
    toast.success("record deleted");
    try {
      await this.props.actions.deleterecord(record);
    } catch (error) {
      toast.error("Delete failed. " + error.message, { autoClose: false });
    }
  };

  render() {
    return (
      <>
        {this.state.redirectToAddrecordPage && <Redirect to="/record" />}
        <h2>Employee Records</h2>
        {this.props.loading ? (
          <Spinner />
        ) : (
          <>
            <RecordList
              onDeleteClick={this.handleDeleterecord}
              records={this.props.records}
            />
            <button
              style={{ marginBottom: 20 }}
              className="btn btn-primary add-record"
              onClick={() => this.setState({ redirectToAddrecordPage: true })}
            >
              Add record
            </button>
          </>
        )}
      </>
    );
  }
}

RecordsPage.propTypes = {
  depts: PropTypes.array.isRequired,
  records: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    records:
      state.depts.length === 0
        ? []
        : state.records.map(record => {
            return {
              ...record,
              deptName: state.depts.find(a => a.id === record.deptId).name
            };
          }),
    depts: state.depts,
    loading: state.apiCallsInProgress > 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadrecords: bindActionCreators(recordActions.loadrecords, dispatch),
      loaddepts: bindActionCreators(deptActions.loaddepts, dispatch),
      deleterecord: bindActionCreators(recordActions.deleterecord, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecordsPage);
