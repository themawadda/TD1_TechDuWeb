import { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { AppDataSource } from "@infrastructure/database/AppDataSource";
import { Team } from "@domain/entities/Team";
import { Match } from "@domain/entities/Match";
import { FifaCode } from "@domain/value-objects/FifaCode";

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
  async handle(c: Context) {
    const fifaCodeParam = c.req.param("fifaCode");
    const stageParam = c.req.param("stage").toLowerCase();

    let fifaCode: FifaCode;

    try {
      fifaCode = new FifaCode(fifaCodeParam);
    } catch {
      throw new HTTPException(400, { message: "Invalid FIFA code" });
    }

    if (!allowedStages.includes(stageParam as (typeof allowedStages)[number])) {
      throw new HTTPException(400, { message: "Invalid stage" });
    }

    const teamRepository = AppDataSource.getRepository(Team);
    const matchRepository = AppDataSource.getRepository(Match);

    const team = await teamRepository.findOne({
      where: { fifaCode: fifaCode.value },
    });

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

    const allMatchs = await matchRepository.find();

    const result = allMatchs.filter(
      (match) =>
        (match.home.fifaCode === fifaCode.value ||
          match.away.fifaCode === fifaCode.value) &&
        match.stage === normalizedStage
    );

    return c.json({
      success: true,
      data: result,
    });
  }
}