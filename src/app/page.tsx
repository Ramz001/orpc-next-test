import TodoCards from "@/components/todo-cards";
import TodoForm from "@/components/todo-form";
import { client } from "@/lib/orpc.client";
import { safe } from "@orpc/server";

export default async function Home() {
  const [error, data, isDefined] = await safe(client.todo.getTodos({}));

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <div className="bg-background border border-foreground/10 rounded-lg p-6">
            <TodoForm />
          </div>
        </div>

        <div>
          {!data || data.length === 0 ? (
            <div className="flex items-center justify-center p-8">
              <p className="text-foreground/60 text-center">No todos found</p>
            </div>
          ) : (
            <TodoCards todos={data} />
          )}
        </div>
      </div>
    </div>
  );
}
