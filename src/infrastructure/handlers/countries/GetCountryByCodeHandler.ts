import { Context } from "hono";
import { countries } from "@infrastructure/mock/countries";
import { HTTPException } from "hono/http-exception";

export class GetCountryByCodeHandler {
  handle(c: Context) {
    const code = c.req.param("code").trim().toLowerCase();

    const country = countries.find((country) => country.code === code);

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