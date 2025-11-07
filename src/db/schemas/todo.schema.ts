import { text, boolean, pgTable, uuid } from "drizzle-orm/pg-core";
import { InferSelectModel } from "drizzle-orm";
import { createSelectSchema, createInsertSchema } from "drizzle-zod";
import z from "zod";

export const todo = pgTable("todo", {
  id: uuid("id").primaryKey().defaultRandom(),
  text: text("text").notNull(),
  done: boolean("done").default(false).notNull(),
});

export type TodoType = InferSelectModel<typeof todo>;
export const TodoInsertSchema = createInsertSchema(todo);
export const TodoSelectSchema = createSelectSchema(todo);

export const refinedTodoSchema = TodoSelectSchema.extend({
  text: z.string().nonempty(),
}).refine((data) => !(data.done && data.text.trim().length === 0), {
  message: "Cannot mark as done if text is empty",
  path: ["done"], // points to the problematic field
});
