import { useFetch } from "../../../hooks";

const UserFile = () => {

    const SERVER_URL = process.env.REACT_APP_SERVER_URL

    const { isLoading, data: user } = useFetch( SERVER_URL + `/users/2` );


    return (
        <main>
            <h4>{user?.name}</h4>
        </main>
    );

};

export default UserFile;
