import { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { matchs } from "@infrastructure/mock/matchs";

export class GetMatchsByStatusHandler {
  handle(c: Context) {
    const statusParam = c.req.param("status").toUpperCase();

    const allowedStatus = ["SCHEDULED", "LIVE", "FINISHED", "CANCELLED"];

    if (!allowedStatus.includes(statusParam)) {
      throw new HTTPException(400, { message: "Invalid status" });
    }

    const result = matchs.filter(
      (match) => match.status === statusParam
    );

    return c.json({
      success: true,
      data: result,
    });
  }
}