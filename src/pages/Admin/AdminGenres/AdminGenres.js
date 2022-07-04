import { Link } from "react-router-dom";
import { AdminNav, GenresGrid } from "../../../components";
import "./AdminGenres.css";

const AdminGenres = () => {

    return (
        <main className="genres-main">
            <AdminNav />
            <h2 className="genres-title">Genres</h2>
            <div className="new-genre-container">
                <Link to="/admin/genres/create" className="new-genre">New Genre ➕</Link>
            </div>
            <GenresGrid />
        </main>
    );
};

export default AdminGenres;
