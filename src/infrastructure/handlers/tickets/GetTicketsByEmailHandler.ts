import { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { AppDataSource } from "@infrastructure/database/AppDataSource";
import { Ticket } from "@domain/entities/Ticket";
import { Match } from "@domain/entities/Match";
import { TicketService } from "@application/services/TicketService";
import { ValidationError } from "@domain/errors/ValidationError";
import { NotFoundError } from "@domain/errors/NotFoundError";

export class GetTicketsByEmailHandler {
  async handle(c: Context) {
    const email = c.req.query("email");

    if (!email) {
      throw new HTTPException(400, { message: "Email is required" });
    }

    const ticketRepository = AppDataSource.getRepository(Ticket);
    const matchRepository = AppDataSource.getRepository(Match);

    const ticketService = new TicketService(ticketRepository, matchRepository);

    try {
      const tickets = await ticketService.getTicketsByEmail(email);

      return c.json({
        success: true,
        data: tickets,
      });
    } catch (error) {
      if (error instanceof ValidationError) {
        throw new HTTPException(400, { message: error.message });
      }

      if (error instanceof NotFoundError) {
        throw new HTTPException(404, { message: error.message });
      }

      throw error;
    }
  }
}