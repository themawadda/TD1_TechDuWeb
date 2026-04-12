import { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { AppDataSource } from "@infrastructure/database/AppDataSource";
import { Stadium } from "@domain/entities/Stadium";
import { Match } from "@domain/entities/Match";

export class GetStadiumMatchsHandler {
  async handle(c: Context) {
    const nameParam = c.req.param("name").toLowerCase();

    const stadiumRepository = AppDataSource.getRepository(Stadium);
    const matchRepository = AppDataSource.getRepository(Match);

    const allStadiums = await stadiumRepository.find();
    const stadium = allStadiums.find(
      (stadium) => stadium.name.toLowerCase() === nameParam
    );

    if (!stadium) {
      throw new HTTPException(404, { message: "Stadium not found" });
    }

    const allMatchs = await matchRepository.find();

    const result = allMatchs.filter(
      (match) =>
        match.stadium.name.toLowerCase() === stadium.name.toLowerCase()
    );

    return c.json({
      success: true,
      data: result,
    });
  }
}