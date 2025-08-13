import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-user-repository";
import { UserNotExistError } from "./errors/user-not-exist-error";
import { SearchUsersUseCase } from "./search-users";

let userRepository: InMemoryUserRepository;
let sut: SearchUsersUseCase;

describe("Search Users Use Case", () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    sut = new SearchUsersUseCase(userRepository);
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to search users", async () => {
    await userRepository.create({
      id: "1",
      name: "John",
      lastName: "Doe",
      birthDate: new Date("1990-01-01"),
      email: "john.doe@example.com",
      password: "password",
      cpf: "12345678901",
    });

    await userRepository.create({
      id: "2",
      name: "John",
      lastName: "Doe",
      birthDate: new Date("1990-01-01"),
      email: "john.d1oe@example.com",
      password: "password",
      cpf: "12345671901",
    });

    await userRepository.create({
      id: "3",
      name: "John",
      lastName: "Doe",
      birthDate: new Date("1990-01-01"),
      email: "john.do3e@example.com",
      password: "password",
      cpf: "12345678201",
    });

    await userRepository.create({
      id: "4",
      name: "John",
      lastName: "Doe",
      birthDate: new Date("1990-01-01"),
      email: "john.doe5@example.com",
      password: "password",
      cpf: "1234567401",
    });

    const searchedUser = await sut.execute({});

    expect(searchedUser.length).toBe(4);
  });

  it("should be able to search users by name", async () => {
    const user = await userRepository.create({
      id: "1",
      name: "John",
      lastName: "Doe",
      birthDate: new Date("1990-01-01"),
      email: "john.doe@example.com",
      password: "password",
      cpf: "12345678901",
    });

    await userRepository.create({
      id: "2",
      name: "John",
      lastName: "Doe",
      birthDate: new Date("1990-02-02"),
      email: "john.doe2@example.com",
      password: "password",
      cpf: "12345678902",
    });

    await userRepository.create({
      id: "3",
      name: "Jona",
      lastName: "Doe",
      birthDate: new Date("1990-03-03"),
      email: "john.doe3@example.com",
      password: "password",
      cpf: "12345678903",
    });

    const searchedUser = await sut.execute({
      name: user.name,
    });

    expect(searchedUser.length).toBe(2);
    expect(searchedUser[0].email).toBe(user.email);
  });

  it("should be able to search users by last name", async () => {
    const user = await userRepository.create({
      id: "1",
      name: "John",
      lastName: "Doe",
      birthDate: new Date("1990-01-01"),
      email: "john.doe@example.com",
      password: "password",
      cpf: "12345678901",
    });

    await userRepository.create({
      id: "2",
      name: "John",
      lastName: "Doe",
      birthDate: new Date("1990-01-01"),
      email: "john.doe2@example.com",
      password: "password",
      cpf: "12345618901",
    });

    await userRepository.create({
      id: "3",
      name: "Jona",
      lastName: "Doa",
      birthDate: new Date("1990-03-03"),
      email: "john.doe3@example.com",
      password: "password",
      cpf: "12345678903",
    })

    const searchedUser = await sut.execute({
      lastName: user.lastName,
    });

    expect(searchedUser.length).toBe(2);
    expect(searchedUser[0].email).toBe(user.email);
  });

  it("should be able to search users by birthdate", async () => {
    const user = await userRepository.create({
      id: "1",
      name: "John",
      lastName: "Doe",
      birthDate: new Date("1990-01-01"),
      email: "john.doe@example.com",
      password: "password",
      cpf: "12345678901",
    });

    await userRepository.create({
      id: "2",
      name: "John",
      lastName: "Doe",
      birthDate: new Date("1990-01-02"),
      email: "john.doe2@example.com",
      password: "password",
      cpf: "1234567892",
    });


    const searchedUser = await sut.execute({
      birthDate: user.birthDate,
    });

    expect(searchedUser.length).toBe(1);
    expect(searchedUser[0].email).toBe(user.email);
  });

  it("should be able to search users that does not exist and return an empty array", async () => {

    const searchedUser = await sut.execute({
      name: "John",
    });

    expect(searchedUser.length).toBe(0);

  });

});