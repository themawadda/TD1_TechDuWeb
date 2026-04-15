import { Repository } from "typeorm";
import { Match } from "@domain/entities/Match";

export class MatchService {
  constructor(private matchRepository: Repository<Match>) {}

  async getAllMatchs(): Promise<Match[]> {
    return await this.matchRepository.find();
  }
}