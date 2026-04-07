import { Hono } from "hono";
import { GetTeamsHandler } from "../handlers/teams/GetTeamsHandler";
import { GetTeamByFifaCodeHandler } from "../handlers/teams/GetTeamByFifaCodeHandler";
import { GetTeamMatchsByFifaCodeHandler } from "../handlers/teams/GetTeamMatchsByFifaCodeHandler";
import { GetTeamMatchsByStageHandler } from "../handlers/teams/GetTeamMatchsByStageHandler";

const teamsRouter = new Hono();

const getTeamsHandler = new GetTeamsHandler();
const getTeamByFifaCodeHandler = new GetTeamByFifaCodeHandler();
const getTeamMatchsHandler = new GetTeamMatchsByFifaCodeHandler();
const getTeamMatchsByStageHandler = new GetTeamMatchsByStageHandler();

teamsRouter.get("/", (c) => getTeamsHandler.handle(c));
teamsRouter.get("/:fifaCode/matchs/:stage", (c) => getTeamMatchsByStageHandler.handle(c));
teamsRouter.get("/:fifaCode/matchs", (c) => getTeamMatchsHandler.handle(c));
teamsRouter.get("/:fifaCode", (c) => getTeamByFifaCodeHandler.handle(c));

export { teamsRouter };