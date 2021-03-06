import { Link } from "react-router-dom";
import "./Welcome.css";

const Welcome = ({ user }) => {

    return (
        <>
            <p className="welcome-message">🕹️ Welcome, { user.data.name }</p>
            <nav className="welcome-nav">
                <Link to="/games">Games</Link>
                <Link to="/user/copies">My Collection</Link>
                <Link to="/user/profile">Edit Profile</Link>
                { user && user?.data.admin ? <Link to="/admin">Admin</Link> : '' }
            </nav>
        </>
    );
};

export default Welcome;
