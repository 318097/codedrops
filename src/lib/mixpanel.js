import { EventTracker } from "@codedrops/lib";
import config from "../config";

const events = {
  INIT: { name: "Init", fields: ["path"] },
  CLICK_ACTION: { name: "Click action", fields: ["target"] }, // Any button click
  REGISTER: { name: "Register" },
  LOGIN: { name: "Login" },
  LOGOUT: { name: "Logout" },
  BUY_ME_A_COFFEE: { name: "Buy me a coffee" },
  VIEWED_PRODUCT_PAGE: { name: "Viewed product page", fields: ["name"] },
  OPENED_PRODUCT: { name: "Opened product", fields: ["name"] },
  SEARCH: { name: "Search", fields: ["keyword"] },
  CLICKED_SOCIAL_ICON: {
    name: "Clicked social icon",
    fields: ["platform"],
  },
  VIEW_POST: { name: "View post", fields: ["slug", "title"] },
  SUBMITTED_FEEDBACK: { name: "Submitted feedback" },
};

const tracker = new EventTracker({
  events,
  trackingId: config.MIXPANEL_TRACKING_ID,
  isDev: !config.IS_PROD,
});

export default tracker;
