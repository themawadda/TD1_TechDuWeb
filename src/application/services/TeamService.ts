import { Repository } from "typeorm";
import { Team } from "@domain/entities/Team";
import { Match } from "@domain/entities/Match";
import { NotFoundError } from "@domain/errors/NotFoundError";
import { ValidationError } from "@domain/errors/ValidationError";

const allowedStages = [
  "group",
  "round_of_32",
  "round_of_16",
  "quarter_finals",
  "semi_finals",
  "third_place",
  "final",
] as const;

export class TeamService {
  constructor(
    private teamRepository: Repository<Team>,
    private matchRepository?: Repository<Match>
  ) {}

  async getTeamByFifaCode(fifaCode: string): Promise<Team> {
    if (!/^[A-Z]{3}$/.test(fifaCode)) {
      throw new ValidationError("Invalid FIFA code");
    }

    const team = await this.teamRepository.findOne({
      where: { fifaCode },
    });

    if (!team) {
      throw new NotFoundError("Team not found");
    }

    return team;
  }

  async getTeamMatchsByFifaCode(fifaCode: string): Promise<Match[]> {
    if (!/^[A-Z]{3}$/.test(fifaCode)) {
      throw new ValidationError("Invalid FIFA code");
    }

    if (!this.matchRepository) {
      return [];
    }

    const allMatchs = await this.matchRepository.find();

    return allMatchs.filter(
      (match) =>
        match.home.fifaCode === fifaCode ||
        match.away.fifaCode === fifaCode
    );
  }

  async getTeamMatchsByStage(
    fifaCode: string,
    stage: string
  ): Promise<Match[]> {
    if (!/^[A-Z]{3}$/.test(fifaCode)) {
      throw new ValidationError("Invalid FIFA code");
    }

    if (!allowedStages.includes(stage as (typeof allowedStages)[number])) {
      throw new ValidationError("Invalid stage");
    }

    const team = await this.teamRepository.findOne({
      where: { fifaCode },
    });

    if (!team) {
      throw new NotFoundError("Team not found");
    }

    if (!this.matchRepository) {
      return [];
    }

    const stageMap: Record<string, string> = {
      group: "GROUP",
      round_of_32: "ROUND_OF_32",
      round_of_16: "ROUND_OF_16",
      quarter_finals: "QUARTER_FINAL",
      semi_finals: "SEMI_FINAL",
      third_place: "THIRD_PLACE",
      final: "FINAL",
    };

    const normalizedStage = stageMap[stage];

    const allMatchs = await this.matchRepository.find();

    return allMatchs.filter(
      (match) =>
        (match.home.fifaCode === fifaCode ||
          match.away.fifaCode === fifaCode) &&
        match.stage === normalizedStage
    );
  }
}