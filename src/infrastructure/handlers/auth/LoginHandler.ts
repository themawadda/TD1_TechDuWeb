import { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { AppDataSource } from "@infrastructure/database/AppDataSource";
import { User } from "@domain/entities/User";
import { AuthService } from "@application/services/AuthService";
import { ValidationError } from "@domain/errors/ValidationError";
import { NotFoundError } from "@domain/errors/NotFoundError";
import { LoginSchema } from "./LoginSchema";

export class LoginHandler {
  async handle(c: Context) {
    const body = await c.req.json();

    const validation = LoginSchema.safeParse(body);

    if (!validation.success) {
      throw new HTTPException(400, { message: "Invalid request body" });
    }

    const { email, password } = validation.data;

    const userRepository = AppDataSource.getRepository(User);
    const authService = new AuthService(userRepository);

    try {
      const token = await authService.login(email, password);

      return c.json({
        success: true,
        data: {
          token,
        },
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