import { useSetModal, useUser } from "../../hooks";
import { Loading, Pagination } from "../../components";
import GenreGridItem from "./GenreGridItem";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./GenresGrid.css";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const GenresGrid = () => {

    const user = useUser();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const setModal = useSetModal();

    const [ genres, setGenres ] = useState( null );
    const [ isLoading, setIsLoading ] = useState( true );

    useEffect(() => {

        const loadData = async () => {

            setIsLoading( true );
            try {
                const res = await fetch(SERVER_URL + '/genres', {
                    headers: {
                        'Authorization': 'Bearer ' + user.token,
                        Accept:'application/json',
                        'Content-Type': 'application/json'
                    }
                });


                if ( res.ok ) {
                    const { data } = await res.json();
                    setGenres( data );
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
    const totalPages = Math.ceil( genres?.length / perPage );

    return (
        <>
            { isLoading && < Loading /> }
            { !isLoading && genres && genres.length > 0 &&
                <section className="users-grid">
                    { genres?.slice( page * perPage, ( page + 1 ) * perPage ).map( genre =>
                        <GenreGridItem key={ genre.id}  genre={ genre } setGenres={ setGenres } />
                    )}
                </section>
            }
            { !isLoading && genres?.length > 0 && <Pagination page={ page } setPage={ setPage } totalPages={ totalPages } /> }
        </>
    );

};

export default GenresGrid;
