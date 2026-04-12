import { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { AppDataSource } from "@infrastructure/database/AppDataSource";
import { Stadium } from "@domain/entities/Stadium";

export class GetStadiumByNameHandler {
  async handle(c: Context) {
    const nameParam = c.req.param("name").toLowerCase();

    const stadiumRepository = AppDataSource.getRepository(Stadium);

    const allStadiums = await stadiumRepository.find();
    const stadium = allStadiums.find(
      (stadium) => stadium.name.toLowerCase() === nameParam
    );

    if (!stadium) {
      throw new HTTPException(404, { message: "Stadium not found" });
    }

    return c.json({
      success: true,
      data: stadium,
    });
  }
}