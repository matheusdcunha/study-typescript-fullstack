import { randomUUID } from "node:crypto";
import type { Prisma, User } from "generated/prisma";
import type { UserRepository } from "../user-repository";

export class InMemoryUserRepository implements UserRepository {
  private users: User[] = [];

  async update(user: User): Promise<User> {
    throw new Error("Method not implemented.");
  }

  async searchManyByParams(params: Prisma.UserFindManyArgs): Promise<User[]> {
    const users = this.users.filter((user) => {
      return Object.entries(params.where ?? {}).every(([key, value]) => {
        return user[key as keyof User] === value;
      });
    });
    return users;
  }

  async searchOneByParams(params: Prisma.UserFindFirstArgs): Promise<User | null> {
    const user = this.users.find((user) => {
      return Object.entries(params.where ?? {}).every(([key, value]) => {
        return user[key as keyof User] === value;
      });
    });
    return user ?? null;
  }

  async delete(user: User): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async create(
    data: Prisma.UserCreateInput,
  ): Promise<User> {

    const newUser = {
      ...data,
      id: data.id ?? randomUUID(),
      birthDate: new Date(data.birthDate),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.users.push(newUser);

    return newUser;
  }
}
