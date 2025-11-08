import { createTodo, getTodos } from "./todo.router";

export const openApiRouter = {
  todo: {
    createTodo: createTodo,
    getTodos: getTodos,
  },
};
