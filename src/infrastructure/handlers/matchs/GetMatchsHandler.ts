import { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { matchs } from "@infrastructure/mock/matchs";
import { FifaCode } from "@domain/value-objects/FifaCode";
import { MatchStage } from "@domain/enums/MatchStage";

export class GetMatchsHandler {
  handle(c: Context) {
    const teamCode = c.req.query("team[code]");
    const stageParam = c.req.query("stage");
    const dateParam = c.req.query("date");

    let result = [...matchs];

    if (teamCode) {
      let fifaCode: FifaCode;

      try {
        fifaCode = new FifaCode(teamCode);
      } catch {
        throw new HTTPException(400, { message: "Invalid FIFA code" });
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
        throw new HTTPException(400, { message: "Invalid stage" });
      }

      result = result.filter((match) => match.stage === normalizedStage);
    }

    if (dateParam) {
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

      if (!dateRegex.test(dateParam)) {
        throw new HTTPException(400, { message: "Invalid date format" });
      }

      result = result.filter(
        (match) => match.date.toISOString().split("T")[0] === dateParam
      );
    }

    return c.json({
      success: true,
      data: result,
    });
  }
}