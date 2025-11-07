import z from "zod";
import { db } from "@/db/drizzle";
import { todo as todoTable } from "@/db/schema";
import { authed } from "@/middleware/auth.middleware";

export const createTodo = authed
  .input(
    z.object({
      text: z.string().min(1, "Text is required").max(255),
    })
  )
  .output(
    z.object({
      id: z.string(),
      text: z.string(),
      done: z.boolean(),
    })
  )
  .errors({
    FORBIDDEN: {
      message: "YOU're STUPID",
      status: 403,
    },
  })
  .handler(async ({ context, input, errors }) => {
    if (input.text === "hello") {
      throw errors.FORBIDDEN();
    }

    const [inserted] = await db
      .insert(todoTable)
      .values({ text: input.text, done: false })
      .returning();

    return {
      id: inserted.id,
      text: inserted.text,
      done: inserted.done,
    };
  });

export const getTodos = authed
  .input(
    z.object({
      limit: z.number().min(1).max(50).default(10),
    })
  )
  .output(
    z.array(
      z.object({
        id: z.string(),
        text: z.string(),
        done: z.boolean(),
      })
    )
  )
  .errors({
    FORBIDDEN: {
      message: "WAY too mannny",
      status: 403,
    },
  })
  .handler(async ({ input, context, errors }) => {
    console.log("user", context.user.email);

    if (input.limit >= 10) {
      throw errors.FORBIDDEN();
    }

    return await db.select().from(todoTable).limit(input.limit);
  });
