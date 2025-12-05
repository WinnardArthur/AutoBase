"use client";

import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { toast } from "sonner";

import { useTRPC } from "@/trpc/client";

import { useWorkflowSearchParams } from "./use-workflows-search-params";

/**
 * Hook to fetch all workflows using react suspence
 */
export const useSuspenseWorkflows = () => {
  const trpc = useTRPC();
  const [searchParams] = useWorkflowSearchParams();

  return useSuspenseQuery(trpc.workflows.getMany.queryOptions(searchParams));
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
