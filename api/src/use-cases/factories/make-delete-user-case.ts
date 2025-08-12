import { PrismaUserRepository } from "@/repositories/prisma/prisma-user-repository";
import { DeleteUserUseCase } from "@/use-cases/delete-user";

export function makeDeleteUserUseCase() {
  const userRepository = new PrismaUserRepository();
  return new DeleteUserUseCase(userRepository);
}
