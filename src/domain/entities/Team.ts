import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Country } from "./Country";

@Entity()
export class Team {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  fifaCode!: string;

  @ManyToOne(() => Country, { eager: true, nullable: false })
  country!: Country;

  @Column()
  status!: string;

  constructor(fifaCode?: string, country?: Country, status?: string) {
    if (fifaCode !== undefined) {
      if (!fifaCode.trim()) {
        throw new Error("Team FIFA code is required");
      }
      this.fifaCode = fifaCode;
    }

    if (country !== undefined) {
      this.country = country;
    }

    if (status !== undefined) {
      if (!status.trim()) {
        throw new Error("Team status is required");
      }
      this.status = status;
    }
  }
}