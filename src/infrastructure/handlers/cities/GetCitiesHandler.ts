import { Context } from "hono";
import { AppDataSource } from "@infrastructure/database/AppDataSource";
import { City } from "@domain/entities/City";

export class GetCitiesHandler {
  async handle(c: Context) {
    const name = c.req.query("name");

    const cityRepository = AppDataSource.getRepository(City);

    let result = await cityRepository.find();

    if (name) {
      result = result.filter((city) =>
        city.name.toLowerCase().includes(name.toLowerCase())
      );
    }

    return c.json({
      success: true,
      data: result,
    });
  }
}