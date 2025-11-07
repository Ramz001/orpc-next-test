"use client";

import { TodoType } from "@/db/schema";

type TodoCardsProps = {
  todos: TodoType[];
};

const TodoCards = ({ todos }: TodoCardsProps) => {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {todos.map((todo) => (
        <div
          key={todo.id}
          className="bg-background border border-foreground/10 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
          role="article"
          aria-label={`Todo: ${todo.text}`}
        >
          <div className="flex items-start justify-between gap-4">
            <p
              className={`flex-1 text-foreground ${
                todo.done ? "line-through opacity-60" : ""
              }`}
            >
              {todo.text}
            </p>
            <div
              className={`shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                todo.done
                  ? "bg-green-500 border-green-500"
                  : "border-foreground/30"
              }`}
              aria-label={todo.done ? "Completed" : "Not completed"}
              role="status"
            >
              {todo.done && (
                <svg
                  className="w-3 h-3 text-white"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M5 13l4 4L19 7"></path>
                </svg>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodoCards;
