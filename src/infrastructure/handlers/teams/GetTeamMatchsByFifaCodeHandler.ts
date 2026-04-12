import { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { AppDataSource } from "@infrastructure/database/AppDataSource";
import { Match } from "@domain/entities/Match";
import { FifaCode } from "@domain/value-objects/FifaCode";

export class GetTeamMatchsByFifaCodeHandler {
  async handle(c: Context) {
    const fifaCodeParam = c.req.param("fifaCode");

    let fifaCode: FifaCode;

    try {
      fifaCode = new FifaCode(fifaCodeParam);
    } catch {
      throw new HTTPException(400, { message: "Invalid FIFA code" });
    }

    const matchRepository = AppDataSource.getRepository(Match);

    const allMatchs = await matchRepository.find();

    const result = allMatchs.filter(
      (match) =>
        match.home.fifaCode.toUpperCase() === fifaCode.value ||
        match.away.fifaCode.toUpperCase() === fifaCode.value
    );

    return c.json({
      success: true,
      data: result,
    });
  }
}