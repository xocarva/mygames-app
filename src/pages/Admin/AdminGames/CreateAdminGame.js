import { useNavigate } from "react-router-dom";
import { NewGameAdminForm } from "../../../components";
import "./CreateAdminGame.css";

const CreateAdminGame = () => {

    const navigate = useNavigate();

    return (
        <main className="create-admin-game-main">
            <h2>Create a new game</h2>
            <NewGameAdminForm />
            <button className='back-button' onClick={() => navigate(-1)}>Back</button>
        </main>
    );

};

export default CreateAdminGame;
