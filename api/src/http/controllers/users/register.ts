import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { UserAlreadyExistError } from "@/use-cases/errors/user-already-exist-error";
import { makeRegisterUseCase } from "@/use-cases/factories/make-register-use-case";

export async function register(request: FastifyRequest, reply: FastifyReply) {

  const registerUserBodySchema = z.object({
    name: z.string(),
    lastName: z.string(),
    birthDate: z.iso.datetime().transform((date) => new Date(date)),
    email: z.email(),
    password: z.string().min(6),
    cpf: z
      .string()
      .length(11)
      .regex(/^\d+$/)
      .transform(value => value.replace(/\D/g, "")),
  });

  const { name, lastName, birthDate, email, password, cpf } =
    registerUserBodySchema.parse(request.body);

  try {
    const registerUserUseCase = makeRegisterUseCase();
    await registerUserUseCase.execute({
      name,
      lastName,
      birthDate,
      email,
      password,
      cpf,
    });
  } catch (error) {
    if (error instanceof UserAlreadyExistError) {
      return reply.status(409).send({ message: error.message });
    }
    throw error;
  }

  return reply.status(201).send();
}
