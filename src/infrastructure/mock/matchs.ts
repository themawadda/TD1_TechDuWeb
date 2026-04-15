import { Match } from "@domain/entities/Match";
import { MatchStatus } from "@domain/entities/MatchStatus";
import { MatchStage } from "@domain/entities/MatchStage";
import { stadiums } from "./stadiums";
import { teams } from "./teams";

const byFifaCode = (code: string) => teams.find((t) => t.fifaCode === code)!;

export const matchs = [
  new Match(
    "m1",
    byFifaCode("USA"),
    byFifaCode("MEX"),
    stadiums[1],
    MatchStatus.Scheduled,
    MatchStage.Group,
    new Date("2026-06-15T18:00:00.000Z")
  ),
  new Match(
    "m2",
    byFifaCode("CAN"),
    byFifaCode("USA"),
    stadiums[0],
    MatchStatus.Scheduled,
    MatchStage.Group,
    new Date("2026-06-16T18:00:00.000Z")
  ),
  new Match(
    "m3",
    byFifaCode("MEX"),
    byFifaCode("CAN"),
    stadiums[2],
    MatchStatus.Scheduled,
    MatchStage.Group,
    new Date("2026-06-15T21:00:00.000Z")
  ),
];