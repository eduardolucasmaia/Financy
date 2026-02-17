import { createParameterDecorator, ResolverData } from "type-graphql";
import { GraphQLContext } from "../context";
import { User } from "@prisma/client";
import { prismaClient } from "../../../prisma/prisma";

export const GqlUser = () => {
  return createParameterDecorator(
    async ({ context }: ResolverData<GraphQLContext>): Promise<User | null> => {
      if (!context || !context.user) return null;

      try {
        const user = await prismaClient.user.findUnique({
          where: {
            id: context.user,
          },
        });
        if (!user) throw new Error("User not found");
        return user;
      } catch (error) {
        console.warn("Erro ao buscar usuário no decorator:", error instanceof Error ? error.message : error);
        return null;
      }
    },
  );
};
