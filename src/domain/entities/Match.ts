import { Stadium } from "./Stadium";
import { Team } from "./Team";
import { MatchStatus } from "../enums/MatchStatus";
import { MatchStage } from "../enums/MatchStage";

export class Match {
  constructor(
    public readonly id: string,
    public readonly home: Team,
    public readonly away: Team,
    public readonly stadium: Stadium,
    public readonly status: MatchStatus,
    public readonly stage: MatchStage,
    public readonly date: Date
  ) {
    if (!id.trim()) {
      throw new Error("Match id is required");
    }

    if (home.id === away.id) {
      throw new Error("Teams must be different");
    }
  }
}