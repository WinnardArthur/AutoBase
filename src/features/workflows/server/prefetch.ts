import type { inferInput } from "@trpc/tanstack-react-query";
import { prefetch, trpc } from "@/trpc/server";

type GetManyInput = inferInput<typeof trpc.workflows.getMany>;
export type GetOneInput = inferInput<typeof trpc.workflows.getOne>;

/**
 * Prefetch all Workflows
 */
export const prefetchWorkflows = (params: GetManyInput) => {
  return prefetch(trpc.workflows.getMany.queryOptions(params));
};

/**
 * Prefetch a single workflow by ID
 */
export const prefetchWorkflow = (params: GetOneInput) => {
  return prefetch(trpc.workflows.getOne.queryOptions(params));
};
