import { Hono } from "hono";
import { RegisterHandler } from "../handlers/auth/RegisterHandler";
import { LoginHandler } from "../handlers/auth/LoginHandler";

const authRouter = new Hono();

const registerHandler = new RegisterHandler();
const loginHandler = new LoginHandler();

authRouter.post("/register", (c) => registerHandler.handle(c));
authRouter.post("/login", (c) => loginHandler.handle(c));

export { authRouter };