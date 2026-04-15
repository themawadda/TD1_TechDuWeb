import { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { AppDataSource } from "@infrastructure/database/AppDataSource";
import { Team } from "@domain/entities/Team";
import { TeamService } from "@application/services/TeamService";
import { NotFoundError } from "@domain/errors/NotFoundError";
import { ValidationError } from "@domain/errors/ValidationError";

export class GetTeamByFifaCodeHandler {
  async handle(c: Context) {
    const fifaCode = c.req.param("fifaCode").toUpperCase();

    const teamRepository = AppDataSource.getRepository(Team);
    const teamService = new TeamService(teamRepository);

    try {
      const team = await teamService.getTeamByFifaCode(fifaCode);

      return c.json(
        {
          success: true,
          data: team,
        },
        200
      );
    } catch (error) {
      if (error instanceof ValidationError) {
        throw new HTTPException(400, { message: error.message });
      }

      if (error instanceof NotFoundError) {
        throw new HTTPException(404, { message: error.message });
      }

      throw error;
    }
  }
}