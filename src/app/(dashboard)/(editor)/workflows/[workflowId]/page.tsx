interface WorkflowIdPageProps {
  params: Promise<{ workflowId: string }>;
}

const WorkflowIdPage = async ({ params }: WorkflowIdPageProps) => {
  const { workflowId } = await params;

  return <div>Workflow ID Page ---- {workflowId}</div>;
};

export default WorkflowIdPage;
