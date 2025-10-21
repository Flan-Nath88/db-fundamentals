"use server";

import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import { revalidatePath } from "next/cache";

export async function getUsers() {
    const fetchedUsers = await db.select().from(users);
    return fetchedUsers;
}

export async function createuser(username: string, email: string, passwordHash: string) {
   
    await db.insert(users).values({
        username: username,
        email: email,
        passwordHash: passwordHash,
    });

    revalidatePath("/dj");
}

