"use client";

import { useState } from "react";
import { client, orpc } from "@/lib/orpc.client";
import { useMutation } from "@tanstack/react-query";

const TodoForm = () => {
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text.trim() || isLoading) return;

    setIsLoading(true);
    try {
      await client.todo.createTodo({ text: text.trim() });
      setText("");
      window.location.reload();
    } catch (error) {
      // Error handling can be added here if needed
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter todo text..."
        maxLength={255}
        disabled={isLoading}
        className="flex-1 px-4 py-2 bg-background border border-foreground/10 rounded-lg text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-foreground/20 disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={isLoading || !text.trim()}
        className="px-6 py-2 bg-foreground text-background rounded-lg font-medium hover:bg-foreground/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isLoading ? "Adding..." : "Add"}
      </button>
    </form>
  );
};

export default TodoForm;
