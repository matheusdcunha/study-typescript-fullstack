import { z } from "zod";
import type { FastifyTypedInstance } from "@/@types/fastify-typed-instance";
import { register } from "@/http/controllers/users/register";
import { update } from "@/http/controllers/users/update";
import { deleteUser } from "./delete";

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

  app.put(
    "/users/:id",
    {
      schema: {
        description: "Update a user",
        tags: ["users"],
        body: z.object({
          name: z.string().optional(),
          lastName: z.string().optional(),
          birthDate: z.iso.datetime().optional(),
          email: z.email().optional(),
          password: z.string().optional(),
          cpf: z.string().length(11).regex(/^\d+$/).optional(),
        }),
        response: {
          200: z.object({
            user: z.object({
              id: z.string(),
              name: z.string(),
              lastName: z.string(),
              birthDate: z.iso.datetime(),
              email: z.string(),
              password: z.string(),
              cpf: z.string(),
            }),
          }),
          404: z.object({
            message: z.string().default("User not exists"),
          }).describe("User not exists"),
          500: z.object({
            message: z.string().default("Internal server error"),
          }).describe("Internal server error"),
        },
      },
    },
    update,
  );

  app.delete(
    "/users/:id",
    {
      schema: {
        description: "Delete a user",
        tags: ["users"],
        response: {
          204: z.null().describe("User deleted successfully"),
          404: z.object({
            message: z.string().default("User not exists"),
          }).describe("User not exists"),
        },
      },
    },
    deleteUser,
  );

}