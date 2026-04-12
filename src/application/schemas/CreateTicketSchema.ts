import { z } from "zod";

export const CreateTicketSchema = z.object({
  matchId: z.string().min(1, "matchId is required"),
  buyerName: z.string().min(1, "buyerName is required"),
  quantity: z.number().int().positive("quantity must be > 0"),
});