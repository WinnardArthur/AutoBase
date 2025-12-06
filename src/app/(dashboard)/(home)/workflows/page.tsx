import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { SearchParams } from "nuqs";

import {
  WorkflowContainer,
  WorkflowsList,
  WorkflowsLoading,
} from "@/features/workflows/components/workflows-list";
import { HydrateClient } from "@/trpc/server";
import { prefetchWorkflows } from "@/features/workflows/server/prefetch";
import { workflowsSearchParamsLoader } from "@/features/workflows/server/search-params-loader";
import { ErrorView } from "@/components/entity-components";

type WorkflowsPageProps = {
  searchParams: Promise<SearchParams>;
};

const WorkflowsPage = async ({ searchParams }: WorkflowsPageProps) => {
  const newSearchParams = await workflowsSearchParamsLoader(searchParams);

  prefetchWorkflows(newSearchParams);

  return (
    <WorkflowContainer>
      <HydrateClient>
        <ErrorBoundary fallback={<ErrorView />}>
          <Suspense fallback={<WorkflowsLoading />}>
            <WorkflowsList />
          </Suspense>
        </ErrorBoundary>
      </HydrateClient>
    </WorkflowContainer>
  );
};

export default WorkflowsPage;
