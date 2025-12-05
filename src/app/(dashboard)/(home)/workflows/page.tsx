import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import {
  WorkflowContainer,
  WorkflowsList,
} from "@/features/workflows/components/workflows-list";
import { HydrateClient } from "@/trpc/server";
import { prefetchWorkflows } from "@/features/workflows/server/prefetch";

const WorkflowsPage = () => {
  prefetchWorkflows();

  return (
    <WorkflowContainer>
      <HydrateClient>
        <ErrorBoundary fallback={<p>Something went wrong</p>}>
          <Suspense fallback={<p>Loading...</p>}>
            <WorkflowsList />
          </Suspense>
        </ErrorBoundary>
      </HydrateClient>
    </WorkflowContainer>
  );
};

export default WorkflowsPage;
