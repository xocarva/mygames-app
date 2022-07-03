import { Link } from "react-router-dom";
import { AdminNav, GenresGrid } from "../../../components";
import "./AdminGenres.css";

const AdminGenres = () => {

    return (
        <main className="users-main">
            <AdminNav />
            <h2 className="users-title">Genres</h2>
            <div className="new-user-container">
                <Link to="/admin/genres/create" className="new-user">New Genre ➕</Link>
            </div>
            <GenresGrid />
        </main>
    );
};

export default AdminGenres;
