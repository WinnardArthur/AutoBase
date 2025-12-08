"use client";

import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { toast } from "sonner";

import { useTRPC } from "@/trpc/client";

import { useWorkflowSearchParams } from "./use-workflows-search-params";
import { GetOneInput } from "../server/prefetch";

/**
 * Hook to fetch all workflows using react suspence
 */
export const useSuspenseWorkflows = () => {
  const trpc = useTRPC();
  const [searchParams] = useWorkflowSearchParams();

  return useSuspenseQuery(trpc.workflows.getMany.queryOptions(searchParams));
};

/**
 * Hook to fetch a single workflow using suspense
 */
export const useSuspenseWorkflow = (params: GetOneInput) => {
  const trpc = useTRPC();

  return useSuspenseQuery(trpc.workflows.getOne.queryOptions(params));
};

/**
 * Hook to create a new workflow
 */
export const useCreateWorkflow = () => {
  const queryClient = useQueryClient();
  const trpc = useTRPC();

  return useMutation(
    trpc.workflows.create.mutationOptions({
      onSuccess: (data) => {
        toast.success(`Workflow ${data.name} created`);
        queryClient.invalidateQueries(trpc.workflows.getMany.queryOptions({}));
      },
      onError: (error) => {
        toast.error(`Failed to create workflow: ${error.message}`);
      },
    })
  );
};

/**
 * Hook to delete a workflow
 */
export const useDeleteWorkflow = () => {
  const queryClient = useQueryClient();
  const trpc = useTRPC();

  return useMutation(
    trpc.workflows.remove.mutationOptions({
      onSuccess: (data) => {
        toast.success(`Workflow "${data.name}" deleted`);

        queryClient.invalidateQueries(trpc.workflows.getMany.queryOptions({}));
        queryClient.invalidateQueries(
          trpc.workflows.getOne.queryFilter({ id: data.id })
        );
      },
      onError: (error) => {
        toast.error(`Failed to delete workflow: ${error.message}`);
      },
    })
  );
};

/**
 * Hook to Rename workflow
 */
export const useRenameWorkflow = () => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  return useMutation(
    trpc.workflows.rename.mutationOptions({
      onSuccess: (data) => {
        toast.success(`Workflow "${data.name}" renamed`);

        queryClient.invalidateQueries(trpc.workflows.getMany.queryOptions({}));
        queryClient.invalidateQueries(trpc.workflows.getOne.queryFilter({id: data.id}))
      },
      onError: (error) => {
        toast.error(`Failed to rename workflow: ${error.message}`);
      }
    })
  );
};
