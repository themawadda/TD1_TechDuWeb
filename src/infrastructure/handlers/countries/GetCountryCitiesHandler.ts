import { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { countries } from "@infrastructure/mock/countries";
import { cities } from "@infrastructure/mock/cities";

export class GetCountryCitiesHandler {
  handle(c: Context) {
    const code = c.req.param("code").toLowerCase();

    const country = countries.find((country) => country.code === code);

    if (!country) {
      throw new HTTPException(404, { message: "Country not found" });
    }

    const result = cities.filter(
      (city) => city.country.code === code
    );

    return c.json({
      success: true,
      data: result,
    });
  }
}