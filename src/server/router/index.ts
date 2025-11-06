import { createTodo, getTodos } from "./todo";

export const router = {
  todo: {
    createTodo: createTodo,
    getTodos: getTodos,
  },
};
