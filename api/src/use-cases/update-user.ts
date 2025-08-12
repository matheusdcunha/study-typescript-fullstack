import type { User } from "generated/prisma";
import type { UserRepository } from "@/repositories/user-repository";
import { UserNotExistError } from "./errors/user-not-exist-error";

interface UpdateUserUseCaseRequest {
  id?: string;
  name?: string;
  lastName?: string;
  birthDate?: Date;
  email?: string;
  password?: string;
  cpf?: string;
}

interface UpdateUserUseCaseResponse {
  user: User;
}

export class UpdateUserUseCase {
  constructor(private userRepository: UserRepository) { }

  async execute(
    request: UpdateUserUseCaseRequest,
  ): Promise<UpdateUserUseCaseResponse> {

    const { id, name, lastName, birthDate, email, password, cpf } = request;

    const existingUser = await this.userRepository.searchOneByParams({
      where: { id },
    });

    if (!existingUser) {
      throw new UserNotExistError();
    }

    const user = await this.userRepository.update({
      id,
      name,
      lastName,
      birthDate,
      email,
      password,
      cpf,
    });

    return { user };
  }
}
