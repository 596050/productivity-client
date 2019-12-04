import { AsyncStorage } from "react-native";
import { fromJS, Map } from "immutable";

export const set = (collection, id, value) =>
  AsyncStorage.getItem(collection).then(vals => {
    if (!vals) {
      vals = "{}";
    }
    const values = JSON.parse(vals);
    values[id] = value.toJS();

    return AsyncStorage.setItem(collection, JSON.stringify(values)).then(
      () => value
    );
  });

export const get = (collection, id) =>
  AsyncStorage.getItem(collection).then(vals => fromJS(JSON.parse(vals)[id]));

export const getAll = collection =>
  AsyncStorage.getItem(collection).then(vals => fromJS(JSON.parse(vals)));

export const del = (collection, id) =>
  AsyncStorage.getItem(collection).then(vals => {
    if (!vals) {
      return null;
    }
    const values = JSON.parse(vals);
    if (!values[id]) {
      return null;
    }

    delete values[id];
    return AsyncStorage.setItem(collection, JSON.stringify(values)).then(() => {
      return id;
    });
  });
