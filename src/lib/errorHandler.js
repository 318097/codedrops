import * as lib from "@codedrops/lib";
import notify from "./notify";
import * as Sentry from "@sentry/react";
import { get } from "lodash";

const handleError = (error) => {
  lib.handleError(error);
  const errorMessage = get(error, "response.data", error.message);
  notify(errorMessage, "error");
  Sentry.captureException(error);
};

export default handleError;
