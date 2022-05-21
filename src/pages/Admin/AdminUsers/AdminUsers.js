import { useState } from "react";
import { UsersGrid } from "../../../components";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const AdminUsers = () => {

    const [ url, setUrl ] = useState( SERVER_URL + '/users' );

    return (
        <main className="users-main">
            <UsersGrid url={ url } />
        </main>
    );
};

export default AdminUsers;
