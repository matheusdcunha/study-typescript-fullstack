import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-user-repository";
import { UserAlreadyExistError } from "./errors/user-already-exist-error";
import { RegisterUserUseCase } from "./register-user";

let userRepository: InMemoryUserRepository;
let sut: RegisterUserUseCase;

describe("Register User Use Case", () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    sut = new RegisterUserUseCase(userRepository);
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to register a new user", async () => {
    const { user } = await sut.execute({
      name: "John",
      lastName: "Doe",
      birthDate: new Date("1990-01-01"),
      email: "john.doe@example.com",
      password: "password",
      cpf: "12345678901",
    });

    expect(user.id).toEqual(expect.any(String));
    expect(user.name).toEqual("John");
    expect(user.lastName).toEqual("Doe");
    expect(user.birthDate).toEqual(new Date("1990-01-01"));
    expect(user.email).toEqual("john.doe@example.com");
    expect(user.password).toEqual("password");
    expect(user.cpf).toEqual("12345678901");
  });

  it("should not be able to register a new user with same email", async () => {
    await sut.execute({
      name: "John",
      lastName: "Doe",
      birthDate: new Date("1990-01-01"),
      email: "john.doe@example.com",
      password: "password",
      cpf: "12345678901",
    });

    await expect(sut.execute({
      name: "John",
      lastName: "Doe",
      birthDate: new Date("1990-01-01"),
      email: "john.doe@example.com",
      password: "password",
      cpf: "12345678901",
    })).rejects.toThrow(UserAlreadyExistError);
  });
});
