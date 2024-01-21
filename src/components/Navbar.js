import { Link } from "react-router-dom"

function Navbar() {
    return (
        <div className="bg-custom-crimson text-custom-white font-mono p-2">
            <div className="container mx-auto flex justify-between items-center">
                <Link to='/home' className="text-xl font-bold">BookFinder</Link>
                <div className="flex space-x-4">
                    <Link to='/signup' className="nav-link hover:bg-gray-700 px-3 py-2 rounded-md">Signup</Link>
                    <Link to='/login' className="nav-link hover:bg-gray-700 px-3 py-2 rounded-md">Login</Link>
                    <Link to='/logout' className="nav-link hover:bg-gray-700 px-3 py-2 rounded-md">Logout</Link>
                    <Link to ='/reading-list' className="nav-link hover:bg-gray-700 px-3 py-2 rounded-md">Reading List</Link>
                </div>
            </div>
        </div>
    )
};

export default Navbar;