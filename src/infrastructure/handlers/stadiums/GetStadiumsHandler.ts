import { Context } from "hono";
import { stadiums } from "@infrastructure/mock/stadiums";

export class GetStadiumsHandler {
  handle(c: Context) {
    const name = c.req.query("name");

    let filteredStadiums = [...stadiums];

    if (name) {
      filteredStadiums = filteredStadiums.filter((stadium) =>
        stadium.name.toLowerCase().includes(name.toLowerCase())
      );
    }

    return c.json({
      success: true,
      data: filteredStadiums,
    });
  }
}