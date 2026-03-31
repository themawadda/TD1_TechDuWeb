import { Context } from "hono";
import { countries } from "@infrastructure/mock/countries";

export class GetCountriesHandler {
  handle(c: Context) {
    const name = c.req.query("name");

    let filteredCountries = [...countries];

    if (name) {
      filteredCountries = filteredCountries.filter((country) =>
        country.name.toLowerCase().includes(name.toLowerCase())
      );
    }

    return c.json({
      success: true,
      data: filteredCountries,
    });
  }
}