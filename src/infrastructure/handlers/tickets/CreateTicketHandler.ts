import { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { matchs } from "@infrastructure/mock/matchs";
import { tickets } from "@infrastructure/mock/tickets";
import { Ticket } from "@domain/entities/Ticket";
import { CreateTicketSchema } from "./CreateTicketSchema";

export class CreateTicketHandler {
  async handle(c: Context) {
    const body = await c.req.json();

    const validation = CreateTicketSchema.safeParse(body);

    if (!validation.success) {
      throw new HTTPException(400, { message: "Invalid request body" });
    }

    const { matchId, seat, customer } = validation.data;

    const match = matchs.find((match) => match.id === `m${matchId}`);

    if (!match) {
      throw new HTTPException(404, { message: "Match not found" });
    }

    const existingTicket = tickets.find(
      (ticket) => ticket.match.id === match.id && ticket.seat === seat
    );

    if (existingTicket) {
      throw new HTTPException(409, { message: "Seat already reserved" });
    }

    const ticket = new Ticket(
      tickets.length + 1,
      match,
      seat,
      customer
    );

    tickets.push(ticket);

    return c.json(
      {
        success: true,
        data: ticket,
      },
      201
    );
  }
}