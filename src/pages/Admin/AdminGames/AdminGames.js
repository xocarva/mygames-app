import { Link } from "react-router-dom";
import { AdminNav, GamesAdminGrid } from "../../../components";
import "./AdminGames.css";

const AdminGames = () => {

    return (
        <main className="admin-games-main">
            <AdminNav />
            <h2 className="admin-games-title">Games</h2>
            <div className="new-admin-game-container">
                <Link to="/admin/games/create" className="new-admin-game">New Game ➕</Link>
            </div>
            <GamesAdminGrid />
        </main>
    );
};

export default AdminGames;
