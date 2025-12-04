import { workflowRouter } from "@/features/workflows/server/route";

import { createTRPCRouter } from "../init";

export const appRouter = createTRPCRouter({
  workflows: workflowRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
