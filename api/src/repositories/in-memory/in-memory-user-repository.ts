import { randomUUID } from "node:crypto";
import type { Prisma, User } from "generated/prisma";
import type { UserRepository } from "../user-repository";

export class InMemoryUserRepository implements UserRepository {
  private users: User[] = [];

  async update(user: Prisma.UserUpdateInput): Promise<User> {
    const userIndex = this.users.findIndex((u) => u.id === user.id);

    if (userIndex === -1) {
      throw new Error("User not found");
    }

    const updateData: Partial<User> = {};

    if (user.name && typeof user.name === 'string') updateData.name = user.name;
    if (user.lastName && typeof user.lastName === 'string') updateData.lastName = user.lastName;
    if (user.email && typeof user.email === 'string') updateData.email = user.email;
    if (user.password && typeof user.password === 'string') updateData.password = user.password;
    if (user.cpf && typeof user.cpf === 'string') updateData.cpf = user.cpf;
    if (user.birthDate && typeof user.birthDate === 'string') updateData.birthDate = new Date(user.birthDate);

    this.users[userIndex] = {
      ...this.users[userIndex],
      ...updateData,
      updatedAt: new Date()
    };

    return this.users[userIndex];
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

  async delete(user: Prisma.UserDeleteArgs): Promise<void> {
    const userId = user.where.id;
    this.users = this.users.filter((u) => u.id !== userId);

    return;
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
