import { Link } from "react-router-dom";
import { UsersGrid } from "../../../components";
import "./AdminUsers.css";

const AdminUsers = () => {

    return (
        <main className="users-main">
            <h2 className="users-title">Users</h2>
            <Link to="/admin/users/create" className="new-user">Create New User</Link>
            <UsersGrid />
        </main>
    );
};

export default AdminUsers;
