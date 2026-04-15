import { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { AppDataSource } from "@infrastructure/database/AppDataSource";
import { Country } from "@domain/entities/Country";
import { CountryService } from "@application/services/CountryService";
import { NotFoundError } from "@domain/errors/NotFoundError";

export class GetCountryByCodeHandler {
  async handle(c: Context) {
    const code = c.req.param("code").trim().toLowerCase();

    const countryRepository = AppDataSource.getRepository(Country);
    const countryService = new CountryService(countryRepository);

    try {
      const country = await countryService.getCountryByCode(code);

      return c.json(
        {
          success: true,
          data: country,
        },
        200
      );
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new HTTPException(404, { message: error.message });
      }

      throw error;
    }
  }
}