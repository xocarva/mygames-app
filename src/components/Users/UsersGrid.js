import { useFetch, useUser } from "../../hooks";
import { Loading, Pagination } from "../../components";
import UserGridItem from "./UserGridItem";
import { useEffect, useState } from "react";
import "./UsersGrid.css";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const UsersGrid = () => {

    const user = useUser();
    const [ users, setUsers ] = useState( null );
    const [ isLoading, setIsLoading ] = useState( true );

    // const { isLoading, data:users } = useFetch( url );

    useEffect(() => {

        const loadData = async () => {

            setIsLoading( true );
            try {
                const response = await fetch(SERVER_URL + '/users', {
                    headers: {
                        'Authorization': 'Bearer ' + user.token,
                        Accept:'application/json',
                        'Content-Type': 'application/json'
                    }
                })

                const { data } = await response.json();

                if ( response.ok ) {
                    setUsers( data );
                    setIsLoading( false );
                } else {
                    console.log( 'error' );
                }
            }
            catch (error) {
                console.log( error );
            }
        }

        loadData();

    }, [ user ]);



    const [ page, setPage ] = useState( 0 );
    const perPage = 10;
    const totalPages = Math.ceil( users?.length / perPage );

    return (
        <>
            { isLoading && < Loading /> }
            { !isLoading && users && users.length > 0 &&
                <section className="users-grid">
                    { users?.slice( page * perPage, ( page + 1 ) * perPage ).map( user =>
                        <UserGridItem key={ user.id}  user={ user } setUsers={ setUsers } />
                    )}
                </section>
            }
            { !isLoading && users?.length > 0 && <Pagination page={ page } setPage={ setPage } totalPages={ totalPages } /> }
        </>
    );

};

export default UsersGrid;
