import { City } from "./City";

export class Stadium {
  constructor(
    public readonly name: string,
    public readonly city: City,
    public readonly capacity: number
  ) {
    if (!name.trim()) {
      throw new Error("Stadium name is required");
    }

    if (!Number.isFinite(capacity) || capacity <= 0) {
      throw new Error("Capacity must be greater than 0");
    }
  }
}