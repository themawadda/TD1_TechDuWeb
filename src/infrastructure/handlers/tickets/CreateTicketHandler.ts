import { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { AppDataSource } from "@infrastructure/database/AppDataSource";
import { Ticket } from "@domain/entities/Ticket";
import { Match } from "@domain/entities/Match";
import { TicketService } from "@application/services/TicketService";
import { ValidationError } from "@domain/errors/ValidationError";
import { NotFoundError } from "@domain/errors/NotFoundError";
import { ConflictError } from "@domain/errors/ConflictError";
import { CreateTicketSchema } from "./CreateTicketSchema";

export class CreateTicketHandler {
  async handle(c: Context) {
    const body = await c.req.json();

    const validation = CreateTicketSchema.safeParse(body);

    if (!validation.success) {
      throw new HTTPException(400, { message: "Invalid request body" });
    }

    const { matchId, seat, firstname, lastname, email } = validation.data;

    const ticketRepository = AppDataSource.getRepository(Ticket);
    const matchRepository = AppDataSource.getRepository(Match);

    const ticketService = new TicketService(
      ticketRepository,
      matchRepository
    );

    try {
      const ticket = await ticketService.createTicket(
        matchId,
        seat,
        firstname,
        lastname,
        email
      );

      return c.json(
        {
          success: true,
          data: ticket,
        },
        201
      );
    } catch (error) {
      if (error instanceof ValidationError) {
        throw new HTTPException(400, { message: error.message });
      }

      if (error instanceof NotFoundError) {
        throw new HTTPException(404, { message: error.message });
      }

      if (error instanceof ConflictError) {
        throw new HTTPException(409, { message: error.message });
      }

      throw error;
    }
  }
}