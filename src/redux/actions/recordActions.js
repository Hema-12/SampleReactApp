import * as types from "./actionTypes";
import * as recordApi from "../../api/recordApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loadrecordSuccess(records) {
  return { type: types.LOAD_RECORDS_SUCCESS, records };
}

export function createrecordSuccess(record) {
  return { type: types.CREATE_RECORD_SUCCESS, record };
}

export function updaterecordSuccess(record) {
  return { type: types.UPDATE_RECORD_SUCCESS, record };
}

export function deleterecordOptimistic(record) {
  return { type: types.DELETE_RECORD_OPTIMISTIC, record };
}

export function loadrecords() {
  return function(dispatch) {
    dispatch(beginApiCall());
    return recordApi
      .getrecords()
      .then(records => {
        dispatch(loadrecordSuccess(records));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function saverecord(record) {
  //eslint-disable-next-line no-unused-vars
  return function(dispatch, getState) {
    dispatch(beginApiCall());
    return recordApi
      .saverecord(record)
      .then(savedrecord => {
        record.id
          ? dispatch(updaterecordSuccess(savedrecord))
          : dispatch(createrecordSuccess(savedrecord));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function deleterecord(record) {
  return function(dispatch) {
    // Doing optimistic delete, so not dispatching begin/end api call
    // actions, or apiCallError action since we're not showing the loading status for this.
    dispatch(deleterecordOptimistic(record));
    return recordApi.deleterecord(record.id);
  };
}