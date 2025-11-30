import { LoginForm } from "@/features/auth/components/login-form";
import { requireIsAuthed } from "@/lib/auth-utils";

const LoginPage = async () => {
  await requireIsAuthed();

  return (
    <div>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
