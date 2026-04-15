import { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { AppDataSource } from "@infrastructure/database/AppDataSource";
import { Team } from "@domain/entities/Team";
import { Match } from "@domain/entities/Match";
import { TeamService } from "@application/services/TeamService";
import { ValidationError } from "@domain/errors/ValidationError";

export class GetTeamMatchsByFifaCodeHandler {
  async handle(c: Context) {
    const fifaCode = c.req.param("fifaCode").toUpperCase();

    const teamRepository = AppDataSource.getRepository(Team);
    const matchRepository = AppDataSource.getRepository(Match);

    const teamService = new TeamService(teamRepository, matchRepository);

    try {
      const matchs = await teamService.getTeamMatchsByFifaCode(fifaCode);

      return c.json({
        success: true,
        data: matchs,
      });
    } catch (error) {
      if (error instanceof ValidationError) {
        throw new HTTPException(400, { message: error.message });
      }

      throw error;
    }
  }
}