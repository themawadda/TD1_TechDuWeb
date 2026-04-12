import { Hono } from "hono";
import { GetCountriesHandler } from "../handlers/countries/GetCountriesHandler";
import { GetCountryByCodeHandler } from "../handlers/countries/GetCountryByCodeHandler";
import { GetCountryCitiesHandler } from "../handlers/countries/GetCountryCitiesHandler";

const countriesRouter = new Hono();

const getCountriesHandler = new GetCountriesHandler();
const getCountryByCodeHandler = new GetCountryByCodeHandler();
const getCountryCitiesHandler = new GetCountryCitiesHandler();

countriesRouter.get("/:code/cities", (c) => getCountryCitiesHandler.handle(c));
countriesRouter.get("/:code", (c) => getCountryByCodeHandler.handle(c));
countriesRouter.get("/", (c) => getCountriesHandler.handle(c));

export { countriesRouter };