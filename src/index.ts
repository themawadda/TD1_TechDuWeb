import { serve } from "bun";
import { app } from "./infrastructure/app";

const port = Number(process.env.PORT) || 3000;

serve({
  fetch: app.fetch,
  port: port,
});

console.log(`Server running on http://localhost:${port}`);