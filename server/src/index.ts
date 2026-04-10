import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { fetchPlantImage, fetchPlants } from "./fytaApi.js";

const app = new Hono();

app.get("/", async (c) => {
  const data = await fetchPlants();
  const host = c.req.header("host") ?? "localhost:3000";
  const protocol = c.req.header("x-forwarded-proto") ?? "http";

  const plants = data.plants.map((plant) => ({
    ...plant,
    thumb_path: plant.thumb_path
      ? `${protocol}://${host}/plant-image/${plant.id}`
      : plant.plant_thumb_path,
  }));

  return c.json({
    ok: true,
    gardens: data.gardens,
    plants,
  });
});

app.get("/plant-image/:id", async (c) => {
  const plantId = c.req.param("id");
  const data = await fetchPlants();
  const plant = data.plants.find((p) => p.id === Number(plantId));

  if (!plant?.thumb_path) {
    return c.text("Plant not found", 404);
  }

  const imageResponse = await fetchPlantImage(plant.thumb_path);
  const contentType = imageResponse.headers.get("content-type") ?? "image/png";
  const body = await imageResponse.arrayBuffer();

  return c.body(body, 200, {
    "Content-Type": contentType,
    "Cache-Control": "public, max-age=3600",
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
