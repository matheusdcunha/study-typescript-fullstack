import type { User } from "generated/prisma";
import type { UserRepository } from "@/repositories/user-repository";
import { UserNotExistError } from "./errors/user-not-exist-error";
import { hash } from "bcryptjs";
import { UserWithSameEmailError } from "./errors/user-with-same-email-error";
import { UserWithSameCpfError } from "./errors/user-with-same-cpf-error";

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

    const userWithSameEmail = await this.userRepository.searchOneByParams({
      where: { email },
    });

    if (userWithSameEmail && userWithSameEmail.id !== id) {
      throw new UserWithSameEmailError();
    }

    const userWithSameCpf = await this.userRepository.searchOneByParams({
      where: { cpf },
    });

    if (userWithSameCpf && userWithSameCpf.id !== id) {
      throw new UserWithSameCpfError();
    }

    let hashedPassword: string | undefined;

    if (password) {
      hashedPassword = await hash(password, 8);
    }

    const user = await this.userRepository.update({
      id,
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
