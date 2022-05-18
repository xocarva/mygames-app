import { useUser } from "../../hooks";
import { Login } from "../Login";

const Home = () => {

    const user = useUser();

    const loadData = async () => {
        const res = await fetch('http://localhost:8000/api/copies', {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + user.token,
            }
        })
        if(res.ok) {
            const { data: copies } = await res.json();
            console.log(copies);
        } else {
            console.log('error')
        }

    }

    loadData();


    return (
        <main>
            {user ? <p>Welcome, { user.data.name }</p> : <Login />}
        </main>
    );
};

export default Home;
