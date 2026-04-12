import { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { AppDataSource } from "@infrastructure/database/AppDataSource";
import { Team } from "@domain/entities/Team";
import { FifaCode } from "@domain/value-objects/FifaCode";

export class GetTeamByFifaCodeHandler {
  async handle(c: Context) {
    const fifaCodeParam = c.req.param("fifaCode");

    let fifaCode: FifaCode;

    try {
      fifaCode = new FifaCode(fifaCodeParam);
    } catch {
      throw new HTTPException(400, { message: "Invalid FIFA code" });
    }

    const teamRepository = AppDataSource.getRepository(Team);

    const team = await teamRepository.findOne({
      where: { fifaCode: fifaCode.value },
    });

    if (!team) {
      throw new HTTPException(404, { message: "Team not found" });
    }

    return c.json(
      {
        success: true,
        data: team,
      },
      200
    );
  }
}