import { UserRepository } from "@/repositories/user-repository";
import { UserNotExistError } from "./errors/user-not-exist-error";

interface SearchUsersUseCaseRequest {
  name?: string;
  lastName?: string;
  birthDate?: Date;
}

export class SearchUsersUseCase {
  constructor(
    private userRepository: UserRepository,
  ) { }

  async execute(request: SearchUsersUseCaseRequest) {
    const where: SearchUsersUseCaseRequest = {};

    if (request.name) where.name = request.name;
    if (request.lastName) where.lastName = request.lastName;
    if (request.birthDate) where.birthDate = request.birthDate;

    const users = await this.userRepository.searchManyByParams({ where });

    if (!users) {
      throw new UserNotExistError();
    }

    const usersWithoutPassword = users.map((user) => ({
      name: user.name,
      lastName: user.lastName,
      birthDate: user.birthDate,
      email: user.email,
      cpf: user.cpf,
    }));

    return usersWithoutPassword;
  }
}

