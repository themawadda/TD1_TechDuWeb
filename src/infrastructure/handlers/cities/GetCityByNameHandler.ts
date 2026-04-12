import { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { AppDataSource } from "@infrastructure/database/AppDataSource";
import { City } from "@domain/entities/City";

export class GetCityByNameHandler {
  async handle(c: Context) {
    const nameParam = c.req.param("name").toLowerCase();

    const cityRepository = AppDataSource.getRepository(City);

    const city = await cityRepository.findOne({
      where: {
        name: nameParam,
      },
    });

    if (!city) {
      const allCities = await cityRepository.find();
      const found = allCities.find(
        (city) => city.name.toLowerCase() === nameParam
      );

      if (!found) {
        throw new HTTPException(404, { message: "City not found" });
      }

      return c.json({
        success: true,
        data: found,
      });
    }

    return c.json({
      success: true,
      data: city,
    });
  }
}