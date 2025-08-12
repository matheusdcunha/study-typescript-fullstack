import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-user-repository";
import { UserNotExistError } from "./errors/user-not-exist-error";
import { UpdateUserUseCase } from "./update-user";

let userRepository: InMemoryUserRepository;
let sut: UpdateUserUseCase;

describe("Update User Use Case", () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    sut = new UpdateUserUseCase(userRepository);
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to update a user", async () => {
    const user = await userRepository.create({
      name: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      password: "password",
      birthDate: new Date(),
      cpf: "12345678901",
    });

    const { user: updatedUser } = await sut.execute({
      id: user.id,
      name: "Jane",
      lastName: "Doe",
      email: "jane.doe@example.com",
      password: "password",
      birthDate: new Date(),
    });

    expect(updatedUser.name).toBe("Jane");
    expect(updatedUser.lastName).toBe("Doe");
    expect(updatedUser.email).toBe("jane.doe@example.com");
    expect(updatedUser.password).toBe("password");
    expect(updatedUser.birthDate).toStrictEqual(new Date());
  });

  it("should not be able to update a user that does not exist", async () => {
    await expect(
      sut.execute({
        id: "non-existent-id",
      }),
    ).rejects.toThrow(UserNotExistError);
  });

});
