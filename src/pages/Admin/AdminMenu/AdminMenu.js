import { Link } from "react-router-dom";

const AdminMenu = () => {

    return (
        <main>
            <ul>
                <li><Link to="/admin/users">Users</Link></li>
                <li>Games</li>
                <li>Genres</li>
                <li>Platforms</li>
                <li>Studios</li>
            </ul>
        </main>
    );
};

export default AdminMenu;
