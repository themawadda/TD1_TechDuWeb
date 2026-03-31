import { City } from "@domain/entities/City";
import { countries } from "./countries";

const canada = countries.find((c) => c.fifaCode === "CAN")!;
const usa = countries.find((c) => c.fifaCode === "USA")!;
const mexico = countries.find((c) => c.fifaCode === "MEX")!;

export const cities = [
  new City("Vancouver", canada),
  new City("New York", usa),
  new City("Mexico City", mexico),
];