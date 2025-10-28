import{db} from "@/server/db";
import {users } from "@/server/db/schema";
import { NextResponse } from "next/server";

export async function GET () {
    const fetchedUsers = await db.select().from(users);
    return NextResponse.json(fetchedUsers);
}