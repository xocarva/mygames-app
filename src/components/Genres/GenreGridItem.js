import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSetModal, useUser } from "../../hooks";
import EditGenre from "./EditGenre";
import "./GenreGridItem.css";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const GenreGridItem = ({ genre, setGenres }) => {

    const setModal= useSetModal();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loggedUser = useUser();

    const [ showEdit, setShowEdit ] = useState( false );

    const handleDelete = async () => {

        if( window.confirm( 'Delete genre?' ) ) {
            try {
                const res = await fetch( SERVER_URL + `/genres/${ genre.id }`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': 'Bearer' + loggedUser?.token,
                    }
                });

                if ( res.ok ) {
                    window.alert( 'Genre deleted' );
                    setGenres( currentList => {
                        return currentList.filter( u => u.id !== genre.id );
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
            <article className="genres-grid-item" key={ genre.id }>
                <section className="genres-grid-item-data">
                    <h4>{ genre.name }</h4>
                    <div className="genre-options">
                        <span className="edit-genre-button" title="Edit" onClick={ () => { setShowEdit( !showEdit ) }}>✏️</span>
                        <span className="delete-genre-button" title="Delete" onClick={ handleDelete }>🗑️</span>
                    </div>
                </section>
                { showEdit &&
                    <EditGenre id={ genre.id } setGenres={ setGenres } />
                }
            </article>

        </>

    );

};

export default GenreGridItem;
