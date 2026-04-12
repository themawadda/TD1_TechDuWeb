import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { City } from "./City";

@Entity()
export class Stadium {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @ManyToOne(() => City, { eager: true, nullable: false })
  city!: City;

  @Column()
  capacity!: number;

  constructor(name?: string, city?: City, capacity?: number) {
    if (name !== undefined) {
      if (!name.trim()) {
        throw new Error("Stadium name is required");
      }
      this.name = name;
    }

    if (city !== undefined) {
      this.city = city;
    }

    if (capacity !== undefined) {
      if (!Number.isFinite(capacity) || capacity <= 0) {
        throw new Error("Capacity must be greater than 0");
      }
      this.capacity = capacity;
    }
  }
}