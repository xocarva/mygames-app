import { useNavigate } from "react-router-dom";
import { NewUserForm } from "../../../components";
import "./CreateUser.css";

const CreateUser = () => {

    const navigate = useNavigate();

    return (
        <main className="create-user-main">
            <h2>Creatre a new user</h2>
            <NewUserForm />
            <button className='back-button' onClick={() => navigate(-1)}>Back</button>
        </main>
    );

};

export default CreateUser;