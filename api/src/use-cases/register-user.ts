import type { User } from "generated/prisma";
import type { UserRepository } from "@/repositories/user-repository";
import { UserAlreadyExistError } from "./errors/user-already-exist-error";
import { hash } from "bcryptjs";
import { UserWithSameCpfError } from "./errors/user-with-same-cpf-error";

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

    const userWithSameCpf = await this.userRepository.searchOneByParams({
      where: { cpf },
    });

    if (userWithSameCpf) {
      throw new UserWithSameCpfError();
    }

    const hashedPassword = await hash(password, 8);

    const user = await this.userRepository.create({
      name,
      lastName,
      birthDate,
      email,
      password: hashedPassword,
      cpf,
    });

    return { user };
  }
}
