import type { Prisma, User } from "generated/prisma";
import { prisma } from "@/lib/prisma";
import type { UserRepository } from "@/repositories/user-repository";

export class PrismaUserRepository implements UserRepository {

  async update(user: User): Promise<User> {
    const updatedUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: user,
    });

    return updatedUser;
  }

  async searchManyByParams(params: Prisma.UserFindManyArgs): Promise<User[]> {
    const users = await prisma.user.findMany({
      where: params.where,
    });

    return users;
  }

  async searchOneByParams(params: Prisma.UserFindFirstArgs): Promise<User | null> {
    const user = await prisma.user.findFirst({
      where: params.where,
    });

    return user;
  }

  async delete(user: Prisma.UserDeleteArgs): Promise<void> {
    await prisma.user.delete({
      where: {
        id: user.where.id,
      },
    });

    return;
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = await prisma.user.create({
      data,
    });

    return user;
  }
}
