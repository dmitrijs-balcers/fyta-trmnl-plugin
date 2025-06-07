import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { fetchPlants } from "./fytaApi.js";

const app = new Hono();

app.get("/", async (c) => {
  const plants = await fetchPlants();

  return c.json({
    ok: true,
    ...plants,
  });
});

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);
