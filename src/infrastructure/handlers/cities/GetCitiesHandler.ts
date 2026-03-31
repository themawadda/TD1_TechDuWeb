import { Context } from "hono";
import { cities } from "@infrastructure/mock/cities";

export class GetCitiesHandler {
  handle(c: Context) {
    const name = c.req.query("name");

    let filteredCities = [...cities];

    if (name) {
      filteredCities = filteredCities.filter((city) =>
        city.name.toLowerCase().includes(name.toLowerCase())
      );
    }

    return c.json({
      success: true,
      data: filteredCities,
    });
  }
}