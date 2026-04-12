import { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { AppDataSource } from "@infrastructure/database/AppDataSource";
import { City } from "@domain/entities/City";
import { Match } from "@domain/entities/Match";

export class GetCityMatchsHandler {
  async handle(c: Context) {
    const nameParam = c.req.param("name").toLowerCase();

    const cityRepository = AppDataSource.getRepository(City);
    const matchRepository = AppDataSource.getRepository(Match);

    const allCities = await cityRepository.find();
    const city = allCities.find(
      (city) => city.name.toLowerCase() === nameParam
    );

    if (!city) {
      throw new HTTPException(404, { message: "City not found" });
    }

    const allMatchs = await matchRepository.find();

    const result = allMatchs.filter(
      (match) => match.stadium.city.name.toLowerCase() === city.name.toLowerCase()
    );

    return c.json({
      success: true,
      data: result,
    });
  }
}