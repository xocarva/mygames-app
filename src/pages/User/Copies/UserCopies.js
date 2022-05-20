import { useState } from "react";
import { CopiesFilters, CopiesGrid } from "../../../components";
import "./UserCopies.css";

const SERVER_URL = process.env.REACT_APP_SERVER_URL


const UserCopies = () => {

    const [ url, setUrl ] = useState( SERVER_URL + '/copies' );

    return (
        <main className="my-collection-main">
            <CopiesFilters url={url} setUrl={setUrl}  />
            <CopiesGrid url={url} setUrl={setUrl} />
        </main>
    );
};

export default UserCopies;
