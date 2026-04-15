import { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { AppDataSource } from "@infrastructure/database/AppDataSource";
import { City } from "@domain/entities/City";
import { Match } from "@domain/entities/Match";
import { CityService } from "@application/services/CityService";
import { NotFoundError } from "@domain/errors/NotFoundError";

export class GetCityMatchsHandler {
  async handle(c: Context) {
    const nameParam = c.req.param("name");

    const cityRepository = AppDataSource.getRepository(City);
    const matchRepository = AppDataSource.getRepository(Match);

    const cityService = new CityService(cityRepository, matchRepository);

    try {
      const matchs = await cityService.getCityMatchs(nameParam);

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