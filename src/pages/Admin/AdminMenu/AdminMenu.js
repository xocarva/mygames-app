import { Link } from "react-router-dom";
import "./AdminMenu.css";

const AdminMenu = () => {

    return (
        <main className="main-admin">
            <h2>Admin Menu</h2>
            <nav>
                <Link to="/admin/users">Users</Link>
                <Link to="/admin/games">Games</Link>
                <Link to="/admin/genres">Genres</Link>
                <Link to="/admin/platforms">Platforms</Link>
                <Link to="/admin/studios">Studios</Link>
            </nav>
        </main>
    );
};

export default AdminMenu;
