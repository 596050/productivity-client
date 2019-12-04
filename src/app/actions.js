import { clearLocalNotification, setLocalNotification } from "./helpers";
/* Action types */

export const SET_TITLE = "SET_TITLE";
export const SET_NOTIFICATION = "SET_NOTIFICATION";
export const CLEAR_NOTIFICATION = "CLEAR_NOTIFICATION";
/* Action Creators */

const setTitleAction = title => ({
  type: SET_TITLE,
  payload: title
});

const setNotificationAction = () => ({
  type: SET_NOTIFICATION
});

const clearNotificationAction = () => ({
  type: CLEAR_NOTIFICATION
});

/* Action Thunks */

export const setTitle = setTitleAction;
export const setNotification = () => dispatch =>
  clearLocalNotification()
    .then(() => dispatch(clearNotificationAction()))
    .then(setLocalNotification)
    .then(() => dispatch(setNotificationAction()));
