import { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { AppDataSource } from "@infrastructure/database/AppDataSource";
import { City } from "@domain/entities/City";
import { CityService } from "@application/services/CityService";
import { NotFoundError } from "@domain/errors/NotFoundError";

export class GetCityByNameHandler {
  async handle(c: Context) {
    const nameParam = c.req.param("name");

    const cityRepository = AppDataSource.getRepository(City);
    const cityService = new CityService(cityRepository);

    try {
      const city = await cityService.getCityByName(nameParam);

      return c.json({
        success: true,
        data: city,
      });
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new HTTPException(404, { message: error.message });
      }

      throw error;
    }
  }
}