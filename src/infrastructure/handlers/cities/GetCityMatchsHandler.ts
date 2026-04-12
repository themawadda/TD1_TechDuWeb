import { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { cities } from "@infrastructure/mock/cities";
import { matchs } from "@infrastructure/mock/matchs";

export class GetCityMatchsHandler {
  handle(c: Context) {
    const nameParam = c.req.param("name").toLowerCase();

    const city = cities.find(
      (city) => city.name.toLowerCase() === nameParam
    );

    if (!city) {
      throw new HTTPException(404, { message: "City not found" });
    }

    const result = matchs.filter(
      (match) =>
        match.stadium.city.name.toLowerCase() === city.name.toLowerCase()
    );

    return c.json({
      success: true,
      data: result,
    });
  }
}