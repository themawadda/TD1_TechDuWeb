import { Context } from "hono";
import { AppDataSource } from "@infrastructure/database/AppDataSource";
import { Stadium } from "@domain/entities/Stadium";

export class GetStadiumsHandler {
  async handle(c: Context) {
    const name = c.req.query("name");
    const cityName = c.req.query("city[name]");
    const countryName = c.req.query("country[name]");
    const countryCode = c.req.query("country[code]");

    const stadiumRepository = AppDataSource.getRepository(Stadium);

    let result = await stadiumRepository.find();

    if (name) {
      result = result.filter((stadium) =>
        stadium.name.toLowerCase().includes(name.toLowerCase())
      );
    }

    if (cityName) {
      result = result.filter((stadium) =>
        stadium.city.name.toLowerCase().includes(cityName.toLowerCase())
      );
    }

    if (countryName) {
      result = result.filter((stadium) =>
        stadium.city.country.name.toLowerCase().includes(countryName.toLowerCase())
      );
    }

    if (countryCode) {
      result = result.filter((stadium) =>
        stadium.city.country.code.toLowerCase() === countryCode.toLowerCase()
      );
    }

    return c.json({
      success: true,
      data: result,
    });
  }
}