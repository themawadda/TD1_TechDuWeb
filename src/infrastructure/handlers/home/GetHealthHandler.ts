import { Context } from "hono";

export class GetHealthHandler {
  handle(c: Context) {
    return c.json({
      success: true,
      message: process.env.API_NAME ?? "World Cup Ticketing API",
      uptime: process.uptime(),
      environment: process.env.NODE_ENV ?? "dev",
    });
  }
}