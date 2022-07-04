import { useNavigate } from "react-router-dom";
import { NewStudioForm } from "../../../components";
import "./CreateStudio.css";

const CreateStudio = () => {

    const navigate = useNavigate();

    return (
        <main className="create-studio-main">
            <h2>Create a new studio</h2>
            <NewStudioForm />
            <button className='back-button' onClick={() => navigate(-1)}>Back</button>
        </main>
    );

};

export default CreateStudio;
