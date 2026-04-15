import { Context, Next } from "hono";
import { HTTPException } from "hono/http-exception";
import * as jwt from "jsonwebtoken";

export const authMiddleware = async (c: Context, next: Next) => {
  const authHeader = c.req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new HTTPException(401, { message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET as string);
    c.set("user", payload);
    await next();
  } catch {
    throw new HTTPException(401, { message: "Invalid token" });
  }
};