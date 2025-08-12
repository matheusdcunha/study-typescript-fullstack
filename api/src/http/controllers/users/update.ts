import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { UserNotExistError } from "@/use-cases/errors/user-not-exist-error";
import { makeUpdateUserUseCase } from "@/use-cases/factories/make-update-use-case";
import { UserWithSameEmailError } from "@/use-cases/errors/user-with-same-email-error";
import { UserWithSameCpfError } from "@/use-cases/errors/user-with-same-cpf-error";

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

    return reply.status(200).send({ id: user.id, name: user.name, lastName: user.lastName, birthDate: user.birthDate, email: user.email, cpf: user.cpf });

  } catch (error) {
    if (
      error instanceof UserNotExistError

    ) {
      return reply.status(404).send({ message: error.message });
    }

    if (
      error instanceof UserWithSameCpfError
      || error instanceof UserWithSameEmailError
    ) {
      return reply.status(409).send({ message: error.message });
    }


    throw error;
  }
}
