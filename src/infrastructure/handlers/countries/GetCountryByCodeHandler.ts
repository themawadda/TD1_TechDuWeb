import { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { AppDataSource } from "@infrastructure/database/AppDataSource";
import { Country } from "@domain/entities/Country";

export class GetCountryByCodeHandler {
  async handle(c: Context) {
    const code = c.req.param("code").trim().toLowerCase();

    const countryRepository = AppDataSource.getRepository(Country);

    const country = await countryRepository.findOne({
      where: { code },
    });

    if (!country) {
      throw new HTTPException(404, { message: "Country not found" });
    }

    return c.json(
      {
        success: true,
        data: country,
      },
      200
    );
  }
}