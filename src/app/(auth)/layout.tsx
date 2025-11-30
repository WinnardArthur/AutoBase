import { ReactNode } from "react";

import { requireIsAuthed } from "@/lib/auth-utils";

const AuthLayout = async ({ children }: { children: ReactNode }) => {
  await requireIsAuthed();

  return <div>{children}</div>;
};

export default AuthLayout;
