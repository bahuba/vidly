import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

function init() {
  Sentry.init({
    dsn:
      "https://998fbca942df4f1b83274b22386df3b5@o513228.ingest.sentry.io/5614701",
    integrations: [new Integrations.BrowserTracing()],

    // We recommend adjusting this value in production, or using tracesSampler
    // for finer control
    tracesSampleRate: 1.0,
  });
}

// To test senty: raise this exception in your app
// return <button onClick={methodDoesNotExist}>Break the world</button>;

export default {
  init,
  log: Sentry.captureMessage,
  logException: Sentry.captureException,
};
