import { useEffect, useState } from "react";
import { useSetModal, useUser } from "../../../hooks";
import { Loading, CopiesGridItem, Pagination } from "../../../components";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./CopiesGrid.css";

const CopiesGrid = ({ url }) => {

    const [ copies, setCopies ] = useState([]);
    const [ isLoading, setIsLoading ] = useState( false );

    const user = useUser();
    const dispatch = useDispatch();
    const setModal = useSetModal();
    const navigate = useNavigate();

    useEffect(() => {

        const loadData = async () => {

            setIsLoading( true );
            try {
                const res = await fetch( url, {
                    headers: {
                        'Authorization': 'Bearer ' + user.token,
                        Accept:'application/json',
                        'Content-Type': 'application/json'
                    }
                });


                if ( res.ok ) {
                    const { data } = await res.json();
                    setCopies( data );
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

    }, [ user, url ]);

    const [ page, setPage ] = useState( 0 );
    const perPage = 10;
    const totalPages = Math.ceil( copies?.length / perPage );

    return (
        <section className="my-collection">
            <h2 className="my-collection-title">My Collection</h2>
            <p>Rate, mark as completed or delete games from your collection</p>
            { isLoading && < Loading /> }
            { !isLoading && copies && copies.length > 0 &&
                <section className="copies-grid">
                    { copies.slice( page * perPage, ( page + 1 ) * perPage ).map( copy =>
                        <CopiesGridItem key={ copy.id}  copy={ copy } setCopies={ setCopies } />
                    )}
                </section>
            }
            { !isLoading && copies?.length > 0 && <Pagination page={ page } setPage={ setPage } totalPages={ totalPages } /> }
        </section>
    );

};

export default CopiesGrid;