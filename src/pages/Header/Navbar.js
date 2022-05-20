import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useUser } from "../../hooks";

import "./Navbar.css";

const Navbar = () => {

    const user = useUser();
    const dispatch = useDispatch();

    const [ sidebar, setSidebar ] = useState ( false );

    const toggleSidebar = () => setSidebar( prev => !prev );

    const handleLogout = () => {
        dispatch({ type: 'logout' });
        toggleSidebar();
    };

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
                    {user && <li className='nav-text'><Link to="/user/copies" onClick={ toggleSidebar }>My collection</Link></li>}
                    {user && user?.data.admin && <li className='nav-text'><Link to="/admin" onClick={ toggleSidebar }>Admin</Link></li>}
                    {user && <li className='nav-text'><Link to="/"  onClick={ handleLogout }>Logout</Link></li>}
                </ul>
            </nav>
        </>
    );
};

export default Navbar;
