"use server"

import { db } from "@/server/db";
import { tasks } from "@/server/db/schema";
import { revalidatePath } from "next/cache";

export async function getTasks() {
    const fetchedTasks = await db.select().from(tasks);
    return fetchedTasks;
}

export async function createTask(name: string, description: string, dueDate: Date, completed: boolean) {
   
    await db.insert(tasks).values({
        title: name,
        description: description,
        dueDate: new Date(dueDate),
        completed: completed,
    });

    revalidatePath("/");
}