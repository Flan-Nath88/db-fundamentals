"use client";

import { useState } from "react";
import { useTransition } from "react";
import * as actions from "@/server/actions";

export default function TaskForm() {
    const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [completed, setCompleted] = useState(false);
  const [ isPending, startTransition ] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    startTransition(async () => {
      await actions.createTask(name, description, new Date(dueDate), completed);
      setName("");
      setDescription("");
      setDueDate("");
      setCompleted(false);
    })

  }

    return (
        <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div>
          <label htmlFor="dueDate">Due Date</label>
          <input type="date" id="dueDate" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
        </div>
        <div>
          <label htmlFor="completed">Completed</label>
          <input type="checkbox" id="completed" value={completed.toString()} onChange={(e) => setCompleted(e.target.checked)} />
        </div>
        <button type="submit">Create Task</button>
      </form>

    </div>
    )
}