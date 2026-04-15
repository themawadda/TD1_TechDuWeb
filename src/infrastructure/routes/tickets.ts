import { Hono } from "hono";
import { CreateTicketHandler } from "../handlers/tickets/CreateTicketHandler";
import { GetTicketsByEmailHandler } from "../handlers/tickets/GetTicketsByEmailHandler";
import { authMiddleware } from "../middleware/auth";

const ticketsRouter = new Hono();

const createTicketHandler = new CreateTicketHandler();
const getTicketsByEmailHandler = new GetTicketsByEmailHandler();

ticketsRouter.use("*", authMiddleware);

ticketsRouter.get("/", (c) => getTicketsByEmailHandler.handle(c));
ticketsRouter.post("/", (c) => createTicketHandler.handle(c));

export { ticketsRouter };