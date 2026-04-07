import { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { teams } from "@infrastructure/mock/teams";
import { matchs } from "@infrastructure/mock/matchs";

const allowedStages = [
  "group",
  "round_of_32",
  "round_of_16",
  "quarter_finals",
  "semi_finals",
  "third_place",
  "final",
] as const;

export class GetTeamMatchsByStageHandler {
  handle(c: Context) {
    const fifaCode = c.req.param("fifaCode").toUpperCase();
    const stageParam = c.req.param("stage").toLowerCase();

    if (!/^[A-Z]{3}$/.test(fifaCode)) {
      throw new HTTPException(400, { message: "Invalid FIFA code" });
    }

    if (!allowedStages.includes(stageParam as (typeof allowedStages)[number])) {
      throw new HTTPException(400, { message: "Invalid stage" });
    }

    const team = teams.find((team) => team.id === fifaCode);

    if (!team) {
      throw new HTTPException(404, { message: "Team not found" });
    }

    const stageMap: Record<string, string> = {
      group: "GROUP",
      round_of_32: "ROUND_OF_32",
      round_of_16: "ROUND_OF_16",
      quarter_finals: "QUARTER_FINAL",
      semi_finals: "SEMI_FINAL",
      third_place: "THIRD_PLACE",
      final: "FINAL",
    };

    const normalizedStage = stageMap[stageParam];

    const result = matchs.filter(
      (match) =>
        (match.home.id === fifaCode || match.away.id === fifaCode) &&
        match.stage === normalizedStage
    );

    return c.json({
      success: true,
      data: result,
    });
  }
}