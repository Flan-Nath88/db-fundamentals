import { db } from "@/server/db";
import { tasks } from "@/server/db/schema";
import { NextResponse } from "next/server";

export async function GET () {
    const fetchedTasks = await db.select().from(tasks);
    return NextResponse.json(fetchedTasks);
}

export async function POST (request: Request) {
    const newTask = await request.json();

    let createdTask;
    try {
        createdTask = await db.insert(tasks).values({
            title: newTask.name,
            description: newTask.description,
            dueDate: new Date(newTask.dueDate),
            completed: newTask.completed,
        }).returning();
    } catch (error) {
        return NextResponse.json({ error: `Failed to create task: ${error}` }, { status: 500 });
    }

    return NextResponse.json(createdTask, { status: 201});
}