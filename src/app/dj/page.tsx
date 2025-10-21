import { User } from "@/server/db/schema";
import * as Djactions from "@/server/actions/Djactions";

export default async function DjPage() {
    const users: User[] = await Djactions.getUsers();
    return (
        <>
            <div>
                <h1>Users</h1>
                <div>
                    {users.map((user) => (
                        <div key={user.id} className="border-2 border-gray-300 p-4 rounded-md">
                            <h2>{user.username}</h2>
                            <p>{user.email}</p>
                            <p>{user.createdAt.toDateString()}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}