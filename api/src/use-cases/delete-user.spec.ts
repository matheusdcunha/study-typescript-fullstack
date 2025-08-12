import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-user-repository";
import { DeleteUserUseCase } from "./delete-user";
import { UserNotExistError } from "./errors/user-not-exist-error";

let userRepository: InMemoryUserRepository;
let sut: DeleteUserUseCase;

describe("Delete User Use Case", () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    sut = new DeleteUserUseCase(userRepository);
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to delete a user", async () => {
    const user = await userRepository.create({
      id: "1",
      name: "John",
      lastName: "Doe",
      birthDate: new Date("1990-01-01"),
      email: "john.doe@example.com",
      password: "password",
      cpf: "12345678901",
    });

    await sut.execute({
      id: user.id,
    });

    const deletedUser = await userRepository.searchOneByParams({
      where: { id: user.id },
    });

    expect(deletedUser).toBeNull();
  });

  it("should not be able to delete a user that does not exist", async () => {
    await expect(sut.execute({
      id: "1",
    })).rejects.toThrow(UserNotExistError);
  });

});
