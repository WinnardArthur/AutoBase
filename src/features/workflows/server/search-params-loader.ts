import { createLoader } from "nuqs/server";

import { workflowSearchParams } from "../search-params";

export const workflowsSearchParamsLoader = createLoader(workflowSearchParams);
