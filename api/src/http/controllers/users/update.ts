import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { UserNotExistError } from "@/use-cases/errors/user-not-exist-error";
import { makeUpdateUserUseCase } from "@/use-cases/factories/make-update-use-case";

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    id: z.string(),
  });

  const { id } = paramsSchema.parse(request.params);

  const updateUserBodySchema = z.object({
    name: z.string().optional(),
    lastName: z.string().optional(),
    birthDate: z.date().optional(),
    email: z.email().optional(),
    password: z.string().optional(),
    cpf: z.string().optional(),
  });

  const { name, lastName, birthDate, email, password, cpf } =
    updateUserBodySchema.parse(request.body);


  const updateUserUseCase = makeUpdateUserUseCase();

  try {
    const { user } = await updateUserUseCase.execute({
      id,
      name,
      lastName,
      birthDate,
      email,
      password,
      cpf,
    });

    const userWithoutPassword = {
      ...user,
      password: undefined,
    };

    return reply.status(200).send(userWithoutPassword);

  } catch (error) {
    if (error instanceof UserNotExistError) {
      return reply.status(404).send({ message: error.message });
    }

    throw error;
  }
}
