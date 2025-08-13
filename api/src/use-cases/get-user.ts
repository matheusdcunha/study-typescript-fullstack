import { UserRepository } from "@/repositories/user-repository";
import { UserNotExistError } from "./errors/user-not-exist-error";

interface GetUserUseCaseRequest {
  id?: string;
  email?: string;
  cpf?: string;
}

export class GetUserUseCase {
  constructor(
    private userRepository: UserRepository,
  ) { }

  async execute(request: GetUserUseCaseRequest) {
    const where: GetUserUseCaseRequest = {};

    if (request.id) where.id = request.id;
    if (request.email) where.email = request.email;
    if (request.cpf) where.cpf = request.cpf;

    const user = await this.userRepository.searchOneByParams({ where });

    if (!user) {
      throw new UserNotExistError();
    }

    const userWithoutPassword = {
      name: user.name,
      lastName: user.lastName,
      birthDate: user.birthDate,
      email: user.email,
      cpf: user.cpf,
    };

    return userWithoutPassword;
  }
}

