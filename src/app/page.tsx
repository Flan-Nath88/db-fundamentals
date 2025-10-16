import { type Task } from "@/server/db/schema";
import * as actions from "@/server/actions"
import TaskForm from "@/components/task-form";

export default async function Home() {  
  const tasks: Task[] = await actions.getTasks();

  return (
    <>
      <TaskForm />
      <div>
        <h1>DB Fundamentals</h1>
          <div>
            {tasks.map((task) => (
              <div key={task.id} className="border-2 border-gray-300 p-4 rounded-md">
                <h2>{task.title}</h2>
                <p>{task.description}</p>
                <p>{task.dueDate ? new Date(task.dueDate).toDateString() : "No due date"}</p>
                <p>{task.completed ? "Completed" : "Not completed"}</p>
              </div>
            ))}
          </div>
        </div>
    </>
  );
}
