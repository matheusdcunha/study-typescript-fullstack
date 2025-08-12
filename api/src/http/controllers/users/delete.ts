import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeDeleteUserUseCase } from "@/use-cases/factories/make-delete-user-case";
import { UserNotExistError } from "@/use-cases/errors/user-not-exist-error";

export async function deleteUser(request: FastifyRequest, reply: FastifyReply) {

  const paramsSchema = z.object({
    id: z.string(),
  });

  const { id } = paramsSchema.parse(request.params);

  try {
    const deleteUserUseCase = makeDeleteUserUseCase();
    await deleteUserUseCase.execute({
      id,
    });
  } catch (error) {
    if (
      error instanceof UserNotExistError
    ) {
      return reply.status(404).send({ message: error.message });
    }

    throw error;
  }

  return reply.status(204).send();
}
