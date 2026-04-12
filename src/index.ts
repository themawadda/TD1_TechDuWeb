import "reflect-metadata";
import { serve } from "bun";
import { app } from "./infrastructure/app";
import { AppDataSource } from "./infrastructure/database/AppDataSource";

const port = Number(process.env.PORT) || 3000;

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected");

    serve({
      fetch: app.fetch,
      port,
    });

    console.log(`Server running on http://localhost:${port}`);
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });