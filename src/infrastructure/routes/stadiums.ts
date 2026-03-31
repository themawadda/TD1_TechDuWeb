import { Hono } from "hono";
import { GetStadiumsHandler } from "../handlers/stadiums/GetStadiumsHandler";

const stadiumsRouter = new Hono();
const getStadiumsHandler = new GetStadiumsHandler();

stadiumsRouter.get("/", (c) => getStadiumsHandler.handle(c));

export { stadiumsRouter };