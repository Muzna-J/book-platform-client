import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UserContext } from '../context/UserContext'; // Adjust this import based on your context setup

function Navbar() {
    
    const { currentUser } = useContext(UserContext);
; // Adjust based on your context
    const { pathname } = useLocation();
    console.log('the user is', currentUser);

    const loggedInLinks = (
        <>
            
            <Link to='/reading-list' className="nav-link hover:bg-gray-700 px-3 py-2 rounded-md">Reading List</Link>
            <Link to='profile' className='nav-link hover:bg-gray-700 px-3 py-2 rounded-md'>Profile</Link>
            <Link to='/logout' className="nav-link hover:bg-gray-700 px-3 py-2 rounded-md">Logout</Link>

            {/* Add other authenticated user links here */}
        </>
    );

    const loggedOutLinks = (
        <>
            {pathname !== '/signup' && <Link to='/signup' className="nav-link hover:bg-gray-700 px-3 py-2 rounded-md">Signup</Link>}
            {pathname !== '/login' && <Link to='/login' className="nav-link hover:bg-gray-700 px-3 py-2 rounded-md">Login</Link>}
            {/* Add other non-authenticated user links here */}
        </>
    );

    return (
        <div className="bg-custom-crimson text-custom-white font-mono p-2">
            <div className="container mx-auto flex justify-between items-center">
                <Link to='/home' className="text-xl font-bold">BookFinder</Link>
                <div className="flex space-x-4">
                    {currentUser ? loggedInLinks : loggedOutLinks}
                </div>
            </div>
        </div>
    );
}

export default Navbar;
