import { os } from "@orpc/server";
import z from "zod";
import { db } from "@/db/drizzle";
import { todo as todoTable } from "@/db/schema";

export const createTodo = os
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
  .handler(async ({ input }) => {
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

export const getTodos = os
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
  .handler(async ({ input }) => {
    return await db.select().from(todoTable).limit(input.limit);
  });
