import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/records/";

export function getrecords() {
  return fetch(baseUrl)
    .then(handleResponse)
    .catch(handleError);
}

export function saverecord(record) {
  return fetch(baseUrl + (record.id || ""), {
    method: record.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify(record)
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleterecord(recordId) {
  return fetch(baseUrl + recordId, { method: "DELETE" })
    .then(handleResponse)
    .catch(handleError);
}
