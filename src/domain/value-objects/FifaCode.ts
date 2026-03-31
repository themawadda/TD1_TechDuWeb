export class FifaCode {
  public readonly value: string;

  constructor(value: string) {
    const normalizedValue = value.trim().toUpperCase();

    if (!/^[A-Z]{3}$/.test(normalizedValue)) {
      throw new Error("Invalid FIFA code");
    }

    this.value = normalizedValue;
  }
}