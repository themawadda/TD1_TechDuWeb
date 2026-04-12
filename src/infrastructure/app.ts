import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";

import { homeRouter } from "./routes/home";
import { matchsRouter } from "./routes/matchs";
import { teamsRouter } from "./routes/teams";
import { stadiumsRouter } from "./routes/stadiums";
import { citiesRouter } from "./routes/cities";
import { countriesRouter } from "./routes/countries";
import { ticketsRouter } from "./routes/tickets";

const app = new Hono();

// 🔥 centralized error handler
app.onError((err, c) => {
  if (err instanceof HTTPException) {
    return c.json(
      {
        success: false,
        message: err.message,
      },
      err.status
    );
  }

  return c.json(
    {
      success: false,
      message: "Internal Server Error",
    },
    500
  );
});

// routes
app.route("/", homeRouter);
app.route("/matchs", matchsRouter);
app.route("/teams", teamsRouter);
app.route("/stadiums", stadiumsRouter);
app.route("/cities", citiesRouter);
app.route("/countries", countriesRouter);
app.route("/tickets", ticketsRouter);

export { app };