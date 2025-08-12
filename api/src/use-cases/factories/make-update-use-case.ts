import { PrismaUserRepository } from "@/repositories/prisma/prisma-user-repository";
import { UpdateUserUseCase } from "@/use-cases/update-user";

export function makeUpdateUserUseCase() {
  const userRepository = new PrismaUserRepository();
  return new UpdateUserUseCase(userRepository);
}