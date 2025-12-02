interface ExecutionIdPageProps {
  params: Promise<{ executionId: string }>;
}

const ExecutionIdPage = async ({ params }: ExecutionIdPageProps) => {
  const { executionId } = await params;

  return <div>ExecutionPage ----- {executionId}</div>;
};

export default ExecutionIdPage;
