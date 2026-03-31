import { Match } from "@domain/entities/Match";
import { MatchStatus } from "@domain/enums/MatchStatus";
import { MatchStage } from "@domain/enums/MatchStage";
import { stadiums } from "./stadiums";
import { teams } from "./teams";

const byId = (id: string) => teams.find((t) => t.id === id)!;

export const matchs = [
  new Match(
    "m1",
    byId("USA"),
    byId("MEX"),
    stadiums[1],
    MatchStatus.Scheduled,
    MatchStage.Group
  ),
  new Match(
    "m2",
    byId("FRA"),
    byId("BRA"),
    stadiums[0],
    MatchStatus.Scheduled,
    MatchStage.Group
  ),
  new Match(
    "m3",
    byId("MAR"),
    byId("CAN"),
    stadiums[2],
    MatchStatus.Scheduled,
    MatchStage.Group
  ),
];