import { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { matchs } from "@infrastructure/mock/matchs";

export class GetTeamMatchsByFifaCodeHandler {
  handle(c: Context) {
    const fifaCode = c.req.param("fifaCode").toUpperCase();

    if (!/^[A-Z]{3}$/.test(fifaCode)) {
      throw new HTTPException(400, { message: "Invalid FIFA code" });
    }

    const result = matchs.filter(
      (match) => match.home.id === fifaCode || match.away.id === fifaCode
    );

    return c.json({
      success: true,
      data: result,
    });
  }
}