import { useState } from "react";
import { useFetch } from "../../../hooks";
import { Loading, Pagination } from "../../../components";
import GamesGridItem from "../GamesGridItem/GamesGridItem";
import "./GamesGrid.css";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const GamesGrid = ({ url }) => {

    const { isLoading, data: games } = useFetch( url );

    const { data:platforms } = useFetch( SERVER_URL + '/platforms' );

    const [ page, setPage ] = useState( 0 );
    const perPage = 10;
    const totalPages = Math.ceil( games?.length / perPage );

    return (
        <section className="games">
            <h2 className="games-title">Games</h2>
            { isLoading && < Loading /> }
            { !isLoading && games && games.length > 0 &&
                <section className="games-grid">
                    { games.slice( page * perPage, ( page + 1 ) * perPage ).map( game =>
                        <GamesGridItem key={ game.id}  game={ game } platforms={ platforms } />
                    )}
                </section>
            }
            { !isLoading && games?.length > 0 && <Pagination page={ page } setPage={ setPage } totalPages={ totalPages } /> }
        </section>
    );

};

export default GamesGrid;