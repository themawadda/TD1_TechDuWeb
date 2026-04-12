import {
  Entity,
  PrimaryColumn,
  ManyToOne,
  Column,
} from "typeorm";
import { Stadium } from "./Stadium";
import { Team } from "./Team";
import { MatchStatus } from "../enums/MatchStatus";
import { MatchStage } from "../enums/MatchStage";

@Entity()
export class Match {
  @PrimaryColumn()
  id!: string;

  @ManyToOne(() => Team, { eager: true, nullable: false })
  home!: Team;

  @ManyToOne(() => Team, { eager: true, nullable: false })
  away!: Team;

  @ManyToOne(() => Stadium, { eager: true, nullable: false })
  stadium!: Stadium;

  @Column({
    type: "simple-enum",
    enum: MatchStatus,
  })
  status!: MatchStatus;

  @Column({
    type: "simple-enum",
    enum: MatchStage,
  })
  stage!: MatchStage;

  @Column()
  date!: Date;

  constructor(
    id?: string,
    home?: Team,
    away?: Team,
    stadium?: Stadium,
    status?: MatchStatus,
    stage?: MatchStage,
    date?: Date
  ) {
    if (id !== undefined) {
      if (!id.trim()) {
        throw new Error("Match id is required");
      }
      this.id = id;
    }

    if (home !== undefined) {
      this.home = home;
    }

    if (away !== undefined) {
      this.away = away;
    }

    if (stadium !== undefined) {
      this.stadium = stadium;
    }

    if (status !== undefined) {
      this.status = status;
    }

    if (stage !== undefined) {
      this.stage = stage;
    }

    if (date !== undefined) {
      this.date = date;
    }

    if (home !== undefined && away !== undefined) {
      if (home.fifaCode === away.fifaCode) {
        throw new Error("Teams must be different");
      }
    }
  }
}