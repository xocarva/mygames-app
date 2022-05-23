import { useUser } from "../../hooks";
import Navbar from "./Navbar";
import "./Header.css";
import { Link } from "react-router-dom";


const Header = () => {

    const user = useUser();

    return (
        <header className="main-header">
            <Link to="/" title="MyGames" className="header-title"><h1>MyGames 🎮</h1></Link>
            {/* <h1>MyGames 🎮</h1> */}
            <span>{ user?.data.name }</span>
            <Navbar />
        </header>
    );
};

export default Header;
