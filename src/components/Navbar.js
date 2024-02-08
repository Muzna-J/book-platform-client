import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UserContext } from '../context/UserContext'; 

function Navbar() {
    
    const { currentUser } = useContext(UserContext);
    const { pathname } = useLocation();

    const loggedInLinks = (
        <>
            
            <Link to='/reading-list' className="nav-link hover:bg-custom-orange px-3 py-2 rounded-md">Reading List</Link>
            <Link to='profile' className='nav-link hover:bg-custom-orange px-3 py-2 rounded-md'>Profile</Link>
            <Link to='/logout' className="nav-link hover:bg-custom-orange px-3 py-2 rounded-md">Logout</Link>

        </>
    );

    const loggedOutLinks = (
        <>
            {pathname !== '/signup' && <Link to='/signup' className="nav-link hover:bg-custom-orange px-3 py-2 rounded-md">Signup</Link>}
            {pathname !== '/login' && <Link to='/login' className="nav-link hover:bg-custom-orange px-3 py-2 rounded-md">Login</Link>}
            
        </>
    );

    return (
        <div className="bg-custom-nav text-custom-white font-mono p-2">
            <div className="container mx-auto flex justify-between items-center">
                <Link to='/' className="flex items-center">
                <img src="/bookLogo.png" alt="Logo" style={{ height: '50px' }} />
                BookFinder
                </Link>               
                <div className="flex space-x-4">
                    {currentUser ? loggedInLinks : loggedOutLinks}
                </div>
            </div>
        </div>
    );
}

export default Navbar;
