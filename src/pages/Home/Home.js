import { useUser } from "../../hooks";
import { Login } from "../Login";

const Home = () => {

    const user = useUser();

    return (
        <main>
            {user ? <p>Welcome, { user.data.name } 🕹️👾</p> : <Login />}
        </main>
    );
};

export default Home;
