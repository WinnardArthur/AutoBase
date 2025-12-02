import { z } from "zod";
import { baseProcedure, createTRPCRouter, protectedProcedure } from "../init";
import prisma from "@/lib/db";
import { inngest } from "@/inngest/client";
import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import { TRPCError } from "@trpc/server";

export const appRouter = createTRPCRouter({
  testAI: protectedProcedure.mutation(async () => {
    // throw new TRPCError({code: 'BAD_REQUEST', message: "An Error Occuredzzz"})

   await inngest.send({name: "execute/ai"});

   return { success: true, message: "Job Queued" };
  }),
  getUsers: protectedProcedure.query(({ ctx }) => {
    return prisma.user.findMany({
      where: {
        id: ctx.auth.user.id,
      },
    });
  }),
  getWorkflows: protectedProcedure.query(({ ctx }) => {
    return prisma.workflow.findMany({});
  }),
  createWorkflow: protectedProcedure.mutation(async ({ ctx }) => {
    await new Promise((resolve, reject) => {
      return setTimeout(resolve, 3000);
    });

    await inngest.send({
      name: "test/hello-world",
      data: {
        email: "jaden@gmail.com",
      },
    });

    return { success: true, message: "Job Queued" };
  }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
