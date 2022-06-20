import { useEffect, useState } from "react";
import { useSetModal, useUser } from "../../hooks";
import { validateName } from "../../utils/validateData";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./EditGenre.css";


const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const EditGenre = ({ id, setGenres }) => {

    const loggedUser = useUser();
    const setModal = useSetModal();

    const [ editedGenre, setEditedGenre ] = useState('');
    const [ nameHolder, setNameHolder ] = useState('');

    const [ name, setName ] = useState('');

    const [errorType, setErrorType] = useState('');
    const [errorText, setErrorText] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect( () => {
        const loadData = async () => {
            try {
                const res = await fetch(SERVER_URL + `/genres/${ id }`, {
                    headers: {
                        'Authorization': 'Bearer ' + loggedUser?.token,
                    }
                });

                if( res.ok ) {
                    const { data:genre } = await res.json();

                    setEditedGenre( genre );
                    setNameHolder( genre.name );

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
        if( name && !validateName( name ) ) {
            setErrorText( 'Name must have between 2 and 50 letters' );
            setErrorType( 'name' );
            document.getElementById( 'edit-name' ).focus();
            return false;
        }

        setErrorType( '' );
        return true;
    };


    const handleSubmit = async ( e ) => {

        e.preventDefault();

        if( !validateData() ) return;

        let body = {};
        if( name ) body.name = name;

        if( name ) {

            try {
                const res = await fetch( SERVER_URL + `/genres/${ id }`, {
                    method: 'PATCH',
                    headers: {
                        'Authorization': 'Bearer ' + loggedUser?.token,
                        Accept:'application/json',
                            'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(body),
                });

                if( res.ok ) {
                    const { data:genre } = await res.json();
                    setName('');
                    setNameHolder( genre.name );

                    setGenres( currentList => {
                        return currentList.map( g => {
                            return g.id === id ? genre : g;
                        });
                    });

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
        <div className="edit-genre">
            { editedGenre &&
                <form className="edit-genre-form" onSubmit={ handleSubmit }>
                    <div className="form-inputs">
                        <label htmlFor="edit-name">
                            Name
                            <input id="edit-name" type="text" placeholder={ nameHolder } value={ name }
                                onChange={ ( e ) => {
                                    setName( e.target.value );
                                    setErrorType('');
                                }}
                            />
                        </label>
                    </div>
                    { errorType && <p className='error-text'>{ errorText }</p> }
                    <button className="save-edit">Save</button>
                </form>
            }
        </div>
    );
};

export default EditGenre;
