import { Team } from "@domain/entities/Team";
import { Country } from "@domain/entities/Country";

const usa = new Country("États-Unis", "USA", "CONCACAF");
const mex = new Country("Mexique", "MEX", "CONCACAF");
const can = new Country("Canada", "CAN", "CONCACAF");
const fra = new Country("France", "FRA", "UEFA");
const mar = new Country("Maroc", "MAR", "CAF");
const bra = new Country("Brésil", "BRA", "CONMEBOL");

export const teams = [
  new Team("USA", usa, "Qualified (Host)"),
  new Team("MEX", mex, "Qualified (Host)"),
  new Team("CAN", can, "Qualified (Host)"),
  new Team("FRA", fra, "Qualified"),
  new Team("MAR", mar, "Qualified"),
  new Team("BRA", bra, "Qualified"),
];