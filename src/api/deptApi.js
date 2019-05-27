import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/depts/";

export function getdepts() {
  return fetch(baseUrl)
    .then(handleResponse)
    .catch(handleError);
}
