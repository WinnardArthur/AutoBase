import {
  Editor,
  EditorError,
  EditorLoading,
} from "@/features/editor/components/editor";
import { prefetchWorkflow } from "@/features/workflows/server/prefetch";
import { HydrateClient } from "@/trpc/server";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface WorkflowIdPageProps {
  params: Promise<{ workflowId: string }>;
}

const WorkflowIdPage = async ({ params }: WorkflowIdPageProps) => {
  const { workflowId } = await params;

  prefetchWorkflow({ id: workflowId });

  return (
    <HydrateClient>
      <ErrorBoundary fallback={<EditorError />}>
        <Suspense fallback={<EditorLoading />}>
          <Editor workflowId={workflowId} />
        </Suspense>
      </ErrorBoundary>
    </HydrateClient>
  );
};

export default WorkflowIdPage;
