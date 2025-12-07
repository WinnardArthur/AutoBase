"use client";

import { ErrorView, LoadingView } from "@/components/entity-components";
import { useSuspenseWorkflow } from "@/features/workflows/hooks/use-workflows";

export const Editor = ({ workflowId }: { workflowId: string }) => {
  const { data: workflow } = useSuspenseWorkflow({ id: workflowId });

  return <p>{JSON.stringify(workflow, null, 2)}</p>;
};

// Editor Loader
export const EditorLoading = () => {
  return <LoadingView entity="editor" />;
};

// Editor Error
export const EditorError = () => {
  return <ErrorView message="Error loading editor" />;
};
