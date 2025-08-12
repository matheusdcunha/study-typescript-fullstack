import type { UserRepository } from "@/repositories/user-repository";
import { UserNotExistError } from "./errors/user-not-exist-error";

interface DeleteUserUseCaseRequest {
  id: string;
}

export class DeleteUserUseCase {
  constructor(private userRepository: UserRepository) { }

  async execute(request: DeleteUserUseCaseRequest) {

    const { id } = request;

    const user = await this.userRepository.searchOneByParams({
      where: { id },
    });

    if (!user) {
      throw new UserNotExistError();
    }

    await this.userRepository.delete({
      where: { id },
    });
  }
}
