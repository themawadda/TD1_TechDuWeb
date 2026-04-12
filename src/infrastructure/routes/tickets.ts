import { Hono } from "hono";
import { CreateTicketHandler } from "../handlers/tickets/CreateTicketHandler";

const ticketsRouter = new Hono();

const createTicketHandler = new CreateTicketHandler();

ticketsRouter.post("/", (c) => createTicketHandler.handle(c));

export { ticketsRouter };