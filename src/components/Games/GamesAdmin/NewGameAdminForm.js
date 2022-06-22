import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSetModal, useUser } from "../../../hooks";
import { validateNameWithNumbers } from "../../../utils/validateData";
import "./NewGameAdminForm.css";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const NewGameAdminForm = () => {

    const user = useUser();
    const navigate = useNavigate();
    const setModal = useSetModal();
    const dispatch = useDispatch();

    const [errorType, setErrorType] = useState('');
    const [errorText, setErrorText] = useState('');

    if( !user ) {
        navigate('/');
    }

    const [ title, setTitle ] = useState('');

    const validateData = () => {
        if( !validateNameWithNumbers( title ) ) {
            setErrorText( 'Title must have between 2 and 50 letters' );
            setErrorType( 'title' );
            document.getElementById( 'create-game-admin-title' ).focus();
            return false;
        }

        return true;
    };

    const handleSubmit = async ( e ) => {
        e.preventDefault();

        if ( !validateData() ) return;

        try {
          const res = await fetch(SERVER_URL + '/games', {
            method: 'POST',
            headers: {
                Accept:'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user?.token,
              },
            body: JSON.stringify({ title }),
          });

          if( res.ok ) {
            setModal( <p>Game created</p> );
            navigate(-1);

          } else if( res.status === 401 ) {
            dispatch({ type: 'logout' });
            setModal( <p>Session expired</p> );
            navigate( '/' );

        } else if( res.status === 422 ) {
            setModal( <p>Game already exists</p> );


          } else {
            const { message } = await res.json();
            setModal( <p>{ message }</p> );
          }

        } catch ( error ) {
          setModal( <p>{ error.message }</p> );
        }
    };

    return (
            <form className="create-game-admin-form" onSubmit={ handleSubmit }>
                <label htmlFor="creaute-game-admin-title">Title</label>
                <input id="create-game-admin-title" type="text" name="title" value={ title }
                  onChange={ ( e ) => {
                    setTitle( e.target.value );
                    setErrorType('');
                  }}
                />
                { errorType === 'title' && <p className='error-text'>{ errorText }</p> }
                <button className="create-game-admin-button">Create game</button>
            </form>
    );
};

export default NewGameAdminForm;
