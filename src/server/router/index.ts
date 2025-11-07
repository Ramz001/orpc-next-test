import { createTodo, getTodos } from "./todo.router";

export const router = {
  todo: {
    createTodo: createTodo,
    getTodos: getTodos,
  },
};
