import { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { cities } from "@infrastructure/mock/cities";

export class GetCityByNameHandler {
  handle(c: Context) {
    const nameParam = c.req.param("name").toLowerCase();

    const city = cities.find(
      (city) => city.name.toLowerCase() === nameParam
    );

    if (!city) {
      throw new HTTPException(404, { message: "City not found" });
    }

    return c.json({
      success: true,
      data: city,
    });
  }
}