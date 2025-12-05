"use client";

import { useQueryStates } from "nuqs";
import { workflowSearchParams } from "../search-params";

export const useWorkflowSearchParams = () => {
  return useQueryStates(workflowSearchParams);
};
