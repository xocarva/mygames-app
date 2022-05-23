import { useUser } from "../../hooks";
import { Login, Welcome } from "../../components/";
import "./Home.css";

const Home = () => {

    const user = useUser();

    return (
        <main className="home-main">
            {user ? <Welcome user={ user } /> : <Login />}
        </main>
    );
};

export default Home;
