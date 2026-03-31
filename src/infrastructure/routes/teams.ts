import { Hono } from "hono";
import { GetTeamByFifaCodeHandler } from "../handlers/teams/GetTeamByFifaCodeHandler";
import { GetTeamsHandler } from "../handlers/teams/GetTeamsHandler";

const teamsRouter = new Hono();

const getTeamByFifaCodeHandler = new GetTeamByFifaCodeHandler();
const getTeamsHandler = new GetTeamsHandler();

teamsRouter.get("/", (c) => getTeamsHandler.handle(c));
teamsRouter.get("/:fifaCode", (c) => getTeamByFifaCodeHandler.handle(c));

export { teamsRouter };