import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useUser } from "../../hooks";

import "./Navbar.css";

const Navbar = () => {

    const [ sidebar, setSidebar ] = useState ( false );

    const user = useUser();
    const dispatch = useDispatch()

    const toggleSidebar = () => setSidebar( prev => !prev );

    return (
        <>
            <div className={ sidebar ? 'burger-menu opened' : 'burger-menu' } onClick={ toggleSidebar }>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <nav className={ sidebar ? 'nav-menu active' : 'nav-menu' }>
                <ul className='nav-menu-items' >
                    <li className='nav-text'><Link to="/" onClick={ toggleSidebar }>Home</Link></li>
                    {!user && <li className='nav-text'><Link to="/register" onClick={ toggleSidebar }>Register</Link></li>}
                    {user && <li className='nav-text'><Link to="/" onClick={() => dispatch({ type: 'logout' })}>Logout</Link></li>}
                </ul>
            </nav>
        </>
    );
};

export default Navbar;
