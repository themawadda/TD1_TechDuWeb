import { Team } from "@domain/entities/Team";
import { Country } from "@domain/entities/Country";

const usa = new Country("États-Unis", "USA", "CONCACAF", "us");
const mex = new Country("Mexique", "MEX", "CONCACAF", "me");
const can = new Country("Canada", "CAN", "CONCACAF", "ca");
const fra = new Country("France", "FRA", "UEFA", "fr");
const mar = new Country("Maroc", "MAR", "CAF", "ma");
const bra = new Country("Brésil", "BRA", "CONMEBOL", "br");

export const teams = [
  new Team("USA", usa, "Qualified (Host)"),
  new Team("MEX", mex, "Qualified (Host)"),
  new Team("CAN", can, "Qualified (Host)"),
  new Team("FRA", fra, "Qualified"),
  new Team("MAR", mar, "Qualified"),
  new Team("BRA", bra, "Qualified"),
];