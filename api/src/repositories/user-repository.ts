import type { Prisma, User } from "generated/prisma";

export interface UserRepository {
  create(user: User): Promise<User>;
  update(user: User): Promise<User>;
  searchManyByParams(params: Prisma.UserFindManyArgs): Promise<User[]>;
  searchOneByParams(params: Prisma.UserFindFirstArgs): Promise<User | null>;
  delete(user: User): Promise<void>;
}
