import { Context } from "hono";
import { matchs } from "@infrastructure/mock/matchs";
import { FifaCode } from "@domain/value-objects/FifaCode";
import { MatchStage } from "@domain/enums/MatchStage";

export class GetMatchsHandler {
  handle(c: Context) {
    const teamCode = c.req.query("team[code]");
    const stageParam = c.req.query("stage");

    let result = [...matchs];

    if (teamCode) {
      let fifaCode: FifaCode;

      try {
        fifaCode = new FifaCode(teamCode);
      } catch {
        return c.json(
          {
            success: false,
            message: "Invalid FIFA code",
          },
          400
        );
      }

      result = result.filter(
        (match) =>
          match.home.id.toUpperCase() === fifaCode.value ||
          match.away.id.toUpperCase() === fifaCode.value
      );
    }

    if (stageParam) {
      const normalizedStage = stageParam.trim().toUpperCase();

      const allowedStages = Object.values(MatchStage);

      if (!allowedStages.includes(normalizedStage as MatchStage)) {
        return c.json(
          {
            success: false,
            message: "Invalid stage",
          },
          400
        );
      }

      result = result.filter((match) => match.stage === normalizedStage);
    }

    return c.json({
      success: true,
      data: result,
    });
  }
}