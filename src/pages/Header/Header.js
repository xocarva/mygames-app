import { useUser } from "../../hooks";
import Navbar from "./Navbar";
import "./Header.css";


const Header = () => {

    const user = useUser();

    return (
        <header>
            <h1>MyGames 🎮</h1>
            <span>{ user?.data.name }</span>
            <Navbar />
        </header>
    );
};

export default Header;
