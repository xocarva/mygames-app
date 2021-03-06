import { Link } from "react-router-dom";
import { AdminNav, PlatformsGrid } from "../../../components";
import "./AdminPlatforms.css";

const AdminPlatforms = () => {

    return (
        <main className="platforms-main">
            <AdminNav />
            <h2 className="platforms-title">Platforms</h2>
            <div className="new-platform-container">
                <Link to="/admin/platforms/create" className="new-platform">New Platform ➕</Link>
            </div>
            <PlatformsGrid />
        </main>
    );
};

export default AdminPlatforms;
