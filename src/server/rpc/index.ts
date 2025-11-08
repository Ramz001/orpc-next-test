import { createTodoRPC, getTodosRPC } from "./todo.rpc";

export const rpcRouter = {
  todo: {
    createTodo: createTodoRPC,
    getTodos: getTodosRPC,
  },
};
