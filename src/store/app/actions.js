import {
  SET_SESSION,
  SEND_APP_NOTIFICATION,
  SET_APP_LOADING,
  SET_DROPDOWN_STATUS,
} from "./constants";

export const setSession = (session) => ({
  type: SET_SESSION,
  payload: session,
});

export const setAppLoading = (status) => ({
  type: SET_APP_LOADING,
  payload: status,
});

export const sendAppNotification = ({
  type = "error",
  message = "Error.",
}) => ({
  type: SEND_APP_NOTIFICATION,
  payload: { type, message },
});

export const toggleDropdown = (status) => ({
  type: SET_DROPDOWN_STATUS,
  payload: status,
});
