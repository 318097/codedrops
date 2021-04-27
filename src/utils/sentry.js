import * as Sentry from "@sentry/browser";

export default (exception) => {
  Sentry.captureException(exception);
};
