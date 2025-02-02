import { z } from "zod";
import { Hono } from "hono";
import { handle } from "hono/vercel";
import accounts from "./accounts";
import { HTTPException } from "hono/http-exception";
import categories from "./categories";
import transactions from "./transactions";
import summary from "./summary";
import { cors } from "hono/cors";

export const runtime = "edge";

const app = new Hono().basePath("/api");

app.use("/api/*", cors());
app.onError((err, c) => {
  if (err instanceof HTTPException) {
    return err.getResponse();
  }
  return c.json({ error: "Internal error" }, 500);
});
const routes = app
  .route("/accounts", accounts)
  .route("/categories", categories)
  .route("transactions", transactions)
  .route("/summary", summary);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
