import { PrismaUserRepository } from "@/repositories/prisma/prisma-user-repository";
import { RegisterUserUseCase } from "../register-user";

export function makeRegisterUseCase() {
  const userRepository = new PrismaUserRepository();
  return new RegisterUserUseCase(userRepository);
}
