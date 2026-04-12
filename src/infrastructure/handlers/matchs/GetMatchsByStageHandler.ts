import { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { matchs } from "@infrastructure/mock/matchs";
import { MatchStage } from "@domain/enums/MatchStage";

export class GetMatchsByStageHandler {
  handle(c: Context) {
    const stageParam = c.req.param("stage").toUpperCase();

    const allowedStages = Object.values(MatchStage);

    if (!allowedStages.includes(stageParam as MatchStage)) {
      throw new HTTPException(400, { message: "Invalid stage" });
    }

    const result = matchs.filter(
      (match) => match.stage === stageParam
    );

    return c.json({
      success: true,
      data: result,
    });
  }
}