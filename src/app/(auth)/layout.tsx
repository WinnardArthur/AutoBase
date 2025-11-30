import { ReactNode } from "react";

import { requireIsAuthed } from "@/lib/auth-utils";
import AuthLayout from "@/features/auth/components/auth-layout";

const Layout = async ({ children }: { children: ReactNode }) => {
  await requireIsAuthed();

  return <AuthLayout>{children}</AuthLayout>;
};

export default Layout;
