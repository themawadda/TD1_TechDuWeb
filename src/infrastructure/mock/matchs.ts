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
    MatchStage.Group,
    new Date("2026-06-15T18:00:00.000Z")
  ),
  new Match(
    "m2",
    byId("FRA"),
    byId("BRA"),
    stadiums[0],
    MatchStatus.Scheduled,
    MatchStage.Group,
    new Date("2026-06-16T18:00:00.000Z")
  ),
  new Match(
    "m3",
    byId("MAR"),
    byId("CAN"),
    stadiums[2],
    MatchStatus.Scheduled,
    MatchStage.Group,
    new Date("2026-06-15T21:00:00.000Z")
  ),
];