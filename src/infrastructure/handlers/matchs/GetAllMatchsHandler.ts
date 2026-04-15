import { Context } from "hono";
import { AppDataSource } from "@infrastructure/database/AppDataSource";
import { Match } from "@domain/entities/Match";
import { MatchService } from "@application/services/MatchService";

export class GetAllMatchsHandler {
  async handle(c: Context) {
    const matchRepository = AppDataSource.getRepository(Match);
    const matchService = new MatchService(matchRepository);

    const matchs = await matchService.getAllMatchs();

    return c.json({
      success: true,
      data: matchs,
    });
  }
}