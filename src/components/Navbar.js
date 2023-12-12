import { Link } from "react-router-dom"

function Navbar() {
    return (
        <div className="Navbar">
        <Link to='/signup' className="nav-link">Signup</Link>
        <Link to='/login' className="nav-link">Login</Link>
        <Link to='/logout' className="nav-link">Logout</Link>
        <Link to='/home' className="nav-link">Home</Link>
        <Link to ='/reading-list' className="nav-link">Reading List</Link>

        </div>
    )
};

export default Navbar;