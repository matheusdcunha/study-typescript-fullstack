import type { Prisma, User } from "generated/prisma";
import { prisma } from "@/lib/prisma";
import type { UserRepository } from "../user-repository";

export class PrismaUserRepository implements UserRepository {

  update(user: User): Promise<User> {
    throw new Error("Method not implemented.");
  }

  searchManyByParams(params: Prisma.UserFindManyArgs): Promise<User[]> {
    throw new Error("Method not implemented.");
  }

  async searchOneByParams(params: Prisma.UserFindFirstArgs): Promise<User | null> {
    const user = await prisma.user.findFirst({
      where: params.where,
    });

    return user;
  }

  delete(user: User): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = await prisma.user.create({
      data,
    });

    return user;
  }
}
