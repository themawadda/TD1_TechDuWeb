import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from "typeorm";
import { Match } from "./Match";

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Match, { eager: true, nullable: false })
  match!: Match;

  @Column()
  seat!: string;

  @Column()
  firstname!: string;

  @Column()
  lastname!: string;

  @Column()
  email!: string;

  constructor(
    id?: number,
    match?: Match,
    seat?: string,
    firstname?: string,
    lastname?: string,
    email?: string
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

    if (firstname !== undefined) {
      this.firstname = firstname;
    }

    if (lastname !== undefined) {
      this.lastname = lastname;
    }

    if (email !== undefined) {
      this.email = email;
    }
  }
}