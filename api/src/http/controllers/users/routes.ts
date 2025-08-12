import { z } from "zod";
import type { FastifyTypedInstance } from "@/@types/fastify-typed-instance";
import { register } from "@/http/controllers/users/register";

export async function userRoutes(app: FastifyTypedInstance) {
  app.post(
    "/users",
    {
      schema: {
        description: "Register a new user",
        tags: ["users"],
        body: z.object({
          name: z.string(),
          lastName: z.string(),
          birthDate: z.iso.datetime(),
          email: z.email(),
          password: z.string(),
          cpf: z.string().length(11).regex(/^\d+$/),
        }),
        response: {
          201: z.null().describe("User created successfully"),
          409: z.object({
            message: z.string().default("User already exists"),
          }).describe("User already exists"),
          500: z.object({
            message: z.string().default("Internal server error"),
          }).describe("Internal server error"),
        },
      },
    },
    register,
  );
}
