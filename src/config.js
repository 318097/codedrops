const {
  NODE_ENV,
  REACT_APP_SRC,
  REACT_APP_FIREBASE_URL,
  REACT_APP_SERVER_URL,
  REACT_APP_COLLECTION_ID,
} = process.env;

const isProd = NODE_ENV === "production";

// const SERVER_COLLECTION_ID = "dHEqTd3knQGHTDMqwz8QP9";

const SERVER_URL = isProd
  ? REACT_APP_SRC === "FIREBASE"
    ? REACT_APP_FIREBASE_URL
    : REACT_APP_SERVER_URL
  : "http://localhost:7000/api";

const config = {
  SERVER_URL,
  COLLECTION_ID: REACT_APP_COLLECTION_ID || "omway2fLvhXGnKhwtABwP4",
  IS_SERVER: REACT_APP_SRC !== "FIREBASE",
};

export default config;
