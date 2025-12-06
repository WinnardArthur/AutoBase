"use client";

import { useRouter } from "next/navigation";

import {
  useCreateWorkflow,
  useSuspenseWorkflows,
} from "@/features/workflows/hooks/use-workflows";
import { useUpgradeModal } from "@/hooks/use-upgrade-modal";
import {
  EmptyView,
  EntityContainer,
  EntityHeader,
  EntityPagination,
  EntitySearch,
  ErrorView,
  LoadingView,
} from "@/components/entity-components";
import { useWorkflowSearchParams } from "../hooks/use-workflows-search-params";
import { useEntitySearch } from "@/hooks/use-entity-search";

// Workflow List
export const WorkflowsList = () => {
  const workflows = useSuspenseWorkflows();

  if (workflows.data.items.length == 0) {
    return <WorflowsEmpty />;
  }

  return <p>{JSON.stringify(workflows.data, null, 2)}</p>;
};

// Workflow Header
export const WorkflowsHeader = ({ disabled }: { disabled?: boolean }) => {
  const router = useRouter();

  const createdWorkflow = useCreateWorkflow();
  const { handleError, modal } = useUpgradeModal();

  const handleCreate = () => {
    createdWorkflow.mutate(undefined, {
      onSuccess: (data) => {
        router.push(`/workflows/${data.id}`);
      },
      onError: (error) => {
        handleError(error);
      },
    });
  };
  return (
    <>
      {modal}
      <EntityHeader
        title="Workflows"
        description="Create and manage your workflows"
        onNew={handleCreate}
        newButtonLabel="New workflow"
        disabled={disabled}
        isCreating={false}
      />
    </>
  );
};

// Workdlow search
export const WorkflowsSearch = () => {
  const [searchParams, setSearchParams] = useWorkflowSearchParams();

  console.log({ searchParams });
  const { searchValue, onSearchChange } = useEntitySearch({
    searchParams,
    setSearchParams,
  });

  return (
    <EntitySearch
      value={searchValue}
      onChange={onSearchChange}
      placeholder="Search workflows"
    />
  );
};

// Workflow Pagination
export const WorkflowsPagination = () => {
  const workflows = useSuspenseWorkflows();
  const [searchParams, setSearchParams] = useWorkflowSearchParams();

  return (
    <EntityPagination
      disabled={workflows.isFetching}
      totalPages={workflows.data.totalPages}
      page={workflows.data.page}
      onPageChange={(page) => setSearchParams({ ...searchParams, page })}
    />
  );
};

// Workflow Container
export const WorkflowContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <EntityContainer
      header={<WorkflowsHeader />}
      search={<WorkflowsSearch />}
      pagination={<WorkflowsPagination />}
    >
      {children}
    </EntityContainer>
  );
};

// Workflows Loader
export const WorkflowsLoading = () => {
  return <LoadingView entity="workflows" />;
};

// Workflows Error View
export const WorkflowsError = () => {
  return <ErrorView message="Error loading workflows..." />;
};

// Empty Workflows View
export const WorflowsEmpty = () => {
  const createWorkflow = useCreateWorkflow();
  const { handleError, modal } = useUpgradeModal();

  const handleCreate = () => {
    createWorkflow.mutate(undefined, {
      onError: (error) => {
        handleError(error);
      },
    });
  };

  return (
    <>
      {modal}
      <EmptyView
        title="No workflows found"
        message="You haven't created any workflows yet. Get started by creating your a workflow"
        onNew={handleCreate}
      />
    </>
  );
};
