import { router } from "@/server/router";
import { RPCHandler } from "@orpc/server/fetch";

const handler = new RPCHandler(router);

async function handleRequest(req: Request) {
  const { response } = await handler.handle(req, {
    prefix: "/rpc",
    context: {},
  });

  return response ?? new Response("Not Found", { status: 404 });
}

export const HEAD = handleRequest;
export const GET = handleRequest;
export const POST = handleRequest;
export const PUT = handleRequest;
export const PATCH = handleRequest;
export const DELETE = handleRequest;
