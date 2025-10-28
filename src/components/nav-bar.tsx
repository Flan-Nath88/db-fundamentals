import SignIn from "./signin-button"
import Link from "next/link"
import SignOut from "./signout-button"
import { auth } from "@/auth"

export default async function NavBar() {
    const session = await auth();
    return (
        <nav className="bg-white dark:bg-gray-800 shadow-lg">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <Link href="/" className="text-2xl font-bold">Task Master</Link>
                    {session ? <SignOut /> : <SignIn />}
                </div>
            </div>
        </nav>
    )
}