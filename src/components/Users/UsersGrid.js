import { useFetch } from "../../hooks";
import { Loading, Pagination } from "../../components";
import UserGridItem from "./UserGridItem";
import { useState } from "react";
import "./UsersGrid.css";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const UsersGrid = () => {

    const url = SERVER_URL + '/users';

    const { isLoading, data: users } = useFetch( url );

    const [ page, setPage ] = useState( 0 );
    const perPage = 10;
    const totalPages = Math.ceil( users?.length / perPage );

    console.log(users)

    return (
        <>
            { isLoading && < Loading /> }
            { !isLoading && users && users.length > 0 &&
                <section className="users-grid">
                    { users?.slice( page * perPage, ( page + 1 ) * perPage ).map( user =>
                        <UserGridItem key={ user.id}  user={ user } />
                    )}
                </section>
            }
            { !isLoading && users?.length > 0 && <Pagination page={ page } setPage={ setPage } totalPages={ totalPages } /> }
        </>
    );

};

export default UsersGrid;
