import { useState } from "react";
import "./GamesFilters.css";

const SERVER_URL = process.env.REACT_APP_SERVER_URL


const GamesFilters = ({ setUrl }) => {

    const [ title, setTitle ] = useState('');
    const [ genre, setGenre ] = useState('');
    const [ studio, setStudio ] = useState('');

    const handleSubmit = ( e ) => {
        e.preventDefault();

        let urlQuery = SERVER_URL + '/games';
        let prevParams = false;

        if( title || genre || studio ) {
            urlQuery += '?';
        }

        if( title ) {
            urlQuery += `title=${ title }`;
            prevParams = true;
        }

        if( genre ) {
            if ( prevParams ) {
                urlQuery += '&'
            } else {
                prevParams = true;
            }
            urlQuery += `genre=${ genre }`
        }

        if( studio ) {
            if ( prevParams ) {
                urlQuery += '&'
            } else {
                prevParams = true;
            }
            urlQuery += `studio=${ studio }`
        }

        setUrl( urlQuery );
    };

    const handleReset = ( e ) => {
        e.preventDefault();
        setTitle('');
        setGenre('');
        setStudio('');
    };

    return (
        <aside className="filters-aside">
            <h2 className="filters-title">Filters</h2>
            <form className="filters-form" onSubmit={ handleSubmit }>
                <ul className="filters-list">
                    <li className="filter">
                        <label htmlFor="title-filter">Title</label>
                        <input type="search" id="title-filter" value={ title } onChange={ e => setTitle( e.target.value ) }></input>
                    </li>
                    <li className="filter">
                        <label htmlFor="genre-filter">Genre</label>
                        <input type="search" id="genre-filter" value={ genre } onChange={ e => setGenre( e.target.value ) }></input>
                    </li>
                    <li className="filter">
                        <label htmlFor="studio-filter">Studio</label>
                        <input type="search" id="studio-filter" value={ studio } onChange={ e => setStudio( e.target.value ) }></input>
                    </li>
                </ul>
                <div className="filters-buttons">
                    <button type="submit">Filter</button>
                    <button className="reset-button" onClick={ handleReset }>Reset</button>
                </div>

            </form>
        </aside>
    );

};

export default GamesFilters;
