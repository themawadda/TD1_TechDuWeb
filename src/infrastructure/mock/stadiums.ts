import { Stadium } from "@domain/entities/Stadium";
import { cities } from "./cities";

const vancouver = cities.find((c) => c.name === "Vancouver")!;
const newYork = cities.find((c) => c.name === "New York")!;
const mexicoCity = cities.find((c) => c.name === "Mexico City")!;

export const stadiums = [
  new Stadium("Vancouver BC Place", vancouver, 54000),
  new Stadium("MetLife Stadium", newYork, 75000),
  new Stadium("Estadio Azteca", mexicoCity, 72766),
];