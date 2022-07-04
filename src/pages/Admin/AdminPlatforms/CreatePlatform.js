import { useNavigate } from "react-router-dom";
import { NewPlatformForm } from "../../../components";
import "./CreatePlatform.css";

const CreatePlatform = () => {

    const navigate = useNavigate();

    return (
        <main className="create-platform-main">
            <h2>Create a new platform</h2>
            <NewPlatformForm />
            <button className='back-button' onClick={() => navigate(-1)}>Back</button>
        </main>
    );

};

export default CreatePlatform;
