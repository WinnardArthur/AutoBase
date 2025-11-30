"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { requireAuth } from "@/lib/auth-utils";
import { caller } from "@/trpc/server";

export default async function Page() {
  // const { data } = authClient.useSession();

  // await requireAuth();

  // const data = await caller.getUsers();

  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center">
      PROTECTED server component....
      {/* {JSON.stringify(data)}  */}
      { <Button onClick={() => authClient.signOut()}>Logout</Button>}
    </div>
  );
}
