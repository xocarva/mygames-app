import { useFetch } from "../../../hooks";
import { useParams } from "react-router-dom";
import { Loading } from "../../../components";

const UserFile = () => {

    const { id } = useParams();

    const SERVER_URL = process.env.REACT_APP_SERVER_URL

    const { isLoading, data: user } = useFetch( SERVER_URL + `/users/${ id }` );


    return (
        <main>
            { isLoading && <Loading /> }
            { user &&
                <h4>{user?.name}</h4>
            }
        </main>
    );

};

export default UserFile;
