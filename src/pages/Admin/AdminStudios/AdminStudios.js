import { Link } from "react-router-dom";
import { StudiosGrid } from "../../../components";
import "./AdminStudios.css";

const AdminStudios = () => {

    return (
        <main className="studios-main">
            <h2 className="studios-title">Studios</h2>
            <div className="new-studio-container">
                <Link to="/admin/studios/create" className="new-studio">New Studio ➕</Link>
            </div>
            <StudiosGrid />
        </main>
    );
};

export default AdminStudios;
