import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Country } from "./Country";

@Entity()
export class City {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @ManyToOne(() => Country, { eager: true, nullable: false })
  country!: Country;

  constructor(name?: string, country?: Country) {
    if (name !== undefined) {
      if (!name.trim()) {
        throw new Error("City name is required");
      }
      this.name = name;
    }

    if (country !== undefined) {
      this.country = country;
    }
  }
}