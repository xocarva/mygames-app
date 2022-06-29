import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSetModal, useUser } from "../../../hooks";
import EditGame from "./EditGame";
import "./GameAdminGridItem.css";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const GameAdminGridItem = ({ game, setGames, genres, studios }) => {

    const setModal= useSetModal();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loggedUser = useUser();

    const [ showEdit, setShowEdit ] = useState( false );

    const handleDelete = async () => {

        if( window.confirm( 'Delete game?' ) ) {
            try {
                const res = await fetch( SERVER_URL + `/genres/${ game.id }`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': 'Bearer' + loggedUser?.token,
                    }
                });

                if ( res.ok ) {
                    window.alert( 'Game deleted' );
                    setGames( currentList => {
                        return currentList.filter( g => g.id !== game.id );
                    });

                } else if( res.status === 401 ) {
                    dispatch({ type: 'logout' });
                    setModal( <p>Session expired</p> );
                    navigate( '/' );

                } else {
                    setModal( <p>{ res.message }</p> );
                }

            } catch (error) {
                setModal( <p>{ error.message }</p> );
            }
        }

    };

    return (
        <>
            <article className="games-admin-grid-item" key={ game.id }>
                <section className="games-admin-grid-item-data">
                    <h4>{ game.attributes.title }</h4>
                    <div className="game-admin-options">
                        <span className="edit-game-admin-button" title="Edit" onClick={ () => { setShowEdit( !showEdit ) }}>✏️</span>
                        <span className="delete-games-admingame-admin-button" title="Delete" onClick={ handleDelete }>🗑️</span>
                    </div>
                </section>
                { showEdit &&
                    <EditGame id={ game.id } setGames={ setGames } genres={ genres } studios={ studios } />
                }
            </article>

        </>

    );

};

export default GameAdminGridItem;
