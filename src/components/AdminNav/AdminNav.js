import { Link } from "react-router-dom";
import "./AdminNav.css";

const AdminNav = () => {

    return (
        <nav className="admin-nav">
            <Link to="/admin/users">Users</Link>
            <Link to="/admin/games">Games</Link>
            <Link to="/admin/genres">Genres</Link>
            <Link to="/admin/platforms">Platforms</Link>
            <Link to="/admin/studios">Studios</Link>
        </nav>
    );

};

export default AdminNav;
