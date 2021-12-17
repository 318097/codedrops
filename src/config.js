import { getServerURL } from "@codedrops/lib";

const {
  NODE_ENV,
  REACT_APP_COLLECTION_ID,
  REACT_APP_SENTRY_URL: SENTRY_URL,
  REACT_APP_SERVER_TYPE,
  REACT_APP_MIXPANEL_TRACKING_ID: MIXPANEL_TRACKING_ID,
} = process.env;

const isProd = NODE_ENV === "production";

const config = {
  SERVER_URL: getServerURL({ isProd, serverType: REACT_APP_SERVER_TYPE }),
  COLLECTION_ID: REACT_APP_COLLECTION_ID || "61bc9ac5a31cc4ff1dea687d",
  POST_COUNT: 20,
  SENTRY_URL,
  MIXPANEL_TRACKING_ID,
  NODE_ENV,
  IS_PROD: isProd,
};

export default config;
