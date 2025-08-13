import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-user-repository";
import { UserNotExistError } from "./errors/user-not-exist-error";
import { GetUserUseCase } from "./get-user";

let userRepository: InMemoryUserRepository;
let sut: GetUserUseCase;

describe("Get User Use Case", () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    sut = new GetUserUseCase(userRepository);
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to get a user by id", async () => {
    const user = await userRepository.create({
      id: "1",
      name: "John",
      lastName: "Doe",
      birthDate: new Date("1990-01-01"),
      email: "john.doe@example.com",
      password: "password",
      cpf: "12345678901",
    });

    const searchedUser = await sut.execute({
      id: user.id,
    });


    expect(searchedUser.name).toBe(user.name);
    expect(searchedUser.lastName).toBe(user.lastName);
    expect(searchedUser.birthDate).toBe(user.birthDate);
    expect(searchedUser.email).toBe(user.email);
    expect(searchedUser.cpf).toBe(user.cpf);


  });

  it("should be able to get a user by email", async () => {
    const user = await userRepository.create({
      id: "1",
      name: "John",
      lastName: "Doe",
      birthDate: new Date("1990-01-01"),
      email: "john.doe@example.com",
      password: "password",
      cpf: "12345678901",
    });

    const searchedUser = await sut.execute({
      email: user.email,
    });

    expect(searchedUser.name).toBe(user.name);
    expect(searchedUser.lastName).toBe(user.lastName);
    expect(searchedUser.birthDate).toBe(user.birthDate);
    expect(searchedUser.email).toBe(user.email);
    expect(searchedUser.cpf).toBe(user.cpf);
  });

  it("should be able to get a user by cpf", async () => {
    const user = await userRepository.create({
      id: "1",
      name: "John",
      lastName: "Doe",
      birthDate: new Date("1990-01-01"),
      email: "john.doe@example.com",
      password: "password",
      cpf: "12345678901",
    });

    const searchedUser = await sut.execute({
      cpf: user.cpf,
    });

    expect(searchedUser.name).toBe(user.name);
    expect(searchedUser.lastName).toBe(user.lastName);
    expect(searchedUser.birthDate).toBe(user.birthDate);

  })

  it("should not be able to get a user that does not exist", async () => {
    await expect(sut.execute({
      id: "1",
    })).rejects.toThrow(UserNotExistError);
  });

});