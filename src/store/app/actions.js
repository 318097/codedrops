import { SET_SESSION, SET_APP_LOADING } from "./constants";

export const setSession = (session) => ({
  type: SET_SESSION,
  payload: session,
});

export const setAppLoading = (status) => ({
  type: SET_APP_LOADING,
  payload: status,
});
