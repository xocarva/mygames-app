import { useNavigate } from "react-router-dom";
import { NewGenreForm } from "../../../components";
import "./CreateGenre.css";

const CreateGenre = () => {

    const navigate = useNavigate();

    return (
        <main className="create-genre-main">
            <h2>Create a new genre</h2>
            <NewGenreForm />
            <button className='back-button' onClick={() => navigate(-1)}>Back</button>
        </main>
    );

};

export default CreateGenre;