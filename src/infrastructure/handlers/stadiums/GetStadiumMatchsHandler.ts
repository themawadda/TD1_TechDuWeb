import { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { stadiums } from "@infrastructure/mock/stadiums";
import { matchs } from "@infrastructure/mock/matchs";

export class GetStadiumMatchsHandler {
  handle(c: Context) {
    const nameParam = c.req.param("name").toLowerCase();

    const stadium = stadiums.find(
      (s) => s.name.toLowerCase() === nameParam
    );

    if (!stadium) {
      throw new HTTPException(404, { message: "Stadium not found" });
    }

    const result = matchs.filter(
      (match) =>
        match.stadium.name.toLowerCase() === stadium.name.toLowerCase()
    );

    return c.json({
      success: true,
      data: result,
    });
  }
}