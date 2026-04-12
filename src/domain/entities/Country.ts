import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Country {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  fifaCode!: string;

  @Column()
  confederation!: string;

  @Column({ unique: true })
  code!: string;

  constructor(
    name?: string,
    fifaCode?: string,
    confederation?: string,
    code?: string
  ) {
    if (name !== undefined) {
      if (!name.trim()) {
        throw new Error("Country name is required");
      }
      this.name = name;
    }

    if (fifaCode !== undefined) {
      if (!/^[A-Z]{3}$/.test(fifaCode)) {
        throw new Error("Invalid FIFA code");
      }
      this.fifaCode = fifaCode;
    }

    if (confederation !== undefined) {
      if (!confederation.trim()) {
        throw new Error("Confederation is required");
      }
      this.confederation = confederation;
    }

    if (code !== undefined) {
      if (!/^[a-z]{2}$/.test(code)) {
        throw new Error("Invalid country code");
      }
      this.code = code;
    }
  }
}