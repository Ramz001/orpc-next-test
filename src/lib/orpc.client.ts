import type { RouterClient } from "@orpc/server";
import { RPCLink } from "@orpc/client/fetch";
import { createORPCClient } from "@orpc/client";
import { rpcRouter } from "@/server/rpc";
import { createTanstackQueryUtils } from "@orpc/tanstack-query";

declare global {
  var $client: RouterClient<typeof rpcRouter> | undefined;
}

const link = new RPCLink({
  url: () => {
    if (typeof window === "undefined") {
      throw new Error("RPCLink is not allowed on the server side.");
    }

    return `${window.location.origin}/api/rpc`;
  },
});

/**
 * Fallback to client-side client if server-side client is not available.
 */
export const client: RouterClient<typeof rpcRouter> =
  globalThis.$client ?? createORPCClient(link);

//just add this line and you have tanstack query integrated
export const orpc = createTanstackQueryUtils(client);
