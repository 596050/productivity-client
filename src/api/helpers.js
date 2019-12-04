import "whatwg-fetch";
import { fromJS, OrderedMap } from "immutable";
import { selectToken, selectUrl } from "./Selectors";

export const mapToProp = (collection, prop, sortBy) => {
  if (sortBy) {
    const sorted = collection
      .sort((a, b) => a.get(sortBy).localeCompare(b.get(sortBy)))
      .reduce(
        (accumulator, value) => accumulator.set(value.get(prop), value),
        OrderedMap()
      );

    return sorted;
  }

  return collection.reduce(
    (accumulator, value) => accumulator.set(value.get(prop), value),
    OrderedMap()
  );
};

let unauthorizedCb;
export const handleUnauthorized = () => {
  if (!unauthorizedCb) {
    throw new Error("No Unauthorized callback has been defined");
  }
  return unauthorizedCb();
};

export const setUnauthorizedHandler = cb => (unauthorizedCb = cb);

export const fetchWrapper = (
  path,
  method,
  body,
  successAction,
  failureAction
) => (dispatch, getState) => {
  const state = getState();
  const token = selectToken(state);
  const url = `${selectUrl(state)}${path}`;

  const options = {
    headers: new Headers({
      "content-type": "application/json"
    }),
    body: body && body.toJS ? JSON.stringify(body.toJS()) : null,
    method,
    credentials: "omit"
  };

  if (token) {
    options.headers.append("authorization", `Bearer: ${token}`);
    options.credentials = "include";
  }

  return fetch(url, options)
    .then(res =>
      res.json().then(body => Promise.resolve({ status: res.status, body }))
    )
    .then(res => {
      if (res.status >= 200 && res.status < 300) {
        return Promise.resolve(fromJS(res.body));
      }
      if (res.status === 401) {
        dispatch(handleUnauthorized());
      }
      return Promise.reject({ status: res.status, errors: fromJS(res.body) });
    })
    .then(res => dispatch(successAction(res)))
    .catch(err => dispatch(failureAction(err)));
};

export const get = (path, successAction, failureAction) =>
  fetchWrapper(path, "GET", null, successAction, failureAction);
export const post = (path, data, successAction, failureAction) =>
  fetchWrapper(path, "POST", data, successAction, failureAction);
export const put = (path, data, successAction, failureAction) =>
  fetchWrapper(path, "PUT", data, successAction, failureAction);
export const patch = (path, data, successAction, failureAction) =>
  fetchWrapper(path, "PATCH", data, successAction, failureAction);
export const del = (path, successAction, failureAction) =>
  fetchWrapper(path, "DELETE", null, successAction, failureAction);
