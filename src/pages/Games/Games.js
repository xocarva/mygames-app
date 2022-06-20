import { useState } from "react";
import { GamesGrid, GamesFilters } from "../../components";
import "./Games.css";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const Games = () => {

    const [ url, setUrl ] = useState( SERVER_URL + '/games' );

    return (
        <main className="my-collection-main">
            <GamesFilters url={url} setUrl={setUrl}  />
            <GamesGrid url={url} setUrl={setUrl} />
        </main>
    );

};

export default Games;
