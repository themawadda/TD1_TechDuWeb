import { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { AppDataSource } from "@infrastructure/database/AppDataSource";
import { Stadium } from "@domain/entities/Stadium";
import { Match } from "@domain/entities/Match";
import { StadiumService } from "@application/services/StadiumService";
import { NotFoundError } from "@domain/errors/NotFoundError";

export class GetStadiumMatchsHandler {
  async handle(c: Context) {
    const nameParam = c.req.param("name");

    const stadiumRepository = AppDataSource.getRepository(Stadium);
    const matchRepository = AppDataSource.getRepository(Match);

    const stadiumService = new StadiumService(
      stadiumRepository,
      matchRepository
    );

    try {
      const matchs = await stadiumService.getStadiumMatchs(nameParam);

      return c.json({
        success: true,
        data: matchs,
      });
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new HTTPException(404, { message: error.message });
      }

      throw error;
    }
  }
}