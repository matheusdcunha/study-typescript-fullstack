import type { User } from "generated/prisma";
import type { UserRepository } from "@/repositories/user-repository";
import { UserAlreadyExistError } from "./errors/user-already-exist-error";

interface RegisterUserUseCaseRequest {
  name: string;
  lastName: string;
  birthDate: Date;
  email: string;
  password: string;
  cpf: string;
}

interface RegisterUserUseCaseResponse {
  user: User;
}

export class RegisterUserUseCase {
  constructor(private userRepository: UserRepository) { }

  async execute(
    request: RegisterUserUseCaseRequest,
  ): Promise<RegisterUserUseCaseResponse> {
    const { name, lastName, birthDate, email, password, cpf } = request;

    const userWithSameEmail = await this.userRepository.searchOneByParams({
      where: { email },
    });

    if (userWithSameEmail) {
      throw new UserAlreadyExistError();
    }

    const user = await this.userRepository.create({
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
