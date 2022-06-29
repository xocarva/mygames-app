import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSetModal, useUser } from "../../../hooks";
import "./GamesGridItem.css";

const GamesGridItem = ({ game, platforms }) => {

    const SERVER_URL = process.env.REACT_APP_SERVER_URL;

    const user = useUser();
    const setModal = useSetModal();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [ platform, setPlatform ] = useState();

    const handleSubmit = async ( e ) => {

        e.preventDefault();

        if( !platform ) {
            setModal( <p>Select a platform</p> );
            return;
        }

        try {
          const res = await fetch( SERVER_URL + '/copies', {
            method: 'POST',
            headers: {
                Accept:'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user?.token,
              },
            body: JSON.stringify({
                gameId:game.id,
                platformId:platform,
                completed:false,
             }),
          });

          if( res.ok ) {
            setModal( <p>Game added to your collection</p> );

          } else if( res.status === 401 ) {
              dispatch({ type: 'logout' });
              setModal( <p>Session expired</p> );
              navigate( '/' );

          } else if( res.status === 512 ) {
              setModal( <p>Game already added to your collection</p> );

          } else {
              const { message } = await res.json();
              setModal( <p>{ message }</p> );
          }

        } catch ( error ) {
            setModal( <p>{ error.message }</p> );
        }
    };

    return (
            <article className="games-grid-item" key={ game.id }>
                <header className="game-header">
                    <h3 className="game-title">{ game.attributes.title }</h3>
                </header>
                <section className="game-data">
                    <span className="genre">{ game.relationships.genre.name }</span>
                    <span className="studio">{ game.relationships.studio.name }</span>
                </section>
                <form onSubmit={ handleSubmit }>
                    <select defaultValue={'DEFAULT'} value={ platform } onChange={ ( e ) => setPlatform( e.target.value ) }>
                        <option value='DEFAULT' disabled>select platform</option>
                        { platforms?.map( platform => {
                            return(
                                <option key={ platform.id } value={ platform.id }>
                                    { platform.name }
                                </option>
                            )
                        })}
                    </select>
                    <button>Add</button>
                </form>
            </article>
    );
};

export default GamesGridItem;
