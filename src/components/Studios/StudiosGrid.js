import { useSetModal, useUser } from "../../hooks";
import { Loading, Pagination } from "../../components";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import StudioGridItem from "./StudioGridItem";
import "./StudiosGrid.css";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const StudiosGrid = () => {

    const user = useUser();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const setModal = useSetModal();

    const [ studios, setStudios ] = useState( null );
    const [ isLoading, setIsLoading ] = useState( true );

    useEffect(() => {

        const loadData = async () => {

            setIsLoading( true );
            try {
                const res = await fetch(SERVER_URL + '/studios', {
                    headers: {
                        'Authorization': 'Bearer ' + user.token,
                        Accept:'application/json',
                        'Content-Type': 'application/json'
                    }
                });


                if ( res.ok ) {
                    const { data } = await res.json();
                    setStudios( data );
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
    const totalPages = Math.ceil( studios?.length / perPage );

    return (
        <>
            { isLoading && < Loading /> }
            { !isLoading && studios && studios.length > 0 &&
                <section className="studios-grid">
                    { studios?.slice( page * perPage, ( page + 1 ) * perPage ).map( studio =>
                        <StudioGridItem key={ studio.id}  studio={ studio } setStudios={ setStudios } />
                    )}
                </section>
            }
            { !isLoading && studios?.length > 0 && <Pagination page={ page } setPage={ setPage } totalPages={ totalPages } /> }
        </>
    );

};

export default StudiosGrid;
