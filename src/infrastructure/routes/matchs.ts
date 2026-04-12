import { Hono } from "hono";
import { GetMatchsHandler } from "../handlers/matchs/GetMatchsHandler";
import { GetMatchByIdHandler } from "../handlers/matchs/GetMatchByIdHandler";
import { GetMatchsByStageHandler } from "../handlers/matchs/GetMatchsByStageHandler";
import { GetMatchsByStatusHandler } from "../handlers/matchs/GetMatchsByStatusHandler";

const matchsRouter = new Hono();

const getMatchsHandler = new GetMatchsHandler();
const getMatchByIdHandler = new GetMatchByIdHandler();
const getMatchsByStageHandler = new GetMatchsByStageHandler();
const getMatchsByStatusHandler = new GetMatchsByStatusHandler();

matchsRouter.get("/stages/:stage", (c) => getMatchsByStageHandler.handle(c));
matchsRouter.get("/status/:status", (c) => getMatchsByStatusHandler.handle(c));

matchsRouter.get("/", (c) => getMatchsHandler.handle(c));
matchsRouter.get("/:id", (c) => getMatchByIdHandler.handle(c));

export { matchsRouter };