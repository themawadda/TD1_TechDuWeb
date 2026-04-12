import { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { AppDataSource } from "@infrastructure/database/AppDataSource";
import { Team } from "@domain/entities/Team";

export class GetTeamsHandler {
  async handle(c: Context) {
    const sort = c.req.query("sort");
    const name = c.req.query("name");

    if (sort && sort !== "name" && sort !== "-name") {
      throw new HTTPException(400, { message: "Invalid sort value" });
    }

    const teamRepository = AppDataSource.getRepository(Team);

    let result = await teamRepository.find();

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