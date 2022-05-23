import { Link } from "react-router-dom";
import { UsersGrid } from "../../../components";
import "./AdminUsers.css";

const AdminUsers = () => {

    return (
        <main className="users-main">
            <h2 className="users-title">Users</h2>
            <div className="new-user-container">
                <Link to="/admin/users/create" className="new-user">New User ➕</Link>
            </div>
            <UsersGrid />
        </main>
    );
};

export default AdminUsers;
