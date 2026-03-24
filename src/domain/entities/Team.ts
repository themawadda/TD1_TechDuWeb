import { Country } from "./Country";

export class Team {
  constructor(
    public readonly id: string,
    public readonly country: Country,
    public readonly status: string
  ) {
    if (!id.trim()) {
      throw new Error("Team id is required");
    }

    if (!status.trim()) {
      throw new Error("Team status is required");
    }
  }
}