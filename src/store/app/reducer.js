import {
  SET_APP_LOADING,
  SET_SESSION,
  SEND_APP_NOTIFICATION,
  SET_DROPDOWN_STATUS,
} from "./constants";

const initialState = {
  appLoading: false,
  appNotification: null,
  session: null,
  dropdownVisibility: false,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_APP_LOADING:
      return {
        ...state,
        appLoading: action.payload,
      };
    case SET_SESSION:
      return {
        ...state,
        session: action.payload,
      };
    case SEND_APP_NOTIFICATION:
      return {
        ...state,
        appNotification: action.payload,
      };
    case SET_DROPDOWN_STATUS:
      return {
        ...state,
        dropdownVisibility: !state.dropdownVisibility,
      };
    default:
      return state;
  }
};

export default appReducer;
