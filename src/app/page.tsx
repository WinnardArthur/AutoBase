"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { requireAuth } from "@/lib/auth-utils";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function Page() {
  const trpc = useTRPC();
  const { data } = useQuery(trpc.getWorkflows.queryOptions());
  const queryClient = useQueryClient();

  const create = useMutation(
    trpc.createWorkflow.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.getWorkflows.queryOptions());
      },
     
    })
  );

  const testAI = useMutation(
    trpc.testAI.mutationOptions({
      onError: (err) => {
        toast.error(err.message)
      },
    })
  );

  return (
    <div className="min-h-screen min-w-screen flex flex-col gap-8 items-center justify-center">
      PROTECTED server component....
      {JSON.stringify(data, null, 2)}
      <Button onClick={() => create.mutate()} disabled={create.isPending}>
        Create Workflow
      </Button>
      <Button onClick={() => testAI.mutate()} disabled={testAI.isPending}>
        Test AI
      </Button>
      {JSON.stringify(testAI.data)}
      {<Button onClick={() => authClient.signOut()}>Logout</Button>}
    </div>
  );
}
