import { Context } from "hono";
import { teams } from "@infrastructure/mock/teams";

export class GetTeamsHandler {
  handle(c: Context) {
    const sort = c.req.query("sort");
    const name = c.req.query("name");

    if (sort && sort !== "name" && sort !== "-name") {
      return c.json(
        {
          success: false,
          message: "Invalid sort value",
        },
        400
      );
    }

    let result = [...teams];

    if (name) {
      result = result.filter((team) =>
        team.country.name.toLowerCase().includes(name.toLowerCase())
      );
    }

    result.sort((a, b) => {
      const nameA = a.country.name.toLowerCase();
      const nameB = b.country.name.toLowerCase();

      if (sort === "-name") {
        return nameB.localeCompare(nameA);
      }

      return nameA.localeCompare(nameB);
    });

    return c.json({
      success: true,
      data: result,
    });
  }
}