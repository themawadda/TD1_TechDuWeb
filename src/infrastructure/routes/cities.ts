import { Hono } from "hono";
import { GetCitiesHandler } from "../handlers/cities/GetCitiesHandler";
import { GetCityMatchsHandler } from "../handlers/cities/GetCityMatchsHandler";
import { GetCityByNameHandler } from "../handlers/cities/GetCityByNameHandler";

const citiesRouter = new Hono();

const getCitiesHandler = new GetCitiesHandler();
const getCityMatchsHandler = new GetCityMatchsHandler();
const getCityByNameHandler = new GetCityByNameHandler();

citiesRouter.get("/:name/matchs", (c) => getCityMatchsHandler.handle(c));
citiesRouter.get("/:name", (c) => getCityByNameHandler.handle(c));
citiesRouter.get("/", (c) => getCitiesHandler.handle(c));

export { citiesRouter };