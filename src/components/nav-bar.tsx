import SignIn from "./signin-button"
import Link from "next/link"
import SignOut from "./signout-button"

export default function NavBar() {
    return (
        <nav className="bg-white dark:bg-gray-800 shadow-lg">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <Link href="/" className="text-2xl font-bold">Task Master</Link>
                    <SignIn />
                    <SignOut />
                </div>
            </div>
        </nav>
    )
}