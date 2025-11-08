import { createTodoRPC, getTodosRPC } from "../rpc/todo.rpc";

export const createTodo = createTodoRPC.route({
  path: "/todo/createTodo",
  method: "POST",
  summary: "Create a todo",
  tags: ["Todo Route"],
});

export const getTodos = getTodosRPC.route({
  path: "/todo/getTodos",
  method: "GET",
  summary: "Get todos",
  tags: ["Todo Route"],
});
