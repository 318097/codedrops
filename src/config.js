const {
  NODE_ENV,
  REACT_APP_SRC,
  REACT_APP_FIREBASE_URL,
  REACT_APP_SERVER_URL,
  REACT_APP_COLLECTION_ID,
} = process.env;

const NETLIFY_EXPRESS =
  "https://bubblegum-serverless.netlify.app/.netlify/functions/api";

const isProd = true || NODE_ENV === "production";
const useNetlifyURL = true;

const URL =
  REACT_APP_SRC === "FIREBASE" ? REACT_APP_FIREBASE_URL : REACT_APP_SERVER_URL;

const SERVER_URL = useNetlifyURL
  ? NETLIFY_EXPRESS
  : isProd
  ? URL
  : "http://localhost:7000/api";

const config = {
  SERVER_URL,
  COLLECTION_ID: REACT_APP_COLLECTION_ID || "dHEqTd3knQGHTDMqwz8QP9",
  IS_SERVER: REACT_APP_SRC !== "FIREBASE",
  POST_COUNT: 25,
};

export default config;
