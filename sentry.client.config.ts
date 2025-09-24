import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://c4673de732fc6d6f8f44b6d7253ae9fb@o4510073731743744.ingest.us.sentry.io/4510073732661248",
  integrations: [
    Sentry.feedbackIntegration({
      // Additional SDK configuration goes in here, for example:
      colorScheme: "system",
    }),
  ],
});