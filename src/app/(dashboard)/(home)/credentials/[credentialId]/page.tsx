interface CredentialIdPageProps {
  params: Promise<{ credentialId: string }>;
}

const CredentialIdPage = async ({ params }: CredentialIdPageProps) => {
  const { credentialId } = await params;

  return <div>CredentialIdPage --- {credentialId}</div>;
};

export default CredentialIdPage;
 