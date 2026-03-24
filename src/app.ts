import { Hono } from "hono";
import { matchs } from "./mock/matchs";

const app = new Hono();

app.get("/", (c) => {
  return c.json({
    success: true,
    message: process.env.API_NAME ?? "World Cup Ticketing API",
  });
});

app.get("/health", (c) => {
  return c.json({
    success: true,
    message: process.env.API_NAME ?? "World Cup Ticketing API",
    uptime: process.uptime(),
    environment: process.env.NODE_ENV ?? "dev",
  });
});

app.get("/matchs", (c) => {
  return c.json({
    success: true,
    data: matchs,
  });
});

app.get("/matchs/:id", (c) => {
  const id = c.req.param("id");
  const match = matchs.find((m) => m.id === id);

  if (!match) {
    return c.json(
      {
        success: false,
        message: "Match not found",
      },
      404
    );
  }

  return c.json({
    success: true,
    data: match,
  });
});

export { app };