import { Country } from "./Country";

export class City {
  constructor(
    public readonly name: string,
    public readonly country: Country
  ) {
    if (!name.trim()) {
      throw new Error("City name is required");
    }
  }
}