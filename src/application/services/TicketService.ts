import { Repository } from "typeorm";
import { Ticket } from "@domain/entities/Ticket";
import { Match } from "@domain/entities/Match";
import { NotFoundError } from "@domain/errors/NotFoundError";
import { ConflictError } from "@domain/errors/ConflictError";

export class TicketService {
  constructor(
    private ticketRepository: Repository<Ticket>,
    private matchRepository: Repository<Match>
  ) {}

  async createTicket(
    matchId: number,
    seat: string,
    firstname: string,
    lastname: string,
    email: string
  ): Promise<Ticket> {
    const match = await this.matchRepository.findOne({
      where: { id: `m${matchId}` },
    });

    if (!match) {
      throw new NotFoundError("Match not found");
    }

    const existingTicket = await this.ticketRepository.findOne({
      where: {
        match: { id: match.id },
        seat,
      },
    });

    if (existingTicket) {
      throw new ConflictError("Seat already reserved");
    }

    const ticket = new Ticket(
      undefined,
      match,
      seat,
      firstname,
      lastname,
      email
    );

    return await this.ticketRepository.save(ticket);
  }
}