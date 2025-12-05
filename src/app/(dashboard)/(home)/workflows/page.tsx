import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { SearchParams } from "nuqs";

import {
  WorkflowContainer,
  WorkflowsList,
} from "@/features/workflows/components/workflows-list";
import { HydrateClient } from "@/trpc/server";
import { prefetchWorkflows } from "@/features/workflows/server/prefetch";
import { workflowsSearchParamsLoader } from "@/features/workflows/server/search-params-loader";

type WorkflowsPageProps = {
  searchParams: Promise<SearchParams>;
};

const WorkflowsPage = async ({ searchParams }: WorkflowsPageProps) => {
  const newSearchParams = await workflowsSearchParamsLoader(searchParams);

  prefetchWorkflows(newSearchParams);

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
