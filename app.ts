import { Hono } from "hono";
import { logger } from "hono/logger";
import { expenseRoute } from "./routes/expenses";

const app = new Hono();

app.use(logger());

app.get("/", (c) => {
  return c.json({ message: "Hello, World yay!" });
});

app.route("/api/expenses", expenseRoute);

export default app; // for Cloudflare Workers or Bun
