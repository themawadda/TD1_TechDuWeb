import { Context } from "hono";
import { countries } from "@infrastructure/mock/countries";

export class GetCountryByCodeHandler {
  handle(c: Context) {
    const code = c.req.param("code").trim().toLowerCase();

    const country = countries.find((country) => country.code === code);

    if (!country) {
      return c.json(
        {
          success: false,
          message: "Country not found",
        },
        404
      );
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