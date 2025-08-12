import type { Prisma, User } from "generated/prisma";

export interface UserRepository {
  update(user: Prisma.UserUpdateInput): Promise<User>;
  searchManyByParams(params: Prisma.UserFindManyArgs): Promise<User[]>;
  searchOneByParams(params: Prisma.UserFindFirstArgs): Promise<User | null>;
  delete(user: Prisma.UserDeleteArgs): Promise<void>;
  create(data: Prisma.UserCreateInput): Promise<User>;
}
