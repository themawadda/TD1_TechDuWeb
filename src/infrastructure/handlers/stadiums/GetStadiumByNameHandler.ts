import { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { AppDataSource } from "@infrastructure/database/AppDataSource";
import { Stadium } from "@domain/entities/Stadium";
import { StadiumService } from "@application/services/StadiumService";
import { NotFoundError } from "@domain/errors/NotFoundError";

export class GetStadiumByNameHandler {
  async handle(c: Context) {
    const nameParam = c.req.param("name");

    const stadiumRepository = AppDataSource.getRepository(Stadium);
    const stadiumService = new StadiumService(stadiumRepository);

    try {
      const stadium = await stadiumService.getStadiumByName(nameParam);

      return c.json({
        success: true,
        data: stadium,
      });
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new HTTPException(404, { message: error.message });
      }

      throw error;
    }
  }
}