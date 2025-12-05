import { generateSlug } from "random-word-slugs";

import prisma from "@/lib/db";
import { createTRPCRouter, premiumProcedure, protectedProcedure } from "@/trpc/init";
import z from "zod";

export const workflowRouter = createTRPCRouter({
  // Create Workflow
  create: premiumProcedure.mutation(async ({ ctx }) => {
    const data = await prisma.workflow.create({
      data: {
        name: generateSlug(3),
        userId: ctx.auth.user.id,
      },
    });

    return data;
  }),

  // Get a Workflow
  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      const workflow = prisma.workflow.findUnique({
        where: {
          id: input.id,
          userId: ctx.auth.user.id,
        },
      });

      return workflow;
    }),

  // Get Workflows
  getMany: protectedProcedure.query(({ ctx }) => {
    const workflows = prisma.workflow.findMany({
      where: {
        userId: ctx.auth.user.id,
      },
    });

    return workflows;
  }),

  // Remove/Delete a workflow
  remove: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await prisma.workflow.delete({
        where: {
          id: input.id,
          userId: ctx.auth.user.id,
        },
      });
    }),

  // Rename Workflow
  rename: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().min(1, { error: "Name is required" }),
      })
    )
    .mutation(async ({ ctx, input: { id, name } }) => {
      const renamedWorkflow = prisma.workflow.update({
        where: {
          id: id,
          userId: ctx.auth.user.id,
        },
        data: {
          name,
        },
      });

      return renamedWorkflow;
    }),
});
