import { useFetch } from "../../../hooks";
import { useNavigate, useParams } from "react-router-dom";
import { Loading } from "../../../components";

const UserFile = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const SERVER_URL = process.env.REACT_APP_SERVER_URL

    const { isLoading, data: user } = useFetch( SERVER_URL + `/users/${ id }` );

    return (
        <main>
            { isLoading && <Loading /> }
            { user &&
                <>
                    <h4>{user?.name}</h4>
                </>
            }
             <button className='back-button' onClick={() => navigate(-1)}>Volver</button>
        </main>
    );

};

export default UserFile;
