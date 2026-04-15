import { Repository } from "typeorm";
import { User } from "@domain/entities/User";
import { ConflictError } from "@domain/errors/ConflictError";
import { ValidationError } from "@domain/errors/ValidationError";
import { NotFoundError } from "@domain/errors/NotFoundError";
import { hash, compare } from "bcryptjs";
import * as jwt from "jsonwebtoken";

export class AuthService {
  constructor(private userRepository: Repository<User>) {}

  async register(
    firstname: string,
    lastname: string,
    email: string,
    password: string
  ): Promise<User> {
    if (!firstname.trim()) {
      throw new ValidationError("Firstname is required");
    }

    if (!lastname.trim()) {
      throw new ValidationError("Lastname is required");
    }

    if (!email.trim()) {
      throw new ValidationError("Email is required");
    }

    if (!password.trim()) {
      throw new ValidationError("Password is required");
    }

    const existingUser = await this.userRepository.findOne({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictError("User already exists");
    }

    const hashedPassword = await hash(password, 10);

    const user = this.userRepository.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });

    return await this.userRepository.save(user);
  }

  async login(email: string, password: string): Promise<string> {
    if (!email.trim()) {
      throw new ValidationError("Email is required");
    }

    if (!password.trim()) {
      throw new ValidationError("Password is required");
    }

    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new NotFoundError("User not found");
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      throw new ValidationError("Invalid credentials");
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    return token;
  }
}