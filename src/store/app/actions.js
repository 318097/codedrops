import {
  SET_SESSION,
  SEND_APP_NOTIFICATION,
  SET_APP_LOADING,
  SET_QUICK_BALL_STATUS,
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

export const toggleQuickBall = (status) => ({
  type: SET_QUICK_BALL_STATUS,
  payload: status,
});
