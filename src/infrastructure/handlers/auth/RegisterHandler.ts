import { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { AppDataSource } from "@infrastructure/database/AppDataSource";
import { User } from "@domain/entities/User";
import { AuthService } from "@application/services/AuthService";
import { ValidationError } from "@domain/errors/ValidationError";
import { ConflictError } from "@domain/errors/ConflictError";
import { RegisterSchema } from "./RegisterSchema";

export class RegisterHandler {
  async handle(c: Context) {
    const body = await c.req.json();

    const validation = RegisterSchema.safeParse(body);

    if (!validation.success) {
      throw new HTTPException(400, { message: "Invalid request body" });
    }

    const { firstname, lastname, email, password } = validation.data;

    const userRepository = AppDataSource.getRepository(User);
    const authService = new AuthService(userRepository);

    try {
      const user = await authService.register(
        firstname,
        lastname,
        email,
        password
      );

      return c.json(
        {
          success: true,
          data: {
            id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
          },
        },
        201
      );
    } catch (error) {
      if (error instanceof ValidationError) {
        throw new HTTPException(400, { message: error.message });
      }

      if (error instanceof ConflictError) {
        throw new HTTPException(409, { message: error.message });
      }

      throw error;
    }
  }
}