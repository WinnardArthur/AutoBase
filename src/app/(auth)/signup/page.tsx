import { SignUpForm } from "@/features/auth/components/signup-form";
import { requireIsAuthed } from "@/lib/auth-utils";

const SignUpPage = async () => {
  await requireIsAuthed();

  return (
    <div>
      <SignUpForm />
    </div>
  );
};

export default SignUpPage;
