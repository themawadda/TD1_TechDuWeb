import { Hono } from "hono";
import { homeRouter } from "./routes/home";
import { matchsRouter } from "./routes/matchs";
import { teamsRouter } from "./routes/teams";
import { citiesRouter } from "./routes/cities";
import { countriesRouter } from "./routes/countries";
import { stadiumsRouter } from "./routes/stadiums";

const app = new Hono();

app.route("/", homeRouter);
app.route("/matchs", matchsRouter);
app.route("/teams", teamsRouter);
app.route("/cities", citiesRouter);
app.route("/countries", countriesRouter);
app.route("/stadiums", stadiumsRouter);

export { app };