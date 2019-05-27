import * as types from "./actionTypes";
import * as deptApi from "../../api/deptApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loaddeptsSuccess(depts) {
  return { type: types.LOAD_DEPTS_SUCCESS, depts };
}

export function loaddepts() {
  return function(dispatch) {
    dispatch(beginApiCall());
    return deptApi
      .getdepts()
      .then(depts => {
        dispatch(loaddeptsSuccess(depts));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
