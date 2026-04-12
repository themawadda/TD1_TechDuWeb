import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from "typeorm";
import { Match } from "./Match";

type Customer = {
  firstname: string;
  lastname: string;
  email: string;
};

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Match, { eager: true, nullable: false })
  match!: Match;

  @Column()
  seat!: string;

  @Column("simple-json")
  customer!: Customer;

  constructor(
    id?: number,
    match?: Match,
    seat?: string,
    customer?: Customer
  ) {
    if (id !== undefined) {
      if (id <= 0) {
        throw new Error("Ticket id must be greater than 0");
      }
      this.id = id;
    }

    if (match !== undefined) {
      this.match = match;
    }

    if (seat !== undefined) {
      if (!seat.trim()) {
        throw new Error("Seat is required");
      }
      this.seat = seat;
    }

    if (customer !== undefined) {
      this.customer = customer;
    }
  }
}