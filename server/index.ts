import app from "./app.ts";

Bun.serve({
  // port: 8080,
  fetch: app.fetch,
});
