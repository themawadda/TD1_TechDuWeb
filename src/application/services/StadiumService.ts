import { Repository } from "typeorm";
import { Stadium } from "@domain/entities/Stadium";
import { Match } from "@domain/entities/Match";
import { NotFoundError } from "@domain/errors/NotFoundError";

export class StadiumService {
  constructor(
    private stadiumRepository: Repository<Stadium>,
    private matchRepository?: Repository<Match>
  ) {}

  async getStadiumByName(name: string): Promise<Stadium> {
    const allStadiums = await this.stadiumRepository.find();

    const stadium = allStadiums.find(
      (stadium) => stadium.name.toLowerCase() === name.toLowerCase()
    );

    if (!stadium) {
      throw new NotFoundError("Stadium not found");
    }

    return stadium;
  }

  async getStadiumMatchs(name: string): Promise<Match[]> {
    const stadium = await this.getStadiumByName(name);

    if (!this.matchRepository) {
      return [];
    }

    const allMatchs = await this.matchRepository.find();

    return allMatchs.filter(
      (match) =>
        match.stadium.name.toLowerCase() === stadium.name.toLowerCase()
    );
  }
}