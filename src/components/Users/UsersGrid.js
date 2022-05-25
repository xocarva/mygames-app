import { useSetModal, useUser } from "../../hooks";
import { Loading, Pagination } from "../../components";
import UserGridItem from "./UserGridItem";
import { useEffect, useState } from "react";
import "./UsersGrid.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const UsersGrid = () => {

    const user = useUser();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const setModal = useSetModal();

    const [ users, setUsers ] = useState( null );
    const [ isLoading, setIsLoading ] = useState( true );

    useEffect(() => {

        const loadData = async () => {

            setIsLoading( true );
            try {
                const res = await fetch(SERVER_URL + '/users', {
                    headers: {
                        'Authorization': 'Bearer ' + user.token,
                        Accept:'application/json',
                        'Content-Type': 'application/json'
                    }
                });


                if ( res.ok ) {
                    const { data } = await res.json();
                    setUsers( data );
                    setIsLoading( false );

                } else if( res.status === 401 ) {

                    dispatch({ type: 'logout' });
                    setModal( <p>Session expired</p> );
                    navigate( '/' );

                } else {
                    const { message } = await res.json();
                    setModal( <p>{ message }</p> );
                }
            }
            catch ( error ) {
                setModal( <p>{ error.message }</p> );
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
