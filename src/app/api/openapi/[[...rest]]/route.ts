import { openApiRouter } from "@/server/router";
import { ZodToJsonSchemaConverter } from "@orpc/zod/zod4";
import { OpenAPIHandler } from "@orpc/openapi/fetch";
import { OpenAPIReferencePlugin } from "@orpc/openapi/plugins";
import { TodoInsertSchema } from "@/db/schema";
import { onError } from "@orpc/server";

const openAPIHandler = new OpenAPIHandler(openApiRouter, {
  interceptors: [
    onError((error) => {
      console.error(error);
    }),
  ],
  plugins: [
    new OpenAPIReferencePlugin({
      schemaConverters: [new ZodToJsonSchemaConverter()],
      specGenerateOptions: {
        info: {
          title: "ORPC Playground",
          version: "1.0.0",
        },
        commonSchemas: {
          todo: { schema: TodoInsertSchema },
          UndefinedError: { error: "UndefinedError" },
        },
        security: [{ bearerAuth: [] }],
        components: {
          securitySchemes: {
            bearerAuth: {
              type: "http",
              scheme: "bearer",
            },
          },
        },
      },
      docsConfig: {
        authentication: {
          securitySchemes: {
            bearerAuth: {
              token: "default-token",
            },
          },
        },
      },
    }),
  ],
});

async function handleRequest(req: Request) {
  const { response } = await openAPIHandler.handle(req, {
    prefix: "/api/openapi",
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
