import { useSetModal, useUser } from "../../hooks";
import { Loading, Pagination } from "../../components";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import PlatformGridItem from "./PlatformGridItem";
import "./PlatformsGrid.css";


const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const PlatformsGrid = () => {

    const user = useUser();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const setModal = useSetModal();

    const [ platforms, setPlatforms ] = useState( null );
    const [ isLoading, setIsLoading ] = useState( true );

    useEffect(() => {

        const loadData = async () => {

            setIsLoading( true );
            try {
                const res = await fetch(SERVER_URL + '/platforms', {
                    headers: {
                        'Authorization': 'Bearer ' + user.token,
                        Accept:'application/json',
                        'Content-Type': 'application/json'
                    }
                });


                if ( res.ok ) {
                    const { data } = await res.json();
                    setPlatforms( data );
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
    const totalPages = Math.ceil( platforms?.length / perPage );

    return (
        <>
            { isLoading && < Loading /> }
            { !isLoading && platforms && platforms.length > 0 &&
                <section className="platforms-grid">
                    { platforms?.slice( page * perPage, ( page + 1 ) * perPage ).map( platform =>
                        <PlatformGridItem key={ platform.id}  platform={ platform } setPlatforms={ setPlatforms } />
                    )}
                </section>
            }
            { !isLoading && platforms?.length > 0 && <Pagination page={ page } setPage={ setPage } totalPages={ totalPages } /> }
        </>
    );

};

export default PlatformsGrid;
