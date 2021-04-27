import * as Sentry from "@sentry/browser";

export const captureException = (exception) => {
  Sentry.captureException(exception);
};
