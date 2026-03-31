export class Country {
  constructor(
    public readonly name: string,
    public readonly fifaCode: string,
    public readonly confederation: string,
    public readonly code: string
  ) {
    if (!name.trim()) {
      throw new Error("Country name is required");
    }

    if (!/^[A-Z]{3}$/.test(fifaCode)) {
      throw new Error("Invalid FIFA code");
    }

    if (!confederation.trim()) {
      throw new Error("Confederation is required");
    }

    if (!/^[a-z]{2}$/.test(code)) {
      throw new Error("Invalid country code");
    }
  }
}