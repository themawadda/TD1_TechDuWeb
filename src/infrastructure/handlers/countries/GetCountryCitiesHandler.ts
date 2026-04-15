import { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { AppDataSource } from "@infrastructure/database/AppDataSource";
import { Country } from "@domain/entities/Country";
import { City } from "@domain/entities/City";
import { CountryService } from "@application/services/CountryService";
import { NotFoundError } from "@domain/errors/NotFoundError";

export class GetCountryCitiesHandler {
  async handle(c: Context) {
    const code = c.req.param("code").toLowerCase();

    const countryRepository = AppDataSource.getRepository(Country);
    const cityRepository = AppDataSource.getRepository(City);

    const countryService = new CountryService(
      countryRepository,
      cityRepository
    );

    try {
      const cities = await countryService.getCountryCities(code);

      return c.json({
        success: true,
        data: cities,
      });
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new HTTPException(404, { message: error.message });
      }

      throw error;
    }
  }
}