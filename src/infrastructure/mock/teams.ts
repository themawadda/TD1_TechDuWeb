import { Team } from "@domain/entities/Team";
import { countries } from "./countries";

const usa = countries.find((c) => c.fifaCode === "USA")!;
const mex = countries.find((c) => c.fifaCode === "MEX")!;
const can = countries.find((c) => c.fifaCode === "CAN")!;

export const teams = [
  new Team("USA", usa, "Qualified (Host)"),
  new Team("MEX", mex, "Qualified (Host)"),
  new Team("CAN", can, "Qualified (Host)"),
];