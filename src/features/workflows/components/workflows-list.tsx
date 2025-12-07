"use client";

import { useRouter } from "next/navigation";

import {
  useCreateWorkflow,
  useSuspenseWorkflows,
} from "@/features/workflows/hooks/use-workflows";
import {
  EmptyView,
  EntityContainer,
  EntityHeader,
  EntityItem,
  EntityList,
  EntityPagination,
  EntitySearch,
  ErrorView,
  LoadingView,
} from "@/components/entity-components";
import type { Workflow } from "@/generated/prisma/client";
import { useUpgradeModal } from "@/hooks/use-upgrade-modal";
import { useEntitySearch } from "@/hooks/use-entity-search";

import { useWorkflowSearchParams } from "../hooks/use-workflows-search-params";
import { WorkflowIcon } from "lucide-react";

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

// Workflow List
export const WorkflowsList = () => {
  const workflows = useSuspenseWorkflows();

  if (workflows.data.items.length == 0) {
    return <WorkflowsEmpty />;
  }

  return (
    <EntityList
      items={workflows.data.items}
      getKey={(workflow) => workflow.id}
      renderItem={(workflow) => <WorkflowItem data={workflow} />}
      emptyView={<WorkflowsEmpty />}
    />
  );
};

// Workflow Item
export const WorkflowItem = ({ data }: { data: Workflow }) => {
  return (
    <EntityItem
      href={`/workflows/${data.id}`}
      title={data.name}
      subtitle={<></>}
      image={
        <div className="size-8 flex items-center justify-center">
          <WorkflowIcon className="size-5 text-muted-foreground" />
        </div>
      }
      onRemove={() => {}}
      isRemoving={false}
    />
  );
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

// Workflows Loader
export const WorkflowsLoading = () => {
  return <LoadingView entity="workflows" />;
};

// Workflows Error View
export const WorkflowsError = () => {
  return <ErrorView message="Error loading workflows..." />;
};

// Empty Workflows View
export const WorkflowsEmpty = () => {
  const router = useRouter();
  const createWorkflow = useCreateWorkflow();
  const { handleError, modal } = useUpgradeModal();

  const handleCreate = () => {
    createWorkflow.mutate(undefined, {
      onError: (error) => {
        handleError(error);
      },
      onSuccess: (data) => {
        router.push(`/workflows/${data.id}`);
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
