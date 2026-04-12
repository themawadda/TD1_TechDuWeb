import { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { AppDataSource } from "@infrastructure/database/AppDataSource";
import { Country } from "@domain/entities/Country";
import { City } from "@domain/entities/City";

export class GetCountryCitiesHandler {
  async handle(c: Context) {
    const code = c.req.param("code").toLowerCase();

    const countryRepository = AppDataSource.getRepository(Country);
    const cityRepository = AppDataSource.getRepository(City);

    const country = await countryRepository.findOne({
      where: { code },
    });

    if (!country) {
      throw new HTTPException(404, { message: "Country not found" });
    }

    const result = await cityRepository.find({
      where: {
        country: { code },
      },
    });

    return c.json({
      success: true,
      data: result,
    });
  }
}