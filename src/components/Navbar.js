import { Link } from "react-router-dom"

function Navbar() {
    return (
        <div className="Navbar">
        <Link to='/signup' className="nav-link">Signup</Link>
        <Link to='/login' className="nav-link">Login</Link>

        </div>
    )
};

export default Navbar;