import { Context } from "hono";
import { teams } from "@infrastructure/mock/teams";
import { FifaCode } from "@domain/value-objects/FifaCode";

export class GetTeamByFifaCodeHandler {
  handle(c: Context) {
    const fifaCodeParam = c.req.param("fifaCode");

    let fifaCode: FifaCode;

    try {
      fifaCode = new FifaCode(fifaCodeParam);
    } catch {
      return c.json(
        {
          success: false,
          message: "Invalid FIFA code",
        },
        400
      );
    }

    const team = teams.find(
      (team) => team.id.toUpperCase() === fifaCode.value
    );

    if (!team) {
      return c.json(
        {
          success: false,
          message: "Team not found",
        },
        404
      );
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