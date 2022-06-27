import { useEffect, useState } from "react";
import { useSetModal, useUser } from "../../../hooks";
import { validateNameWithNumbers } from "../../../utils/validateData";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./EditGame.css";


const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const EditGame = ({ id, setGames, genres, studios }) => {

    const loggedUser = useUser();
    const setModal = useSetModal();

    const [ editedGame, setEditedGame ] = useState('');
    const [ titleHolder, setTitleHolder ] = useState('');
    const [ genre, setGenre ] = useState('');
    const [ studio, setStudio ] = useState('');

    const [ title, setTitle ] = useState('');

    const [errorType, setErrorType] = useState('');
    const [errorText, setErrorText] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect( () => {
        const loadData = async () => {
            try {
                const res = await fetch(SERVER_URL + `/games/${ id }`, {
                    headers: {
                        'Authorization': 'Bearer ' + loggedUser?.token,
                    }
                });

                if( res.ok ) {
                    const { data:game } = await res.json();

                    setEditedGame( game );
                    setTitleHolder( game.attributes.title );
                    setGenre( game.attributes.genreId );
                    setStudio( game.attributes.studioId );

                } else if( res.status === 401 ) {
                    dispatch({ type: 'logout' });
                    setModal( <p>Session expired</p> );
                    navigate( '/' );

                } else {
                    const { message } = await res.json();
                    setModal( <p>{ message }</p> );
                }


            } catch( error)  {
                setModal( <p>{ error.message }</p> );
            }
        }
        loadData();

    },[ id, loggedUser ]);

    const validateData = () => {

        if( title && !validateNameWithNumbers( title ) ) {
            setErrorText( 'Title must have between 2 and 50 letters' );
            setErrorType( 'title' );
            document.getElementById( 'edit-title' ).focus();
            return false;
        }

        if( isNaN( genre ) ) return false;

        if( isNaN( studio )) return false;

        setErrorType( '' );
        return true;
    };


    const handleSubmit = async ( e ) => {

        e.preventDefault();

        if( !validateData() ) return;

        if( title || genre || studio ) {

            let body = {};
            if( title ) body.title = title;
            if( genre ) body.genreId = genre;
            if( studio ) body.studioId = studio;

            try {
                const res = await fetch( SERVER_URL + `/games/${ id }`, {
                    method: 'PATCH',
                    headers: {
                        'Authorization': 'Bearer ' + loggedUser?.token,
                        Accept:'application/json',
                            'Content-Type': 'application/json'
                    },
                    body: JSON.stringify( body ),
                });

                if( res.ok ) {
                    const { data:game } = await res.json();
                    setTitle('');
                    setTitleHolder( game.attributes.title );

                    setGames( currentList => {
                        return currentList.map( g => {
                            return g.id === id ? game : g;
                        });
                    });

                    setModal( <p>Saved</p> );

                } else if( res.status === 401 ) {
                    dispatch({ type: 'logout' });
                    setModal( <p>Session expired</p> );
                    navigate( '/' );

                } else if( res.status === 512 ) {
                    setModal( <p>Game already exists</p> );

                } else {
                    const { message } = await res.json();
                    setModal( <p>{ message }</p> );
                }
            } catch ( error ) {
                setModal( <p>{ error.message }</p> );
            }
        }

    };

    return (
        <div className="edit-game-admin">
            { editedGame &&
                <form className="edit-game-admin-form" onSubmit={ handleSubmit }>
                    <div className="form-inputs">
                        <label htmlFor="edit-title">
                            Title
                            <input id="edit-title" type="text" placeholder={ titleHolder } value={ title }
                                onChange={ ( e ) => {
                                    setTitle( e.target.value );
                                    setErrorType('');
                                }}
                            />
                        </label>
                        <select value={ genre } onChange={ ( e ) => setGenre( e.target.value ) }>
                            { genres?.map( genre => {
                                return(
                                    <option key={ genre.id } value={ genre.id }>
                                        { genre.name }
                                    </option>
                                )
                            })}
                        </select>
                        <select value={ studio } onChange={ ( e ) => setStudio( e.target.value ) }>
                            { studios?.map( studio => {
                                return(
                                    <option key={ studio.id } value={ studio.id }>
                                        { studio.name }
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                    { errorType && <p className='error-text'>{ errorText }</p> }
                    <button className="save-edit">Save</button>
                </form>
            }
        </div>
    );
};

export default EditGame;
