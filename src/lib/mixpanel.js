import { TrackingService } from "@codedrops/lib";
import config from "../config";

const events = {
  INIT: { name: "Init" },
  PAGE_VIEW: { name: "Page View", fields: ["page"] },
  ACTION_CLICK: { name: "Action Click", fields: ["action", "value"] }, // Any button click
  REGISTER: { name: "Register" },
  LOGIN: { name: "Login" },
  LOGOUT: { name: "Logout" },
};

const tracker = new TrackingService({
  events,
  trackingId: config.MIXPANEL_TRACKING_ID,
});

export default tracker;
