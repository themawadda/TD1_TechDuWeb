import { Hono } from "hono";
import { GetCountriesHandler } from "../handlers/countries/GetCountriesHandler";
import { GetCountryByCodeHandler } from "../handlers/countries/GetCountryByCodeHandler";

const countriesRouter = new Hono();

const getCountriesHandler = new GetCountriesHandler();
const getCountryByCodeHandler = new GetCountryByCodeHandler();

countriesRouter.get("/", (c) => getCountriesHandler.handle(c));
countriesRouter.get("/:code", (c) => getCountryByCodeHandler.handle(c));

export { countriesRouter };